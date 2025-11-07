import { NextRequest, NextResponse } from 'next/server';
import { documentService } from '../../../../src/features/documents/service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });

  const type = searchParams.get('type') || undefined;
  const statut = searchParams.get('statut') || undefined;
  const tags = searchParams.getAll('tags');
  const search = searchParams.get('search') || undefined;

  const docs = await documentService.searchDocuments(userId, {
    type: type as any,
    statut: statut as any,
    tags: tags.length ? tags : undefined,
    search,
  });
  return NextResponse.json({ success: true, data: docs, count: docs.length });
}
