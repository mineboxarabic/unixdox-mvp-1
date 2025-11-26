import { prisma } from "@/shared/config/prisma";
import type { SearchDocument, SearchDemarche } from "../types";

export const searchService = {
  async getRecentDocuments(userId: string, limit: number = 5): Promise<SearchDocument[]> {
    const documents = await prisma.document.findMany({
      where: {
        idProprietaire: userId,
      },
      select: {
        id: true,
        nomFichier: true,
        type: true,
        statut: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: limit,
    });

    return documents;
  },

  async getRecentDemarches(userId: string, limit: number = 5): Promise<SearchDemarche[]> {
    const demarches = await prisma.demarcheUtilisateur.findMany({
      where: {
        idUtilisateur: userId,
      },
      select: {
        id: true,
        statut: true,
        updatedAt: true,
        modele: {
          select: {
            titre: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: limit,
    });

    return demarches.map((d) => ({
      id: d.id,
      titre: d.modele.titre,
      statut: d.statut,
      updatedAt: d.updatedAt,
    }));
  },
};
