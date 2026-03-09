'use server';

import { signIn, auth } from '@/auth';
import { prisma } from '@/shared/config/prisma';

export async function login() {
  await signIn('google', { redirectTo: '/' });
}

export async function loginWithGoogle() {
  await signIn('google', { redirectTo: '/register' });
}

export async function linkGoogleAccount() {
  const session = await auth();

  if (session?.user?.id) {
    // Delete existing Google account connection to force a fresh link with new scopes
    // This ensures we get the drive.file scope and a refresh token
    try {
      await prisma.account.deleteMany({
        where: {
          userId: session.user.id,
          provider: 'google',
        },
      });
    } catch (error) {
      console.error('Failed to delete existing account:', error);
    }
  }

  // Force consent to ensure we get a refresh token
  await signIn('google', { 
    redirectTo: '/register?step=3',
  });
}
