import { DocumentType, DocumentStatut, DemarcheStatut } from "@prisma/client";

export interface SearchDocument {
  id: string;
  nomFichier: string;
  type: DocumentType;
  statut: DocumentStatut;
  updatedAt: Date;
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
