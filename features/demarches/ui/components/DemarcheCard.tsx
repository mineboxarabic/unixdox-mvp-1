'use client';

import { Box, Text, VStack } from '@chakra-ui/react';
import { FiFile } from 'react-icons/fi';
import { DemarcheStatut } from '@prisma/client';
import Link from 'next/link';

interface DemarcheCardProps {
  id: string;
  titre: string;
  statut: DemarcheStatut;
  fileCount: number;
  dateDebut: Date;
  dateCompletion?: Date | null;
}

export function DemarcheCard({
  id,
  titre,
  statut,
  fileCount,
  dateDebut,
  dateCompletion,
}: DemarcheCardProps) {
  // Determine badge based on status
  const getStatusBadge = () => {
    switch (statut) {
      case DemarcheStatut.EN_COURS:
        return { label: 'Vide', colorScheme: 'primary' as const };
      case DemarcheStatut.COMPLETE:
        return { label: 'Vidé', colorScheme: 'success' as const };
      case DemarcheStatut.ABANDONNEE:
        return { label: 'Expirée', colorScheme: 'warning' as const };
      default:
        return { label: 'Vide', colorScheme: 'neutral' as const };
    }
  };

  const statusBadge = getStatusBadge();
  const displayDate = dateCompletion || dateDebut;

  return (
    <Link href={`/demarches/${id}`}>
      <Box
        position="relative"
        width="181px"
        height="160px"
        cursor="pointer"
        transition="all 0.2s ease-in-out"
        borderRadius="lg"
        _hover={{
          transform: 'translateY(-4px)',
          '& img': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {/* Folder SVG Background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="142px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <img
            src="/folder.svg"
            alt="Folder"
            width="160"
            height="160"
            style={{
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </Box>

        {/* Content Container */}
        <VStack
          position="relative"
          width="181px"
          height="160px"
          justify="space-between"
          align="stretch"
          pt="48px"
          px="32px"
          pb="0"
        >
          {/* Badges Section */}
          <VStack align="flex-start" gap={2}>
            <Box
              as="span"
              fontSize="xs"
              fontWeight="medium"
              bg="white"
              color={statusBadge.colorScheme === 'warning' ? 'accent.500' : 'primary.600'}
              px={2}
              py={1}
              borderRadius="sm"
            >
              {statusBadge.label}
            </Box>
            <Box
              as="span"
              fontSize="xs"
              fontWeight="medium"
              bg="whiteAlpha.900"
              color="neutral.700"
              px={2}
              py={1}
              borderRadius="sm"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <FiFile size={12} />
              {fileCount} fichier{fileCount !== 1 ? 's' : ''}
            </Box>
          </VStack>

          {/* Title Section */}
          <Box
            bg="white"
            borderTopRadius="md"
            px={4}
            py={2}
            textAlign="center"
            width="181px"
            ml="-32px"
          >
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="neutral.700"
              lineHeight="tight"
              overflow="hidden"
              textOverflow="ellipsis"
              css={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {titre}
            </Text>
          </Box>
        </VStack>
      </Box>
    </Link>
  );
}
