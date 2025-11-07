import { NextRequest, NextResponse } from 'next/server';
import { documentsController } from '@/features/documents';

export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  const { status, body } = await documentsController.updateStatus(req, ctx.params);
  return NextResponse.json(body, { status });
}
