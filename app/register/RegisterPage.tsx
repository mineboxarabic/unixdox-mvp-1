'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { VStack } from '@chakra-ui/react';
import { AuthLayout } from '@/shared/auth/components/AuthLayout';
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

/**
 * Register page with multi-step registration flow.
 * 
 * Step 0 (not logged in): InitialLoginStep - Google OAuth signup.
 * Step 1-3 (logged in): Subscription → Google Drive → Document Upload.
 * 
 * Uses shared AuthLayout for consistent two-panel design (Figma v3.0).
 */
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
      const nextStep = currentStep + 1;
      router.push(`/register?step=${nextStep}`);
    } else {
      // Force hard navigation to clear Next.js client router cache
      window.location.assign('/');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // If not logged in, show initial login/signup page
  if (!isLoggedIn) {
    return (
      <AuthLayout>
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
      </AuthLayout>
    );
  }

  // Multi-step registration flow
  const CurrentStepComponent = registrationSteps[currentStep - 1].component;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === registrationSteps.length;

  return (
    <AuthLayout>
      <VStack
        w="full"
        flex="1"
        position="relative"
        justify="space-between"
        align="center"
        px={8}
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
            updateUserSubscription={updateUserSubscription}
            uploadDocumentFile={uploadDocumentFile}
          />
        </VStack>
      </VStack>
    </AuthLayout>
  );
}

