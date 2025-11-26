import { auth } from '@/shared/auth';
import { redirect } from 'next/navigation';
import { getUserDemarchesAction } from '@/features/demarches';
import { DemarchesPage } from '@/features/demarches';

export const metadata = {
  title: 'Mes Démarches | Unidox',
  description: 'Gérez vos démarches administratives',
};

export default async function DemarchesRoute() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const result = await getUserDemarchesAction();
  const demarches = result.success ? result.data : [];

  return <DemarchesPage demarches={demarches || []} />;
}
