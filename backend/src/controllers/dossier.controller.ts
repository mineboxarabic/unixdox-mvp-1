import { Request, Response, NextFunction } from 'express';
import { dossierService } from '../services/dossier.service';

export class DossierController {
  /**
   * GET /api/dossiers - Get all dossiers for a user
   */
  async getUserDossiers(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const dossiers = await dossierService.getUserDossiers(userId);

      res.json({
        success: true,
        data: dossiers,
        count: dossiers.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/dossiers/stats - Get dossier statistics
   */
  async getDossierStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const stats = await dossierService.getDossierStats(userId);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/dossiers/:id - Get dossier by ID
   */
  async getDossierById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      const dossier = await dossierService.getDossierById(
        id,
        userId as string | undefined
      );

      if (!dossier) {
        return res.status(404).json({
          success: false,
          message: 'Dossier not found',
        });
      }

      res.json({
        success: true,
        data: dossier,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/dossiers - Create new dossier
   */
  async createDossier(req: Request, res: Response, next: NextFunction) {
    try {
      const dossier = await dossierService.createDossier(req.body);

      res.status(201).json({
        success: true,
        message: 'Dossier created successfully',
        data: dossier,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/dossiers/:id - Update dossier
   */
  async updateDossier(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const dossier = await dossierService.updateDossier(id, userId, req.body);

      res.json({
        success: true,
        message: 'Dossier updated successfully',
        data: dossier,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/dossiers/:id/documents - Add documents to dossier
   */
  async addDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, documentIds } = req.body;

      if (!userId || !documentIds || !Array.isArray(documentIds)) {
        return res.status(400).json({
          success: false,
          message: 'userId and documentIds array are required',
        });
      }

      const dossier = await dossierService.addDocuments(id, userId, documentIds);

      res.json({
        success: true,
        message: 'Documents added successfully',
        data: dossier,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/dossiers/:id/documents - Remove documents from dossier
   */
  async removeDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId, documentIds } = req.body;

      if (!userId || !documentIds || !Array.isArray(documentIds)) {
        return res.status(400).json({
          success: false,
          message: 'userId and documentIds array are required',
        });
      }

      const dossier = await dossierService.removeDocuments(id, userId, documentIds);

      res.json({
        success: true,
        message: 'Documents removed successfully',
        data: dossier,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/dossiers/:id - Delete dossier
   */
  async deleteDossier(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      await dossierService.deleteDossier(id, userId);

      res.json({
        success: true,
        message: 'Dossier deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const dossierController = new DossierController();
