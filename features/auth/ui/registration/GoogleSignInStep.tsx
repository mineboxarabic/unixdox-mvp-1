import { VStack, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { StepComponentProps } from './types';

// Google Icon SVG component
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M18.33 10.2c0-.68-.06-1.33-.17-1.95H10v3.7h4.67c-.2 1.08-.82 2-1.74 2.62v2.38h2.82c1.65-1.52 2.6-3.76 2.6-6.75z" fill="#4285F4"/>
      <path d="M10 19c2.36 0 4.34-.78 5.79-2.12l-2.82-2.19c-.79.53-1.8.84-2.97.84-2.28 0-4.22-1.54-4.91-3.62H2.16v2.26A9 9 0 0010 19z" fill="#34A853"/>
      <path d="M5.09 11.91A5.41 5.41 0 015.09 8.09V5.83H2.16a9 9 0 000 8.34l2.93-2.26z" fill="#FBBC05"/>
      <path d="M10 4.38c1.29 0 2.44.44 3.35 1.31l2.51-2.51C14.33 1.89 12.36 1 10 1a9 9 0 00-7.84 4.83l2.93 2.26c.69-2.08 2.63-3.62 4.91-3.62z" fill="#EA4335"/>
    </svg>
  );
}

export function GoogleSignInStep({ onNext }: StepComponentProps) {
  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth sign-in
    console.log('Google sign-in clicked');
    onNext();
  };

  return (
    <VStack
      w="513px"
      flex="1"
      justify="center"
      align="flex-start"
      gap={6}
      overflow="hidden"
    >
      <VStack align="flex-start" gap={2}>
        <Heading
          as="h1"
          fontSize="2xl"
          fontWeight="normal"
          color="gray.500"
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

      <Button
        w="full"
        h="40px"
        minW="40px"
        px={4}
        py={0.5}
        bg="gray.800"
        color="white"
        borderRadius="full"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.900' }}
        onClick={handleGoogleSignIn}
      >
        <HStack gap={2}>
          <GoogleIcon />
          <Text fontSize="sm" fontWeight="normal">
            S&apos;inscrire avec Google
          </Text>
        </HStack>
      </Button>
    </VStack>
  );
}
