'use client';

import { useState, useTransition, useRef } from 'react';
import { Box, Flex, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { toaster } from '@/shared/components/ui/toaster';
import { Avatar } from '@/shared/components/ui/avatar';
import { updateCurrentUser } from '@/features/users/actions';
import { LuCamera } from 'react-icons/lu';

interface ProfilePageProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [name, setName] = useState(user.name || '');
  const [imagePreview, setImagePreview] = useState<string | null>(user.image || null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toaster.create({
        title: 'Image too large',
        description: 'Please select an image under 5MB',
        type: 'error',
      });
      return;
    }

    try {
      const resizedBase64 = await resizeImage(file);
      setImagePreview(resizedBase64);
      setImageBase64(resizedBase64);
    } catch (error) {
      console.error(error);
      toaster.create({
        title: 'Error processing image',
        type: 'error',
      });
    }
  };

  const handleSave = () => {
    startTransition(async () => {
      const payload: { name: string; image?: string } = { name };
      if (imageBase64) {
        payload.image = imageBase64;
      }

      const result = await updateCurrentUser(payload);

      if (result.success) {
        toaster.create({
          title: 'Profil mis à jour',
          type: 'success',
        });
        // Reset base64 state as it's now saved
        setImageBase64(null);
      } else {
        toaster.create({
          title: 'Erreur',
          description: result.error,
          type: 'error',
        });
      }
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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

            {/* Profile Picture Section */}
            <Flex direction="column" gap={4} align="center">
              <Box position="relative" group>
                <Avatar
                  name={user.name || 'User'}
                  src={imagePreview || undefined}
                  size="2xl"
                  css={{
                    width: '128px',
                    height: '128px',
                    fontSize: '3rem'
                  }}
                />
                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  bg="blue.500"
                  color="white"
                  p={2}
                  borderRadius="full"
                  cursor="pointer"
                  onClick={triggerFileInput}
                  transition="all 0.2s"
                  _hover={{ bg: 'blue.600', transform: 'scale(1.1)' }}
                >
                  <Icon as={LuCamera} boxSize={5} />
                </Box>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </Box>
              <Button size="sm" variant="outline" onClick={triggerFileInput}>
                Changer la photo
              </Button>
            </Flex>

            <Box h="1px" bg="border.default" />

            {/* Name Section */}
            <Flex direction="column" gap={2}>
              <Text fontWeight="medium" color="text.fg">Nom complet</Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
              />
            </Flex>

            {/* Email Section (Read only) */}
            <Flex direction="column" gap={2}>
              <Text fontWeight="medium" color="text.fg">Email</Text>
              <Input
                value={user.email || ''}
                readOnly
                bg="bg.muted"
                color="text.fg.muted"
                cursor="not-allowed"
              />
              <Text fontSize="xs" color="text.fg.muted">
                L'adresse email ne peut pas être modifiée pour le moment.
              </Text>
            </Flex>

            {/* Save Button */}
            <Flex justify="flex-end" pt={4}>
              <Button
                onClick={handleSave}
                loading={isPending}
                disabled={isPending || (name === user.name && !imageBase64)}
              >
                Sauvegarder
              </Button>
            </Flex>

          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
           ctx.drawImage(img, 0, 0, width, height);
           resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
           reject(new Error("Could not get canvas context"));
        }
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
