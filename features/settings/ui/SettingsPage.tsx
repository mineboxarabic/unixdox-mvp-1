'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Badge, Flex, Heading, Switch, Text } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { toaster } from '@/shared/components/ui/toaster';
import { Tooltip } from '@/shared/components/ui/tooltip';
import type { UserPreferences } from '../types/schemas';
import { updatePreferencesAction } from '../actions';
import { updateUserSubscription } from '@/features/users/actions';
import { SubscriptionPlan } from '@prisma/client';
import { LuMail, LuSmartphone, LuBell, LuTrash2, LuCrown } from 'react-icons/lu';

interface SettingsPageProps {
  preferences: UserPreferences;
  userPlan: SubscriptionPlan;
}

const languageOptions: { label: string; value: UserPreferences['language'] }[] = [
  { label: 'Français', value: 'fr' },
  { label: 'English', value: 'en' },
];

/**
 * Notification toggle configuration
 * Each toggle has an icon, label, description, and key mapping to preferences
 */
const notificationToggles: {
  key: keyof Pick<UserPreferences, 'notificationEmail' | 'notificationSms' | 'notificationInApp'>;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    key: 'notificationEmail',
    label: 'Notifications par e-mail',
    description: 'Recevez les alertes et rappels par e-mail.',
    icon: LuMail,
  },
  {
    key: 'notificationSms',
    label: 'Notifications par SMS',
    description: 'Recevez les rappels urgents par SMS.',
    icon: LuSmartphone,
  },
  {
    key: 'notificationInApp',
    label: 'Notifications in-app',
    description: 'Recevez les notifications directement dans l\'application.',
    icon: LuBell,
  },
];

/** Plan display labels */
const planLabels: Record<SubscriptionPlan, string> = {
  FREE: 'Gratuit',
  BASIC: 'Standard',
  PREMIUM: 'Premium',
  ENTERPRISE: 'Enterprise',
};

/** Plan badge colors */
const planColors: Record<SubscriptionPlan, string> = {
  FREE: 'gray',
  BASIC: 'blue',
  PREMIUM: 'purple',
  ENTERPRISE: 'orange',
};

export function SettingsPage({ preferences, userPlan }: SettingsPageProps) {
  const router = useRouter();
  const [initialPreferences, setInitialPreferences] = useState(preferences);
  const [currentPreferences, setCurrentPreferences] = useState(preferences);
  const [isPending, startTransition] = useTransition();
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const isSubscribed = userPlan !== SubscriptionPlan.FREE;

  /**
   * Handles unsubscription: downgrades user plan to FREE
   */
  const handleUnsubscribe = async () => {
    setIsUnsubscribing(true);
    try {
      const result = await updateUserSubscription(SubscriptionPlan.FREE);
      if (result.success) {
        toaster.create({
          title: 'Abonnement résilié',
          description: 'Votre abonnement a été résilié avec succès.',
          type: 'success',
        });
        router.refresh();
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
    } finally {
      setIsUnsubscribing(false);
    }
  };

  useEffect(() => {
    setInitialPreferences(preferences);
    setCurrentPreferences(preferences);
  }, [preferences]);

  const isDirty = useMemo(
    () => JSON.stringify(initialPreferences) !== JSON.stringify(currentPreferences),
    [initialPreferences, currentPreferences],
  );

  const setNotificationField = (
    key: keyof Pick<UserPreferences, 'notificationEmail' | 'notificationSms' | 'notificationInApp'>,
    checked: boolean,
  ) => {
    setCurrentPreferences((prev) => ({ ...prev, [key]: checked }));
  };

  const setLanguage = (value: UserPreferences['language']) => {
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
      <Flex direction="column" gap="8" maxW="4xl" mx="auto">
        {/* Page Header */}
        <Flex direction="column" gap="2">
          <Heading size="lg" color="text.fg">
            Paramètres
          </Heading>
          <Text color="text.fg.muted">
            Ajustez vos préférences de compte pour adapter Unidox à votre utilisation.
          </Text>
        </Flex>

        {/* Notifications Section */}
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
              <Text color="text.fg.muted" fontSize="sm">
                Choisissez comment vous souhaitez être notifié.
              </Text>
            </Flex>

            {notificationToggles.map((toggle, index) => (
              <Box key={toggle.key}>
                <Flex align="center" justify="space-between" gap="4">
                  <Flex align="center" gap="3">
                    <Box color="text.fg.muted">
                      <toggle.icon size={20} />
                    </Box>
                    <Flex direction="column" gap="0.5">
                      <Text fontSize="sm" fontWeight="medium" color="text.fg">
                        {toggle.label}
                      </Text>
                      <Text fontSize="xs" color="text.fg.muted">
                        {toggle.description}
                      </Text>
                    </Flex>
                  </Flex>

                  <Tooltip content="Nous implémenterons cela à l'avenir">
                    <Box display="inline-block" cursor="not-allowed">
                      <Switch.Root
                        checked={currentPreferences[toggle.key]}
                        onCheckedChange={({ checked }) => setNotificationField(toggle.key, checked)}
                        disabled={true}
                        pointerEvents="none"
                      >
                        <Switch.HiddenInput />
                        <Switch.Control>
                          <Switch.Thumb />
                        </Switch.Control>
                      </Switch.Root>
                    </Box>
                  </Tooltip>
                </Flex>

                {/* Divider between toggles (not after the last one) */}
                {index < notificationToggles.length - 1 && (
                  <Box h="1px" w="full" bg="border.default" mt="6" />
                )}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Language Section */}
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
          px={{ base: '6', md: '8' }}
          py={{ base: '6', md: '8' }}
        >
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="1">
              <Heading size="md" color="text.fg">
                Langue
              </Heading>
              <Text color="text.fg.muted" fontSize="sm">
                Choisissez la langue d&apos;affichage de votre interface.
              </Text>
            </Flex>

            <Flex gap="3" wrap="wrap">
              {languageOptions.map((option) => {
                const isActive = currentPreferences.language === option.value;

                return (
                  <Tooltip key={option.value} content="Nous implémenterons cela à l'avenir">
                    <Box display="inline-block" cursor="not-allowed">
                      <Button
                        variant={isActive ? 'solid' : 'outline'}
                        colorPalette={isActive ? 'blue' : 'gray'}
                        onClick={() => setLanguage(option.value)}
                        disabled={true}
                        pointerEvents="none"
                      >
                        {option.label}
                      </Button>
                    </Box>
                  </Tooltip>
                );
              })}
            </Flex>
          </Flex>
        </Box>

        {/* Subscription Section */}
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
                Abonnement
              </Heading>
              <Text color="text.fg.muted" fontSize="sm">
                Gérez votre abonnement Unidox.
              </Text>
            </Flex>

            <Box>
              <Flex align="center" justify="space-between" gap="4">
                <Flex align="center" gap="3">
                  <Box color={isSubscribed ? 'primary.500' : 'text.fg.muted'}>
                    <LuCrown size={20} />
                  </Box>
                  <Flex direction="column" gap="0.5">
                    <Flex align="center" gap="2">
                      <Text fontSize="sm" fontWeight="medium" color="text.fg">
                        Plan actuel
                      </Text>
                      <Badge
                        colorPalette={planColors[userPlan]}
                        size="sm"
                        data-testid="plan-badge"
                      >
                        {planLabels[userPlan]}
                      </Badge>
                    </Flex>
                    <Text fontSize="xs" color="text.fg.muted">
                      {isSubscribed
                        ? 'Vous bénéficiez de toutes les fonctionnalités premium.'
                        : 'Passez à Premium pour débloquer toutes les fonctionnalités.'}
                    </Text>
                  </Flex>
                </Flex>

                {isSubscribed ? (
                  <Button
                    variant="outline"
                    colorPalette="red"
                    size="sm"
                    onClick={handleUnsubscribe}
                    disabled={isUnsubscribing}
                    data-testid="unsubscribe-btn"
                  >
                    {isUnsubscribing ? 'Résiliation...' : 'Se désabonner'}
                  </Button>
                ) : (
                  <Button
                    variant="solid"
                    colorPalette="blue"
                    size="sm"
                    onClick={() => router.push('/upgrade')}
                    data-testid="upgrade-settings-btn"
                  >
                    <LuCrown size={16} />
                    Passer à Premium
                  </Button>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>

        {/* Account Section */}
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
                Compte
              </Heading>
              <Text color="text.fg.muted" fontSize="sm">
                Gérez votre compte et vos données.
              </Text>
            </Flex>

            <Box>
              <Flex align="center" justify="space-between" gap="4">
                <Flex direction="column" gap="0.5">
                  <Text fontSize="sm" fontWeight="medium" color="text.fg">
                    Supprimer mon compte
                  </Text>
                  <Text fontSize="xs" color="text.fg.muted">
                    Cette action est irréversible. Toutes vos données seront supprimées.
                  </Text>
                </Flex>
                <Tooltip content="Nous implémenterons cela à l'avenir">
                  <Box display="inline-block" cursor="not-allowed">
                    <Button
                      variant="outline"
                      colorPalette="red"
                      size="sm"
                      disabled={true}
                      pointerEvents="none"
                    >
                      <LuTrash2 size={16} />
                      Supprimer
                    </Button>
                  </Box>
                </Tooltip>
              </Flex>
            </Box>
          </Flex>
        </Box>

        {/* Save / Cancel Actions */}
        <Flex justify="flex-end" gap="3">
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
  );
}
