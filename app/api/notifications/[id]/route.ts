import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '../../../../src/features/notifications/service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const userId = new URL(req.url).searchParams.get('userId') || undefined;
  const notification = await notificationService.getNotificationById(id, userId);
  if (!notification) return NextResponse.json({ success: false, message: 'Notification not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: notification });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const updated = await notificationService.markAsRead(id, body.userId);
  return NextResponse.json({ success: true, message: 'Notification marked as read', data: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  await notificationService.deleteNotification(id, body.userId);
  return NextResponse.json({ success: true, message: 'Notification deleted successfully' });
}
