'use client';

import { useState } from 'react';
import { Box, Text, VStack, HStack, Input, Icon, Flex } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogFooter, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { toaster } from '@/shared/components/ui/toaster';
import { Button } from '@/shared/components/ui/button';
import { LuCircleCheck, LuDownload, LuMail, LuPencil, LuCheck, LuSend } from 'react-icons/lu';

interface SuccessStepProps {
  modeleTitre: string;
  demarcheTitle?: string;
  dossierId: string;
  userEmail?: string;
  onClose: () => void;
  onViewDossier: () => void;
  onUpdateTitle: (title: string) => Promise<void>;
}

export function SuccessStep({
  modeleTitre,
  demarcheTitle,
  dossierId,
  userEmail = '',
  onClose,
  onViewDossier,
  onUpdateTitle,
}: SuccessStepProps) {
  const [demarcheName, setDemarcheName] = useState(demarcheTitle || modeleTitre);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);
  const [email, setEmail] = useState(userEmail);
  const [isSending, setIsSending] = useState(false);

  const handleSaveName = async () => {
    if (!demarcheName.trim()) return;
    
    setIsSavingName(true);
    try {
      await onUpdateTitle(demarcheName);
      setIsEditingName(false);
    } catch (error) {
      console.error('Failed to update name', error);
    } finally {
      setIsSavingName(false);
    }
  };

  const handleDownload = () => {
    window.open(`/api/demarches/${dossierId}/download`, '_blank');
  };

  const handleEmailDownload = async () => {
    if (!email) return;
    
    setIsSending(true);
    try {
      const response = await fetch(`/api/demarches/${dossierId}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toaster.create({
        title: "Email envoyé",
        description: `Les documents ont été envoyés à ${email}`,
        type: "success",
      });
    } catch (error) {
      console.error('Failed to send email', error);
      toaster.create({
        title: "Erreur",
        description: "Impossible d'envoyer l'email. Veuillez vérifier votre configuration.",
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Création de la démarche pour {modeleTitre}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={4} py={2} align="center">
          {/* Success Icon - Large green checkmark in circle */}
          <Box py={4}>
            <Icon 
              as={LuCircleCheck} 
              boxSize="132px" 
              color="green.500"
              strokeWidth={1.5}
            />
          </Box>
          
          {/* Success Message */}
          <Text fontSize="md" color="fg.default" textAlign="center">
            Votre démarche a été créée avec succès !
          </Text>
          
          {/* Editable Demarche Name */}
          <Box w="full" maxW="407px">
            <Text fontSize="sm" fontWeight="medium" color="fg.default" mb={1.5}>
              Nom de la démarche
            </Text>
            {isEditingName ? (
              <HStack gap={2}>
                <Input
                  value={demarcheName}
                  onChange={(e) => setDemarcheName(e.target.value)}
                  autoFocus
                  borderRadius="lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') {
                      setDemarcheName(modeleTitre);
                      setIsEditingName(false);
                    }
                  }}
                />
                <Button
                  size="sm"
                  colorPalette="green"
                  onClick={handleSaveName}
                  disabled={isSavingName || !demarcheName.trim()}
                  borderRadius="lg"
                >
                  <Icon as={LuCheck} />
                </Button>
              </HStack>
            ) : (
              <Flex
                border="1px solid"
                borderColor="border.default"
                borderRadius="lg"
                h="40px"
                align="center"
                justify="space-between"
                px={3}
                cursor="pointer"
                onClick={() => setIsEditingName(true)}
                _hover={{ borderColor: 'primary.300', bg: 'bg.subtle' }}
                transition="all 0.2s"
              >
                <Text fontSize="sm" color="fg.default" truncate>
                  {demarcheName}
                </Text>
                <Icon as={LuPencil} boxSize={4} color="fg.muted" />
              </Flex>
            )}
          </Box>
          
          {/* Email Input Section */}
          <Box w="full" maxW="407px">
            <Text fontSize="sm" fontWeight="medium" color="fg.default" mb={1.5}>
              Email
            </Text>
            <Flex
              border="1px solid"
              borderColor="border.default"
              borderRadius="lg"
              overflow="hidden"
              h="40px"
            >
              {/* Mail Icon */}
              <Flex 
                align="center" 
                justify="center" 
                px={3}
                opacity={0.7}
              >
                <Icon as={LuMail} boxSize={4} color="fg.default" />
              </Flex>
              
              {/* Email Input */}
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                border="none"
                borderRadius={0}
                h="full"
                flex={1}
                _focus={{ boxShadow: 'none' }}
                px={0}
                type="email"
              />
            </Flex>
          </Box>
        </VStack>
      </DialogBody>
      <DialogFooter>
        <HStack gap={3} justify="flex-end" w="full">
          {/* Outline Download Button */}
          <Button 
            variant="outline" 
            borderRadius="full"
            onClick={handleDownload}
          >
            Télécharger la démarche
            <Icon as={LuDownload} ml={2} boxSize={5} />
          </Button>
          
          {/* Primary Download/Send Button */}
          <Button
            colorPalette="blue"
            borderRadius="full"
            onClick={email ? handleEmailDownload : handleDownload}
            disabled={isSending}
          >
            {email ? 'Envoyer par email' : 'Télécharger la démarche'}
            <Icon as={email ? LuSend : LuDownload} ml={2} boxSize={5} />
          </Button>
        </HStack>
      </DialogFooter>
    </>
  );
}

