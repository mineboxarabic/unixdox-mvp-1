import { prisma } from '../../config/prisma';
import { Document, Prisma, DocumentType, DocumentStatut } from '@prisma/client';

class DocumentService {
	async getUserDocuments(userId: string): Promise<Document[]> {
		return prisma.document.findMany({
			where: { idProprietaire: userId },
			orderBy: { dateUpload: 'desc' },
		});
	}

	async getDocumentById(id: string, userId?: string): Promise<Document | null> {
		const where: Prisma.DocumentWhereInput = { id } as any;
		if (userId) (where as any).idProprietaire = userId;
		return prisma.document.findFirst({
			where,
			include: {
				proprietaire: { select: { id: true, nom: true, email: true } },
			},
		});
	}

	async createDocument(data: Prisma.DocumentCreateInput): Promise<Document> {
		return prisma.document.create({
			data,
			include: { proprietaire: { select: { id: true, nom: true, email: true } } },
		});
	}

	async updateDocument(id: string, userId: string, data: Prisma.DocumentUpdateInput): Promise<Document> {
		return prisma.document.update({
			where: { id, idProprietaire: userId } as any,
			data,
		});
	}

	async deleteDocument(id: string, userId: string): Promise<Document> {
		return prisma.document.delete({ where: { id, idProprietaire: userId } as any });
	}

	async searchDocuments(
		userId: string,
		filters: { type?: DocumentType; statut?: DocumentStatut; tags?: string[]; search?: string }
	): Promise<Document[]> {
		const where: Prisma.DocumentWhereInput = { idProprietaire: userId } as any;
		if (filters.type) (where as any).type = filters.type;
		if (filters.statut) (where as any).statut = filters.statut;
		if (filters.tags && filters.tags.length > 0) (where as any).tags = { hasSome: filters.tags } as any;
		if (filters.search)
			(where as any).nomFichier = { contains: filters.search, mode: 'insensitive' } as any;

		return prisma.document.findMany({ where, orderBy: { dateUpload: 'desc' } });
	}

	async getDocumentsByType(userId: string, type: DocumentType): Promise<Document[]> {
		return prisma.document.findMany({ where: { idProprietaire: userId, type }, orderBy: { dateUpload: 'desc' } });
	}

	async getDocumentsByStatus(userId: string, statut: DocumentStatut): Promise<Document[]> {
		return prisma.document.findMany({ where: { idProprietaire: userId, statut }, orderBy: { dateUpload: 'desc' } });
	}

	async updateDocumentStatus(id: string, userId: string, statut: DocumentStatut): Promise<Document> {
		return prisma.document.update({ where: { id, idProprietaire: userId } as any, data: { statut } });
	}

	async addTags(id: string, userId: string, tags: string[]): Promise<Document> {
		const document = await this.getDocumentById(id, userId);
		if (!document) throw new Error('Document not found');
		const updatedTags = [...new Set([...(document.tags || []), ...tags])];
		return prisma.document.update({ where: { id, idProprietaire: userId } as any, data: { tags: updatedTags } });
	}

	async removeTags(id: string, userId: string, tags: string[]): Promise<Document> {
		const document = await this.getDocumentById(id, userId);
		if (!document) throw new Error('Document not found');
		const current: string[] = document.tags || [];
		const updatedTags = current.filter((tag: string) => !tags.includes(tag));
		return prisma.document.update({ where: { id, idProprietaire: userId } as any, data: { tags: updatedTags } });
	}
}

export const documentService = new DocumentService();
