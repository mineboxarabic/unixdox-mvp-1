'use client';

import { useState } from 'react';
import { VStack, HStack, Box, Text, Input } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { LuCreditCard, LuCheck, LuLoader } from 'react-icons/lu';

interface PaymentFormProps {
  onContinue: () => void;
}

/**
 * Fake Stripe-like payment form.
 * Accepts any input and simulates a 2-second payment processing animation
 * followed by a brief success state before calling onContinue.
 */
export function PaymentForm({ onContinue }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Start fake processing animation
    setIsProcessing(true);

    // Simulate payment processing (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success state briefly (1 second)
    setIsProcessing(false);
    setIsSuccess(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Advance to next step
    onContinue();
  };

  // Processing state UI
  if (isProcessing) {
    return (
      <VStack w="full" gap={4} py={8} align="center">
        {/* Inject keyframes globally */}
        <style>{`
          @keyframes payment-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes payment-pulse {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <Box
          w="48px"
          h="48px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="primary.500"
          style={{ animation: 'payment-spin 1s linear infinite' }}
        >
          <LuLoader size={32} />
        </Box>
        <Text fontSize="md" fontWeight="medium" color="text.fg" data-testid="payment-processing">
          Traitement en cours...
        </Text>
        <Text fontSize="sm" color="text.fg.muted">
          Veuillez patienter pendant que nous traitons votre paiement
        </Text>
      </VStack>
    );
  }

  // Success state UI
  if (isSuccess) {
    return (
      <VStack w="full" gap={4} py={8} align="center">
        <style>{`
          @keyframes payment-pulse {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
        <Box
          w="48px"
          h="48px"
          borderRadius="full"
          bg="green.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="green.600"
          style={{ animation: 'payment-pulse 0.4s ease-out' }}
        >
          <LuCheck size={28} />
        </Box>
        <Text fontSize="md" fontWeight="medium" color="green.600" data-testid="payment-success">
          Paiement accepté !
        </Text>
        <Text fontSize="sm" color="text.fg.muted">
          Votre abonnement a été activé avec succès
        </Text>
      </VStack>
    );
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      w="full"
      gap={4}
      align="stretch"
      pt={4}
    >
      {/* Card Number */}
      <VStack align="stretch" gap={2}>
        <Text fontSize="sm" fontWeight="normal" color="text.fg">
          Numéro de carte
        </Text>
        <HStack gap={0} position="relative">
          <Input
            placeholder="1111 2222 3333 4444"
            size="md"
            bg="bg.surface"
            borderColor="border.default"
            _hover={{ borderColor: 'neutral.400' }}
            _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
            data-testid="card-number"
          />
          <Box
            position="absolute"
            right={3}
            top="50%"
            transform="translateY(-50%)"
            color="text.fg.muted"
          >
            <LuCreditCard size={18} />
          </Box>
        </HStack>
      </VStack>

      {/* Expiration Date & Security Code */}
      <HStack gap={4} align="flex-start">
        <VStack align="stretch" gap={2} flex="1">
          <Text fontSize="sm" fontWeight="normal" color="text.fg">
            Date d&apos;expiration
          </Text>
          <Input
            placeholder="MM/AA"
            size="md"
            bg="bg.surface"
            borderColor="border.default"
            _hover={{ borderColor: 'neutral.400' }}
            _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
            maxLength={5}
            data-testid="card-expiry"
          />
        </VStack>

        <VStack align="stretch" gap={2} flex="1">
          <Text fontSize="sm" fontWeight="normal" color="text.fg">
            Code de sécurité
          </Text>
          <Input
            placeholder="123"
            size="md"
            bg="bg.surface"
            borderColor="border.default"
            _hover={{ borderColor: 'neutral.400' }}
            _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
            maxLength={3}
            data-testid="card-cvv"
          />
        </VStack>
      </HStack>

      {/* Cardholder Name */}
      <VStack align="stretch" gap={2}>
        <Text fontSize="sm" fontWeight="normal" color="text.fg">
          Nom du titulaire de la carte
        </Text>
        <Input
          placeholder="John Doe"
          size="md"
          bg="bg.surface"
          borderColor="border.default"
          _hover={{ borderColor: 'neutral.400' }}
          _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
          data-testid="card-holder"
        />
      </VStack>

      {/* Subscription Info Text */}
      <Text fontSize="xs" color="text.fg.muted" lineHeight="1.5" pt={2}>
        Votre abonnement Unidox avec engagement 1 an sera facturé automatiquement
        chaque mois au prix ci-dessus par utilisateur + taxes, sauf en cas d&apos;annulation.
        L&apos;abonnement avec engagement comporte des frais d&apos;annulation,{' '}
        <Text as="span" textDecoration="underline" cursor="pointer">
          en savoir plus ici
        </Text>
        .
      </Text>

      {/* Continue Button */}
      <Button
        type="submit"
        w="full"
        size="md"
        variant="solid"
        colorPalette="gray"
        mt={2}
        data-testid="payment-submit"
      >
        Continuer
      </Button>
    </VStack>
  );
}
