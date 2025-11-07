import { NextRequest, NextResponse } from 'next/server';
import { documentService } from '../../../../../features/documents/service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId || !Array.isArray(body.tags)) {
    return NextResponse.json({ success: false, message: 'userId and tags array are required' }, { status: 400 });
  }
  try {
    const updated = await documentService.addTags(id, body.userId, body.tags);
    return NextResponse.json({ success: true, message: 'Tags added successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId || !Array.isArray(body.tags)) {
    return NextResponse.json({ success: false, message: 'userId and tags array are required' }, { status: 400 });
  }
  try {
    const updated = await documentService.removeTags(id, body.userId, body.tags);
    return NextResponse.json({ success: true, message: 'Tags removed successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
