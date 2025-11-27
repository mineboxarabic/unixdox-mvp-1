"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    EmptyState,
    Separator,
} from "@/shared/components/ui";
import { Button } from "@/shared/components/ui/button";
import { LuFolder, LuFolderPlus, LuExternalLink } from "react-icons/lu";
import type { DemarcheUtilisateur } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export interface RecentDemarchesCardProps {
    demarches: Array<DemarcheUtilisateur & { modele: { titre: string } }>;
    automaticDemarchesCount?: number;
    automaticDemarchesTotal?: number;
    onViewAll?: () => void;
    onCreateDemarche?: () => void;
    onViewDetail?: (demarcheId: string) => void;
}

export function RecentDemarchesCard({
    demarches,
    automaticDemarchesCount = 0,
    automaticDemarchesTotal = 1,
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
                            {automaticDemarchesCount}/{automaticDemarchesTotal}
                        </Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                {demarches.length === 0 ? (
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
                                description="Aucune démarche pour le moment"
                                action={
                                    <Button
                                        size="lg"
                                        colorPalette="blue"
                                        onClick={onCreateDemarche}
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
                        {demarches.map((demarche, index) => {
                            return (
                                <Box key={demarche.id}>
                                    <Flex
                                        py="3"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        gap="4"
                                    >
                                        <Flex direction="column" gap="1" flex="1">
                                            <Text fontSize="sm" fontWeight="medium" color="text.fg">
                                                {demarche.titre || demarche.modele.titre}
                                            </Text>
                                            <Text fontSize="xs" color="text.fg.muted">
                                                {formatDate(demarche.dateDebut)}
                                            </Text>
                                        </Flex>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onViewDetail?.(demarche.id)}
                                            rightIcon={<LuExternalLink size={14} />}
                                        >
                                            Voir le détail
                                        </Button>
                                    </Flex>
                                    {index < demarches.length - 1 && <Separator />}
                                </Box>
                            );
                        })}
                    </Flex>
                )}
            </CardBody>
            {demarches.length > 0 && (
                <CardFooter>
                    <Button variant="ghost" size="sm" onClick={onViewAll}>
                        Voir tout
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
