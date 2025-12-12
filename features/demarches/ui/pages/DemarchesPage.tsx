'use client';

import { Box, HStack, Input, Text, Flex } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { DemarcheGrid } from '../components/DemarcheGrid';
import type { DemarcheListItem } from '../../types/schemas';
import { FiFolder, FiPlus, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { PageLayout } from '@/shared/components/PageLayout';

interface DemarchesPageProps {
  demarches: DemarcheListItem[];
  isLoading?: boolean;
  onCreateDemarche?: () => void;
}

export function DemarchesPage({ demarches, isLoading, onCreateDemarche }: DemarchesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter demarches based on search query
  const filteredDemarches = demarches.filter((demarche) =>
    demarche.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Démarches"
      icon={<FiFolder size={24} color="var(--chakra-colors-primary-600)" />}
      headerLeft={
        <HStack gap={2} fontSize="sm" color="fg.muted">
          <Text>Démarches</Text>
          <Text>&gt;</Text>
          <Text fontWeight="medium" color="fg.default">
            Nom de la démarche
          </Text>
        </HStack>
      }
      headerCenter={
        <Box position="relative" width="full">
          <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
            <FiSearch size={18} color="gray" />
          </Box>
          <Input
            placeholder="Recherchez un fichier, une démarche..."
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
      }
      action={
        <Button
          size="md"
          bg="primary.600"
          color="white"
          borderRadius="full"
          _hover={{ bg: 'primary.500' }}
          onClick={onCreateDemarche}
        >
          <Flex align="center" gap={2}>
            <FiPlus />
            <Text>Commencer une démarche</Text>
          </Flex>
        </Button>
      }
    >
      <DemarcheGrid demarches={filteredDemarches} isLoading={isLoading} />
    </PageLayout>
  );
}
