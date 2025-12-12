'use client';

import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useProfile } from '../hooks/useProfile';
import { ProfileAvatar } from './components/ProfileAvatar';
import { ProfileForm } from './components/ProfileForm';

interface ProfilePageProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfilePage({ user }: ProfilePageProps) {
  const { state, refs, actions } = useProfile({ initialUser: user });

  return (
    <Box bg="bg.canvas" minH="100vh" py="10" px={{ base: '4', md: '12' }}>
      <Flex direction="column" gap="10" maxW="4xl" mx="auto">
        <Flex direction="column" gap="2">
          <Heading size="lg" color="text.fg">
            Mon Profil
          </Heading>
          <Text color="text.fg.muted">
            Gérez vos informations personnelles.
          </Text>
        </Flex>

        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
          p={{ base: '6', md: '8' }}
        >
          <VStack align="stretch" gap={6}>
            <ProfileAvatar
              name={state.name}
              imagePreview={state.imagePreview}
              fileInputRef={refs.fileInputRef}
              onImageChange={actions.handleImageChange}
              onTriggerInput={actions.triggerFileInput}
            />

            <Box h="1px" bg="border.default" />

            <ProfileForm
              name={state.name}
              email={user.email || null}
              isPending={state.isPending}
              hasChanges={state.hasChanges}
              onNameChange={actions.setName}
              onSave={actions.handleSave}
            />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

