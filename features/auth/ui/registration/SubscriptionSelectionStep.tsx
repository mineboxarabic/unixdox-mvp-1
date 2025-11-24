import { useState } from 'react';
import { VStack, HStack, Box, Text, Separator } from '@chakra-ui/react';
import { StepComponentProps, PricingPlan, EngagementType } from './types';
import { PricingCard } from './PricingCard';
import { PaymentForm } from './PaymentForm';
import { SubscriptionPlan } from '@prisma/client';
import { toaster } from '@/shared/components/ui/toaster';

// Graduation Cap Icon
function GraduationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path 
        d="M10 3.33334L2.5 6.66668L10 10L17.5 6.66668L10 3.33334Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
      <path 
        d="M2.5 10L10 13.3333L17.5 10" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M2.5 13.3333L10 16.6667L17.5 13.3333" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 3.99,
    icon: 'standard',
    features: [
      "Jusqu'à 6Go de stockage",
      "1 dossier de démarche par mois",
      "Classement automatique\nde 5 fichiers par mois"
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 6.99,
    icon: 'premium',
    features: [
      "Stockage illimité",
      "Démarches illimitées",
      "Classement automatique illimité",
      "Notifications de rappel"
    ]
  }
];

export function SubscriptionSelectionStep({ onNext, onBack, updateUserSubscription }: StepComponentProps) {
  const [engagement, setEngagement] = useState<EngagementType>('1-year');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Auto-advance after selection or require explicit next button
    // For now, just select
  };

  const handleContinue = async () => {
    if (!selectedPlan) return;

    let plan: SubscriptionPlan = SubscriptionPlan.FREE;
    if (selectedPlan === 'standard') plan = SubscriptionPlan.BASIC;
    if (selectedPlan === 'premium') plan = SubscriptionPlan.PREMIUM;

    try {
      const result = await updateUserSubscription(plan);
      if (result.success) {
        onNext();
      } else {
        toaster.create({
          title: 'Erreur',
          description: result.error || 'Une erreur est survenue',
          type: 'error',
        });
      }
    } catch (error) {
      toaster.create({
        title: 'Erreur',
        description: 'Une erreur est survenue',
        type: 'error',
      });
    }
  };

  return (
    <VStack
      w="full"
      flex="1"
      justify="center"
      align="center"
      gap={6}
      overflow="hidden"
      px={4}
    >
      <VStack gap={4} align="center" w="full" maxW="500px">
        {/* Engagement Toggle */}
        <Box
          bg="bg.muted"
          borderRadius="lg"
          p={1}
          display="inline-flex"
        >
          <HStack gap={0}>
            <Box
              px={3}
              py={1}
              borderRadius="md"
              bg={engagement === '1-year' ? 'bg.surface' : 'transparent'}
              boxShadow={engagement === '1-year' ? 'sm' : 'none'}
              cursor="pointer"
              onClick={() => setEngagement('1-year')}
              transition="all 0.2s"
            >
              <Text
                fontSize="sm"
                fontWeight="normal"
                color={engagement === '1-year' ? 'neutral.900' : 'text.fg.muted'}
              >
                Engagement 1 an
              </Text>
            </Box>
            <Box
              px={3}
              py={1}
              borderRadius="md"
              bg={engagement === 'no-commitment' ? 'bg.surface' : 'transparent'}
              boxShadow={engagement === 'no-commitment' ? 'sm' : 'none'}
              cursor="pointer"
              onClick={() => setEngagement('no-commitment')}
              transition="all 0.2s"
            >
              <Text
                fontSize="sm"
                fontWeight="normal"
                color={engagement === 'no-commitment' ? 'neutral.900' : 'text.fg.muted'}
              >
                Sans engagement
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* Pricing Cards */}
        <HStack gap={4} px={2} align="stretch">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={() => handlePlanSelect(plan.id)}
            />
          ))}
        </HStack>

        {/* Student Link */}
        <HStack gap={1} justify="center">
          <Box w="20px" h="20px" color="text.fg">
            <GraduationIcon />
          </Box>
          <Text fontSize="sm" fontWeight="normal" color="text.fg" textAlign="center">
            Vous êtes étudiant ?{' '}
            <Text as="span" textDecoration="underline" cursor="pointer">
              Cliquez ici
            </Text>
          </Text>
        </HStack>

        {/* Payment Form - Show when plan is selected */}
        {selectedPlan && (
          <VStack w="full" gap={4} pt={2}>
            {/* Divider */}
            <Separator w="full" borderColor="border.default" />

            {/* Payment Form */}
            <PaymentForm onContinue={handleContinue} />
          </VStack>
        )}
      </VStack>
    </VStack>
  );
}
