import { DocumentType, DocumentStatut, DemarcheStatut } from "@prisma/client";

export interface Procedure {
  id: string;
  title: string;
  status: "en-cours" | "terminée" | "en-attente";
  date: Date;
  type?: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: Date;
  status: "À venir" | "Urgent";
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType | string;
  uploadedAt: Date;
  size?: number;
  status: DocumentStatut | string;
  tags: string[];
  expirationDate?: Date | null;
  url?: string;
  // Add other fields that might be present in Prisma Document if needed
  nomFichier?: string;
  dateExpiration?: Date | null;
}

export interface Demarche {
  id: string;
  idUtilisateur: string;
  idModele: string;
  complete: boolean;
  dateDebut: Date;
  dateCompletion: Date | null;
  statut: DemarcheStatut;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  modele: {
    titre: string;
  };
}

export interface HomeData {
  recentProcedures: Procedure[];
  upcomingDeadlines: Deadline[];
  recentDocuments: Document[];
  recentDemarches: Demarche[];
  isPremiumUser: boolean;
  automaticDemarchesCount?: number;
  automaticDemarchesTotal?: number;
}
