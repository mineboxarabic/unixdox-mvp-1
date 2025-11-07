import { NextRequest } from 'next/server';
import { notificationService } from '../service';
import {
  UserIdParamSchema,
  MarkReadSchema,
  DeleteReadSchema,
  MarkAllReadSchema,
} from '../model/schema.zod';

type HttpResult = { status: number; body: any };

export const notificationsController = {
  async list(req: NextRequest): Promise<HttpResult> {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const unreadOnly = url.searchParams.get('unreadOnly') === 'true';
    const parsed = UserIdParamSchema.safeParse({ userId });
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const notifications = await notificationService.getUserNotifications(parsed.data.userId, unreadOnly);
    return { status: 200, body: { success: true, data: notifications, count: notifications.length } };
  },
  async create(req: NextRequest): Promise<HttpResult> {
    const body = await req.json();
    try {
      const notification = await notificationService.createNotification(body);
      return { status: 201, body: { success: true, message: 'Notification created successfully', data: notification } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async get(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId') || undefined;
    const notification = await notificationService.getNotificationById(params.id, userId);
    if (!notification) return { status: 404, body: { success: false, message: 'Notification not found' } };
    return { status: 200, body: { success: true, data: notification } };
  },
  async markRead(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = MarkReadSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const updated = await notificationService.markAsRead(params.id, parsed.data.userId);
    return { status: 200, body: { success: true, message: 'Notification marked as read', data: updated } };
  },
  async remove(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = MarkReadSchema.safeParse(body); // same structure (userId)
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    await notificationService.deleteNotification(params.id, parsed.data.userId);
    return { status: 200, body: { success: true, message: 'Notification deleted successfully' } };
  },
  async unreadCount(req: NextRequest): Promise<HttpResult> {
    const url = new URL(req.url);
    const parsed = UserIdParamSchema.safeParse({ userId: url.searchParams.get('userId') });
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const count = await notificationService.getUnreadCount(parsed.data.userId);
    return { status: 200, body: { success: true, data: { count } } };
  },
  async markAllRead(req: NextRequest): Promise<HttpResult> {
    const body = await req.json();
    const parsed = MarkAllReadSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const result = await notificationService.markAllAsRead(parsed.data.userId);
    return { status: 200, body: { success: true, message: 'All notifications marked as read', data: { count: result.count } } };
  },
  async deleteRead(req: NextRequest): Promise<HttpResult> {
    const body = await req.json();
    const parsed = DeleteReadSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const result = await notificationService.deleteReadNotifications(parsed.data.userId);
    return { status: 200, body: { success: true, message: 'Read notifications deleted successfully', data: { count: result.count } } };
  },
};
