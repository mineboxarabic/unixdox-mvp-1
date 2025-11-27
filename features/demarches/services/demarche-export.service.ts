import { prisma } from '@/shared/config/prisma';
import { storageService } from '@/features/documents/services/storage.service';
import { getGoogleDriveAuth } from '@/shared/auth/google-drive';
import archiver from 'archiver';
import { PassThrough, Readable } from 'stream';

export class DemarcheExportService {
  /**
   * Creates a ZIP stream for a demarche's documents.
   * Returns the archive stream and a safe filename.
   */
  async getDemarcheZipStream(demarcheId: string, userId: string): Promise<{ stream: Readable; filename: string }> {
    // 1. Fetch Demarche
    const demarche = await prisma.demarcheUtilisateur.findUnique({
      where: { id: demarcheId },
      include: { modele: true },
    });

    if (!demarche) {
      throw new Error('Demarche not found');
    }

    if (demarche.idUtilisateur !== userId) {
      throw new Error('Unauthorized access to demarche');
    }

    // 2. Get Associated Documents
    const documentsAssocies = demarche.documentsAssocies as Record<string, string> | null;
    if (!documentsAssocies || Object.keys(documentsAssocies).length === 0) {
      throw new Error('No documents to export');
    }

    const documentIds = Object.values(documentsAssocies);
    const documents = await prisma.document.findMany({
      where: {
        id: { in: documentIds },
        idProprietaire: userId,
      },
    });

    if (documents.length === 0) {
      throw new Error('No valid documents found');
    }

    // 3. Prepare Google Drive Auth
    const googleAuth = await getGoogleDriveAuth(userId);

    // 4. Create Archive
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    const stream = new PassThrough();
    archive.pipe(stream);

    // 5. Add files to archive
    // We process sequentially to avoid overwhelming the API
    for (const doc of documents) {
      if (doc.storageId) {
        try {
          const fileStream = await storageService.getFileStream(googleAuth, doc.storageId);
          // Sanitize filename
          const filename = doc.nomFichier.replace(/[^a-zA-Z0-9.-]/g, '_');
          archive.append(fileStream, { name: filename });
        } catch (error) {
          console.error(`Failed to download document ${doc.id}:`, error);
          archive.append(Buffer.from(`Failed to download: ${doc.nomFichier}`), { name: `${doc.nomFichier}_error.txt` });
        }
      }
    }

    // Finalize the archive
    archive.finalize();

    const demarcheTitle = demarche.titre || demarche.modele.titre;
    const safeTitle = demarcheTitle.replace(/[^a-zA-Z0-9]/g, '_');

    return {
      stream: stream,
      filename: `${safeTitle}_documents.zip`,
    };
  }

  /**
   * Creates a ZIP buffer for a demarche's documents.
   * Useful for email attachments.
   */
  async getDemarcheZipBuffer(demarcheId: string, userId: string): Promise<{ buffer: Buffer; filename: string }> {
    const { stream, filename } = await this.getDemarcheZipStream(demarcheId, userId);
    
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({ buffer, filename });
      });
    });
  }
}

export const demarcheExportService = new DemarcheExportService();
