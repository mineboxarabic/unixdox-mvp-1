import { test as base, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { encode } from 'next-auth/jwt';

const prisma = new PrismaClient();

type AuthFixtures = {
  testUser: { email: string; id: string };
  authenticatedPage: import('@playwright/test').Page;
};

export const test = base.extend<AuthFixtures>({
  testUser: async ({}, use) => {
    // Generate unique test user
    const email = `test-${Date.now()}@example.com`;
    const user = await prisma.user.create({
      data: {
        email,
        name: 'E2E Test User',
        role: 'USER',
        plan: 'FREE',
        onboardingCompleted: true,
        accounts: {
          create: {
            type: 'oauth',
            provider: 'google',
            providerAccountId: randomUUID(),
            access_token: 'mock-token',
            expires_at: Math.floor(Date.now() / 1000) + 3600,
          }
        }
      },
      include: {
        accounts: true
      }
    });

    await use({ email: user.email!, id: user.id });

    // Cleanup
    await prisma.document.deleteMany({ where: { idProprietaire: user.id } });
    await prisma.demarcheUtilisateur.deleteMany({ where: { idUtilisateur: user.id } });
    // Note: No session table cleanup needed for JWTs
    await prisma.account.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });
  },

  authenticatedPage: async ({ page, testUser, context }, use) => {
    // Forge an encrypted JWT session token compatible with Auth.js v5
    const isProduction = process.env.NODE_ENV === 'production';
    const salt = isProduction ? '__Secure-authjs.session-token' : 'authjs.session-token';
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fallback_secret';
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const sessionToken = await encode({
      token: {
        name: 'E2E Test User',
        email: testUser.email,
        picture: null,
        sub: testUser.id,
        role: 'USER',
        jti: randomUUID(),
      },
      secret,
      salt,
    });

    // Add cookie to bypass NextAuth UI
    await context.addCookies([
      {
        name: salt,
        value: sessionToken,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax',
        expires: Math.floor(expires.getTime() / 1000),
      }
    ]);

    await use(page);
  }
});

export { expect } from '@playwright/test';
