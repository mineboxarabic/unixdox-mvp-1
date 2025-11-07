import { z } from 'zod';

export const UserCreateSchema = z.object({
  email: z.string().email(),
  nom: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
}).passthrough();

export const UserUpdateSchema = z.object({
  email: z.string().email().optional(),
  nom: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
}).passthrough();
