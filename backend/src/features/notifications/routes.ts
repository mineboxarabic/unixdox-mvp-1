import { Router } from 'express';
import { notificationController } from './controller';

const router = Router();

/**
 * @route   GET /api/notifications/unread-count
 * @desc    Get unread notification count
 * @access  Public (should be protected in production)
 */
router.get('/unread-count', (req, res, next) => notificationController.getUnreadCount(req, res, next));

/**
 * @route   PATCH /api/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Public (should be protected in production)
 */
router.patch('/read-all', (req, res, next) => notificationController.markAllAsRead(req, res, next));

/**
 * @route   DELETE /api/notifications/read
 * @desc    Delete all read notifications
 * @access  Public (should be protected in production)
 */
router.delete('/read', (req, res, next) => notificationController.deleteReadNotifications(req, res, next));

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for a user
 * @access  Public (should be protected in production)
 */
router.get('/', (req, res, next) => notificationController.getUserNotifications(req, res, next));

/**
 * @route   GET /api/notifications/:id
 * @desc    Get notification by ID
 * @access  Public (should be protected in production)
 */
router.get('/:id', (req, res, next) => notificationController.getNotificationById(req, res, next));

/**
 * @route   POST /api/notifications
 * @desc    Create new notification
 * @access  Public (should be protected in production)
 */
router.post('/', (req, res, next) => notificationController.createNotification(req, res, next));

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Public (should be protected in production)
 */
router.patch('/:id/read', (req, res, next) => notificationController.markAsRead(req, res, next));

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete notification
 * @access  Public (should be protected in production)
 */
router.delete('/:id', (req, res, next) => notificationController.deleteNotification(req, res, next));

export default router;
