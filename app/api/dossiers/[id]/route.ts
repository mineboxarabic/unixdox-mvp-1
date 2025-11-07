import { NextRequest, NextResponse } from 'next/server';
import { dossiersController } from '@/features/dossiers';

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await dossiersController.get(req, ctx.params);
  return NextResponse.json(body, { status });
}

export async function PUT(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await dossiersController.update(req, ctx.params);
  return NextResponse.json(body, { status });
}

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await dossiersController.remove(req, ctx.params);
  return NextResponse.json(body, { status });
}
