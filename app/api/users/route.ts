import { NextRequest, NextResponse } from 'next/server';
import { usersController } from '@/features/users';

export async function GET() {
  const { status, body } = await usersController.list();
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  const { status, body } = await usersController.create(req);
  return NextResponse.json(body, { status });
}
