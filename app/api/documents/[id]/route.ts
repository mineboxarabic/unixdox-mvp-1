import { NextRequest, NextResponse } from 'next/server';
import { documentService } from '../../../../src/features/documents/service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const userId = new URL(req.url).searchParams.get('userId') || undefined;
  const doc = await documentService.getDocumentById(id, userId);
  if (!doc) return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: doc });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  try {
    const updated = await documentService.updateDocument(id, body.userId, body);
    return NextResponse.json({ success: true, message: 'Document updated successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  try {
    await documentService.deleteDocument(id, body.userId);
    return NextResponse.json({ success: true, message: 'Document deleted successfully' });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
