import { auth } from '@/shared/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/shared/config/prisma';
import { getEcheancesAction } from '@/features/echeances';
import { EcheancesPage } from '@/features/echeances/ui/pages/EcheancesPage';

export const metadata = {
    title: 'Échéances | Unidox',
    description: 'Suivez les dates d\'expiration de vos documents',
};

export default async function EcheancesRoute() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/login');
    }

    // Fetch user plan and echeances in parallel
    const [user, echeancesResult] = await Promise.all([
        prisma.user.findUnique({
            where: { id: session.user.id },
            select: { plan: true },
        }),
        getEcheancesAction(),
    ]);

    const isPremium = user?.plan === 'PREMIUM' || user?.plan === 'ENTERPRISE';
    const echeances = echeancesResult.success ? echeancesResult.data || [] : [];

    return (
        <EcheancesPage
            echeances={echeances}
            isPremium={isPremium}
        />
    );
}
