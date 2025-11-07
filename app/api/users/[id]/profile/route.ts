import { NextResponse } from 'next/server';
import { usersController } from '@/src/features/users';

export async function GET(_: Request, ctx: { params: { id: string } }) {
  const { status, body } = await usersController.profile(ctx.params);
  return NextResponse.json(body, { status });
}
