'use server';

import { revalidatePath } from 'next/cache';
import { documentService } from './service';
import { CreateDocumentSchema, UpdateDocumentStatusSchema } from './model/schema.zod';
import { ActionResult } from '@/types/actions';
import { requireAuth } from '@/features/auth/server';
import { Document, DocumentStatut } from '@prisma/client';

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
