import { Router } from 'express';
import { dossierController } from './controller';

const router = Router();

/**
 * @route   GET /api/dossiers/stats
 * @desc    Get dossier statistics
 * @access  Public (should be protected in production)
 */
router.get('/stats', (req, res, next) => dossierController.getDossierStats(req, res, next));

/**
 * @route   GET /api/dossiers
 * @desc    Get all dossiers for a user
 * @access  Public (should be protected in production)
 */
router.get('/', (req, res, next) => dossierController.getUserDossiers(req, res, next));

/**
 * @route   GET /api/dossiers/:id
 * @desc    Get dossier by ID
 * @access  Public (should be protected in production)
 */
router.get('/:id', (req, res, next) => dossierController.getDossierById(req, res, next));

/**
 * @route   POST /api/dossiers
 * @desc    Create new dossier
 * @access  Public (should be protected in production)
 */
router.post('/', (req, res, next) => dossierController.createDossier(req, res, next));

/**
 * @route   PUT /api/dossiers/:id
 * @desc    Update dossier
 * @access  Public (should be protected in production)
 */
router.put('/:id', (req, res, next) => dossierController.updateDossier(req, res, next));

/**
 * @route   POST /api/dossiers/:id/documents
 * @desc    Add documents to dossier
 * @access  Public (should be protected in production)
 */
router.post('/:id/documents', (req, res, next) => dossierController.addDocuments(req, res, next));

/**
 * @route   DELETE /api/dossiers/:id/documents
 * @desc    Remove documents from dossier
 * @access  Public (should be protected in production)
 */
router.delete('/:id/documents', (req, res, next) => dossierController.removeDocuments(req, res, next));

/**
 * @route   DELETE /api/dossiers/:id
 * @desc    Delete dossier
 * @access  Public (should be protected in production)
 */
router.delete('/:id', (req, res, next) => dossierController.deleteDossier(req, res, next));

export default router;
