'use server';

import { auth } from '@/shared/auth';
import { demarcheService } from './services/demarche.service';
import { StartDemarcheSchema, UpdateDemarcheSchema } from './types/schemas';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/shared/config/prisma';

/**
 * Get all demarches for the current user
 */
export async function getUserDemarchesAction() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Non authentifié' };
    }

    const demarches = await demarcheService.getUserDemarches(session.user.id);
    
    return { success: true, data: demarches };
  } catch (error) {
    console.error('Error fetching user demarches:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur lors de la récupération des démarches' 
    };
  }
}

/**
 * Get demarche statistics for the current user
 */
export async function getDemarcheStatsAction() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Non authentifié' };
    }

    const stats = await demarcheService.getDemarcheStats(session.user.id);
    
    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching demarche stats:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur lors de la récupération des statistiques' 
    };
  }
}

/**
 * Start a new demarche from a model
 */
export async function startNewDemarcheAction(formData: FormData) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Non authentifié' };
    }

    const rawData = {
      modeleId: formData.get('modeleId') as string,
      notes: formData.get('notes') || undefined, // Convert null to undefined
    };

    const validatedData = StartDemarcheSchema.parse(rawData);

    // Parse documents from formData
    const documentsJson = formData.get('documents') as string;
    const documents = documentsJson ? JSON.parse(documentsJson) : undefined;

    const demarche = await demarcheService.startDemarche(
      session.user.id,
      validatedData.modeleId,
      validatedData.notes,
      documents
    );

    revalidatePath('/demarches');
    
    return { success: true, data: demarche };
  } catch (error) {
    console.error('Error starting demarche:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur lors de la création de la démarche' 
    };
  }
}

/**
 * Update demarche status
 */
export async function updateDemarcheStatusAction(
  demarcheId: string,
  formData: FormData
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Non authentifié' };
    }

    const rawData = {
      statut: formData.get('statut') as string | undefined,
      notes: formData.get('notes') as string | undefined,
      complete: formData.get('complete') === 'true',
    };

    const validatedData = UpdateDemarcheSchema.parse(rawData);

    const updated = await demarcheService.updateDemarche(
      demarcheId,
      session.user.id,
      validatedData
    );

    revalidatePath('/demarches');
    revalidatePath(`/demarches/${demarcheId}`);
    
    return { success: true, data: updated };
  } catch (error) {
    console.error('Error updating demarche:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour de la démarche' 
    };
  }
}

/**
 * Get available procedure models for starting new demarches
 */
export async function getAvailableModelesAction() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Non authentifié' };
    }

    const modeles = await prisma.modeleDemarche.findMany({
      where: {
        actif: true,
      },
      orderBy: {
        ordre: 'asc',
      },
    });
    
    return { success: true, data: modeles };
  } catch (error) {
    console.error('Error fetching available modeles:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur lors de la récupération des modèles' 
    };
  }
}

/**
 * Delete a demarche
 */
export async function deleteDemarcheAction(demarcheId: string) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { success: false, error: 'Non authentifié' };
    }

    await demarcheService.deleteDemarche(demarcheId, session.user.id);

    revalidatePath('/demarches');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting demarche:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur lors de la suppression de la démarche' 
    };
  }
}
