'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  SimpleGrid,
  Input,
  IconButton,
  Progress,
} from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  FiArrowLeft,
  FiFolder,
  FiSearch,
  FiFile,
  FiCheck,
  FiAlertCircle,
  FiClock,
  FiTrash2,
  FiEdit2,
  FiPlus,
} from 'react-icons/fi';
import { LuFileText } from 'react-icons/lu';
import Link from 'next/link';
import { DemarcheStatut, DemarcheCategorie, Document } from '@prisma/client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { deleteDemarcheAction, updateDemarcheStatusAction } from '../../actions';

interface DemarcheViewPageProps {
  demarche: {
    id: string;
    dateDebut: Date;
    dateCompletion: Date | null;
    statut: DemarcheStatut;
    notes: string | null;
    complete: boolean;
    documentsAssocies: Record<string, string> | null;
    modele: {
      id: string;
      titre: string;
      description: string | null;
      typesDocumentsRequis: string[];
      categorie: DemarcheCategorie;
    };
    utilisateur: {
      id: string;
      name: string | null;
      email: string | null;
    };
  };
  userDocuments: Document[];
}

export function DemarcheViewPage({ demarche, userDocuments }: DemarcheViewPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Get the documents associated with this demarche
  const documentsAssocies = demarche.documentsAssocies || {};

  // Calculate progress
  const totalRequired = demarche.modele.typesDocumentsRequis.length;
  const completedDocs = Object.keys(documentsAssocies).length;
  const progress = totalRequired > 0 ? (completedDocs / totalRequired) * 100 : 0;

  // Get status badge info
  const getStatusBadge = () => {
    switch (demarche.statut) {
      case DemarcheStatut.EN_COURS:
        return { label: 'En cours', colorScheme: 'primary' as const, icon: FiClock };
      case DemarcheStatut.COMPLETE:
        return { label: 'Complète', colorScheme: 'success' as const, icon: FiCheck };
      case DemarcheStatut.ABANDONNEE:
        return { label: 'Abandonnée', colorScheme: 'warning' as const, icon: FiAlertCircle };
      default:
        return { label: 'En cours', colorScheme: 'neutral' as const, icon: FiClock };
    }
  };

  const getCategoryBadge = () => {
    const categoryLabels: Record<DemarcheCategorie, string> = {
      ADMINISTRATIF: 'Administratif',
      FINANCIER: 'Financier',
      JURIDIQUE: 'Juridique',
      PERSONNEL: 'Personnel',
      AUTRE: 'Autre',
    };
    return categoryLabels[demarche.modele.categorie] || 'Autre';
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;

  // Get document by ID
  const getDocumentById = (docId: string) => {
    return userDocuments.find((d) => d.id === docId);
  };

  // Handle delete
  const handleDelete = useCallback(async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette démarche ?')) return;

    setIsDeleting(true);
    try {
      const result = await deleteDemarcheAction(demarche.id);
      if (result.success) {
        router.push('/demarches');
      } else {
        alert(result.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      alert('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
    }
  }, [demarche.id, router]);

  // Handle mark as complete
  const handleMarkComplete = useCallback(async () => {
    const formData = new FormData();
    formData.append('complete', 'true');

    const result = await updateDemarcheStatusAction(demarche.id, formData);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la mise à jour');
    }
  }, [demarche.id, router]);

  // Filter required documents based on search
  const filteredRequirements = demarche.modele.typesDocumentsRequis.filter((req) =>
    req.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link href="/demarches">
                <Text _hover={{ color: 'primary.600' }} cursor="pointer">
                  Démarches
                </Text>
              </Link>
              <Text>&gt;</Text>
              <Text fontWeight="medium" color="fg.default">
                {demarche.modele.titre}
              </Text>
            </HStack>
          </Box>

          {/* Search Bar */}
          <Box position="relative" width="700px">
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch size={18} color="gray" />
            </Box>
            <Input
              placeholder="Rechercher un document requis..."
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
        <VStack align="stretch" gap={8}>
          {/* Back Button and Header */}
          <Flex justify="space-between" align="flex-start">
            <VStack align="flex-start" gap={4}>
              <Link href="/demarches">
                <Button variant="ghost" size="sm">
                  <FiArrowLeft />
                  <Text ml={2}>Retour aux démarches</Text>
                </Button>
              </Link>

              <HStack gap={3}>
                <Box
                  p={2}
                  bg="primary.50"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FiFolder size={28} color="var(--chakra-colors-primary-600)" />
                </Box>
                <VStack align="flex-start" gap={1}>
                  <Heading size="xl" fontWeight="semibold" color="fg.default">
                    {demarche.modele.titre}
                  </Heading>
                  <HStack gap={2}>
                    <Badge variant="subtle" colorScheme={statusBadge.colorScheme}>
                      <HStack gap={1}>
                        <StatusIcon size={12} />
                        <Text>{statusBadge.label}</Text>
                      </HStack>
                    </Badge>
                    <Badge variant="outline" colorScheme="neutral">
                      {getCategoryBadge()}
                    </Badge>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>

            {/* Action Buttons */}
            <HStack gap={2}>
              {demarche.statut === DemarcheStatut.EN_COURS && (
                <Button
                  size="md"
                  bg="primary.600"
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: 'primary.500' }}
                  onClick={handleMarkComplete}
                  disabled={completedDocs < totalRequired}
                >
                  <FiCheck />
                  <Text ml={2}>Marquer comme complète</Text>
                </Button>
              )}
              <IconButton
                aria-label="Supprimer"
                variant="outline"
                size="md"
                borderRadius="full"
                onClick={handleDelete}
                loading={isDeleting}
              >
                <FiTrash2 />
              </IconButton>
            </HStack>
          </Flex>

          {/* Progress Section */}
          <Box
            bg="bg.surface"
            border="1px"
            borderColor="border.default"
            borderRadius="xl"
            p={6}
          >
            <VStack align="stretch" gap={4}>
              <Flex justify="space-between" align="center">
                <Text fontWeight="medium" color="fg.default">
                  Progression des documents
                </Text>
                <Text fontSize="sm" color="fg.muted">
                  {completedDocs} / {totalRequired} documents
                </Text>
              </Flex>
              <Progress.Root value={progress} size="sm" borderRadius="full">
                <Progress.Track bg="neutral.100">
                  <Progress.Range bg={progress === 100 ? 'green.500' : 'primary.500'} />
                </Progress.Track>
              </Progress.Root>
            </VStack>
          </Box>

          {/* Description */}
          {demarche.modele.description && (
            <Box
              bg="bg.surface"
              border="1px"
              borderColor="border.default"
              borderRadius="xl"
              p={6}
            >
              <VStack align="stretch" gap={2}>
                <Text fontWeight="medium" color="fg.default">
                  Description
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  {demarche.modele.description}
                </Text>
              </VStack>
            </Box>
          )}

          {/* Notes */}
          {demarche.notes && (
            <Box
              bg="bg.surface"
              border="1px"
              borderColor="border.default"
              borderRadius="xl"
              p={6}
            >
              <VStack align="stretch" gap={2}>
                <Text fontWeight="medium" color="fg.default">
                  Notes
                </Text>
                <Text color="fg.muted" fontSize="sm">
                  {demarche.notes}
                </Text>
              </VStack>
            </Box>
          )}

          {/* Dates Info */}
          <Box
            bg="bg.surface"
            border="1px"
            borderColor="border.default"
            borderRadius="xl"
            p={6}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <VStack align="flex-start" gap={1}>
                <Text fontSize="sm" color="fg.muted">
                  Date de début
                </Text>
                <Text fontWeight="medium" color="fg.default">
                  {new Date(demarche.dateDebut).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
              </VStack>
              {demarche.dateCompletion && (
                <VStack align="flex-start" gap={1}>
                  <Text fontSize="sm" color="fg.muted">
                    Date de complétion
                  </Text>
                  <Text fontWeight="medium" color="fg.default">
                    {new Date(demarche.dateCompletion).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                </VStack>
              )}
            </SimpleGrid>
          </Box>

          {/* Required Documents Section */}
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <HStack gap={2}>
                <FiFile size={20} color="var(--chakra-colors-primary-600)" />
                <Text fontSize="lg" fontWeight="semibold" color="fg.default">
                  Documents requis
                </Text>
              </HStack>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {filteredRequirements.map((requirement, index) => {
                const associatedDocId = documentsAssocies[requirement];
                const associatedDoc = associatedDocId
                  ? getDocumentById(associatedDocId)
                  : null;
                const isComplete = !!associatedDoc;

                return (
                  <Box
                    key={index}
                    bg="bg.surface"
                    border="1px"
                    borderColor={isComplete ? 'green.200' : 'border.default'}
                    borderRadius="xl"
                    p={4}
                    transition="all 0.2s"
                    _hover={{
                      boxShadow: 'md',
                      borderColor: isComplete ? 'green.300' : 'primary.200',
                    }}
                  >
                    <Flex justify="space-between" align="flex-start" gap={3}>
                      <HStack align="flex-start" gap={3}>
                        <Box
                          p={2}
                          bg={isComplete ? 'green.50' : 'neutral.100'}
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {isComplete ? (
                            <FiCheck size={20} color="var(--chakra-colors-green-600)" />
                          ) : (
                            <LuFileText size={20} color="var(--chakra-colors-neutral-500)" />
                          )}
                        </Box>
                        <VStack align="flex-start" gap={1}>
                          <Text fontWeight="medium" color="fg.default" fontSize="sm">
                            {requirement}
                          </Text>
                          {associatedDoc ? (
                            <Text fontSize="xs" color="green.600">
                              {associatedDoc.nomFichier}
                            </Text>
                          ) : (
                            <Text fontSize="xs" color="fg.muted">
                              Document non fourni
                            </Text>
                          )}
                        </VStack>
                      </HStack>

                      {isComplete && (
                        <Badge variant="subtle" colorScheme="success" size="sm">
                          Fourni
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                );
              })}
            </SimpleGrid>

            {filteredRequirements.length === 0 && (
              <Box
                bg="bg.surface"
                border="1px"
                borderColor="border.default"
                borderRadius="xl"
                p={8}
                textAlign="center"
              >
                <Text color="fg.muted">
                  {searchQuery
                    ? 'Aucun document requis ne correspond à votre recherche'
                    : 'Aucun document requis pour cette démarche'}
                </Text>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
