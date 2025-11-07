import { z } from 'zod';

export const UserIdParamSchema = z.object({ userId: z.string().min(1, 'userId is required') });

export const MarkReadSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

export const DeleteReadSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

export const MarkAllReadSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});
