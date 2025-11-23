import { z } from 'zod';

export const UserIdParamSchema = z.object({ userId: z.string().min(1, 'userId is required') });

export const CreateDossierSchema = z.object({
  nom: z.string().min(1, 'Le nom du dossier est requis'),
  couleur: z.string().optional(),
  icone: z.string().optional(),
});

export const DossierUpdateSchema = z.object({
  nom: z.string().optional(),
  couleur: z.string().optional(),
  icone: z.string().optional(),
});

export const DossierDeleteSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
});

export const DossierAddRemoveDocumentsSchema = z.object({
  documentIds: z.array(z.string()).min(1, 'documentIds cannot be empty'),
});
