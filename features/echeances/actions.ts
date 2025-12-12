'use server';

import { auth } from '@/shared/auth';
import { prisma } from '@/shared/config/prisma';
import type { Echeance, EcheancesFilters } from './types';
import { EcheanceStatut } from './types';

/**
 * Calculate the status of an echeance based on days remaining until expiration
 * @param joursRestants - Days remaining until expiration (negative if expired)
 * @returns The calculated EcheanceStatut
 */
function calculateStatut(joursRestants: number): EcheanceStatut {
    if (joursRestants < 0) return EcheanceStatut.EXPIRE;
    if (joursRestants <= 7) return EcheanceStatut.URGENT;
    if (joursRestants <= 30) return EcheanceStatut.PROCHE;
    return EcheanceStatut.A_VENIR;
}

/**
 * Calculate days remaining until expiration
 * @param dateExpiration - The expiration date
 * @returns Number of days remaining (negative if expired)
 */
function calculateJoursRestants(dateExpiration: Date): number {
    const now = new Date();
    const diffTime = dateExpiration.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Fetch all documents with expiration dates for the current user
 * Returns them as echeances with calculated status
 */
export async function getEcheancesAction(filters?: EcheancesFilters): Promise<{
    success: boolean;
    data?: Echeance[];
    error?: string;
}> {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: 'Non autorisé' };
        }

        // Build where clause based on filters
        const whereClause: any = {
            idProprietaire: session.user.id,
            dateExpiration: { not: null },
        };

        // Add type filter if provided
        if (filters?.type) {
            whereClause.type = filters.type;
        }

        // Add search filter if provided
        if (filters?.search) {
            whereClause.nomFichier = {
                contains: filters.search,
                mode: 'insensitive',
            };
        }

        // Fetch documents with expiration dates
        const documents = await prisma.document.findMany({
            where: whereClause,
            orderBy: { dateExpiration: 'asc' },
        });

        // Transform documents to echeances
        const echeances: Echeance[] = documents
            .filter((doc) => doc.dateExpiration !== null)
            .map((doc) => {
                const joursRestants = calculateJoursRestants(doc.dateExpiration!);
                const statut = calculateStatut(joursRestants);

                return {
                    id: doc.id,
                    nomFichier: doc.nomFichier,
                    type: doc.type,
                    dateExpiration: doc.dateExpiration!,
                    joursRestants,
                    statut,
                    dateUpload: doc.dateUpload,
                };
            });

        // Filter by status if provided
        const filteredEcheances = filters?.statut
            ? echeances.filter((e) => e.statut === filters.statut)
            : echeances;

        return { success: true, data: filteredEcheances };
    } catch (error) {
        console.error('Error fetching echeances:', error);
        return { success: false, error: 'Erreur lors de la récupération des échéances' };
    }
}

/**
 * Check if the current user has premium access for echeances feature
 */
export async function checkPremiumAccessAction(): Promise<{
    success: boolean;
    isPremium: boolean;
    error?: string;
}> {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, isPremium: false, error: 'Non autorisé' };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { plan: true },
        });

        const isPremium = user?.plan === 'PREMIUM' || user?.plan === 'ENTERPRISE';

        return { success: true, isPremium };
    } catch (error) {
        console.error('Error checking premium access:', error);
        return { success: false, isPremium: false, error: 'Erreur lors de la vérification' };
    }
}
