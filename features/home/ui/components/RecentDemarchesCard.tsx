"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
    EmptyState,
    Separator,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { LuFolder, LuFolderPlus, LuExternalLink } from "react-icons/lu";
import type { DemarcheUtilisateur } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export interface RecentDemarchesCardProps {
    demarches: Array<DemarcheUtilisateur & { modele: { titre: string } }>;
    onViewAll?: () => void;
    onCreateDemarche?: () => void;
    onViewDetail?: (demarcheId: string) => void;
}

/**
 * Dossiers récents card — shows recent dossiers/demarches
 * Matches Figma v3.0: white bg, neutral.200 border, rounded 2xl, h=277px
 */
export function RecentDemarchesCard({
    demarches,
    onViewAll,
    onCreateDemarche,
    onViewDetail,
}: RecentDemarchesCardProps) {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays < 30) {
            return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
        }

        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="neutral.200"
            borderRadius="2xl"
            p="4"
            h="277px"
            overflow="hidden"
            display="flex"
            flexDirection="column"
        >
            {/* Card header */}
            <Flex gap="2" alignItems="center" pb="3">
                <LuFolder size={20} color="var(--chakra-colors-gray-500)" />
                <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                    Dossiers récents
                </Text>
            </Flex>

            {/* Card body */}
            <Box flex="1" overflow="auto">
                {demarches.length === 0 ? (
                    <EmptyState
                        icon={<LuFolder size={48} />}
                        description="Aucun dossier pour le moment"
                        action={
                            <Button
                                size="sm"
                                colorPalette="blue"
                                borderRadius="full"
                                onClick={onCreateDemarche}
                            >
                                <LuFolderPlus size={16} />
                                Commencez une démarche
                            </Button>
                        }
                    />
                ) : (
                    <Flex direction="column" gap="0">
                        {demarches.map((demarche, index) => (
                            <Box key={demarche.id}>
                                <Flex
                                    py="2.5"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    gap="3"
                                >
                                    <Flex direction="column" gap="0.5" flex="1" minW={0}>
                                        <Flex alignItems="center" gap="2">
                                            <Text fontSize="sm" fontWeight="medium" color="gray.800" truncate>
                                                {demarche.titre || demarche.modele.titre}
                                            </Text>
                                            {demarche.complete && (
                                                <Badge colorScheme="success" size="sm">
                                                    Complétée
                                                </Badge>
                                            )}
                                        </Flex>
                                        <Text fontSize="xs" color="gray.500">
                                            {formatDate(demarche.dateDebut)}
                                        </Text>
                                    </Flex>
                                    <Button
                                        variant="outline"
                                        size="xs"
                                        onClick={() => onViewDetail?.(demarche.id)}
                                    >
                                        <LuExternalLink size={12} />
                                        Détail
                                    </Button>
                                </Flex>
                                {index < demarches.length - 1 && <Separator />}
                            </Box>
                        ))}
                    </Flex>
                )}
            </Box>

            {/* Footer — view all link */}
            {demarches.length > 0 && (
                <Flex pt="2" justifyContent="flex-end">
                    <Button variant="ghost" size="xs" onClick={onViewAll}>
                        Voir tout
                    </Button>
                </Flex>
            )}
        </Box>
    );
}
