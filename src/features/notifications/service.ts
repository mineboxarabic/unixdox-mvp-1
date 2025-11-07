import { prisma } from '../../config/prisma';
import { Notification, Prisma, NotificationType, NotificationPriorite } from '@prisma/client';

class NotificationService {
  async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    const where: Prisma.NotificationWhereInput = { idUser: userId } as any;
    if (unreadOnly) (where as any).lu = false;

    return prisma.notification.findMany({
      where,
      include: {
        documentLie: { select: { id: true, nomFichier: true, type: true } },
      },
      orderBy: [{ priorite: 'desc' }, { dateCreation: 'desc' }],
    });
  }

  async getNotificationById(id: string, userId?: string): Promise<Notification | null> {
    const where: Prisma.NotificationWhereInput = { id } as any;
    if (userId) (where as any).idUser = userId;

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
    return prisma.notification.update({ where: { id, idUser: userId } as any, data: { lu: true } });
  }

  async markAllAsRead(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.notification.updateMany({ where: { idUser: userId, lu: false }, data: { lu: true } });
  }

  async deleteNotification(id: string, userId: string): Promise<Notification> {
    return prisma.notification.delete({ where: { id, idUser: userId } as any });
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
