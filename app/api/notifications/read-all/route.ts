import { NextRequest, NextResponse } from 'next/server';
import { notificationsController } from '@/src/features/notifications';

export async function PATCH(req: NextRequest) {
  const { status, body } = await notificationsController.markAllRead(req);
  return NextResponse.json(body, { status });
}
