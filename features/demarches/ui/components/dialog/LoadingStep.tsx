'use client';

import { Box, Text, VStack } from '@chakra-ui/react';
import { 
  DialogHeader, 
  DialogBody, 
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Spinner } from '@chakra-ui/react';

interface LoadingStepProps {
  message?: string;
}

export function LoadingStep({ 
  message = 'Création du dossier en cours...' 
}: LoadingStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Création en cours</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <VStack gap={4} py={8} align="center">
          <Spinner size="xl" color="blue.500" />
          <Text fontSize="md" color="fg.muted">
            {message}
          </Text>
        </VStack>
      </DialogBody>
    </>
  );
}
