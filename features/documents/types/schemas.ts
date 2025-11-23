import { z } from 'zod';
import { DocumentStatut, DocumentType } from '@prisma/client';

// Query validation for list endpoint
export const ListDocumentsQuerySchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

// Body validation for status update
export const UpdateDocumentStatusSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  statut: z.nativeEnum(DocumentStatut),
});

export const CreateDocumentSchema = z.object({
  nomFichier: z.string().min(1, 'Le nom du fichier est requis'),
  type: z.nativeEnum(DocumentType),
  urlStockage: z.string().optional(),
  size: z.number().int().nonnegative(),
  tags: z.array(z.string()).optional(),
});

export type ListDocumentsQuery = z.infer<typeof ListDocumentsQuerySchema>;
export type UpdateDocumentStatusInput = z.infer<typeof UpdateDocumentStatusSchema>;
export type CreateDocumentInput = z.infer<typeof CreateDocumentSchema>;
