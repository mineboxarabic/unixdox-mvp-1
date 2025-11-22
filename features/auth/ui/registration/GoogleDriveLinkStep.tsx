import { VStack, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { StepComponentProps } from './types';

// Google Drive Icon SVG component
function GoogleDriveIcon() {
  return (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78">
	<path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
	<path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
	<path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
	<path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
	<path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
	<path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
</svg>
  );
}

export function GoogleDriveLinkStep({ onNext }: StepComponentProps) {
  const handleGoogleDriveLink = () => {
    // TODO: Implement Google Drive linking
    console.log('Google Drive link clicked');
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
      <VStack align="flex-start" gap={4}>
        <Heading
          as="h1"
          fontSize="xl"
          fontWeight="normal"
          color="text.fg"
          lineHeight="1.5"
        >
          Liez votre Google Drive,
          <br />
          Unidox se charge du reste !
        </Heading>
        <Text
          fontSize="sm"
          fontWeight="normal"
          color="text.fg.muted"
          lineHeight="1.6"
        >
          Unidox vous demande de lier votre Google Drive pour que tout se passe dans votre espace à vous : l&apos;app y range vos document, les renomme, les trie, et à votre demande créera un dossier de démarche en un clic.
        </Text>
      </VStack>

      <Button
        w="full"
        h="40px"
        minW="40px"
        px={4}
        py={0.5}
        bg="neutral.800"
        color="neutral.0"
        borderRadius="full"
        _hover={{ bg: 'neutral.700' }}
        _active={{ bg: 'neutral.900' }}
        onClick={handleGoogleDriveLink}
      >
        <HStack gap={2}>
          <GoogleDriveIcon />
          <Text fontSize="sm" fontWeight="normal">
            Lier votre google Drive
          </Text>
        </HStack>
      </Button>
    </VStack>
  );
}
