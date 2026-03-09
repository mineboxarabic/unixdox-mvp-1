"use server";

import { auth } from "@/auth";
import { prisma } from "@/shared/config/prisma";
import { DemarcheCategorie, UserRole, SubscriptionPlan } from "@prisma/client";
import { revalidatePath } from "next/cache";

// ── Admin authorization helper ──
async function requireAdmin() {
  const session = await auth();
  if (
    !session?.user ||
    (session.user.role !== UserRole.ADMIN &&
      session.user.role !== UserRole.MANAGER)
  ) {
    throw new Error("Unauthorized");
  }
  return session;
}

// ── User management actions ──

export async function getUsers() {
  await requireAdmin();

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        plan: true,
        onboardingCompleted: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: users };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return { success: false, error: "Impossible de récupérer les utilisateurs" };
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  const session = await requireAdmin();

  // Only ADMIN can change roles (not MANAGER)
  if (session.user.role !== UserRole.ADMIN) {
    return { success: false, error: "Seuls les administrateurs peuvent modifier les rôles" };
  }

  // Prevent admin from changing their own role
  if (session.user.id === userId) {
    return { success: false, error: "Vous ne pouvez pas modifier votre propre rôle" };
  }

  // Validate role value
  if (!Object.values(UserRole).includes(role)) {
    return { success: false, error: "Rôle invalide" };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath("/admin/utilisateurs");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, error: "Impossible de mettre à jour le rôle" };
  }
}

export async function updateUserPlan(userId: string, plan: SubscriptionPlan) {
  const session = await requireAdmin();

  if (session.user.role !== UserRole.ADMIN) {
    return { success: false, error: "Seuls les administrateurs peuvent modifier les abonnements" };
  }

  if (!Object.values(SubscriptionPlan).includes(plan)) {
    return { success: false, error: "Plan invalide" };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { plan },
    });

    revalidatePath("/admin/utilisateurs");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user plan:", error);
    return { success: false, error: "Impossible de mettre à jour l'abonnement" };
  }
}

export async function updateUserOnboarding(userId: string, onboardingCompleted: boolean) {
  const session = await requireAdmin();

  if (session.user.role !== UserRole.ADMIN) {
    return { success: false, error: "Seuls les administrateurs peuvent modifier l'onboarding" };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted },
    });

    revalidatePath("/admin/utilisateurs");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user onboarding:", error);
    return { success: false, error: "Impossible de mettre à jour l'onboarding" };
  }
}

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
