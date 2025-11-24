'use server';

import { revalidatePath } from 'next/cache';
import { notificationService } from './services/notification.service';
import { ActionResult } from '@/shared/types/actions';
import { requireAuth } from '@/features/auth/server';
import { Notification } from '@prisma/client';

export async function markNotificationAsRead(id: string): Promise<ActionResult<Notification>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const notification = await notificationService.markAsRead(id, userId);
    revalidatePath('/notifications');
    return { success: true, data: notification };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to mark notification as read' };
  }
}

export async function deleteNotification(id: string): Promise<ActionResult<Notification>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const notification = await notificationService.deleteNotification(id, userId);
    revalidatePath('/notifications');
    return { success: true, data: notification };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete notification' };
  }
}

export async function markAllNotificationsAsRead(): Promise<ActionResult<{ count: number }>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const result = await notificationService.markAllAsRead(userId);
    revalidatePath('/notifications');
    return { success: true, data: { count: result.count } };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to mark all as read' };
  }
}

export async function deleteReadNotifications(): Promise<ActionResult<{ count: number }>> {
  const session = await requireAuth();
  const userId = session.user?.id;

  if (!userId) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const result = await notificationService.deleteReadNotifications(userId);
    revalidatePath('/notifications');
    return { success: true, data: { count: result.count } };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete read notifications' };
  }
}
