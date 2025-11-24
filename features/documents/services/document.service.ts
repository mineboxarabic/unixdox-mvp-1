import { prisma } from '@/shared/config/prisma';
import { Document, Prisma, DocumentType, DocumentStatut } from '@prisma/client';

class DocumentService {
	async getUserDocuments(userId: string): Promise<Document[]> {
		return prisma.document.findMany({
			where: { idProprietaire: userId },
			orderBy: { dateUpload: 'desc' },
		});
	}

	async getDocumentById(id: string, userId?: string): Promise<Document | null> {
		const where: Prisma.DocumentWhereInput = { id };
		if (userId) where.idProprietaire = userId;
		return prisma.document.findFirst({
			where,
			include: {
				proprietaire: { select: { id: true, name: true, email: true } },
			},
		});
	}

	async createDocument(data: Prisma.DocumentCreateInput): Promise<Document> {
		return prisma.document.create({
			data,
			include: { proprietaire: { select: { id: true, name: true, email: true } } },
		});
	}

	async updateDocument(id: string, userId: string, data: Prisma.DocumentUpdateInput): Promise<Document> {
		const doc = await prisma.document.findFirst({ where: { id, idProprietaire: userId } });
		if (!doc) throw new Error('Document not found');
		return prisma.document.update({
			where: { id },
			data,
		});
	}

	async deleteDocument(id: string, userId: string): Promise<Document> {
		const doc = await prisma.document.findFirst({ where: { id, idProprietaire: userId } });
		if (!doc) throw new Error('Document not found');
		return prisma.document.delete({ where: { id } });
	}

	async searchDocuments(
		userId: string,
		filters: { type?: DocumentType; statut?: DocumentStatut; tags?: string[]; search?: string }
	): Promise<Document[]> {
		const where: Prisma.DocumentWhereInput = { idProprietaire: userId };
		if (filters.type) where.type = filters.type;
		if (filters.statut) where.statut = filters.statut;
		if (filters.tags && filters.tags.length > 0) where.tags = { hasSome: filters.tags };
		if (filters.search)
			where.nomFichier = { contains: filters.search, mode: 'insensitive' };

		return prisma.document.findMany({ where, orderBy: { dateUpload: 'desc' } });
	}

	async getDocumentsByType(userId: string, type: DocumentType): Promise<Document[]> {
		return prisma.document.findMany({ where: { idProprietaire: userId, type }, orderBy: { dateUpload: 'desc' } });
	}

	async getDocumentsByStatus(userId: string, statut: DocumentStatut): Promise<Document[]> {
		return prisma.document.findMany({ where: { idProprietaire: userId, statut }, orderBy: { dateUpload: 'desc' } });
	}

	async updateDocumentStatus(id: string, userId: string, statut: DocumentStatut): Promise<Document> {
		const doc = await prisma.document.findFirst({ where: { id, idProprietaire: userId } });
		if (!doc) throw new Error('Document not found');
		return prisma.document.update({ where: { id }, data: { statut } });
	}

	async addTags(id: string, userId: string, tags: string[]): Promise<Document> {
		const document = await this.getDocumentById(id, userId);
		if (!document) throw new Error('Document not found');
		const updatedTags = [...new Set([...(document.tags || []), ...tags])];
		return prisma.document.update({ where: { id }, data: { tags: updatedTags } });
	}

	async removeTags(id: string, userId: string, tags: string[]): Promise<Document> {
		const document = await this.getDocumentById(id, userId);
		if (!document) throw new Error('Document not found');
		const current: string[] = document.tags || [];
		const updatedTags = current.filter((tag: string) => !tags.includes(tag));
		return prisma.document.update({ where: { id }, data: { tags: updatedTags } });
	}
}

export const documentService = new DocumentService();
