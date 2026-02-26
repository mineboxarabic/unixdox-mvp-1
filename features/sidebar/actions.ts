'use server';

import { google } from 'googleapis';
import { auth } from '@/auth';
import { prisma } from '@/shared/config/prisma';
import { getGoogleDriveAuth } from '@/shared/auth/google-drive';
import { isPrismaConnectivityError } from '@/shared/utils/prisma-errors';
import type { StorageInfo } from './types';

export interface SidebarCounts {
    demarchesCount: number;
    documentsCount: number;
    echeancesCount: number;
}

/**
 * Convert byte values into a human-readable storage info for the UI.
 * Uses French units (Go/Mo) for consistency with the UI.
 */
function mapBytesToStorageInfo(usedBytes: number, totalBytes: number): StorageInfo {
    const giga = 1024 ** 3;
    const mega = 1024 ** 2;
    const useGiga = totalBytes >= giga;
    const unit = useGiga ? 'Go' : 'Mo';
    const divisor = useGiga ? giga : mega;

    const format = (value: number) => Math.round((value / divisor) * 10) / 10;

    return {
        used: format(usedBytes),
        total: format(totalBytes),
        unit,
    };
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

    try {
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
    } catch (error) {
        if (isPrismaConnectivityError(error)) {
            console.warn('Sidebar counts unavailable: database is temporarily unreachable.');
        } else {
            console.error('Failed to fetch sidebar counts', error);
        }

        return { demarchesCount: 0, documentsCount: 0, echeancesCount: 0 };
    }
}

/**
 * Get Google Drive storage usage for the current user.
 * Falls back to null if the account is not linked or quota cannot be retrieved.
 */
export async function getSidebarStorageInfo(): Promise<StorageInfo | null> {
    const session = await auth();

    if (!session?.user?.id) {
        return null;
    }

    try {
        const authClient = await getGoogleDriveAuth(session.user.id);
        const drive = google.drive({ version: 'v3', auth: authClient });
        const response = await drive.about.get({ fields: 'storageQuota' });
        const usage = Number(response.data.storageQuota?.usage || 0);
        const limit = Number(response.data.storageQuota?.limit || 0);

        if (!limit) {
            return null;
        }

        return mapBytesToStorageInfo(usage, limit);
    } catch (error) {
        if (isPrismaConnectivityError(error)) {
            console.warn('Sidebar storage unavailable: database is temporarily unreachable.');
        } else {
            console.error('Failed to fetch Google Drive storage quota', error);
        }
        return null;
    }
}
