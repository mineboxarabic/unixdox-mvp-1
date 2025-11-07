import { z } from 'zod';

export const UserIdParamSchema = z.object({ userId: z.string().min(1, 'userId is required') });

export const DossierUpdateSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
}).passthrough();

export const DossierDeleteSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

export const DossierAddRemoveDocumentsSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  documentIds: z.array(z.string()).min(1, 'documentIds cannot be empty'),
});
