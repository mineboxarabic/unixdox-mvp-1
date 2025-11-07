import { z } from 'zod';
import { DocumentStatut } from '@prisma/client';

// Query validation for list endpoint
export const ListDocumentsQuerySchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

// Body validation for status update
export const UpdateDocumentStatusSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  statut: z.nativeEnum(DocumentStatut),
});

export type ListDocumentsQuery = z.infer<typeof ListDocumentsQuerySchema>;
export type UpdateDocumentStatusInput = z.infer<typeof UpdateDocumentStatusSchema>;
