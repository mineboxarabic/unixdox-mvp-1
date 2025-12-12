import { Flex, Text, Box } from '@chakra-ui/react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

interface ProfileFormProps {
    name: string;
    email: string | null;
    isPending: boolean;
    hasChanges: boolean;
    onNameChange: (name: string) => void;
    onSave: () => void;
}

export function ProfileForm({
    name,
    email,
    isPending,
    hasChanges,
    onNameChange,
    onSave,
}: ProfileFormProps) {
    return (
        <>
            {/* Name Section */}
            <Flex direction="column" gap={2}>
                <Text fontWeight="medium" color="text.fg">Nom complet</Text>
                <Input
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Votre nom"
                />
            </Flex>

            {/* Email Section (Read only) */}
            <Flex direction="column" gap={2}>
                <Text fontWeight="medium" color="text.fg">Email</Text>
                <Input
                    value={email || ''}
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
                    onClick={onSave}
                    loading={isPending}
                    disabled={isPending || !hasChanges}
                >
                    Sauvegarder
                </Button>
            </Flex>
        </>
    );
}
