import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { HelpPage } from '@/features/help';

export default async function Help() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  return <HelpPage />;
}
