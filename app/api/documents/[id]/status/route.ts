import { NextRequest, NextResponse } from 'next/server';
import { documentService } from '../../../../../src/features/documents/service';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId || !body.statut) {
    return NextResponse.json({ success: false, message: 'userId and statut are required' }, { status: 400 });
  }
  try {
    const updated = await documentService.updateDocumentStatus(id, body.userId, body.statut);
    return NextResponse.json({ success: true, message: 'Document status updated successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
