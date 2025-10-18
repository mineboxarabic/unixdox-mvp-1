import { Request } from 'express';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  nom: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

// Filter types
export interface DocumentFilters {
  type?: string;
  statut?: string;
  tags?: string[];
  search?: string;
}

// Export all Prisma types and enums
export {
  User,
  Document,
  Dossier,
  ModeleDemarche,
  DemarcheUtilisateur,
  Notification,
  DocumentType,
  DocumentStatut,
  NotificationType,
  NotificationPriorite,
  DemarcheStatut,
  DemarcheCategorie
} from '@prisma/client';

// Export Prisma namespace for advanced types
export type { Prisma } from '@prisma/client';
