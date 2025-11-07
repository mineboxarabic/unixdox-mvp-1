import { NextRequest, NextResponse } from 'next/server';
import { notificationsController } from '@/src/features/notifications';

export async function GET(req: NextRequest) {
  const { status, body } = await notificationsController.unreadCount(req);
  return NextResponse.json(body, { status });
}
