import { Router } from 'express';
import { documentController } from '../controllers/document.controller';

const router = Router();

/**
 * @route   GET /api/documents/search
 * @desc    Search documents
 * @access  Public (should be protected in production)
 */
router.get('/search', (req, res, next) => documentController.searchDocuments(req, res, next));

/**
 * @route   GET /api/documents
 * @desc    Get all documents for a user
 * @access  Public (should be protected in production)
 */
router.get('/', (req, res, next) => documentController.getUserDocuments(req, res, next));

/**
 * @route   GET /api/documents/:id
 * @desc    Get document by ID
 * @access  Public (should be protected in production)
 */
router.get('/:id', (req, res, next) => documentController.getDocumentById(req, res, next));

/**
 * @route   POST /api/documents
 * @desc    Create new document
 * @access  Public (should be protected in production)
 */
router.post('/', (req, res, next) => documentController.createDocument(req, res, next));

/**
 * @route   PUT /api/documents/:id
 * @desc    Update document
 * @access  Public (should be protected in production)
 */
router.put('/:id', (req, res, next) => documentController.updateDocument(req, res, next));

/**
 * @route   PATCH /api/documents/:id/status
 * @desc    Update document status
 * @access  Public (should be protected in production)
 */
router.patch('/:id/status', (req, res, next) => documentController.updateDocumentStatus(req, res, next));

/**
 * @route   POST /api/documents/:id/tags
 * @desc    Add tags to document
 * @access  Public (should be protected in production)
 */
router.post('/:id/tags', (req, res, next) => documentController.addTags(req, res, next));

/**
 * @route   DELETE /api/documents/:id/tags
 * @desc    Remove tags from document
 * @access  Public (should be protected in production)
 */
router.delete('/:id/tags', (req, res, next) => documentController.removeTags(req, res, next));

/**
 * @route   DELETE /api/documents/:id
 * @desc    Delete document
 * @access  Public (should be protected in production)
 */
router.delete('/:id', (req, res, next) => documentController.deleteDocument(req, res, next));

export default router;
