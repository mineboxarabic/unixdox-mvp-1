'use server';

import { revalidatePath } from 'next/cache';
import { dossierService } from './services/dossier.service';
import { CreateDossierSchema, DossierUpdateSchema, DossierAddRemoveDocumentsSchema } from './types/schemas';
import { ActionResult } from '@/types/actions';
import { requireAuth } from '@/features/auth/server';
import { Dossier } from '@prisma/client';

export async function createNewDossier(input: unknown): Promise<ActionResult<Dossier>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = CreateDossierSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const dossier = await dossierService.createDossier({
      ...parsed.data,
      proprietaire: { connect: { id: userId } },
    });
    revalidatePath('/dossiers');
    return { success: true, data: dossier };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create dossier' };
  }
}

export async function updateDossier(id: string, input: unknown): Promise<ActionResult<Dossier>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = DossierUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const dossier = await dossierService.updateDossier(id, userId, parsed.data);
    revalidatePath('/dossiers');
    return { success: true, data: dossier };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update dossier' };
  }
}

export async function deleteDossier(id: string): Promise<ActionResult<Dossier>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const dossier = await dossierService.deleteDossier(id, userId);
    revalidatePath('/dossiers');
    return { success: true, data: dossier };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete dossier' };
  }
}

export async function addDocumentsToDossier(id: string, input: unknown): Promise<ActionResult<Dossier>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = DossierAddRemoveDocumentsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const dossier = await dossierService.addDocuments(id, userId, parsed.data.documentIds);
    revalidatePath('/dossiers');
    return { success: true, data: dossier };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to add documents' };
  }
}

export async function removeDocumentsFromDossier(id: string, input: unknown): Promise<ActionResult<Dossier>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = DossierAddRemoveDocumentsSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const dossier = await dossierService.removeDocuments(id, userId, parsed.data.documentIds);
    revalidatePath('/dossiers');
    return { success: true, data: dossier };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to remove documents' };
  }
}
