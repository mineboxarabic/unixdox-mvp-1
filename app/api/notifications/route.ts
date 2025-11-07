import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '../../../src/features/notifications/service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const unreadOnly = searchParams.get('unreadOnly') === 'true';
  if (!userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const notifications = await notificationService.getUserNotifications(userId, unreadOnly);
  return NextResponse.json({ success: true, data: notifications, count: notifications.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const notification = await notificationService.createNotification(body);
    return NextResponse.json({ success: true, message: 'Notification created successfully', data: notification }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
