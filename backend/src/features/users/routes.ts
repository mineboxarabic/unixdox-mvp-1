import { Router } from 'express';
import { userController } from './controller';

const router = Router();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public (should be protected in production)
 */
router.get('/', (req, res, next) => userController.getAllUsers(req, res, next));

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public (should be protected in production)
 */
router.get('/:id', (req, res, next) => userController.getUserById(req, res, next));

/**
 * @route   GET /api/users/:id/profile
 * @desc    Get user profile with documents
 * @access  Public (should be protected in production)
 */
router.get('/:id/profile', (req, res, next) => userController.getUserProfile(req, res, next));

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Public
 */
router.post('/', (req, res, next) => userController.createUser(req, res, next));

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Public (should be protected in production)
 */
router.put('/:id', (req, res, next) => userController.updateUser(req, res, next));

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Public (should be protected in production)
 */
router.delete('/:id', (req, res, next) => userController.deleteUser(req, res, next));

export default router;
