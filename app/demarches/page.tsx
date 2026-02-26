import { auth } from '@/shared/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/shared/config/prisma';
import { getUserDemarchesAction } from '@/features/demarches';
import { shouldRedirectToLogin } from '@/features/demarches/utils/action-result';
import { isPrismaConnectivityError } from '@/shared/utils/prisma-errors';
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

  // Fetch all data in parallel with graceful fallback on transient DB outages
  const [demarchesResult, modelesResult, userDocumentsResult] = await Promise.allSettled([
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

  if (demarchesResult.status === 'rejected') {
    if (isPrismaConnectivityError(demarchesResult.reason)) {
      console.warn('Demarches unavailable: database is temporarily unreachable.');
    } else {
      throw demarchesResult.reason;
    }
  }

  const demarchesActionResult = demarchesResult.status === 'fulfilled'
    ? demarchesResult.value
    : { success: false as const, error: 'Base de données temporairement indisponible', errorCode: 'DB_UNAVAILABLE' as const };

  if (shouldRedirectToLogin(demarchesActionResult)) {
    redirect('/login');
  }

  let modeles: Awaited<ReturnType<typeof prisma.modeleDemarche.findMany>>;
  if (modelesResult.status === 'fulfilled') {
    modeles = modelesResult.value;
  } else if (isPrismaConnectivityError(modelesResult.reason)) {
    console.warn('Demarche models unavailable: database is temporarily unreachable.');
    modeles = [];
  } else {
    throw modelesResult.reason;
  }

  let userDocuments: Awaited<ReturnType<typeof prisma.document.findMany>>;
  if (userDocumentsResult.status === 'fulfilled') {
    userDocuments = userDocumentsResult.value;
  } else if (isPrismaConnectivityError(userDocumentsResult.reason)) {
    console.warn('User documents unavailable: database is temporarily unreachable.');
    userDocuments = [];
  } else {
    throw userDocumentsResult.reason;
  }

  const demarches = demarchesActionResult.success ? demarchesActionResult.data : [];

  return (
    <DemarchesPageClient 
      demarches={demarches || []} 
      modeles={modeles}
      userDocuments={userDocuments}
      userEmail={session.user.email ?? undefined}
    />
  );
}
