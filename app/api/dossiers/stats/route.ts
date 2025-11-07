import { NextRequest, NextResponse } from 'next/server';
import { dossierService } from '../../../../src/features/dossiers/service';

export async function GET(req: NextRequest) {
  const userId = new URL(req.url).searchParams.get('userId');
  if (!userId) return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  const stats = await dossierService.getDossierStats(userId);
  return NextResponse.json({ success: true, data: stats });
}
