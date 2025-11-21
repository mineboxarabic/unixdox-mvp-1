import { auth, signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

// Simple helper to ensure a user is authenticated in server actions / route handlers.
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    // You can change behavior to throw or return null.
    redirect('/login');
  }
  return session;
}

// Convenience wrappers (optional) if you want named exports.
export const authSignIn = signIn;
export const authSignOut = signOut;
