import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '../../../../src/features/notifications/service';

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const result = await notificationService.markAllAsRead(body.userId);
  return NextResponse.json({ success: true, message: 'All notifications marked as read', data: { count: result.count } });
}
