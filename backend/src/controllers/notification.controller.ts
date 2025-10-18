import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../services/notification.service';
import { NotificationType, NotificationPriorite } from '@prisma/client';

export class NotificationController {
  /**
   * GET /api/notifications - Get all notifications for a user
   */
  async getUserNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, unreadOnly } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const notifications = await notificationService.getUserNotifications(
        userId,
        unreadOnly === 'true'
      );

      res.json({
        success: true,
        data: notifications,
        count: notifications.length,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/notifications/unread-count - Get unread notification count
   */
  async getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const count = await notificationService.getUnreadCount(userId);

      res.json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/notifications/:id - Get notification by ID
   */
  async getNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      const notification = await notificationService.getNotificationById(
        id,
        userId as string | undefined
      );

      if (!notification) {
        return res.status(404).json({
          success: false,
          message: 'Notification not found',
        });
      }

      res.json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/notifications - Create new notification
   */
  async createNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await notificationService.createNotification(req.body);

      res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/notifications/:id/read - Mark notification as read
   */
  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const notification = await notificationService.markAsRead(id, userId);

      res.json({
        success: true,
        message: 'Notification marked as read',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/notifications/read-all - Mark all notifications as read
   */
  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const result = await notificationService.markAllAsRead(userId);

      res.json({
        success: true,
        message: 'All notifications marked as read',
        data: { count: result.count },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/notifications/:id - Delete notification
   */
  async deleteNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      await notificationService.deleteNotification(id, userId);

      res.json({
        success: true,
        message: 'Notification deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/notifications/read - Delete all read notifications
   */
  async deleteReadNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'userId is required',
        });
      }

      const result = await notificationService.deleteReadNotifications(userId);

      res.json({
        success: true,
        message: 'Read notifications deleted successfully',
        data: { count: result.count },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();
