import { prisma } from '../../config/prisma';
import { Notification, Prisma, NotificationType, NotificationPriorite } from '@prisma/client';

export class NotificationService {
  /**
   * Get all notifications for a user
   */
  async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    const where: Prisma.NotificationWhereInput = { idUser: userId } as any;
    
    if (unreadOnly) {
      (where as any).lu = false;
    }

    return prisma.notification.findMany({
      where,
      include: {
        documentLie: {
          select: {
            id: true,
            nomFichier: true,
            type: true,
          },
        },
      },
      orderBy: [
        { priorite: 'desc' },
        { dateCreation: 'desc' },
      ],
    });
  }

  /**
   * Get notification by ID
   */
  async getNotificationById(id: string, userId?: string): Promise<Notification | null> {
    const where: Prisma.NotificationWhereInput = { id } as any;
    if (userId) {
      (where as any).idUser = userId;
    }

    return prisma.notification.findFirst({
      where,
      include: {
        documentLie: {
          select: {
            id: true,
            nomFichier: true,
            type: true,
          },
        },
      },
    });
  }

  /**
   * Create new notification
   */
  async createNotification(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return prisma.notification.create({
      data,
    });
  }

  /**
   * Mark notification as read
   */
  async markAsRead(id: string, userId: string): Promise<Notification> {
    return prisma.notification.update({
      where: { 
        id,
        idUser: userId,
      } as any,
      data: { lu: true },
    });
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.notification.updateMany({
      where: { 
        idUser: userId,
        lu: false,
      },
      data: { lu: true },
    });
  }

  /**
   * Delete notification
   */
  async deleteNotification(id: string, userId: string): Promise<Notification> {
    return prisma.notification.delete({
      where: { 
        id,
        idUser: userId,
      } as any,
    });
  }

  /**
   * Delete all read notifications
   */
  async deleteReadNotifications(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.notification.deleteMany({
      where: { 
        idUser: userId,
        lu: true,
      },
    });
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId: string): Promise<number> {
    return prisma.notification.count({
      where: { 
        idUser: userId,
        lu: false,
      },
    });
  }

  /**
   * Get notifications by type
   */
  async getNotificationsByType(userId: string, type: NotificationType): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: {
        idUser: userId,
        type,
      },
      orderBy: { dateCreation: 'desc' },
    });
  }

  /**
   * Get notifications by priority
   */
  async getNotificationsByPriority(userId: string, priorite: NotificationPriorite): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: {
        idUser: userId,
        priorite,
      },
      orderBy: { dateCreation: 'desc' },
    });
  }
}

export const notificationService = new NotificationService();
