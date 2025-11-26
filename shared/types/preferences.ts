import { z } from "zod";

const supportedLanguages = ["fr", "en"] as const;

export const UserPreferencesSchema = z.object({
  notifications: z.boolean().default(true),
  language: z.enum(supportedLanguages).default("fr"),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
