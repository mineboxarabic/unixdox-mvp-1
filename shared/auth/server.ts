import { auth, signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/shared/config/prisma';

// Simple helper to ensure a user is authenticated in server actions / route handlers.
// Also verifies the user still exists in DB to handle stale JWT sessions.
export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Verify user still exists in DB (handles stale JWT sessions)
  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true },
  });

  if (!userExists) {
    redirect('/login');
  }

  return session;
}

// Convenience wrappers (optional) if you want named exports.
export const authSignIn = signIn;
export const authSignOut = signOut;
