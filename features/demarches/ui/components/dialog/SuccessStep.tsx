'use client';

import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { LuCheck, LuDownload, LuFolderOpen } from 'react-icons/lu';

interface SuccessStepProps {
  modeleTitre: string;
  dossierId: string;
  onClose: () => void;
  onViewDossier: () => void;
}

export function SuccessStep({
  modeleTitre,
  dossierId,
  onClose,
  onViewDossier,
}: SuccessStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Dossier créé avec succès</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={4} py={4} align="center">
          <Box
            p={3}
            borderRadius="full"
            bg="green.100"
            color="green.600"
          >
            <LuCheck size={32} />
          </Box>
          <VStack gap={1} align="center">
            <Text fontSize="lg" fontWeight="medium" color="fg.default">
              Votre dossier a été créé !
            </Text>
            <Text fontSize="sm" color="fg.muted" textAlign="center">
              Le dossier pour "{modeleTitre}" est prêt.
              Vous pouvez maintenant télécharger vos documents ou accéder au dossier.
            </Text>
          </VStack>
        </VStack>
      </DialogBody>
      <DialogFooter>
        <HStack gap={3} justify="center" w="full">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button
            variant="outline"
            colorPalette="blue"
            leftIcon={<LuDownload size={16} />}
            onClick={() => {
              // Download functionality would go here
              window.open(`/api/dossiers/${dossierId}/download`, '_blank');
            }}
          >
            Télécharger les documents
          </Button>
          <Button
            colorPalette="blue"
            leftIcon={<LuFolderOpen size={16} />}
            onClick={onViewDossier}
          >
            Voir le dossier
          </Button>
        </HStack>
      </DialogFooter>
    </>
  );
}
