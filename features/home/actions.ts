"use server";

import { prisma } from "@/shared/config/prisma";
import { auth } from "@/shared/auth";
import type { HomeData } from "./types";

export async function getHomeData(): Promise<HomeData> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const [user, documents] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    }),
    prisma.document.findMany({
      where: { idProprietaire: session.user.id },
      orderBy: { dateUpload: "desc" },
      take: 5,
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

  return {
    recentProcedures: [], // Keep mock for now as requested only for documents
    upcomingDeadlines: [], // Keep mock for now
    recentDocuments,
    isPremiumUser,
  };
}

