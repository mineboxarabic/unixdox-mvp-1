'use client';

import { useState } from 'react';
import { Box, Flex, Text, VStack, HStack, Spinner, Icon } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { LuSearch, LuFileText, LuClock, LuChevronRight } from 'react-icons/lu';
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
  const [isFocused, setIsFocused] = useState(false);

  // Show suggestions if search query exists OR input is focused
  // If no search query, limit to 5 "recent" (first 5) models
  const showSuggestions = searchQuery.length > 0 || isFocused;
  const displayModeles = searchQuery.length === 0 
    ? filteredModeles.slice(0, 5) 
    : filteredModeles;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Création d'un dossier de démarche</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={6} align="stretch">
          <VStack gap={1} align="start">
            <Text fontSize="sm" color="fg.muted">
              Recherchez la démarche voulue
            </Text>
            <Box position="relative" w="full">
              <Box
                position="absolute"
                left={3}
                top="50%"
                transform="translateY(-50%)"
                color={isFocused ? "primary.500" : "fg.subtle"}
                zIndex={1}
                transition="color 0.2s"
              >
                <LuSearch size={18} />
              </Box>
              <Input
                placeholder="Rechercher une démarche (ex: Kbis, Passeport...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                // Delay blur to allow click on items
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                style={{ paddingLeft: '2.8rem' }}
                size="lg"
                borderRadius="xl"
                bg="bg.subtle"
                borderWidth="1px"
                borderColor={isFocused ? "primary.500" : "transparent"}
                _focus={{
                  borderColor: "primary.500",
                  bg: "bg.surface",
                  boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                }}
              />
            </Box>
          </VStack>
          
          {/* Modeles list */}
          {showSuggestions && displayModeles.length > 0 && (
            <VStack gap={3} align="stretch">
              {!searchQuery && (
                <HStack gap={2} color="fg.muted" px={1}>
                  <LuClock size={14} />
                  <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
                    Suggestions récentes
                  </Text>
                </HStack>
              )}
              
              <VStack
                gap={2}
                align="stretch"
                maxH="300px"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': { width: '4px' },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { background: 'var(--chakra-colors-gray-200)', borderRadius: '4px' },
                }}
              >
                {displayModeles.map((modele) => (
                  <HStack
                    key={modele.id}
                    p={3}
                    bg="bg.surface"
                    borderRadius="lg"
                    cursor="pointer"
                    borderWidth="1px"
                    borderColor="border.subtle"
                    transition="all 0.2s"
                    _hover={{ 
                      borderColor: 'primary.300',
                      bg: 'primary.50',
                      transform: 'translateY(-1px)',
                      shadow: 'sm'
                    }}
                    onClick={() => onSelectModele(modele)}
                    justify="space-between"
                  >
                    <HStack gap={3}>
                      <Flex 
                        align="center" 
                        justify="center" 
                        w={10} 
                        h={10} 
                        borderRadius="full" 
                        bg="primary.100" 
                        color="primary.600"
                      >
                        <LuFileText size={20} />
                      </Flex>
                      <VStack align="start" gap={0}>
                        <Text fontWeight="semibold" color="fg.default">
                          {modele.titre}
                        </Text>
                        <HStack gap={2}>
                          <Text fontSize="xs" color="fg.muted">
                            {modele.categorie}
                          </Text>
                          <Text fontSize="xs" color="fg.subtle">•</Text>
                          <Text fontSize="xs" color="fg.muted">
                            {modele.typesDocumentsRequis.length} documents
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Icon color="fg.subtle" as={LuChevronRight} />
                  </HStack>
                ))}
              </VStack>
            </VStack>
          )}
          
          {isLoading && (
            <Flex justify="center" py={8}>
              <Spinner size="lg" color="primary.500" />
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
