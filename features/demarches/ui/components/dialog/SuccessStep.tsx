'use client';

import { useState } from 'react';
import { Box, Text, VStack, HStack, Input, Icon } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { LuCheck, LuDownload, LuFolderOpen, LuPencil, LuCheck as LuCheckIcon } from 'react-icons/lu';

interface SuccessStepProps {
  modeleTitre: string;
  dossierId: string;
  onClose: () => void;
  onViewDossier: () => void;
  onUpdateTitle: (title: string) => Promise<void>;
}

export function SuccessStep({
  modeleTitre,
  dossierId,
  onClose,
  onViewDossier,
  onUpdateTitle,
}: SuccessStepProps) {
  const defaultTitle = `${modeleTitre} - Démarche du ${new Date().toLocaleDateString()}`;
  const [title, setTitle] = useState(defaultTitle);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveTitle = async () => {
    setIsSaving(true);
    try {
      await onUpdateTitle(title);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update title', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Dossier créé avec succès</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={6} py={4} align="center">
          <Box
            p={4}
            borderRadius="full"
            bg="green.100"
            color="green.600"
          >
            <LuCheck size={40} />
          </Box>
          <VStack gap={2} align="center" w="full">
            <Text fontSize="lg" fontWeight="medium" color="fg.default">
              Votre dossier a été créé !
            </Text>
            
            {/* Editable Title Section */}
            <Box w="full" maxW="md">
              {isEditing ? (
                <HStack gap={2}>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveTitle();
                      if (e.key === 'Escape') {
                        setTitle(defaultTitle); // Or previous title?
                        setIsEditing(false);
                      }
                    }}
                  />
                  <Button
                    aria-label="Save title"
                    size="sm"
                    colorPalette="green"
                    onClick={handleSaveTitle}
                    disabled={isSaving}
                  >
                    <Icon as={LuCheckIcon} />
                  </Button>
                </HStack>
              ) : (
                <HStack justify="center" gap={2}>
                  <Text fontWeight="semibold" fontSize="md">
                    {title}
                  </Text>
                  <Button
                    aria-label="Edit title"
                    size="xs"
                    variant="ghost"
                    color="fg.muted"
                    onClick={() => setIsEditing(true)}
                  >
                    <Icon as={LuPencil} />
                  </Button>
                </HStack>
              )}
            </Box>

            <Text fontSize="sm" color="fg.muted" textAlign="center">
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
            Télécharger
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

