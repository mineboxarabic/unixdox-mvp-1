import { NextRequest, NextResponse } from 'next/server';
import { dossierService } from '../../../../src/features/dossiers/service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const userId = new URL(req.url).searchParams.get('userId') || undefined;
  const dossier = await dossierService.getDossierById(id, userId);
  if (!dossier) return NextResponse.json({ success: false, message: 'Dossier not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: dossier });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  try {
    const updated = await dossierService.updateDossier(id, body.userId, body);
    return NextResponse.json({ success: true, message: 'Dossier updated successfully', data: updated });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  if (!body.userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  try {
    await dossierService.deleteDossier(id, body.userId);
    return NextResponse.json({ success: true, message: 'Dossier deleted successfully' });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
