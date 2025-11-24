'use server';

import { revalidatePath } from 'next/cache';
import { documentService } from './services/document.service';
import { CreateDocumentSchema, UpdateDocumentStatusSchema } from './types/schemas';
import { ActionResult } from '@/shared/types/actions';
import { requireAuth } from '@/features/auth/server';
import { Document, DocumentStatut, DocumentType } from '@prisma/client';
import { google } from 'googleapis';
import { prisma } from '@/shared/config/prisma';
import { Readable } from 'stream';

export async function uploadDocumentFile(formData: FormData): Promise<ActionResult<Document>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const file = formData.get('file') as File;
  if (!file) {
    return { success: false, error: 'No file provided' };
  }

  try {
    // 1. Get the user's Google Account tokens
    const account = await prisma.account.findFirst({
      where: {
        userId,
        provider: 'google',
      },
    });

    console.log('Debug - Google Account:', {
      id: account?.id,
      hasAccessToken: !!account?.access_token,
      hasRefreshToken: !!account?.refresh_token,
      expiresAt: account?.expires_at,
      currentTime: Math.floor(Date.now() / 1000),
      tokenType: account?.token_type,
      scope: account?.scope
    });

    if (!account || !account.access_token) {
      return { success: false, error: 'Compte Google Drive non lié' };
    }

    // 2. Setup Google Auth
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    const credentials: any = {
      access_token: account.access_token,
    };

    if (account.refresh_token) {
      credentials.refresh_token = account.refresh_token;
    }

    // Only set expiry_date if we have a refresh token, otherwise googleapis might try to refresh and fail
    if (account.expires_at && account.refresh_token) {
      credentials.expiry_date = account.expires_at * 1000;
    }

    auth.setCredentials(credentials);

    // 3. Upload to Drive
    const drive = google.drive({ version: 'v3', auth });
    
    // 3a. Check for "Unidox" folder
    let folderId: string | undefined;
    
    try {
      console.log('Searching for Unidox folder...');
      const folderSearch = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and name='Unidox' and trashed=false",
        fields: 'files(id, name)',
        spaces: 'drive',
      });

      console.log('Folder search result:', folderSearch.data.files);

      if (folderSearch.data.files && folderSearch.data.files.length > 0) {
        folderId = folderSearch.data.files[0].id!;
        console.log('Found existing folder:', folderId);
      } else {
        console.log('Folder not found, creating...');
        // Create folder if it doesn't exist
        const folderMetadata = {
          name: 'Unidox',
          mimeType: 'application/vnd.google-apps.folder',
        };
        const folder = await drive.files.create({
          requestBody: folderMetadata,
          fields: 'id',
        });
        folderId = folder.data.id!;
        console.log('Created new folder:', folderId);
      }
    } catch (folderError) {
      console.error('Error finding/creating folder:', folderError);
      // Fallback to root if folder creation fails
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: folderId ? [folderId] : undefined,
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: 'id, webViewLink, webContentLink',
    });

    const { id, webViewLink } = driveResponse.data;

    if (!id || !webViewLink) {
      throw new Error('Failed to get file info from Google Drive');
    }

    // 4. Save metadata to DB
    const doc = await documentService.createDocument({
      nomFichier: file.name,
      type: DocumentType.AUTRE,
      urlStockage: webViewLink, // Store the Drive Link
      size: file.size,
      proprietaire: { connect: { id: userId } },
    });

    // 5. Mark onboarding as completed
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true },
    });

    revalidatePath('/documents');
    return { success: true, data: doc };
  } catch (error: any) {
    console.error('Upload error:', error);
    
    // Handle specific Google API errors
    if (error.code === 401 || error.message?.includes('refresh token') || error.message?.includes('invalid authentication')) {
      return { 
        success: false, 
        error: "Session Google Drive expirée ou incomplète. Veuillez retourner à l'étape précédente et relier votre compte." 
      };
    }

    return { success: false, error: error.message || 'Failed to upload document' };
  }
}

export async function uploadNewDocument(input: unknown): Promise<ActionResult<Document>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = CreateDocumentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const doc = await documentService.createDocument({
      ...parsed.data,
      proprietaire: { connect: { id: userId } },
    });
    revalidatePath('/documents');
    return { success: true, data: doc };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create document' };
  }
}

export async function changeDocumentStatus(
  documentId: string,
  statut: DocumentStatut
): Promise<ActionResult<Document>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  // Validate input manually or via schema if complex
  if (!Object.values(DocumentStatut).includes(statut)) {
    return { success: false, error: 'Invalid status' };
  }

  try {
    const doc = await documentService.updateDocumentStatus(documentId, userId, statut);
    revalidatePath('/documents');
    return { success: true, data: doc };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update status' };
  }
}

export async function removeDocument(documentId: string): Promise<ActionResult<Document>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const doc = await documentService.deleteDocument(documentId, userId);
    revalidatePath('/documents');
    return { success: true, data: doc };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete document' };
  }
}
