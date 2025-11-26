import type { UserPreferences } from '@/shared/types/preferences';
import { UserPreferencesSchema as BaseUserPreferencesSchema } from '@/shared/types/preferences';

export const userPreferencesSchema = BaseUserPreferencesSchema;

export const defaultUserPreferences: UserPreferences = {
  notifications: true,
  language: 'fr',
};

export type { UserPreferences };
