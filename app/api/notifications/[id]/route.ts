import { NextRequest, NextResponse } from 'next/server';
import { notificationsController } from '@/features/notifications';

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await notificationsController.get(req, ctx.params);
  return NextResponse.json(body, { status });
}

export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await notificationsController.markRead(req, ctx.params);
  return NextResponse.json(body, { status });
}

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await notificationsController.remove(req, ctx.params);
  return NextResponse.json(body, { status });
}
