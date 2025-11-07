import { NextRequest, NextResponse } from 'next/server';
import { dossiersController } from '@/src/features/dossiers';

export async function POST(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await dossiersController.addDocuments(req, ctx.params);
  return NextResponse.json(body, { status });
}

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await dossiersController.removeDocuments(req, ctx.params);
  return NextResponse.json(body, { status });
}
