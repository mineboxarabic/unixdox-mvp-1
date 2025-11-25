'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { preferencesService } from './services/preferences.service';
import { userPreferencesSchema } from './types/schemas';

export async function updatePreferencesAction(data: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const parsed = userPreferencesSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Préférences invalides.' };
  }

  try {
    await preferencesService.updatePreferences(session.user.id, parsed.data);
  } catch (error) {
    console.error('Failed to update user preferences', error);
    return { error: 'Impossible de mettre à jour vos préférences pour le moment.' };
  }

  return { success: true, preferences: parsed.data };
}
