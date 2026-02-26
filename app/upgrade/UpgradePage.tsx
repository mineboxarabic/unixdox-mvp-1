'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VStack, HStack, Box, Text, Separator } from '@chakra-ui/react';
import { LuCrown, LuArrowLeft } from 'react-icons/lu';
import { Button } from '@/shared/components/ui/button';
import { PaymentForm } from '@/features/auth/ui/registration/PaymentForm';
import { PricingCard } from '@/features/auth/ui/registration/PricingCard';
import { updateUserSubscription } from '@/features/users/actions';
import { SubscriptionPlan } from '@prisma/client';
import { toaster } from '@/shared/components/ui/toaster';
import { PricingPlan, EngagementType } from '@/features/auth/ui/registration/types';

/** Both pricing plans — same as registration flow */
const pricingPlans: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 3.99,
    icon: 'standard',
    features: [
      "Jusqu'à 6Go de stockage",
      '1 dossier de démarche par mois',
      'Classement automatique\nde 5 fichiers par mois',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 6.99,
    icon: 'premium',
    features: [
      'Stockage illimité',
      'Démarches illimitées',
      'Classement automatique illimité',
      'Notifications de rappel',
    ],
  },
];

/**
 * Upgrade page for existing users.
 * Shows both Standard and Premium plans (like registration),
 * with an engagement toggle and fake payment form.
 */
export default function UpgradePage() {
  const router = useRouter();
  const [engagement, setEngagement] = useState<EngagementType>('1-year');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handleContinue = async () => {
    let plan: SubscriptionPlan = SubscriptionPlan.FREE;
    if (selectedPlan === 'standard') plan = SubscriptionPlan.BASIC;
    if (selectedPlan === 'premium') plan = SubscriptionPlan.PREMIUM;

    try {
      const result = await updateUserSubscription(plan);
      if (result.success) {
        toaster.create({
          title: 'Abonnement activé !',
          description: `Votre abonnement ${selectedPlan === 'premium' ? 'Premium' : 'Standard'} a été activé avec succès.`,
          type: 'success',
        });
        // Force a hard navigation to completely clear Next.js client router cache
        // which aggressively holds onto the 'FREE' state layout
        window.location.assign('/');
      } else {
        toaster.create({
          title: 'Erreur',
          description: result.error || 'Une erreur est survenue',
          type: 'error',
        });
      }
    } catch {
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
      minH="100vh"
      bg="bg.canvas"
      justify="center"
      align="center"
      px={4}
      py={8}
    >
      <VStack gap={6} w="full" maxW="500px" align="center">
        {/* Header */}
        <VStack gap={2} align="center">
          <Box
            w="48px"
            h="48px"
            borderRadius="full"
            bg="primary.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="primary.600"
          >
            <LuCrown size={24} />
          </Box>
          <Text fontSize="2xl" fontWeight="semibold" color="text.fg">
            Passer à Unidox Premium
          </Text>
          <Text fontSize="sm" color="text.fg.muted" textAlign="center">
            Débloquez toutes les fonctionnalités et profitez d&apos;un stockage illimité
          </Text>
        </VStack>

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

        {/* Pricing Cards — both plans */}
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

        {/* Payment Form — shown when plan is selected */}
        {showPayment && selectedPlan && (
          <VStack w="full" gap={4}>
            <Separator w="full" borderColor="border.default" />
            <PaymentForm onContinue={handleContinue} />
          </VStack>
        )}

        {/* Back link */}
        <Button
          variant="ghost"
          size="sm"
          color="text.fg.muted"
          onClick={() => router.back()}
          data-testid="upgrade-back"
        >
          <LuArrowLeft size={16} />
          Retour
        </Button>
      </VStack>
    </VStack>
  );
}
