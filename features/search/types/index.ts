import { DocumentType, DocumentStatut, DemarcheStatut } from "@prisma/client";

export interface SearchDocument {
  id: string;
  nomFichier: string;
  type: DocumentType;
  statut: DocumentStatut;
  updatedAt: Date;
  urlStockage?: string | null;
  size: number;
  tags: string[];
  dateExpiration?: Date | null;
}

export interface SearchDemarche {
  id: string;
  titre: string;
  statut: DemarcheStatut;
  updatedAt: Date;
}

export interface SearchData {
  documents: SearchDocument[];
  demarches: SearchDemarche[];
}
