"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  EmptyState,
  Separator,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuFolder } from "react-icons/lu";
import type { Procedure } from "../../types";

export interface RecentProceduresCardProps {
  procedures: Procedure[];
  onViewAll?: () => void;
}

export function RecentProceduresCard({
  procedures,
  onViewAll,
}: RecentProceduresCardProps) {
  const getStatusBadgeProps = (status: Procedure["status"]) => {
    switch (status) {
      case "en-cours":
        return { colorScheme: "primary" as const, label: "En cours" };
      case "terminée":
        return { colorScheme: "success" as const, label: "Terminée" };
      case "en-attente":
        return { colorScheme: "warning" as const, label: "En attente" };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center" width="full">
          <Flex gap="3" alignItems="center">
            <LuFolder size={24} color="var(--chakra-colors-neutral-400)" />
            <Text fontSize="lg" fontWeight="semibold" color="text.fg">
              Démarches récentes
            </Text>
          </Flex>
          <Flex gap="1" fontSize="sm" color="text.fg.muted">
            <Text>Démarches automatiques ce mois ci :</Text>
            <Text fontWeight="medium" color="text.fg">
              0/1
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        {procedures.length === 0 ? (
          <EmptyState
            icon={<LuFolder color="var(--chakra-colors-neutral-400)" />}
            title=""
            description="Aucun dossier de démarches pour le moment"
          />
        ) : (
          <Flex direction="column" gap="0">
            {procedures.map((procedure, index) => {
              const statusProps = getStatusBadgeProps(procedure.status);
              return (
                <Box key={procedure.id}>
                  <Flex
                    py="3"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="4"
                  >
                    <Flex direction="column" gap="1" flex="1">
                      <Text fontSize="sm" fontWeight="medium" color="text.fg">
                        {procedure.title}
                      </Text>
                      <Text fontSize="xs" color="text.fg.muted">
                        {formatDate(procedure.date)}
                      </Text>
                    </Flex>
                    <Badge
                      colorScheme={statusProps.colorScheme}
                      variant="subtle"
                      size="sm"
                    >
                      {statusProps.label}
                    </Badge>
                  </Flex>
                  {index < procedures.length - 1 && <Separator />}
                </Box>
              );
            })}
          </Flex>
        )}
      </CardBody>
      {procedures.length > 0 && (
        <CardFooter>
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            Voir tout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
