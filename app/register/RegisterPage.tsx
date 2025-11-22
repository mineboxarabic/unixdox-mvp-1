'use client';

import { useState } from 'react';
import { Box, Flex, VStack, Image } from '@chakra-ui/react';
import { BackgroundGradients } from '@/features/auth/ui/registration/BackgroundGradients';
import { StepIndicator } from '@/features/auth/ui/registration/StepIndicator';
import { GoogleSignInStep } from '@/features/auth/ui/registration/GoogleSignInStep';
import { SubscriptionSelectionStep } from '@/features/auth/ui/registration/SubscriptionSelectionStep';
import { RegistrationStep } from '@/features/auth/ui/registration/types';

// Define the registration steps
const registrationSteps: RegistrationStep[] = [
  {
    id: 1,
    title: "Choisissez\nvotre offre",
    component: GoogleSignInStep
  },
  {
    id: 2,
    title: "Liez un\nGoogle Drive",
    component: SubscriptionSelectionStep
  },
  {
    id: 3,
    title: "Importez votre\npremier document",
    // Placeholder component - will be implemented later
    component: () => <Box>Step 3 - Coming Soon</Box>
  }
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < registrationSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = registrationSteps[currentStep - 1].component;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === registrationSteps.length;

  return (
    <Box w="full" h="100vh" bg="white" overflow="hidden" position="relative">
      {/* Background Gradients */}
      <BackgroundGradients />

      {/* Main Content */}
      <Flex h="full" position="relative" zIndex={1}>
        {/* Left Side - Form Content */}
        <Flex
          flex="1"
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
          direction="column"
          justify="space-between"
          align="center"
        >
          {currentStep === 1 ? (
            // Step 1: Simple centered content
            <VStack w="full" flex="1" justify="center" align="center">
              <CurrentStepComponent
                onNext={handleNext}
                onBack={handleBack}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
              />
            </VStack>
          ) : (
            // Steps 2+: Content with step indicator
            <VStack
              w="754px"
              flex="1"
              position="relative"
              justify="space-between"
              align="center"
            >
              {/* Step Indicator */}
              <StepIndicator steps={registrationSteps} currentStep={currentStep} />

              {/* Step Content */}
              <VStack w="full" flex="1" justify="center" align="center" gap={6}>
                <CurrentStepComponent
                  onNext={handleNext}
                  onBack={handleBack}
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                />
              </VStack>
            </VStack>
          )}
        </Flex>

        {/* Right Side - Logo */}
        <Flex
          flex="1"
          h="full"
          p={2.5}
          overflow="hidden"
          justify="center"
          align="center"
        >
          <Image
            src="/logo.svg"
            alt="UNIDOX Logo"
            width="305px"
            height="85px"
          />
        </Flex>
      </Flex>
    </Box>
  );
}

