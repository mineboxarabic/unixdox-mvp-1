import { NextRequest, NextResponse } from 'next/server';
import { dossierService } from '../../../../../src/features/dossiers/service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId || !Array.isArray(body.documentIds)) {
    return NextResponse.json({ success: false, message: 'userId and documentIds array are required' }, { status: 400 });
  }
  try {
    const updated = await dossierService.addDocuments(id, body.userId, body.documentIds);
    return NextResponse.json({ success: true, message: 'Documents added successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId || !Array.isArray(body.documentIds)) {
    return NextResponse.json({ success: false, message: 'userId and documentIds array are required' }, { status: 400 });
  }
  try {
    const updated = await dossierService.removeDocuments(id, body.userId, body.documentIds);
    return NextResponse.json({ success: true, message: 'Documents removed successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
