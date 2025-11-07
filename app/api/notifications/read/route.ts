import { NextRequest, NextResponse } from 'next/server';
import { notificationsController } from '@/features/notifications';

export async function DELETE(req: NextRequest) {
  const { status, body } = await notificationsController.deleteRead(req);
  return NextResponse.json(body, { status });
}
