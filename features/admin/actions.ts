"use server";

import { auth } from "@/auth";
import { prisma } from "@/shared/config/prisma";
import { DemarcheCategorie, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createModeleDemarche(data: {
  titre: string;
  description?: string;
  typesDocumentsRequis: string[];
  categorie: DemarcheCategorie;
}) {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER)
  ) {
    throw new Error("Unauthorized");
  }

  try {
    const modele = await prisma.modeleDemarche.create({
      data: {
        ...data,
        createdById: session.user.id,
      },
    });

    revalidatePath("/admin/modele-demarche");
    return { success: true, data: modele };
  } catch (error) {
    console.error("Failed to create modele demarche:", error);
    return { success: false, error: "Failed to create model" };
  }
}

export async function getModeleDemarches() {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER)
  ) {
    throw new Error("Unauthorized");
  }

  try {
    const modeles = await prisma.modeleDemarche.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: modeles };
  } catch (error) {
    console.error("Failed to fetch modele demarches:", error);
    return { success: false, error: "Failed to fetch models" };
  }
}

export async function getModeleDemarcheById(id: string) {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER)
  ) {
    throw new Error("Unauthorized");
  }

  try {
    const modele = await prisma.modeleDemarche.findUnique({
      where: { id },
    });
    return { success: true, data: modele };
  } catch (error) {
    console.error("Failed to fetch modele demarche:", error);
    return { success: false, error: "Failed to fetch model" };
  }
}

export async function updateModeleDemarche(
  id: string,
  data: {
    titre?: string;
    description?: string;
    typesDocumentsRequis?: string[];
    categorie?: DemarcheCategorie;
    actif?: boolean;
  }
) {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER)
  ) {
    throw new Error("Unauthorized");
  }

  try {
    const modele = await prisma.modeleDemarche.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/modele-demarche");
    return { success: true, data: modele };
  } catch (error) {
    console.error("Failed to update modele demarche:", error);
    return { success: false, error: "Failed to update model" };
  }
}

export async function deleteModeleDemarche(id: string) {
  const session = await auth();

  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER)
  ) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.modeleDemarche.delete({
      where: { id },
    });

    revalidatePath("/admin/modele-demarche");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete modele demarche:", error);
    return { success: false, error: "Failed to delete model" };
  }
}
