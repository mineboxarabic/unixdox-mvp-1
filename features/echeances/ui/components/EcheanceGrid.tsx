'use client';

import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { EcheanceCard } from './EcheanceCard';
import type { Echeance } from '../../types';
import { LuCalendarOff } from 'react-icons/lu';

interface EcheanceGridProps {
    echeances: Echeance[];
    isLoading?: boolean;
}

/**
 * Loading skeleton for the echeances grid
 */
function EcheancesGridSkeleton() {
    return (
        <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
            gap={6}
            width="100%"
        >
            {[...Array(10)].map((_, i) => (
                <Box
                    key={i}
                    width="100%"
                    height="180px"
                    bg="white"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="border.muted"
                    p={4}
                >
                    <VStack align="start" gap={3} height="full">
                        <Skeleton height="36px" width="36px" borderRadius="md" />
                        <Skeleton height="16px" width="60%" />
                        <Skeleton height="20px" width="80%" />
                        <Skeleton height="14px" width="40%" />
                        <Box mt="auto" width="full">
                            <Skeleton height="28px" width="50%" borderRadius="full" />
                        </Box>
                    </VStack>
                </Box>
            ))}
        </SimpleGrid>
    );
}

/**
 * Empty state when no echeances are found
 */
function EmptyState() {
    return (
        <VStack
            py={20}
            px={6}
            gap={4}
            bg="neutral.50"
            borderRadius="lg"
            border="1px dashed"
            borderColor="neutral.200"
        >
            <Box
                p={4}
                bg="neutral.100"
                borderRadius="full"
            >
                <LuCalendarOff size={32} color="var(--chakra-colors-neutral-400)" />
            </Box>
            <Text fontSize="lg" fontWeight="medium" color="neutral.600">
                Aucune échéance trouvée
            </Text>
            <Text fontSize="sm" color="neutral.500" textAlign="center" maxW="400px">
                Vos documents avec des dates d'expiration apparaîtront ici.
                Ajoutez une date d'expiration à vos documents pour suivre vos échéances.
            </Text>
        </VStack>
    );
}

/**
 * EcheanceGrid component
 * Displays a responsive grid of EcheanceCards with loading and empty states
 */
export function EcheanceGrid({ echeances, isLoading }: EcheanceGridProps) {
    if (isLoading) {
        return <EcheancesGridSkeleton />;
    }

    if (!echeances || echeances.length === 0) {
        return <EmptyState />;
    }

    return (
        <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
            gap={6}
            width="100%"
            justifyItems="start"
        >
            {echeances.map((echeance) => (
                <EcheanceCard key={echeance.id} echeance={echeance} />
            ))}
        </SimpleGrid>
    );
}
