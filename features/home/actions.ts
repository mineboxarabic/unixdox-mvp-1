"use server";

import { prisma } from "@/shared/config/prisma";
import { auth } from "@/shared/auth";
import type { HomeData } from "./types";

export async function getHomeData(): Promise<HomeData> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // TODO: Implement real data fetching
  // This is a placeholder that returns mock data
  // Replace with actual database queries when procedures, deadlines, and documents are implemented

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });

  const isPremiumUser = user?.plan === "PREMIUM" || user?.plan === "ENTERPRISE";

  return {
    recentProcedures: [],
    upcomingDeadlines: [],
    recentDocuments: [],
    isPremiumUser,
  };
}
