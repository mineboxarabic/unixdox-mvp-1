import { prisma } from '../config/prisma';
import { Document, Prisma, DocumentType, DocumentStatut } from '@prisma/client';

export class DocumentService {
  /**
   * Get all documents for a user
   */
  async getUserDocuments(userId: string): Promise<Document[]> {
    return prisma.document.findMany({
      where: { idProprietaire: userId },
      orderBy: { dateUpload: 'desc' },
    });
  }

  /**
   * Get document by ID
   */
  async getDocumentById(id: string, userId?: string): Promise<Document | null> {
    const where: Prisma.DocumentWhereInput = { id };
    if (userId) {
      where.idProprietaire = userId;
    }

    return prisma.document.findFirst({
      where,
      include: {
        proprietaire: {
          select: {
            id: true,
            nom: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Create new document
   */
  async createDocument(data: Prisma.DocumentCreateInput): Promise<Document> {
    return prisma.document.create({
      data,
      include: {
        proprietaire: {
          select: {
            id: true,
            nom: true,
            email: true,
          },
        },
      },
    });
  }

  /**
   * Update document
   */
  async updateDocument(id: string, userId: string, data: Prisma.DocumentUpdateInput): Promise<Document> {
    return prisma.document.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data,
    });
  }

  /**
   * Delete document
   */
  async deleteDocument(id: string, userId: string): Promise<Document> {
    return prisma.document.delete({
      where: { 
        id,
        idProprietaire: userId,
      },
    });
  }

  /**
   * Search documents by filters
   */
  async searchDocuments(
    userId: string,
    filters: {
      type?: DocumentType;
      statut?: DocumentStatut;
      tags?: string[];
      search?: string;
    }
  ): Promise<Document[]> {
    const where: Prisma.DocumentWhereInput = {
      idProprietaire: userId,
    };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.statut) {
      where.statut = filters.statut;
    }

    if (filters.tags && filters.tags.length > 0) {
      where.tags = {
        hasSome: filters.tags,
      };
    }

    if (filters.search) {
      where.nomFichier = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    return prisma.document.findMany({
      where,
      orderBy: { dateUpload: 'desc' },
    });
  }

  /**
   * Get documents by type
   */
  async getDocumentsByType(userId: string, type: DocumentType): Promise<Document[]> {
    return prisma.document.findMany({
      where: {
        idProprietaire: userId,
        type,
      },
      orderBy: { dateUpload: 'desc' },
    });
  }

  /**
   * Get documents by status
   */
  async getDocumentsByStatus(userId: string, statut: DocumentStatut): Promise<Document[]> {
    return prisma.document.findMany({
      where: {
        idProprietaire: userId,
        statut,
      },
      orderBy: { dateUpload: 'desc' },
    });
  }

  /**
   * Update document status
   */
  async updateDocumentStatus(id: string, userId: string, statut: DocumentStatut): Promise<Document> {
    return prisma.document.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data: { statut },
    });
  }

  /**
   * Add tags to document
   */
  async addTags(id: string, userId: string, tags: string[]): Promise<Document> {
    const document = await this.getDocumentById(id, userId);
    if (!document) throw new Error('Document not found');

    const updatedTags = [...new Set([...document.tags, ...tags])];

    return prisma.document.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data: { tags: updatedTags },
    });
  }

  /**
   * Remove tags from document
   */
  async removeTags(id: string, userId: string, tags: string[]): Promise<Document> {
    const document = await this.getDocumentById(id, userId);
    if (!document) throw new Error('Document not found');

    const updatedTags = document.tags.filter(tag => !tags.includes(tag));

    return prisma.document.update({
      where: { 
        id,
        idProprietaire: userId,
      },
      data: { tags: updatedTags },
    });
  }
}

export const documentService = new DocumentService();
