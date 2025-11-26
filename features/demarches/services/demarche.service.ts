import { prisma } from '@/shared/config/prisma';
import { DemarcheStatut } from '@prisma/client';
import type { DemarcheListItem, DemarcheStats } from '../types/schemas';

export class DemarcheService {
  /**
   * Get all demarches for a user with populated modele data
   */
  async getUserDemarches(userId: string): Promise<DemarcheListItem[]> {
    const demarches = await prisma.demarcheUtilisateur.findMany({
      where: {
        idUtilisateur: userId,
      },
      include: {
        modele: true,
      },
      orderBy: {
        dateDebut: 'desc',
      },
    });

    return demarches.map((demarche) => ({
      id: demarche.id,
      titre: demarche.modele.titre,
      description: demarche.modele.description,
      statut: demarche.statut,
      categorie: demarche.modele.categorie,
      dateDebut: demarche.dateDebut,
      dateCompletion: demarche.dateCompletion,
      fileCount: 0, // TODO: Count documents when document linking is implemented
      complete: demarche.complete,
      typesDocumentsRequis: demarche.modele.typesDocumentsRequis,
    }));
  }

  /**
   * Get demarche statistics (counts by status)
   */
  async getDemarcheStats(userId: string): Promise<DemarcheStats> {
    const [total, enCours, complete, abandonnee] = await Promise.all([
      prisma.demarcheUtilisateur.count({
        where: { idUtilisateur: userId },
      }),
      prisma.demarcheUtilisateur.count({
        where: { idUtilisateur: userId, statut: DemarcheStatut.EN_COURS },
      }),
      prisma.demarcheUtilisateur.count({
        where: { idUtilisateur: userId, statut: DemarcheStatut.COMPLETE },
      }),
      prisma.demarcheUtilisateur.count({
        where: { idUtilisateur: userId, statut: DemarcheStatut.ABANDONNEE },
      }),
    ]);

    return { total, enCours, complete, abandonnee };
  }

  /**
   * Start a new demarche from a model
   */
  async startDemarche(userId: string, modeleId: string, notes?: string) {
    // Check if model exists and is active
    const modele = await prisma.modeleDemarche.findUnique({
      where: { id: modeleId },
    });

    if (!modele || !modele.actif) {
      throw new Error('Modèle de démarche introuvable ou inactif');
    }

    const demarche = await prisma.demarcheUtilisateur.create({
      data: {
        idUtilisateur: userId,
        idModele: modeleId,
        statut: DemarcheStatut.EN_COURS,
        notes,
      },
      include: {
        modele: true,
      },
    });

    return demarche;
  }

  /**
   * Update demarche status/completion
   */
  async updateDemarche(
    demarcheId: string,
    userId: string,
    data: {
      statut?: DemarcheStatut;
      notes?: string;
      complete?: boolean;
    }
  ) {
    // Verify ownership
    const existing = await prisma.demarcheUtilisateur.findUnique({
      where: { id: demarcheId },
    });

    if (!existing || existing.idUtilisateur !== userId) {
      throw new Error('Démarche introuvable ou accès non autorisé');
    }

    const updateData: any = { ...data };

    // If marking as complete, set completion date and status
    if (data.complete === true) {
      updateData.dateCompletion = new Date();
      updateData.statut = DemarcheStatut.COMPLETE;
    }

    const updated = await prisma.demarcheUtilisateur.update({
      where: { id: demarcheId },
      data: updateData,
      include: {
        modele: true,
      },
    });

    return updated;
  }

  /**
   * Get a single demarche by ID
   */
  async getDemarcheById(demarcheId: string, userId: string) {
    const demarche = await prisma.demarcheUtilisateur.findFirst({
      where: {
        id: demarcheId,
        idUtilisateur: userId,
      },
      include: {
        modele: true,
        utilisateur: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!demarche) {
      throw new Error('Démarche introuvable');
    }

    return demarche;
  }

  /**
   * Delete a demarche
   */
  async deleteDemarche(demarcheId: string, userId: string) {
    // Verify ownership
    const existing = await prisma.demarcheUtilisateur.findUnique({
      where: { id: demarcheId },
    });

    if (!existing || existing.idUtilisateur !== userId) {
      throw new Error('Démarche introuvable ou accès non autorisé');
    }

    await prisma.demarcheUtilisateur.delete({
      where: { id: demarcheId },
    });

    return { success: true };
  }
}

export const demarcheService = new DemarcheService();
