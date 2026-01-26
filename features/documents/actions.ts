'use server';

import { revalidatePath } from 'next/cache';
import { documentService } from './services/document.service';
import { storageService } from './services/storage.service';
import { CreateDocumentSchema, UpdateDocumentStatusSchema, UpdateDocumentDetailsSchema } from './types/schemas';
import { ActionResult } from '@/shared/types/actions';
import { isGoogleAuthError, AUTH_ERROR_MESSAGES, getAIErrorCode, getAIErrorMessage } from '@/shared/utils/errors';
import { requireAuth } from '@/shared/auth/server';
import { Document, DocumentStatut, DocumentType, ExtractionStatus } from '@prisma/client';
import { google } from 'googleapis';
import { prisma } from '@/shared/config/prisma';
import { aiService } from './services/ai.service';
import { fileNamingService } from '@/shared/utils/file-naming.service';

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
    const { id: storageId, webViewLink, thumbnailLink } = await storageService.uploadFile(auth, file);

    // 4. Save metadata to DB
    let doc = await documentService.createDocument({
      nomFichier: file.name,
      type: DocumentType.AUTRE,
      urlStockage: webViewLink, // Store the Drive Link
      storageId: storageId,
      size: file.size,
      proprietaire: { connect: { id: userId } },
      extractionStatus: ExtractionStatus.PENDING,
      metadata: thumbnailLink ? { thumbnailLink } : undefined,
    });

    // 5. AI Extraction
    let aiExtractionWarning: string | undefined;
    let aiExtractionWarningCode: string | undefined;
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      console.log('Starting AI extraction for file:', file.name);
      const extractionResult = await aiService.extractDocumentMetadata(
        buffer,
        file.type,
        DocumentType.AUTRE
      );
      console.log('AI Extraction Result:', extractionResult);

      // Update document with extracted metadata
      doc = await prisma.document.update({
        where: { id: doc.id },
        data: {
          extractionStatus: ExtractionStatus.COMPLETED,
          metadata: {
            ...(doc.metadata as object),
            ...(extractionResult.metadata || {})
          },
          dateExpiration: extractionResult.dateExpiration,
          tags: extractionResult.tags,
          type: extractionResult.type || DocumentType.AUTRE,
          statut: DocumentStatut.VERIFIE, // Auto-verify if AI succeeds
        },
        include: { proprietaire: { select: { id: true, name: true, email: true } } },
      });

      // 6. Generate intelligent file name and rename in Google Drive
      try {
        const fileExtension = fileNamingService.getFileExtension(file.name);
        const baseFileName = fileNamingService.generateFileName({
          type: extractionResult.type || DocumentType.AUTRE,
          metadata: extractionResult.metadata,
          originalFileName: file.name,
          dateExpiration: extractionResult.dateExpiration,
          tags: extractionResult.tags,
        }, fileExtension);

        // Check for existing filenames in the database for this user
        const existingDocs = await prisma.document.findMany({
          where: { idProprietaire: userId },
          select: { nomFichier: true },
        });
        const existingFileNames = existingDocs.map(d => d.nomFichier);

        // Generate unique filename (appends _2, _3, etc. if duplicate)
        const uniqueFileName = fileNamingService.generateUniqueFileName(
          baseFileName,
          existingFileNames
        );

        console.log('Renaming file from', file.name, 'to', uniqueFileName);

        // Rename the file in Google Drive
        const { webViewLink: newWebViewLink } = await storageService.renameFile(
          auth,
          storageId,
          uniqueFileName
        );

        // Update document with new filename and URL
        doc = await prisma.document.update({
          where: { id: doc.id },
          data: {
            nomFichier: uniqueFileName,
            urlStockage: newWebViewLink,
          },
          include: { proprietaire: { select: { id: true, name: true, email: true } } },
        });

        console.log('File successfully renamed to:', uniqueFileName);
      } catch (renameError: unknown) {
        const errorMessage = renameError instanceof Error ? renameError.message : 'Unknown error';
        console.error('File rename failed (non-critical):', errorMessage);
        // Continue - renaming is nice to have but not critical
      }
    } catch (aiError: unknown) {
      // Use centralized AI error handling for user-friendly messages
      aiExtractionWarningCode = getAIErrorCode(aiError);
      aiExtractionWarning = getAIErrorMessage(aiError);
      console.error('AI Extraction failed:', aiError instanceof Error ? aiError.message : 'Unknown error', '| Error Code:', aiExtractionWarningCode);
      doc = await prisma.document.update({
        where: { id: doc.id },
        data: {
          extractionStatus: ExtractionStatus.FAILED,
          extractionError: aiExtractionWarning,
        },
        include: { proprietaire: { select: { id: true, name: true, email: true } } },
      });
    }

    // 7. Mark onboarding as completed
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true },
    });

    revalidatePath('/documents');
    return {
      success: true,
      data: doc,
      warning: aiExtractionWarning,
      warningCode: aiExtractionWarningCode,
    };
  } catch (error: any) {
    console.error('Upload error:', error);

    // Handle Google OAuth errors requiring re-authentication
    if (isGoogleAuthError(error)) {
      return {
        success: false,
        error: AUTH_ERROR_MESSAGES.REAUTH_REQUIRED,
        requiresReauth: true,
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

export async function removeDocument(documentId: string, deleteFromDrive: boolean = false): Promise<ActionResult<Document>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    if (deleteFromDrive) {
      const docToDelete = await documentService.getDocumentById(documentId, userId);

      if (docToDelete?.storageId) {
        // 1. Get the user's Google Account tokens
        const account = await prisma.account.findFirst({
          where: {
            userId,
            provider: 'google',
          },
        });

        if (account && account.access_token) {
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

          if (account.expires_at && account.refresh_token) {
            credentials.expiry_date = account.expires_at * 1000;
          }

          auth.setCredentials(credentials);

          // 3. Delete from Drive
          await storageService.deleteFile(auth, docToDelete.storageId);
        }
      }
    }

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

/**
 * Get all documents for the current user
 */
export async function getUserDocumentsAction(): Promise<ActionResult<Document[]>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const documents = await documentService.getUserDocuments(userId);
    return { success: true, data: documents };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch documents' };
  }
}

/**
 * Match user documents to required document types using exact matching + AI fallback
 */
export async function matchDocumentsToRequirementsAction(
  requiredTypes: string[]
): Promise<ActionResult<{
  matches: Record<string, string>;
  missing: string[];
  replacements: Record<string, { docId: string; reason: string }>;
}>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    // Get user's documents
    const userDocuments = await documentService.getUserDocuments(userId);

    // Simplify documents for AI processing
    const simplifiedDocs = userDocuments.map(doc => ({
      id: doc.id,
      type: doc.type,
      tags: doc.tags || [],
      nomFichier: doc.nomFichier,
      metadata: doc.metadata,
    }));

    // Run matching algorithm
    const result = await aiService.matchDocumentsToRequirements(requiredTypes, simplifiedDocs);

    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error matching documents:', error);
    return { success: false, error: error.message || 'Failed to match documents' };
  }
}
