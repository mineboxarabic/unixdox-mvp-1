'use client';

import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { DemarcheCard } from './DemarcheCard';
import type { DemarcheListItem } from '../../types/schemas';

interface DemarcheGridProps {
  demarches: DemarcheListItem[];
  isLoading?: boolean;
}

export function DemarcheGrid({ demarches, isLoading }: DemarcheGridProps) {
  if (isLoading) {
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
            height="160px"
            bg="white"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="border.muted"
            p={4}
          >
            <VStack align="start" gap={3} height="full">
              <Skeleton height="20px" width="70%" />
              <Skeleton height="16px" width="40%" />
              <Box mt="auto" width="full">
                <Skeleton height="24px" width="100%" borderRadius="full" />
              </Box>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  if (!demarches || demarches.length === 0) {
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
        <Text fontSize="lg" fontWeight="medium" color="neutral.600">
          Aucune démarche trouvée
        </Text>
        <Text fontSize="sm" color="neutral.500" textAlign="center">
          Commencez une nouvelle démarche pour organiser vos documents administratifs
        </Text>
      </VStack>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
      gap={6}
      width="100%"
      justifyItems="start"
    >
      {demarches.map((demarche) => (
        <DemarcheCard
          key={demarche.id}
          id={demarche.id}
          titre={demarche.titre}
          statut={demarche.statut}
          fileCount={demarche.fileCount}
          dateDebut={demarche.dateDebut}
          dateCompletion={demarche.dateCompletion}
        />
      ))}
    </SimpleGrid>
  );
}
