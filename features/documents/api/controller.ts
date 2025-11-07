import { NextRequest } from 'next/server';
import { documentService } from '../service';
import {
  ListDocumentsQuerySchema,
  UpdateDocumentStatusSchema,
} from '../model/schema.zod';

type HttpResult = { status: number; body: any };

export const documentsController = {
  async list(req: NextRequest): Promise<HttpResult> {
    const url = new URL(req.url);
    const parsed = ListDocumentsQuerySchema.safeParse({ userId: url.searchParams.get('userId') });
    if (!parsed.success) {
      return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    }

    const docs = await documentService.getUserDocuments(parsed.data.userId);
    return { status: 200, body: { success: true, data: docs, count: docs.length } };
  },

  async create(req: NextRequest): Promise<HttpResult> {
    // Intentionally permissive for now; validation can be tightened later per domain needs
    const body = await req.json();
    try {
      const doc = await documentService.createDocument(body);
      return { status: 201, body: { success: true, message: 'Document created successfully', data: doc } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },

  async updateStatus(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = UpdateDocumentStatusSchema.safeParse(body);
    if (!parsed.success) {
      return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    }

    try {
      const updated = await documentService.updateDocumentStatus(params.id, parsed.data.userId, parsed.data.statut);
      return { status: 200, body: { success: true, message: 'Document status updated successfully', data: updated } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
};
