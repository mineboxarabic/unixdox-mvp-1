import { VStack, HStack, Box, Text, Input, Button } from '@chakra-ui/react';

interface PaymentFormProps {
  onContinue: () => void;
}

export function PaymentForm({ onContinue }: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment processing
    onContinue();
  };

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
        <Input
          placeholder="1111 2222 3333 4444"
          size="md"
          bg="bg.surface"
          borderColor="border.default"
          _hover={{ borderColor: 'neutral.400' }}
          _focus={{ borderColor: 'primary.500', boxShadow: 'none' }}
          required
        />
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
            required
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
            required
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
          required
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
        h="40px"
        bg="neutral.800"
        color="neutral.0"
        borderRadius="full"
        fontSize="sm"
        fontWeight="normal"
        _hover={{ bg: 'neutral.700' }}
        _active={{ bg: 'neutral.900' }}
        mt={2}
      >
        Continuer
      </Button>
    </VStack>
  );
}
