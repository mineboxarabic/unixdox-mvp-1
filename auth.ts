import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./shared/config/prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    // Update tokens in database when user signs in (runs on server, not edge)
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.id) {
        try {
          // Update the account with fresh tokens
          await prisma.account.updateMany({
            where: {
              userId: user.id,
              provider: 'google',
            },
            data: {
              access_token: account.access_token,
              refresh_token: account.refresh_token ?? undefined,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
          });
          console.log('Updated Google tokens for user:', user.id);
        } catch (error) {
          console.error('Error updating tokens:', error);
        }
      }
      return true;
    },
  },
});

