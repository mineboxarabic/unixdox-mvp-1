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
