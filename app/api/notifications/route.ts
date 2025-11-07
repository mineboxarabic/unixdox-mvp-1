import { NextRequest, NextResponse } from 'next/server';
import { notificationsController } from '@/src/features/notifications';

export async function GET(req: NextRequest) {
  const { status, body } = await notificationsController.list(req);
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  const { status, body } = await notificationsController.create(req);
  return NextResponse.json(body, { status });
}
