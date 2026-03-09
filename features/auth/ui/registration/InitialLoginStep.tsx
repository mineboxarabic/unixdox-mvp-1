import { VStack, Heading, Text } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { StepComponentProps } from './types';
import { loginWithGoogle } from '@/shared/auth/actions';

/**
 * Google Icon SVG component for OAuth sign-in buttons.
 */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.33 10.2c0-.68-.06-1.33-.17-1.95H10v3.7h4.67c-.2 1.08-.82 2-1.74 2.62v2.38h2.82c1.65-1.52 2.6-3.76 2.6-6.75z" fill="#4285F4" />
      <path d="M10 19c2.36 0 4.34-.78 5.79-2.12l-2.82-2.19c-.79.53-1.8.84-2.97.84-2.28 0-4.22-1.54-4.91-3.62H2.16v2.26A9 9 0 0010 19z" fill="#34A853" />
      <path d="M5.09 11.91A5.41 5.41 0 015.09 8.09V5.83H2.16a9 9 0 000 8.34l2.93-2.26z" fill="#FBBC05" />
      <path d="M10 4.38c1.29 0 2.44.44 3.35 1.31l2.51-2.51C14.33 1.89 12.36 1 10 1a9 9 0 00-7.84 4.83l2.93 2.26c.69-2.08 2.63-3.62 4.91-3.62z" fill="#EA4335" />
    </svg>
  );
}

/**
 * Initial registration step - Google OAuth signup.
 * Matches Figma v3.0 "Sign in step 01" design:
 * - Title: "Inscription" in gray.600 (2xl)
 * - Subtitle: "Découvrez votre assistant administratif personnel" in gray.700 (xl)
 * - Dark pill Google button (gray.800 bg, rounded full)
 */
export function InitialLoginStep({ onNext }: StepComponentProps) {
  const handleGoogleSignIn = async () => {
    await loginWithGoogle();
  };

  return (
    <VStack
      maxW="513px"
      w="full"
      flex="1"
      justify="center"
      align="flex-start"
      gap={6}
      overflow="hidden"
      px={8}
    >
      <VStack align="flex-start" gap={2}>
        <Heading
          as="h1"
          fontSize="2xl"
          fontWeight="normal"
          color="gray.600"
          lineHeight="8"
        >
          Inscription
        </Heading>
        <Text
          fontSize="xl"
          fontWeight="normal"
          color="gray.700"
          lineHeight="1.5"
        >
          Découvrez votre assistant administratif personnel
        </Text>
      </VStack>

      {/* Google OAuth button - dark pill style per Figma */}
      <Button
        w="full"
        h="40px"
        variant="solid"
        colorPalette="gray"
        borderRadius="full"
        bg="gray.800"
        color="white"
        fontSize="sm"
        onClick={handleGoogleSignIn}
        _hover={{ bg: 'gray.700' }}
      >
        <GoogleIcon />
        S&apos;inscrire avec Google
      </Button>
    </VStack>
  );
}
