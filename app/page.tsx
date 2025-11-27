import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/config/prisma";
import { HomePageClient } from "./HomePageClient";
import { getHomeData } from "@/features/home/actions";
import { uploadDocumentFile } from "@/features/documents/actions";
import { revalidatePath } from "next/cache";

async function uploadDocumentsAction(formData: FormData) {
  "use server";
  const files = formData.getAll("files") as File[];
  
  for (const file of files) {
    const singleFileFormData = new FormData();
    singleFileFormData.append("file", file);
    await uploadDocumentFile(singleFileFormData);
  }

  revalidatePath("/");
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
      modeles={modeles}
      userDocuments={userDocuments}
      uploadDocumentsAction={uploadDocumentsAction}
    />
  );
}
