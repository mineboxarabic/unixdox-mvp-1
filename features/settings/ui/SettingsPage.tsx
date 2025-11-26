'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { Box, Flex, Heading, Switch, Text } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { toaster } from '@/shared/components/ui/toaster';
import type { UserPreferences } from '../types/schemas';
import { updatePreferencesAction } from '../actions';

interface SettingsPageProps {
  preferences: UserPreferences;
}

const languageOptions = [
  { label: 'Français', value: 'fr' },
  { label: 'English', value: 'en' },
];

export function SettingsPage({ preferences }: SettingsPageProps) {
  const [initialPreferences, setInitialPreferences] = useState(preferences);
  const [currentPreferences, setCurrentPreferences] = useState(preferences);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setInitialPreferences(preferences);
    setCurrentPreferences(preferences);
  }, [preferences]);


  const isDirty = useMemo(
    () => JSON.stringify(initialPreferences) !== JSON.stringify(currentPreferences),
    [initialPreferences, currentPreferences],
  );

  const setNotifications = (checked: boolean) => {
    setCurrentPreferences((prev) => ({ ...prev, notifications: checked }));
  };

  const setLanguage = (value: string) => {
    setCurrentPreferences((prev) => ({ ...prev, language: value }));
  };

  const handleReset = () => {
    setCurrentPreferences(initialPreferences);
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updatePreferencesAction(currentPreferences);

      if (result?.error) {
        toaster.create({
          title: 'Erreur',
          description: result.error,
          type: 'error',
        });
        return;
      }

      if (result?.preferences) {
        setInitialPreferences(result.preferences);
        setCurrentPreferences(result.preferences);
      }

      toaster.create({
        title: 'Préférences enregistrées',
        type: 'success',
      });
    });
  };

  return (
    <Box bg="bg.canvas" minH="100vh" py="10" px={{ base: '4', md: '12' }}>
      <Flex direction="column" gap="10" maxW="4xl" mx="auto">
        <Flex direction="column" gap="2">
          <Heading size="lg" color="text.fg">
            Paramètres
          </Heading>
          <Text color="text.fg.muted">
            Ajustez vos préférences de compte pour adapter Unidox à votre utilisation.
          </Text>
        </Flex>

        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
          px={{ base: '6', md: '8' }}
          py={{ base: '6', md: '8' }}
        >
          <Flex direction="column" gap="6">
            <Flex direction="column" gap="1">
              <Heading size="md" color="text.fg">
                Notifications
              </Heading>
              <Text color="text.fg.subtle">
                Décidez si vous souhaitez recevoir des rappels importants.
              </Text>
            </Flex>

            <Flex align="center" justify="space-between" gap="4">
              <Flex direction="column" gap="1" maxW="lg">
                <Heading size="sm" color="text.fg">
                  Notifications générales
                </Heading>
                <Text color="text.fg.subtle">
                  Recevez les alertes essentielles concernant vos démarches et documents.
                </Text>
              </Flex>

              <Switch.Root
                checked={currentPreferences.notifications}
                onCheckedChange={({ checked }) => setNotifications(checked)}
                disabled={isPending}
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Root>
            </Flex>

            <Box h="1px" w="full" bg="border.default" />

            <Flex direction="column" gap="1">
              <Heading size="md" color="text.fg">
                Langue
              </Heading>
              <Text color="text.fg.subtle">
                Choisissez la langue d&apos;affichage de votre interface.
              </Text>
            </Flex>

            <Flex gap="3" wrap="wrap">
              {languageOptions.map((option) => {
                const isActive = currentPreferences.language === option.value;

                return (
                  <Button
                    key={option.value}
                    variant={isActive ? 'solid' : 'outline'}
                    colorPalette={isActive ? 'blue' : 'gray'}
                    onClick={() => setLanguage(option.value)}
                    disabled={isPending}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </Flex>

            <Flex justify="flex-end" gap="3" pt="4">
              <Button
                variant="outline"
                colorPalette="gray"
                onClick={handleReset}
                disabled={!isDirty || isPending}
              >
                Annuler
              </Button>
              <Button
                colorPalette="blue"
                onClick={handleSave}
                disabled={!isDirty || isPending}
              >
                {isPending ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
