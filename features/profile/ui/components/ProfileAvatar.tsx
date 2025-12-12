import { Box, Flex, Icon } from '@chakra-ui/react';
import { Button } from '@/shared/components/ui/button';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { LuCamera } from 'react-icons/lu';

interface ProfileAvatarProps {
    name: string;
    imagePreview?: string | null;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTriggerInput: () => void;
}

export function ProfileAvatar({
    name,
    imagePreview,
    fileInputRef,
    onImageChange,
    onTriggerInput,
}: ProfileAvatarProps) {
    return (
        <Flex direction="column" gap={4} align="center">
            <Box position="relative" className="group">
                <ChakraAvatar.Root
                    size="2xl"
                    style={{ width: '128px', height: '128px', fontSize: '3rem' }}
                >
                    <ChakraAvatar.Image src={imagePreview || `/api/user/avatar`} />
                    <ChakraAvatar.Fallback name={name} />
                </ChakraAvatar.Root>
                <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    bg="blue.500"
                    color="white"
                    p={2}
                    borderRadius="full"
                    cursor="pointer"
                    onClick={onTriggerInput}
                    transition="all 0.2s"
                    _hover={{ bg: 'blue.600', transform: 'scale(1.1)' }}
                >
                    <Icon as={LuCamera} boxSize={5} />
                </Box>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </Box>
            <Button size="sm" variant="outline" onClick={onTriggerInput}>
                Changer la photo
            </Button>
        </Flex>
    );
}
