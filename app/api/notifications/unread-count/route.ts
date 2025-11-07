import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '../../../../src/features/notifications/service';

export async function GET(req: NextRequest) {
  const userId = new URL(req.url).searchParams.get('userId');
  if (!userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const count = await notificationService.getUnreadCount(userId);
  return NextResponse.json({ success: true, data: { count } });
}
