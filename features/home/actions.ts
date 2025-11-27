"use server";

import { prisma } from "@/shared/config/prisma";
import { auth } from "@/shared/auth";
import type { HomeData } from "./types";

export async function getHomeData(): Promise<HomeData> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Get start of current month for automatic demarches count
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [user, documents, demarches, automaticDemarchesCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    }),
    prisma.document.findMany({
      where: { idProprietaire: session.user.id },
      orderBy: { dateUpload: "desc" },
      take: 5,
    }),
    prisma.demarcheUtilisateur.findMany({
      where: { idUtilisateur: session.user.id },
      orderBy: { dateDebut: "desc" },
      take: 5,
      include: {
        modele: {
          select: {
            titre: true,
          },
        },
      },
    }),
    // Count automatic demarches completed this month
    prisma.demarcheUtilisateur.count({
      where: {
        idUtilisateur: session.user.id,
        complete: true,
        dateCompletion: {
          gte: startOfMonth,
        },
      },
    }),
  ]);

  const isPremiumUser = user?.plan === "PREMIUM" || user?.plan === "ENTERPRISE";

  const recentDocuments = documents.map((doc) => ({
    id: doc.id,
    name: doc.nomFichier,
    type: doc.type,
    uploadedAt: doc.dateUpload,
    size: doc.size,
    status: doc.statut,
    tags: doc.tags,
    expirationDate: doc.dateExpiration,
    url: doc.urlStockage || undefined,
  }));

  const recentDemarches = demarches.map((demarche) => ({
    id: demarche.id,
    idUtilisateur: demarche.idUtilisateur,
    idModele: demarche.idModele,
    complete: demarche.complete,
    dateDebut: demarche.dateDebut,
    dateCompletion: demarche.dateCompletion,
    statut: demarche.statut,
    notes: demarche.notes,
    documentsAssocies: demarche.documentsAssocies,
    createdAt: demarche.createdAt,
    updatedAt: demarche.updatedAt,
    titre: demarche.titre,
    modele: {
      titre: demarche.modele.titre,
    },
  }));

  return {
    recentProcedures: [], // Keep mock for now as requested only for documents
    upcomingDeadlines: [], // Keep mock for now
    recentDocuments,
    recentDemarches,
    isPremiumUser,
    automaticDemarchesCount,
    automaticDemarchesTotal: 1, // This could be made dynamic based on user's plan
  };
}

