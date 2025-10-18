import { prisma } from '../config/prisma';
import { Dossier, Prisma } from '@prisma/client';

export class DossierService {
  /**
   * Get all dossiers for a user
   */
  async getUserDossiers(userId: string): Promise<Dossier[]> {
    return prisma.dossier.findMany({
      where: { idProprietaire: userId },
      include: {
        documents: {
          select: {
            id: true,
            nomFichier: true,
            type: true,
            statut: true,
            dateUpload: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get dossier by ID
   */
  async getDossierById(id: string, userId?: string): Promise<Dossier | null> {
    const where: Prisma.DossierWhereInput = { id };
    if (userId) {
      where.idProprietaire = userId;
    }

    return prisma.dossier.findFirst({
      where,
      include: {
        documents: true,
        proprietaire: {
          select: {
            id: true,
            nom: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Create new dossier
   */
  async createDossier(data: Prisma.DossierCreateInput): Promise<Dossier> {
    return prisma.dossier.create({
      data,
      include: {
        documents: true,
      },
    });
  }

  /**
   * Update dossier
   */
  async updateDossier(id: string, userId: string, data: Prisma.DossierUpdateInput): Promise<Dossier> {
    return prisma.dossier.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data,
      include: {
        documents: true,
      },
    });
  }

  /**
   * Delete dossier
   */
  async deleteDossier(id: string, userId: string): Promise<Dossier> {
    return prisma.dossier.delete({
      where: { 
        id,
        idProprietaire: userId,
      },
    });
  }

  /**
   * Add documents to dossier
   */
  async addDocuments(id: string, userId: string, documentIds: string[]): Promise<Dossier> {
    const dossier = await this.getDossierById(id, userId);
    if (!dossier) throw new Error('Dossier not found');

    const updatedDocumentIds = [...new Set([...dossier.idsDocuments, ...documentIds])];

    return prisma.dossier.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data: { 
        idsDocuments: updatedDocumentIds,
        documents: {
          connect: documentIds.map(docId => ({ id: docId })),
        },
      },
      include: {
        documents: true,
      },
    });
  }

  /**
   * Remove documents from dossier
   */
  async removeDocuments(id: string, userId: string, documentIds: string[]): Promise<Dossier> {
    const dossier = await this.getDossierById(id, userId);
    if (!dossier) throw new Error('Dossier not found');

    const updatedDocumentIds = dossier.idsDocuments.filter(docId => !documentIds.includes(docId));

    return prisma.dossier.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data: { 
        idsDocuments: updatedDocumentIds,
        documents: {
          disconnect: documentIds.map(docId => ({ id: docId })),
        },
      },
      include: {
        documents: true,
      },
    });
  }

  /**
   * Get dossier with document count
   */
  async getDossierStats(userId: string) {
    const dossiers = await prisma.dossier.findMany({
      where: { idProprietaire: userId },
      include: {
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    return dossiers.map(dossier => ({
      ...dossier,
      documentCount: dossier._count.documents,
    }));
  }
}

export const dossierService = new DossierService();
