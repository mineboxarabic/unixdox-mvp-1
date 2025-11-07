import { NextRequest, NextResponse } from 'next/server';
import { usersController } from '@/src/features/users';

export async function GET(_: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await usersController.get(ctx.params);
  return NextResponse.json(body, { status });
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await usersController.update(req, ctx.params);
  return NextResponse.json(body, { status });
}

export async function DELETE(_: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await usersController.remove(ctx.params);
  return NextResponse.json(body, { status });
}
