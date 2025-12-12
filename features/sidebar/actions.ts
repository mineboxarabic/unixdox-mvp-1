'use server';

import { auth } from '@/auth';
import { prisma } from '@/shared/config/prisma';

export interface SidebarCounts {
    demarchesCount: number;
    documentsCount: number;
    echeancesCount: number;
}

/**
 * Get counts for sidebar badges
 */
export async function getSidebarCounts(): Promise<SidebarCounts> {
    const session = await auth();

    if (!session?.user?.id) {
        return { demarchesCount: 0, documentsCount: 0, echeancesCount: 0 };
    }

    const userId = session.user.id;
    const now = new Date();

    const [demarchesCount, documentsCount, echeancesCount] = await Promise.all([
        // Count demarches that are in progress (EN_COURS)
        prisma.demarcheUtilisateur.count({
            where: { idUtilisateur: userId, statut: 'EN_COURS' },
        }),
        // Count total documents
        prisma.document.count({
            where: { idProprietaire: userId },
        }),
        // Count documents with upcoming expiration (within 30 days) or expired
        prisma.document.count({
            where: {
                idProprietaire: userId,
                dateExpiration: {
                    lte: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                },
            },
        }),
    ]);

    return { demarchesCount, documentsCount, echeancesCount };
}
