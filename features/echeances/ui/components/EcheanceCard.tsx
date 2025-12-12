'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { LuFileText, LuCalendar, LuTriangleAlert, LuClock, LuCircleCheck } from 'react-icons/lu';
import Link from 'next/link';
import type { Echeance } from '../../types';
import { EcheanceStatut } from '../../types';

interface EcheanceCardProps {
    echeance: Echeance;
}

/**
 * Get status configuration based on echeance status
 * Returns color, icon, and label for the status
 */
function getStatutConfig(statut: EcheanceStatut) {
    switch (statut) {
        case EcheanceStatut.EXPIRE:
            return {
                color: 'red.500',
                bgColor: 'red.50',
                borderColor: 'red.200',
                icon: LuTriangleAlert,
                label: 'Expiré',
            };
        case EcheanceStatut.URGENT:
            return {
                color: 'orange.500',
                bgColor: 'orange.50',
                borderColor: 'orange.200',
                icon: LuTriangleAlert,
                label: 'Urgent',
            };
        case EcheanceStatut.PROCHE:
            return {
                color: 'yellow.600',
                bgColor: 'yellow.50',
                borderColor: 'yellow.200',
                icon: LuClock,
                label: 'Proche',
            };
        case EcheanceStatut.A_VENIR:
            return {
                color: 'green.500',
                bgColor: 'green.50',
                borderColor: 'green.200',
                icon: LuCircleCheck,
                label: 'À venir',
            };
    }
}

/**
 * Format document type for display
 */
function formatDocumentType(type: string): string {
    return type
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * EcheanceCard component
 * Displays a document with its expiration date and urgency status
 */
export function EcheanceCard({ echeance }: EcheanceCardProps) {
    const config = getStatutConfig(echeance.statut);
    const StatusIcon = config.icon;

    // Calculate days text
    const getDaysText = () => {
        if (echeance.joursRestants < 0) {
            return `Expiré depuis ${Math.abs(echeance.joursRestants)} jour${Math.abs(echeance.joursRestants) > 1 ? 's' : ''}`;
        }
        if (echeance.joursRestants === 0) {
            return "Expire aujourd'hui";
        }
        if (echeance.joursRestants === 1) {
            return 'Expire demain';
        }
        return `${echeance.joursRestants} jours restants`;
    };

    return (
        <Link href={`/documents?id=${echeance.id}`} style={{ width: '100%' }}>
            <Box
                bg="white"
                borderRadius="lg"
                border="1px solid"
                borderColor="border.default"
                p={4}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                    borderColor: config.color,
                    shadow: 'md',
                    transform: 'translateY(-2px)',
                }}
            >
                <VStack align="stretch" gap={3}>
                    {/* Document Icon and Type */}
                    <Flex align="center" gap={2}>
                        <Box
                            p={2}
                            bg="primary.50"
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <LuFileText size={18} color="var(--chakra-colors-primary-600)" />
                        </Box>
                        <Text fontSize="xs" color="text.fg.muted" textTransform="capitalize">
                            {formatDocumentType(echeance.type)}
                        </Text>
                    </Flex>

                    {/* Document Name */}
                    <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="text.fg"
                        lineClamp={2}
                        title={echeance.nomFichier}
                    >
                        {echeance.nomFichier}
                    </Text>

                    {/* Expiration Date */}
                    <Flex align="center" gap={1.5}>
                        <LuCalendar size={14} color="var(--chakra-colors-neutral-500)" />
                        <Text fontSize="xs" color="text.fg.muted">
                            {formatDate(echeance.dateExpiration)}
                        </Text>
                    </Flex>

                    {/* Status Badge */}
                    <Flex
                        align="center"
                        gap={1.5}
                        px={2.5}
                        py={1.5}
                        bg={config.bgColor}
                        borderRadius="full"
                        border="1px solid"
                        borderColor={config.borderColor}
                        w="fit-content"
                    >
                        <StatusIcon size={14} color={`var(--chakra-colors-${config.color.replace('.', '-')})`} />
                        <Text fontSize="xs" fontWeight="medium" color={config.color}>
                            {getDaysText()}
                        </Text>
                    </Flex>
                </VStack>
            </Box>
        </Link>
    );
}
