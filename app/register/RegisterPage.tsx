'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Flex, VStack, Image } from '@chakra-ui/react';
import { BackgroundGradients } from '@/shared/auth/components/BackgroundGradients';
import { StepIndicator } from '@/features/auth/ui/registration/StepIndicator';
import { InitialLoginStep } from '@/features/auth/ui/registration/InitialLoginStep';
import { SubscriptionSelectionStep } from '@/features/auth/ui/registration/SubscriptionSelectionStep';
import { GoogleDriveLinkStep } from '@/features/auth/ui/registration/GoogleDriveLinkStep';
import { DocumentUploadStep } from '@/features/auth/ui/registration/DocumentUploadStep';
import { RegistrationStep } from '@/features/auth/ui/registration/types';
import { updateUserSubscription } from '@/features/users/actions';
import { uploadDocumentFile } from '@/features/documents/actions';

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

interface RegisterPageProps {
  isAuthenticated?: boolean;
}

export default function RegisterPage({ isAuthenticated = false }: RegisterPageProps) {
  const searchParams = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (!isNaN(step) && step >= 1 && step <= registrationSteps.length) {
        setCurrentStep(step);
      }
    }
  }, [searchParams]);

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
        <Flex h="full" w="full" maxW="100vw" position="relative" zIndex={1}>
          {/* Left Side - Login Content */}
          <Flex
            flex="1"
            h="full"
            bg="bg.surface"
            borderRight="1px solid"
            borderColor="border.muted"
            direction="column"
            justify="center"
            align="center"
            overflowY="auto"
          >
            <VStack w="full" flex="1" justify="center" align="center">
              <InitialLoginStep
                onNext={handleLogin}
                onBack={() => { }}
                isFirstStep={true}
                isLastStep={false}
                updateUserSubscription={updateUserSubscription}
                uploadDocumentFile={uploadDocumentFile}
              />
            </VStack>
          </Flex>

          {/* Right Side - Logo */}
          <Flex
            w="400px"
            h="full"
            p={2.5}
            overflow="hidden"
            justify="center"
            align="center"
            display={{ base: 'none', lg: 'flex' }}
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
      <Flex h="full" w="full" maxW="100vw" position="relative" zIndex={1}>
        {/* Left Side - Form Content */}
        <Flex
          flex="1"
          h="full"
          bg="bg.surface"
          borderRight="1px solid"
          borderColor="border.muted"
          direction="column"
          justify="space-between"
          align="center"
          overflowY="auto"
          px={8}
        >
          <VStack
            w="full"
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
                updateUserSubscription={updateUserSubscription}
                uploadDocumentFile={uploadDocumentFile}
              />
            </VStack>
          </VStack>
        </Flex>

        {/* Right Side - Logo */}
        <Flex
          w="400px"
          h="full"
          p={2.5}
          overflow="hidden"
          justify="center"
          align="center"
          display={{ base: 'none', lg: 'flex' }}
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

