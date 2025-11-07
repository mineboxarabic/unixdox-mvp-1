import { NextRequest, NextResponse } from 'next/server';
import { dossierService } from '../../../src/features/dossiers/service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const dossiers = await dossierService.getUserDossiers(userId);
  return NextResponse.json({ success: true, data: dossiers, count: dossiers.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const dossier = await dossierService.createDossier(body);
    return NextResponse.json({ success: true, message: 'Dossier created successfully', data: dossier }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
