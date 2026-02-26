import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/config/prisma";
import { HomePageClient } from "./HomePageClient";
import { getHomeData } from "@/features/home/actions";
import { uploadDocumentFile } from "@/features/documents/actions";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/shared/types/actions";
import type { Document } from "@prisma/client";
import type { HomeData } from "@/features/home/types";
import { isPrismaConnectivityError } from "@/shared/utils/prisma-errors";

type UploadResult = {
  results: ActionResult<Document>[];
  hasReauthError: boolean;
};

async function uploadDocumentsAction(formData: FormData): Promise<UploadResult> {
  "use server";
  const files = formData.getAll("files") as File[];
  const results: ActionResult<Document>[] = [];
  let hasReauthError = false;
  
  for (const file of files) {
    const singleFileFormData = new FormData();
    singleFileFormData.append("file", file);
    const result = await uploadDocumentFile(singleFileFormData);
    results.push(result);
    
    // Check if any result requires reauth
    if (!result.success && result.requiresReauth) {
      hasReauthError = true;
      break; // Stop processing more files if reauth is needed
    }
  }

  revalidatePath("/");
  return { results, hasReauthError };
}

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/register");
  }

  let onboardingCompleted: boolean | null = null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { onboardingCompleted: true },
    });

    onboardingCompleted = user?.onboardingCompleted ?? false;
  } catch (error) {
    if (isPrismaConnectivityError(error)) {
      console.warn("Onboarding status unavailable: database is temporarily unreachable.");
    } else {
      throw error;
    }
  }

  if (onboardingCompleted === false) {
    redirect("/register");
  }

  // Fetch all data in parallel
  const [homeDataResult, modelesResult, userDocumentsResult] = await Promise.allSettled([
    getHomeData(),
    prisma.modeleDemarche.findMany({
      where: { actif: true },
      orderBy: { ordre: 'asc' },
    }),
    prisma.document.findMany({
      where: { idProprietaire: session.user.id },
      orderBy: { dateUpload: 'desc' },
    }),
  ]);

  const fallbackHomeData: HomeData = {
    recentProcedures: [],
    upcomingDeadlines: [],
    recentDocuments: [],
    recentDemarches: [],
    isPremiumUser: false,
    automaticDemarchesCount: 0,
    automaticDemarchesTotal: 3,
  };

  let homeData: HomeData;
  if (homeDataResult.status === 'fulfilled') {
    homeData = homeDataResult.value;
  } else if (isPrismaConnectivityError(homeDataResult.reason)) {
    console.warn("Home data unavailable: database is temporarily unreachable.");
    homeData = fallbackHomeData;
  } else {
    throw homeDataResult.reason;
  }

  let modeles: Awaited<ReturnType<typeof prisma.modeleDemarche.findMany>>;
  if (modelesResult.status === 'fulfilled') {
    modeles = modelesResult.value;
  } else if (isPrismaConnectivityError(modelesResult.reason)) {
    console.warn("Model templates unavailable: database is temporarily unreachable.");
    modeles = [];
  } else {
    throw modelesResult.reason;
  }

  let userDocuments: Awaited<ReturnType<typeof prisma.document.findMany>>;
  if (userDocumentsResult.status === 'fulfilled') {
    userDocuments = userDocumentsResult.value;
  } else if (isPrismaConnectivityError(userDocumentsResult.reason)) {
    console.warn("User documents unavailable: database is temporarily unreachable.");
    userDocuments = [];
  } else {
    throw userDocumentsResult.reason;
  }

  return (
    <HomePageClient 
      data={homeData} 
      userRole={session.user.role}
      userEmail={session.user.email ?? undefined}
      modeles={modeles}
      userDocuments={userDocuments}
      uploadDocumentsAction={uploadDocumentsAction}
    />
  );
}
