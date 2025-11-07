import { prisma } from '../../config/prisma';
import { Dossier, Prisma } from '@prisma/client';

class DossierService {
  async getUserDossiers(userId: string): Promise<Dossier[]> {
    return prisma.dossier.findMany({
      where: { idProprietaire: userId },
      include: {
        documents: { select: { id: true, nomFichier: true, type: true, statut: true, dateUpload: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDossierById(id: string, userId?: string): Promise<Dossier | null> {
    const where: Prisma.DossierWhereInput = { id } as any;
    if (userId) (where as any).idProprietaire = userId;

    return prisma.dossier.findFirst({
      where,
      include: {
        documents: true,
        proprietaire: { select: { id: true, nom: true, email: true } },
      },
    });
  }

  async createDossier(data: Prisma.DossierCreateInput): Promise<Dossier> {
    return prisma.dossier.create({ data, include: { documents: true } });
  }

  async updateDossier(id: string, userId: string, data: Prisma.DossierUpdateInput): Promise<Dossier> {
    return prisma.dossier.update({
      where: { id, idProprietaire: userId } as any,
      data,
      include: { documents: true },
    });
  }

  async deleteDossier(id: string, userId: string): Promise<Dossier> {
    return prisma.dossier.delete({ where: { id, idProprietaire: userId } as any });
  }

  async addDocuments(id: string, userId: string, documentIds: string[]): Promise<Dossier> {
    const dossier = await this.getDossierById(id, userId);
    if (!dossier) throw new Error('Dossier not found');

    const updatedDocumentIds = Array.from(new Set([...(dossier.idsDocuments || []), ...documentIds]));

    return prisma.dossier.update({
      where: { id, idProprietaire: userId } as any,
      data: {
        idsDocuments: updatedDocumentIds,
        documents: { connect: documentIds.map((docId) => ({ id: docId })) },
      },
      include: { documents: true },
    });
  }

  async removeDocuments(id: string, userId: string, documentIds: string[]): Promise<Dossier> {
    const dossier = await this.getDossierById(id, userId);
    if (!dossier) throw new Error('Dossier not found');

    const updatedDocumentIds = (dossier.idsDocuments || []).filter((docId: string) => !documentIds.includes(docId));

    return prisma.dossier.update({
      where: { id, idProprietaire: userId } as any,
      data: {
        idsDocuments: updatedDocumentIds,
        documents: { disconnect: documentIds.map((docId) => ({ id: docId })) },
      },
      include: { documents: true },
    });
  }

  async getDossierStats(userId: string) {
    const dossiers = await prisma.dossier.findMany({
      where: { idProprietaire: userId },
      include: { _count: { select: { documents: true } } },
    });

    return dossiers.map((d: any) => ({ ...d, documentCount: d._count.documents }));
  }
}

export const dossierService = new DossierService();
