'use client';

import { Box, Text, VStack } from '@chakra-ui/react';
import { LuTriangleAlert } from 'react-icons/lu';
import { Button } from './button';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog';
import { AUTH_ERROR_MESSAGES } from '@/shared/utils/errors';

interface ReauthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReauth: () => void;
  title?: string;
  description?: string;
}

/**
 * Reusable dialog component for handling re-authentication scenarios
 * Single Responsibility: Only handles the UI for reauth prompts
 */
export function ReauthDialog({
  isOpen,
  onClose,
  onReauth,
  title = 'Session expirée',
  description = AUTH_ERROR_MESSAGES.REAUTH_REQUIRED,
}: ReauthDialogProps) {
  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4} align="center" py={4}>
            <Box
              p={3}
              borderRadius="full"
              bg="orange.100"
              color="orange.600"
            >
              <LuTriangleAlert size={32} />
            </Box>
            <DialogDescription textAlign="center" color="fg.muted">
              {description}
            </DialogDescription>
            <Text fontSize="sm" color="fg.subtle" textAlign="center">
              Vous serez redirigé vers la page de connexion pour vous reconnecter avec Google.
            </Text>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button colorPalette="blue" onClick={onReauth}>
            Se reconnecter
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
