'use client';

import { Box, Flex, Text, VStack, HStack, Spinner } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { LuSearch } from 'react-icons/lu';
import type { ModeleDemarche } from '@prisma/client';

interface SearchStepProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredModeles: ModeleDemarche[];
  isLoading: boolean;
  onSelectModele: (modele: ModeleDemarche) => void;
  onClose: () => void;
}

export function SearchStep({
  searchQuery,
  onSearchChange,
  filteredModeles,
  isLoading,
  onSelectModele,
  onClose,
}: SearchStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Création d'un dossier de démarche</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={4} align="stretch">
          <Text fontSize="sm" color="fg.muted">
            Recherchez la démarche voulue
          </Text>
          <Box position="relative">
            <Box
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="fg.subtle"
              zIndex={1}
            >
              <LuSearch size={16} />
            </Box>
            <Input
              placeholder="Rechercher une démarche"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
              size="md"
              borderRadius="full"
            />
          </Box>
          
          {/* Modeles list */}
          {searchQuery && filteredModeles.length > 0 && (
            <VStack
              gap={2}
              align="stretch"
              maxH="200px"
              overflowY="auto"
              bg="bg.muted"
              p={3}
              borderRadius="md"
            >
              {filteredModeles.map((modele) => (
                <Box
                  key={modele.id}
                  p={3}
                  bg="bg.surface"
                  borderRadius="md"
                  cursor="pointer"
                  _hover={{ bg: 'primary.50' }}
                  onClick={() => onSelectModele(modele)}
                >
                  <Text fontWeight="medium">{modele.titre}</Text>
                  {modele.description && (
                    <Text fontSize="sm" color="fg.muted" truncate>
                      {modele.description}
                    </Text>
                  )}
                  <HStack gap={2} mt={2}>
                    <Badge size="sm" colorScheme="primary">
                      {modele.categorie}
                    </Badge>
                    <Badge size="sm" colorScheme="neutral">
                      {modele.typesDocumentsRequis.length} documents requis
                    </Badge>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
          
          {isLoading && (
            <Flex justify="center" py={4}>
              <Spinner size="md" color="primary.500" />
            </Flex>
          )}
        </VStack>
      </DialogBody>
      <DialogFooter>
        <Flex gap={3} justify="flex-end" w="full">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </Flex>
      </DialogFooter>
    </>
  );
}
