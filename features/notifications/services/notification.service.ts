import { prisma } from '@/shared/config/prisma';
import { Notification, Prisma, NotificationType, NotificationPriorite } from '@prisma/client';

class NotificationService {
  async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    const where: Prisma.NotificationWhereInput = { idUser: userId };
    if (unreadOnly) where.lu = false;

    return prisma.notification.findMany({
      where,
      include: {
        documentLie: { select: { id: true, nomFichier: true, type: true } },
      },
      orderBy: [{ priorite: 'desc' }, { dateCreation: 'desc' }],
    });
  }

  async getNotificationById(id: string, userId?: string): Promise<Notification | null> {
    const where: Prisma.NotificationWhereInput = { id };
    if (userId) where.idUser = userId;

    return prisma.notification.findFirst({
      where,
      include: {
        documentLie: { select: { id: true, nomFichier: true, type: true } },
      },
    });
  }

  async createNotification(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    return prisma.notification.update({ where: { id, idUser: userId }, data: { lu: true } });
  }

  async markAllAsRead(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.notification.updateMany({ where: { idUser: userId, lu: false }, data: { lu: true } });
  }

  async deleteNotification(id: string, userId: string): Promise<Notification> {
    return prisma.notification.delete({ where: { id, idUser: userId } });
  }

  async deleteReadNotifications(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.notification.deleteMany({ where: { idUser: userId, lu: true } });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return prisma.notification.count({ where: { idUser: userId, lu: false } });
  }

  async getNotificationsByType(userId: string, type: NotificationType): Promise<Notification[]> {
    return prisma.notification.findMany({ where: { idUser: userId, type }, orderBy: { dateCreation: 'desc' } });
  }

  async getNotificationsByPriority(userId: string, priorite: NotificationPriorite): Promise<Notification[]> {
    return prisma.notification.findMany({ where: { idUser: userId, priorite }, orderBy: { dateCreation: 'desc' } });
  }
}

export const notificationService = new NotificationService();
