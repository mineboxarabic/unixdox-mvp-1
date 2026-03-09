"use client";

import { useState, useTransition } from "react";
import {
  HStack,
  Text,
  Table,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValueText,
} from "@/shared/components/ui/select";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "@/shared/components/ui/dialog";
import { toaster } from "@/shared/components/ui/toaster";
import { UserRole, SubscriptionPlan } from "@prisma/client";

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole;
  plan: SubscriptionPlan;
  onboardingCompleted: boolean;
  createdAt: Date;
}

// Maps for display labels
const ROLE_LABELS: Record<UserRole, string> = {
  USER: "Utilisateur",
  MANAGER: "Manager",
  ADMIN: "Administrateur",
};

const PLAN_LABELS: Record<SubscriptionPlan, string> = {
  FREE: "Gratuit",
  BASIC: "Basic",
  PREMIUM: "Premium",
  ENTERPRISE: "Enterprise",
};

const ROLE_COLORS: Record<UserRole, "neutral" | "primary" | "danger"> = {
  USER: "neutral",
  MANAGER: "primary",
  ADMIN: "danger",
};

const PLAN_COLORS: Record<SubscriptionPlan, "neutral" | "primary" | "accent" | "warning"> = {
  FREE: "neutral",
  BASIC: "primary",
  PREMIUM: "accent",
  ENTERPRISE: "warning",
};

interface UserManagementTableProps {
  users: AdminUser[];
  currentUserId: string;
  updateUserRole: (userId: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  updateUserPlan: (userId: string, plan: SubscriptionPlan) => Promise<{ success: boolean; error?: string }>;
  updateUserOnboarding: (userId: string, onboardingCompleted: boolean) => Promise<{ success: boolean; error?: string }>;
}

export function UserManagementTable({
  users,
  currentUserId,
  updateUserRole,
  updateUserPlan,
  updateUserOnboarding,
}: UserManagementTableProps) {
  const [isPending, startTransition] = useTransition();
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  const handleRoleChange = (userId: string, details: { value: string[] }) => {
    const role = details.value[0] as UserRole;
    if (!role) return;

    setPendingUserId(userId);
    startTransition(async () => {
      const result = await updateUserRole(userId, role);
      if (result.success) {
        toaster.create({
          title: "Succès",
          description: "Rôle mis à jour avec succès",
          type: "success",
        });
      } else {
        toaster.create({
          title: "Erreur",
          description: result.error || "Échec de la mise à jour",
          type: "error",
        });
      }
      setPendingUserId(null);
    });
  };

  const handlePlanChange = (userId: string, details: { value: string[] }) => {
    const plan = details.value[0] as SubscriptionPlan;
    if (!plan) return;

    setPendingUserId(userId);
    startTransition(async () => {
      const result = await updateUserPlan(userId, plan);
      if (result.success) {
        toaster.create({
          title: "Succès",
          description: "Abonnement mis à jour avec succès",
          type: "success",
        });
      } else {
        toaster.create({
          title: "Erreur",
          description: result.error || "Échec de la mise à jour",
          type: "error",
        });
      }
      setPendingUserId(null);
    });
  };

  const handleOnboardingToggle = (userId: string, currentValue: boolean) => {
    setPendingUserId(userId);
    startTransition(async () => {
      const result = await updateUserOnboarding(userId, !currentValue);
      if (result.success) {
        toaster.create({
          title: "Succès",
          description: `Onboarding ${!currentValue ? "complété" : "réinitialisé"}`,
          type: "success",
        });
      } else {
        toaster.create({
          title: "Erreur",
          description: result.error || "Échec de la mise à jour",
          type: "error",
        });
      }
      setPendingUserId(null);
    });
  };

  const roleCollection = createListCollection({
    items: Object.values(UserRole).map((r) => ({
      label: ROLE_LABELS[r],
      value: r,
    })),
  });

  const planCollection = createListCollection({
    items: Object.values(SubscriptionPlan).map((p) => ({
      label: PLAN_LABELS[p],
      value: p,
    })),
  });

  return (
    <Table.Root variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Utilisateur</Table.ColumnHeader>
          <Table.ColumnHeader>Rôle</Table.ColumnHeader>
          <Table.ColumnHeader>Abonnement</Table.ColumnHeader>
          <Table.ColumnHeader>Inscription</Table.ColumnHeader>
          <Table.ColumnHeader>Date de création</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => {
          const isCurrentUser = user.id === currentUserId;
          const isLoading = isPending && pendingUserId === user.id;

          return (
            <Table.Row key={user.id}>
              {/* User info */}
              <Table.Cell>
                <VStack align="start" gap={0}>
                  <HStack>
                    <Text fontWeight="medium">
                      {user.name || "Sans nom"}
                    </Text>
                    {isCurrentUser && (
                      <Badge colorScheme="primary" size="sm">Vous</Badge>
                    )}
                  </HStack>
                  <Text fontSize="sm" color="fg.muted">{user.email || "—"}</Text>
                </VStack>
              </Table.Cell>

              {/* Role selector */}
              <Table.Cell>
                {isCurrentUser ? (
                  <Badge colorScheme={ROLE_COLORS[user.role]}>
                    {ROLE_LABELS[user.role]}
                  </Badge>
                ) : (
                  <SelectRoot
                    collection={roleCollection}
                    value={[user.role]}
                    onValueChange={(details) => handleRoleChange(user.id, details)}
                    size="sm"
                    width="160px"
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleCollection.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              </Table.Cell>

              {/* Plan selector */}
              <Table.Cell>
                {isCurrentUser ? (
                  <Badge colorScheme={PLAN_COLORS[user.plan]}>
                    {PLAN_LABELS[user.plan]}
                  </Badge>
                ) : (
                  <SelectRoot
                    collection={planCollection}
                    value={[user.plan]}
                    onValueChange={(details) => handlePlanChange(user.id, details)}
                    size="sm"
                    width="160px"
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {planCollection.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              </Table.Cell>

              {/* Onboarding status */}
              <Table.Cell>
                {isCurrentUser ? (
                  <Badge colorScheme={user.onboardingCompleted ? "success" : "warning"}>
                    {user.onboardingCompleted ? "Complété" : "En cours"}
                  </Badge>
                ) : (
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        colorPalette={user.onboardingCompleted ? "green" : "red"}
                        disabled={isLoading}
                      >
                        {user.onboardingCompleted ? "Complété" : "En cours"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier l&apos;inscription</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Text>
                          {user.onboardingCompleted
                            ? `Réinitialiser l'inscription de ${user.name || user.email} ? L'utilisateur devra refaire les étapes d'inscription.`
                            : `Marquer l'inscription de ${user.name || user.email} comme complétée ?`}
                        </Text>
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Annuler</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                          <Button
                            colorPalette={user.onboardingCompleted ? "red" : "green"}
                            onClick={() => handleOnboardingToggle(user.id, user.onboardingCompleted)}
                            loading={isLoading}
                          >
                            {user.onboardingCompleted ? "Réinitialiser" : "Compléter"}
                          </Button>
                        </DialogActionTrigger>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                )}
              </Table.Cell>

              {/* Created at */}
              <Table.Cell>
                <Text fontSize="sm" color="fg.muted">
                  {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                </Text>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
