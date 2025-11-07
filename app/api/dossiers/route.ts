import { NextRequest, NextResponse } from 'next/server';
import { dossiersController } from '@/features/dossiers';

export async function GET(req: NextRequest) {
  const { status, body } = await dossiersController.list(req);
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  const { status, body } = await dossiersController.create(req);
  return NextResponse.json(body, { status });
}
