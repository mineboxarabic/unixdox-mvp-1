import { NextRequest, NextResponse } from 'next/server';
import { documentsController } from '@/features/documents';

export async function GET(req: NextRequest) {
  const { status, body } = await documentsController.list(req);
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  const { status, body } = await documentsController.create(req);
  return NextResponse.json(body, { status });
}
