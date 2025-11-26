'use client';

import { Box, Container, Flex, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { DemarcheGrid } from '../components/DemarcheGrid';
import type { DemarcheListItem } from '../../types/schemas';
import { FiFolder, FiPlus, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

interface DemarchesPageProps {
  demarches: DemarcheListItem[];
  isLoading?: boolean;
}

export function DemarchesPage({ demarches, isLoading }: DemarchesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter demarches based on search query
  const filteredDemarches = demarches.filter((demarche) =>
    demarche.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100%" minH="100vh" bg="bg.canvas">
      {/* Pre-header with breadcrumb and search */}
      <Box
        position="sticky"
        top={0}
        bg="bg.canvas"
        borderBottom="1px"
        borderColor="border.muted"
        zIndex={10}
        px={8}
        py={4}
      >
        <Flex justify="center" align="center" gap={8}>
          {/* Breadcrumb */}
          <Box>
            <HStack gap={2} fontSize="sm" color="fg.muted">
              <Text>Démarches</Text>
              <Text>&gt;</Text>
              <Text fontWeight="medium" color="fg.default">
                Nom de la démarche
              </Text>
            </HStack>
          </Box>

          {/* Search Bar */}
          <Box position="relative" width="700px">
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
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="1200px" py={8} px={8}>
        <VStack align="stretch" gap={6}>
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack gap={3}>
              <Box
                p={2}
                bg="primary.50"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiFolder size={24} color="var(--chakra-colors-primary-600)" />
              </Box>
              <Heading size="lg" fontWeight="semibold" color="fg.default">
                Démarches
              </Heading>
            </HStack>

            <Button
              size="md"
              bg="primary.600"
              color="white"
              borderRadius="full"
              _hover={{ bg: 'primary.500' }}
              onClick={() => {
                // TODO: Open modal to select demarche model
                console.log('Start new demarche');
              }}
            >
              <Flex align="center" gap={2}>
                <FiPlus />
                <Text>Commencer une démarche</Text>
              </Flex>
            </Button>
          </Flex>

          {/* Grid */}
          <Box py={6}>
            <DemarcheGrid demarches={filteredDemarches} isLoading={isLoading} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
