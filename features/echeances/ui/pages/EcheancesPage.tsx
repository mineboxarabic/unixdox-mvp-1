'use client';

import { useState, useMemo } from 'react';
import { Box, HStack, Input, Text, VStack, Flex, Button } from '@chakra-ui/react';
import { FiClock, FiSearch } from 'react-icons/fi';
import { LuCrown, LuLock } from 'react-icons/lu';
import { PageLayout } from '@/shared/components/PageLayout';
import { EcheanceGrid } from '../components/EcheanceGrid';
import { EcheancesFilters } from '../components/EcheancesFilters';
import type { Echeance } from '../../types';
import { EcheanceStatut } from '../../types';

interface EcheancesPageProps {
    echeances: Echeance[];
    isPremium: boolean;
    isLoading?: boolean;
}

/**
 * Premium upgrade prompt component
 * Shown to non-premium users
 */
function PremiumUpgradePrompt() {
    return (
        <VStack
            py={16}
            px={8}
            gap={6}
            bg="neutral.50"
            borderRadius="xl"
            border="1px solid"
            borderColor="neutral.200"
            maxW="600px"
            mx="auto"
        >
            <Box
                p={4}
                bg="yellow.100"
                borderRadius="full"
            >
                <LuCrown size={40} color="#D97706" />
            </Box>

            <VStack gap={2}>
                <Flex align="center" gap={2}>
                    <LuLock size={20} color="var(--chakra-colors-neutral-500)" />
                    <Text fontSize="xl" fontWeight="semibold" color="text.fg">
                        Fonctionnalité Premium
                    </Text>
                </Flex>

                <Text fontSize="md" color="text.fg.muted" textAlign="center" maxW="450px">
                    Le suivi des échéances est une fonctionnalité réservée aux utilisateurs Premium.
                    Passez à Premium pour accéder à cette fonctionnalité et bien plus encore.
                </Text>
            </VStack>

            <VStack gap={3} w="full" maxW="300px">
                <Button
                    size="lg"
                    bg="primary.600"
                    color="white"
                    borderRadius="full"
                    w="full"
                    _hover={{ bg: 'primary.500' }}
                >
                    <Flex align="center" gap={2}>
                        <LuCrown size={18} />
                        <Text>Passer à Premium</Text>
                    </Flex>
                </Button>

                <Text fontSize="xs" color="neutral.500" textAlign="center">
                    Stockage illimité, classement IA, et échéances
                </Text>
            </VStack>
        </VStack>
    );
}

/**
 * EcheancesPage component
 * Displays all document deadlines with filtering and search
 * Shows upgrade prompt for non-premium users
 */
export function EcheancesPage({ echeances, isPremium, isLoading }: EcheancesPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<EcheanceStatut | 'all'>('all');

    // Filter echeances based on search and status filter
    const filteredEcheances = useMemo(() => {
        let filtered = echeances;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((e) =>
                e.nomFichier.toLowerCase().includes(query)
            );
        }

        // Apply status filter
        if (activeFilter !== 'all') {
            filtered = filtered.filter((e) => e.statut === activeFilter);
        }

        return filtered;
    }, [echeances, searchQuery, activeFilter]);

    return (
        <PageLayout
            title="Échéances"
            icon={<FiClock size={24} color="var(--chakra-colors-primary-600)" />}
            headerLeft={
                <HStack gap={2} fontSize="sm" color="fg.muted">
                    <Text>Échéances</Text>
                    <Text>&gt;</Text>
                    <Text fontWeight="medium" color="fg.default">
                        Mes échéances
                    </Text>
                </HStack>
            }
            headerCenter={
                isPremium ? (
                    <Box position="relative" width="full">
                        <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
                            <FiSearch size={18} color="gray" />
                        </Box>
                        <Input
                            placeholder="Rechercher une échéance..."
                            pl={10}
                            size="md"
                            bg="bg.surface"
                            border="1px"
                            borderColor="border.default"
                            borderRadius="lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>
                ) : null
            }
        >
            {isPremium ? (
                <VStack align="stretch" gap={6}>
                    {/* Filters */}
                    <Flex justify="center">
                        <EcheancesFilters
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                    </Flex>

                    {/* Grid */}
                    <EcheanceGrid
                        echeances={filteredEcheances}
                        isLoading={isLoading}
                    />
                </VStack>
            ) : (
                <PremiumUpgradePrompt />
            )}
        </PageLayout>
    );
}
