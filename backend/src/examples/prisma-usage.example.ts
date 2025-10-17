/**
 * Example: How to use Prisma with auto-generated Zod schemas
 * 
 * All your validation schemas are auto-generated in: src/generated/zod/
 * All your Prisma types are available from: @prisma/client
 */

import { prisma } from '../config/prisma';
import { UserCreateInputSchema, UserUpdateInputSchema } from '../generated/zod';
import type { User, DocumentType } from '@prisma/client';

// Example: Create a user with validation
export async function createUserExample(data: unknown) {
  // Validate input using auto-generated Zod schema
  const validatedData = UserCreateInputSchema.parse(data);
  
  // Create user with Prisma
  const user = await prisma.user.create({
    data: validatedData,
  });
  
  return user;
}

// Example: Update a user
export async function updateUserExample(id: string, data: unknown) {
  const validatedData = UserUpdateInputSchema.parse(data);
  
  const user = await prisma.user.update({
    where: { id },
    data: validatedData,
  });
  
  return user;
}

// Example: Find users with relations
export async function getUserWithDocuments(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      documents: true,
      dossiers: true,
      notifications: {
        where: { lu: false },
        orderBy: { dateCreation: 'desc' },
      },
    },
  });
  
  return user;
}

// Example: Type-safe queries with Prisma
export async function getDocumentsByType(userId: string, type: DocumentType) {
  const documents = await prisma.document.findMany({
    where: {
      idProprietaire: userId,
      type,
      statut: 'VERIFIE',
    },
    orderBy: {
      dateUpload: 'desc',
    },
  });
  
  return documents;
}

/**
 * Available auto-generated Zod schemas in src/generated/zod/:
 * - UserCreateInputSchema
 * - UserUpdateInputSchema
 * - DocumentCreateInputSchema
 * - DocumentUpdateInputSchema
 * - DossierCreateInputSchema
 * - NotificationCreateInputSchema
 * - ModeleDemarcheCreateInputSchema
 * - DemarcheUtilisateurCreateInputSchema
 * And many more...
 */
