import { auth } from '@/shared/auth';
import { demarcheExportService } from '@/features/demarches/services/demarche-export.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await params;

    const { stream, filename } = await demarcheExportService.getDemarcheZipStream(id, session.user.id);

    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Download error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const status = message === 'Demarche not found' ? 404 : 
                   message === 'Unauthorized access to demarche' ? 403 : 
                   message === 'No documents to export' ? 400 : 500;
    
    return new NextResponse(message, { status });
  }
}
