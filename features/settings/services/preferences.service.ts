import { prisma } from '@/shared/config/prisma';
import type { UserPreferences } from '../types/schemas';
import { defaultUserPreferences, userPreferencesSchema } from '../types/schemas';

class PreferencesService {
  async getPreferences(userId: string): Promise<UserPreferences> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true },
    });

    if (!user?.preferences) {
      return { ...defaultUserPreferences };
    }

    const parsedPreferences = userPreferencesSchema.partial().safeParse(user.preferences);

    if (!parsedPreferences.success) {
      return { ...defaultUserPreferences };
    }

    return {
      ...defaultUserPreferences,
      ...parsedPreferences.data,
    };
  }

  async updatePreferences(userId: string, preferences: UserPreferences) {
    const sanitizedPreferences = userPreferencesSchema.parse(preferences);

    await prisma.user.update({
      where: { id: userId },
      data: { preferences: sanitizedPreferences },
      select: { id: true },
    });
  }
}

export const preferencesService = new PreferencesService();
