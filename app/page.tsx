import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/config/prisma";
import { HomePage } from "@/features/home";
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

  const homeData = await getHomeData();

  return (
    <HomePage 
      data={homeData} 
      userRole={session.user.role} 
      uploadDocumentsAction={uploadDocumentsAction}
    />
  );
}
