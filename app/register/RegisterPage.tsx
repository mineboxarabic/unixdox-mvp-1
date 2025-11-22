'use client';

import { useState } from 'react';
import { Box, Flex, VStack, Image } from '@chakra-ui/react';
import { BackgroundGradients } from '@/features/auth/ui/registration/BackgroundGradients';
import { StepIndicator } from '@/features/auth/ui/registration/StepIndicator';
import { InitialLoginStep } from '@/features/auth/ui/registration/InitialLoginStep';
import { SubscriptionSelectionStep } from '@/features/auth/ui/registration/SubscriptionSelectionStep';
import { GoogleDriveLinkStep } from '@/features/auth/ui/registration/GoogleDriveLinkStep';
import { DocumentUploadStep } from '@/features/auth/ui/registration/DocumentUploadStep';
import { RegistrationStep } from '@/features/auth/ui/registration/types';

// Define the registration steps (after initial login)
const registrationSteps: RegistrationStep[] = [
  {
    id: 1,
    title: "Choisissez\nvotre offre",
    component: SubscriptionSelectionStep
  },
  {
    id: 2,
    title: "Liez un\nGoogle Drive",
    component: GoogleDriveLinkStep
  },
  {
    id: 3,
    title: "Importez votre\npremier document",
    component: DocumentUploadStep
  }
];

export default function RegisterPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

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

  // If not logged in, show initial login page
  if (!isLoggedIn) {
    return (
      <Box w="full" h="100vh" bg="bg.canvas" overflow="hidden" position="relative">
        {/* Background Gradients */}
        <BackgroundGradients />

        {/* Main Content */}
        <Flex h="full" position="relative" zIndex={1}>
          {/* Left Side - Login Content */}
          <Flex
            flex="1"
            bg="bg.surface"
            borderRight="1px solid"
            borderColor="border.muted"
            direction="column"
            justify="center"
            align="center"
          >
            <VStack w="full" flex="1" justify="center" align="center">
              <InitialLoginStep
                onNext={handleLogin}
                onBack={() => {}}
                isFirstStep={true}
                isLastStep={false}
              />
            </VStack>
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

  const CurrentStepComponent = registrationSteps[currentStep - 1].component;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === registrationSteps.length;

  return (
    <Box w="full" h="100vh" bg="bg.canvas" overflow="hidden" position="relative">
      {/* Background Gradients */}
      <BackgroundGradients />

      {/* Main Content */}
      <Flex h="full" position="relative" zIndex={1}>
        {/* Left Side - Form Content */}
        <Flex
          flex="1"
          bg="bg.surface"
          borderRight="1px solid"
          borderColor="border.muted"
          direction="column"
          justify="space-between"
          align="center"
        >
          <VStack
            w="754px"
            flex="1"
            position="relative"
            justify="space-between"
            align="center"
          >
            {/* Step Indicator - always show */}
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

