import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/config/prisma";
import { HomePageClient } from "./HomePageClient";
import { getHomeData } from "@/features/home/actions";
import { uploadDocumentFile } from "@/features/documents/actions";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/shared/types/actions";
import type { Document } from "@prisma/client";

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

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingCompleted: true },
  });

  if (!user?.onboardingCompleted) {
    redirect("/register");
  }

  // Fetch all data in parallel
  const [homeData, modeles, userDocuments] = await Promise.all([
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
