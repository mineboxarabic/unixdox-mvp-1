import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import UpgradePage from './UpgradePage';

/**
 * /upgrade route — server component that checks auth
 * and renders the upgrade page for existing users.
 */
export default async function UpgradePageRoute() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <UpgradePage />;
}
