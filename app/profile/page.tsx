import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { userService } from '@/features/users/services/user.service';
import { ProfilePage } from '@/features/profile';

export default async function Profile() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await userService.getUserById(session.user.id);

  if (!user) {
    redirect('/login');
  }

  return <ProfilePage user={user} />;
}
