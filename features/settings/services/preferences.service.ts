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

  async updatePreferences(userId: string, preferences: UserPreferences): Promise<boolean> {
    const sanitizedPreferences = userPreferencesSchema.parse(preferences);

    const result = await prisma.user.updateMany({
      where: { id: userId },
      data: { preferences: sanitizedPreferences },
    });

    return result.count > 0;
  }
}

export const preferencesService = new PreferencesService();
