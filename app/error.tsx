'use client';

import { useEffect } from 'react';
import { Box, VStack, Heading, Text, Code } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';

/**
 * Page-level error boundary — catches unhandled errors inside routes.
 * Shows the actual error message in production so crashes are diagnosable.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Page Error]', error);
  }, [error]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      p={8}
    >
      <VStack gap={6} maxW="500px" textAlign="center">
        <Heading as="h2" size="lg" color="red.600">
          Une erreur est survenue
        </Heading>
        <Text color="gray.600">
          {error.message || 'Erreur inattendue'}
        </Text>
        {error.digest && (
          <Code fontSize="xs" color="gray.500">
            Digest: {error.digest}
          </Code>
        )}
        <Button onClick={reset} colorPalette="blue" variant="solid">
          Réessayer
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = '/login')}
        >
          Retour à la connexion
        </Button>
      </VStack>
    </Box>
  );
}
