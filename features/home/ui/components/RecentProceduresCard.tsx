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
import { LuFolder, LuFolderPlus } from "react-icons/lu";
import type { Procedure } from "../../types";
import { ProcedureStatusBadge } from "@/shared/components/procedures/ProcedureStatusBadge";
import { formatDate } from "@/shared/utils/date";

export interface RecentProceduresCardProps {
  procedures: Procedure[];
  onViewAll?: () => void;
  onCreateProcedure?: () => void;
}

export function RecentProceduresCard({
  procedures,
  onViewAll,
  onCreateProcedure,
}: RecentProceduresCardProps) {
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
          <Box position="relative" overflow="hidden" minH="300px" mx="-6" mb="-6" px="6" pb="6">
            {/* Wave/Mountain Gradient Background */}
            <Box
              position="absolute"
              left="50%"
              bottom="0"
              transform="translateX(-50%)"
              width="500px"
              height="300px"
              bgGradient="radial-gradient(ellipse 500px 300px at 50% 100%, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.12) 30%, rgba(59, 130, 246, 0.06) 50%, transparent 75%)"
              filter="blur(50px)"
              pointerEvents="none"
              zIndex="0"
            />
            <Box position="relative" zIndex="1">
              <EmptyState
                icon={<LuFolder size={64} />}
                description="Aucun dossier pour le moment"
                action={
                  <Button
                    size="lg"
                    colorPalette="blue"
                    onClick={onCreateProcedure}
                  >
                    <LuFolderPlus size={18} />
                    Commencez une démarche
                  </Button>
                }
              />
            </Box>
          </Box>
        ) : (
          <Flex direction="column" gap="0">
            {procedures.map((procedure, index) => {
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
                    <ProcedureStatusBadge status={procedure.status} />
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
