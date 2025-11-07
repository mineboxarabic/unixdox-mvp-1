import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '../../../../src/features/notifications/service';

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const result = await notificationService.deleteReadNotifications(body.userId);
  return NextResponse.json({ success: true, message: 'Read notifications deleted successfully', data: { count: result.count } });
}
