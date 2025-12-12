import { useState, useTransition, useRef } from 'react';
import { toaster } from '@/shared/components/ui/toaster';
import { updateCurrentUser } from '@/features/users/actions';
import { resizeImage } from '@/shared/utils/image-utils';
import { useSession } from 'next-auth/react';

interface UseProfileProps {
    initialUser: {
        name?: string | null;
        image?: string | null;
        email?: string | null;
    };
}

export function useProfile({ initialUser }: UseProfileProps) {
    const [name, setName] = useState(initialUser.name || '');
    const [imagePreview, setImagePreview] = useState<string | null>(initialUser.image || null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { update } = useSession();

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
                // Update session so sidebar reflects the change immediately
                await update();

                // If image was updated, clean up base64 state
                if (imageBase64) {
                    setImageBase64(null);
                }

                toaster.create({
                    title: 'Profil mis à jour',
                    type: 'success',
                });
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

    return {
        state: {
            name,
            imagePreview,
            isPending,
            hasChanges: name !== initialUser.name || !!imageBase64,
        },
        refs: {
            fileInputRef,
        },
        actions: {
            setName,
            handleImageChange,
            handleSave,
            triggerFileInput,
        },
    };
}
