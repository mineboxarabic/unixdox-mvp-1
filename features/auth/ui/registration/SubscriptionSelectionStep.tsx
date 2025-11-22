import { useState } from 'react';
import { VStack, HStack, Box, Text, Icon } from '@chakra-ui/react';
import { StepComponentProps, PricingPlan, EngagementType } from './types';
import { PricingCard } from './PricingCard';

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

export function SubscriptionSelectionStep({ onNext, onBack }: StepComponentProps) {
  const [engagement, setEngagement] = useState<EngagementType>('1-year');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Auto-advance after selection or require explicit next button
    // For now, just select
  };

  return (
    <VStack
      w="full"
      flex="1"
      justify="center"
      align="center"
      gap={6}
      overflow="hidden"
    >
      <VStack gap={4} align="center">
        {/* Engagement Toggle */}
        <Box
          bg="gray.100"
          borderRadius="12px"
          p={1}
          display="inline-flex"
        >
          <HStack gap={0}>
            <Box
              px={3}
              py={1}
              borderRadius="8px"
              bg={engagement === '1-year' ? 'white' : 'transparent'}
              boxShadow={engagement === '1-year' ? '0px 1px 2px rgba(24, 24, 27, 0.10)' : 'none'}
              cursor="pointer"
              onClick={() => setEngagement('1-year')}
              transition="all 0.2s"
            >
              <Text
                fontSize="sm"
                fontWeight="normal"
                color={engagement === '1-year' ? 'gray.900' : 'gray.600'}
              >
                Engagement 1 an
              </Text>
            </Box>
            <Box
              px={3}
              py={1}
              borderRadius="8px"
              bg={engagement === 'no-commitment' ? 'white' : 'transparent'}
              boxShadow={engagement === 'no-commitment' ? '0px 1px 2px rgba(24, 24, 27, 0.10)' : 'none'}
              cursor="pointer"
              onClick={() => setEngagement('no-commitment')}
              transition="all 0.2s"
            >
              <Text
                fontSize="sm"
                fontWeight="normal"
                color={engagement === 'no-commitment' ? 'gray.900' : 'gray.600'}
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
          <Box w="20px" h="20px" color="gray.700">
            <GraduationIcon />
          </Box>
          <Text fontSize="sm" fontWeight="normal" color="gray.700" textAlign="center">
            Vous êtes étudiant ?{' '}
            <Text as="span" textDecoration="underline" cursor="pointer">
              Cliquez ici
            </Text>
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
