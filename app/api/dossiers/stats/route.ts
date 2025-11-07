import { NextRequest, NextResponse } from 'next/server';
import { dossiersController } from '@/src/features/dossiers';

export async function GET(req: NextRequest) {
  const { status, body } = await dossiersController.stats(req);
  return NextResponse.json(body, { status });
}
