import { NextRequest, NextResponse } from 'next/server';
import { documentService } from '../../../src/features/documents/service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  // list documents for a user

  if (!userId) {
    return NextResponse.json({ success: false, message: 'userId is required' }, { status: 400 });
  }

  // Basic /api/documents listing
  const documents = await documentService.getUserDocuments(userId);
  return NextResponse.json({ success: true, data: documents, count: documents.length });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const doc = await documentService.createDocument(body);
    return NextResponse.json({ success: true, message: 'Document created successfully', data: doc }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
