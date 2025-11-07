import { NextRequest } from 'next/server';
import { dossierService } from '../service';
import {
  UserIdParamSchema,
  DossierUpdateSchema,
  DossierDeleteSchema,
  DossierAddRemoveDocumentsSchema,
} from '../model/schema.zod';

type HttpResult = { status: number; body: any };

export const dossiersController = {
  async list(req: NextRequest): Promise<HttpResult> {
    const url = new URL(req.url);
    const parsed = UserIdParamSchema.safeParse({ userId: url.searchParams.get('userId') });
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const dossiers = await dossierService.getUserDossiers(parsed.data.userId);
    return { status: 200, body: { success: true, data: dossiers, count: dossiers.length } };
  },
  async stats(req: NextRequest): Promise<HttpResult> {
    const url = new URL(req.url);
    const parsed = UserIdParamSchema.safeParse({ userId: url.searchParams.get('userId') });
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    const stats = await dossierService.getDossierStats(parsed.data.userId);
    return { status: 200, body: { success: true, data: stats } };
  },
  async create(req: NextRequest): Promise<HttpResult> {
    const body = await req.json();
    try {
      const dossier = await dossierService.createDossier(body);
      return { status: 201, body: { success: true, message: 'Dossier created successfully', data: dossier } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async get(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId') || undefined;
    const dossier = await dossierService.getDossierById(params.id, userId);
    if (!dossier) return { status: 404, body: { success: false, message: 'Dossier not found' } };
    return { status: 200, body: { success: true, data: dossier } };
  },
  async update(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = DossierUpdateSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    try {
      const updated = await dossierService.updateDossier(params.id, parsed.data.userId, body);
      return { status: 200, body: { success: true, message: 'Dossier updated successfully', data: updated } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async remove(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = DossierDeleteSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    try {
      await dossierService.deleteDossier(params.id, parsed.data.userId);
      return { status: 200, body: { success: true, message: 'Dossier deleted successfully' } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async addDocuments(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = DossierAddRemoveDocumentsSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    try {
      const updated = await dossierService.addDocuments(params.id, parsed.data.userId, parsed.data.documentIds);
      return { status: 200, body: { success: true, message: 'Documents added successfully', data: updated } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
  async removeDocuments(req: NextRequest, params: { id: string }): Promise<HttpResult> {
    const body = await req.json();
    const parsed = DossierAddRemoveDocumentsSchema.safeParse(body);
    if (!parsed.success) return { status: 400, body: { success: false, message: parsed.error.flatten() } };
    try {
      const updated = await dossierService.removeDocuments(params.id, parsed.data.userId, parsed.data.documentIds);
      return { status: 200, body: { success: true, message: 'Documents removed successfully', data: updated } };
    } catch (e: any) {
      return { status: 500, body: { success: false, message: e?.message || 'Unexpected error' } };
    }
  },
};
