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
  type: string;
  uploadedAt: Date;
  size?: number;
  status: string;
  tags: string[];
  expirationDate?: Date | null;
}

export interface HomeData {
  recentProcedures: Procedure[];
  upcomingDeadlines: Deadline[];
  recentDocuments: Document[];
  isPremiumUser: boolean;
}
