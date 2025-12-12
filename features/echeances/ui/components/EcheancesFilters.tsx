'use client';

import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { EcheanceStatut } from '../../types';

interface EcheancesFiltersProps {
    activeFilter: EcheanceStatut | 'all';
    onFilterChange: (filter: EcheanceStatut | 'all') => void;
}

/**
 * Filter configuration for each status type
 */
const filterOptions: { value: EcheanceStatut | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'Tout', color: 'neutral.600' },
    { value: EcheanceStatut.EXPIRE, label: 'Expirés', color: 'red.500' },
    { value: EcheanceStatut.URGENT, label: 'Urgents', color: 'orange.500' },
    { value: EcheanceStatut.PROCHE, label: 'Proches', color: 'yellow.600' },
    { value: EcheanceStatut.A_VENIR, label: 'À venir', color: 'green.500' },
];

/**
 * EcheancesFilters component
 * Filter buttons for filtering echeances by status
 */
export function EcheancesFilters({ activeFilter, onFilterChange }: EcheancesFiltersProps) {
    return (
        <Flex
            gap={2}
            flexWrap="wrap"
            justify="center"
            p={2}
            bg="bg.surface"
            borderRadius="xl"
            border="1px solid"
            borderColor="border.default"
        >
            {filterOptions.map((option) => {
                const isActive = activeFilter === option.value;

                return (
                    <Box
                        key={option.value}
                        as="button"
                        px={4}
                        py={2}
                        borderRadius="lg"
                        bg={isActive ? 'primary.50' : 'transparent'}
                        border="1px solid"
                        borderColor={isActive ? 'primary.200' : 'transparent'}
                        cursor="pointer"
                        transition="all 0.2s"
                        _hover={{
                            bg: isActive ? 'primary.100' : 'bg.muted',
                        }}
                        onClick={() => onFilterChange(option.value)}
                    >
                        <Flex align="center" gap={2}>
                            {option.value !== 'all' && (
                                <Box
                                    w={2}
                                    h={2}
                                    borderRadius="full"
                                    bg={option.color}
                                />
                            )}
                            <Text
                                fontSize="sm"
                                fontWeight={isActive ? 'medium' : 'normal'}
                                color={isActive ? 'primary.700' : 'text.fg.muted'}
                            >
                                {option.label}
                            </Text>
                        </Flex>
                    </Box>
                );
            })}
        </Flex>
    );
}
