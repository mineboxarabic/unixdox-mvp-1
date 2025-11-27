import { auth } from '@/shared/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/shared/config/prisma';
import { getUserDemarchesAction } from '@/features/demarches';
import { DemarchesPageClient } from './DemarchesPageClient';

export const metadata = {
  title: 'Mes Démarches | Unidox',
  description: 'Gérez vos démarches administratives',
};

export default async function DemarchesRoute() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Fetch all data in parallel
  const [demarchesResult, modeles, userDocuments] = await Promise.all([
    getUserDemarchesAction(),
    prisma.modeleDemarche.findMany({
      where: { actif: true },
      orderBy: { ordre: 'asc' },
    }),
    prisma.document.findMany({
      where: { idProprietaire: session.user.id },
      orderBy: { dateUpload: 'desc' },
    }),
  ]);
  
  const demarches = demarchesResult.success ? demarchesResult.data : [];

  return (
    <DemarchesPageClient 
      demarches={demarches || []} 
      modeles={modeles}
      userDocuments={userDocuments}
    />
  );
}
