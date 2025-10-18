import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document.service';
import { DocumentType, DocumentStatut } from '@prisma/client';

export class DocumentController {
  /**
   * GET /api/documents - Get all documents for a user
   */
  async getUserDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const documents = await documentService.getUserDocuments(userId);

      res.json({
        success: true,
        data: documents,
        count: documents.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/documents/search - Search documents
   */
  async searchDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, type, statut, tags, search } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const filters: any = {};
      if (type) filters.type = type as DocumentType;
      if (statut) filters.statut = statut as DocumentStatut;
      if (tags) filters.tags = Array.isArray(tags) ? tags : [tags];
      if (search) filters.search = search as string;

      const documents = await documentService.searchDocuments(userId, filters);

      res.json({
        success: true,
        data: documents,
        count: documents.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/documents/:id - Get document by ID
   */
  async getDocumentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      const document = await documentService.getDocumentById(
        id,
        userId as string | undefined
      );

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found',
        });
      }

      res.json({
        success: true,
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/documents - Create new document
   */
  async createDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const document = await documentService.createDocument(req.body);

      res.status(201).json({
        success: true,
        message: 'Document created successfully',
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/documents/:id - Update document
   */
  async updateDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const document = await documentService.updateDocument(id, userId, req.body);

      res.json({
        success: true,
        message: 'Document updated successfully',
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/documents/:id/status - Update document status
   */
  async updateDocumentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, statut } = req.body;

      if (!userId || !statut) {
        return res.status(400).json({
          success: false,
          message: 'userId and statut are required',
        });
      }

      const document = await documentService.updateDocumentStatus(id, userId, statut);

      res.json({
        success: true,
        message: 'Document status updated successfully',
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/documents/:id/tags - Add tags to document
   */
  async addTags(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, tags } = req.body;

      if (!userId || !tags || !Array.isArray(tags)) {
        return res.status(400).json({
          success: false,
          message: 'userId and tags array are required',
        });
      }

      const document = await documentService.addTags(id, userId, tags);

      res.json({
        success: true,
        message: 'Tags added successfully',
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/documents/:id/tags - Remove tags from document
   */
  async removeTags(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, tags } = req.body;

      if (!userId || !tags || !Array.isArray(tags)) {
        return res.status(400).json({
          success: false,
          message: 'userId and tags array are required',
        });
      }

      const document = await documentService.removeTags(id, userId, tags);

      res.json({
        success: true,
        message: 'Tags removed successfully',
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/documents/:id - Delete document
   */
  async deleteDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      await documentService.deleteDocument(id, userId);

      res.json({
        success: true,
        message: 'Document deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const documentController = new DocumentController();
