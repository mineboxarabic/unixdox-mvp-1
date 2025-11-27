import { auth } from '@/shared/auth';
import { demarcheExportService } from '@/features/demarches/services/demarche-export.service';
import { emailService } from '@/features/notifications/services/email.service';
import { prisma } from '@/shared/config/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await params;
    const { email } = await request.json();

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    // Fetch demarche title for email subject
    const demarche = await prisma.demarcheUtilisateur.findUnique({
      where: { id },
      include: { modele: true },
    });

    if (!demarche) {
      return new NextResponse('Demarche not found', { status: 404 });
    }

    const demarcheTitle = demarche.titre || demarche.modele.titre;

    // Get ZIP buffer
    const { buffer, filename } = await demarcheExportService.getDemarcheZipBuffer(id, session.user.id);

    // Send Email
    await emailService.sendEmail({
      to: email,
      subject: `Vos documents pour : ${demarcheTitle}`,
      text: `Bonjour,\n\nVeuillez trouver ci-joint les documents pour votre démarche "${demarcheTitle}".\n\nCordialement,\nL'équipe Unidox`,
      attachments: [
        {
          filename: filename,
          content: buffer,
        },
      ],
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Email sending error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const status = message === 'Demarche not found' ? 404 : 
                   message === 'Unauthorized access to demarche' ? 403 : 
                   message === 'No documents to export' ? 400 : 500;
    
    return new NextResponse(message, { status });
  }
}
