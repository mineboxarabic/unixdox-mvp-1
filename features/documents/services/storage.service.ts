import { google } from 'googleapis';
import { Readable } from 'stream';
import { OAuth2Client } from 'google-auth-library';

export class StorageService {
  async uploadFile(
    auth: OAuth2Client,
    file: File,
    folderName: string = 'Unidox'
  ): Promise<{ id: string; webViewLink: string; webContentLink?: string }> {
    const drive = google.drive({ version: 'v3', auth });

    // 1. Find or Create Folder
    const folderId = await this.getOrCreateFolder(drive, folderName);

    // 2. Upload File
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: folderId ? [folderId] : undefined,
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: 'id, webViewLink, webContentLink',
    });

    const { id, webViewLink, webContentLink } = driveResponse.data;

    if (!id || !webViewLink) {
      throw new Error('Failed to get file info from Google Drive');
    }

    return { id, webViewLink, webContentLink: webContentLink || undefined };
  }

  private async getOrCreateFolder(drive: any, folderName: string): Promise<string | undefined> {
    try {
      console.log(`Searching for ${folderName} folder...`);
      const folderSearch = await drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
      });

      if (folderSearch.data.files && folderSearch.data.files.length > 0) {
        console.log('Found existing folder:', folderSearch.data.files[0].id);
        return folderSearch.data.files[0].id!;
      } else {
        console.log('Folder not found, creating...');
        const folderMetadata = {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
        };
        const folder = await drive.files.create({
          requestBody: folderMetadata,
          fields: 'id',
        });
        console.log('Created new folder:', folder.data.id);
        return folder.data.id!;
      }
    } catch (error) {
      console.error('Error finding/creating folder:', error);
      return undefined;
    }
  }
}

export const storageService = new StorageService();
