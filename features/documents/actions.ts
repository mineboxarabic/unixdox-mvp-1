'use server';

import { revalidatePath } from 'next/cache';
import { documentService } from './services/document.service';
import { storageService } from './services/storage.service';
import { CreateDocumentSchema, UpdateDocumentStatusSchema, UpdateDocumentDetailsSchema } from './types/schemas';
import { ActionResult } from '@/shared/types/actions';
import { requireAuth } from '@/shared/auth/server';
import { Document, DocumentStatut, DocumentType, ExtractionStatus } from '@prisma/client';
import { google } from 'googleapis';
import { prisma } from '@/shared/config/prisma';
import { aiService } from './services/ai.service';

export async function updateDocumentDetails(
  documentId: string,
  data: unknown
): Promise<ActionResult<Document>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = UpdateDocumentDetailsSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    if (parsed.data.tags && parsed.data.tags.length > 0) {
      await Promise.all(
        parsed.data.tags.map((tagName) =>
          prisma.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
          })
        )
      );
    }

    const doc = await documentService.updateDocument(documentId, userId, parsed.data);
    revalidatePath('/documents');
    return { success: true, data: doc };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update document details' };
  }
}

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
    const { webViewLink } = await storageService.uploadFile(auth, file);

    // 4. Save metadata to DB
    let doc = await documentService.createDocument({
      nomFichier: file.name,
      type: DocumentType.AUTRE,
      urlStockage: webViewLink, // Store the Drive Link
      size: file.size,
      proprietaire: { connect: { id: userId } },
      extractionStatus: ExtractionStatus.PENDING,
    });

    // 5. AI Extraction
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      console.log('Starting AI extraction for file:', file.name);
      const extractionResult = await aiService.extractDocumentMetadata(
        buffer,
        file.type,
        DocumentType.AUTRE
      );
      console.log('AI Extraction Result:', extractionResult);

      doc = await prisma.document.update({
        where: { id: doc.id },
        data: {
          extractionStatus: ExtractionStatus.COMPLETED,
          metadata: extractionResult.metadata || {},
          dateExpiration: extractionResult.dateExpiration,
          tags: extractionResult.tags,
          type: extractionResult.type || DocumentType.AUTRE,
          statut: DocumentStatut.VERIFIE, // Auto-verify if AI succeeds
        },
        include: { proprietaire: { select: { id: true, name: true, email: true } } },
      });
    } catch (aiError: any) {
      console.error('AI Extraction failed:', aiError);
      doc = await prisma.document.update({
        where: { id: doc.id },
        data: {
          extractionStatus: ExtractionStatus.FAILED,
          extractionError: aiError.message || 'Unknown error',
        },
        include: { proprietaire: { select: { id: true, name: true, email: true } } },
      });
    }

    // 6. Mark onboarding as completed
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

export async function getTags(): Promise<string[]> {
  const tags = await prisma.tag.findMany({
    select: { name: true },
    orderBy: { name: 'asc' },
  });
  return tags.map((t) => t.name);
}
