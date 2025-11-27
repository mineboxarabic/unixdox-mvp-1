import { z } from 'zod';
import { DemarcheStatut, DemarcheCategorie } from '@prisma/client';

// Zod validation schemas
export const StartDemarcheSchema = z.object({
  modeleId: z.string().min(1, 'Le modèle de démarche est requis'),
  notes: z.string().optional(),
});

export const UpdateDemarcheSchema = z.object({
  statut: z.nativeEnum(DemarcheStatut).optional(),
  notes: z.string().optional(),
  complete: z.boolean().optional(),
  titre: z.string().optional(),
});

export const DemarcheFilterSchema = z.object({
  statut: z.nativeEnum(DemarcheStatut).optional(),
  categorie: z.nativeEnum(DemarcheCategorie).optional(),
  searchQuery: z.string().optional(),
});

// TypeScript interfaces
export interface DemarcheCardProps {
  id: string;
  titre: string;
  statut: DemarcheStatut;
  fileCount: number;
  dateDebut: Date;
  dateCompletion?: Date | null;
  categorie: DemarcheCategorie;
}

export interface DemarcheListItem {
  id: string;
  titre: string;
  description?: string | null;
  statut: DemarcheStatut;
  categorie: DemarcheCategorie;
  dateDebut: Date;
  dateCompletion?: Date | null;
  fileCount: number;
  complete: boolean;
  typesDocumentsRequis: string[];
}

export interface DemarcheStats {
  total: number;
  enCours: number;
  complete: number;
  abandonnee: number;
}

export interface DemarcheDocuments {
  [requirementName: string]: string; // Maps Requirement Name -> Document ID
}
