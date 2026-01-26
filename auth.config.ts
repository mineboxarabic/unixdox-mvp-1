import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { UserRole } from "@prisma/client";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/drive.file",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  // Debug logs
  logger: {
    error: (code, ...message) => {
      console.error(code, message)
    },
    warn: (code, ...message) => {
      console.warn(code, message)
    },
    debug: (code, ...message) => {
      console.debug(code, message)
    },
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role as 'USER' | 'ADMIN' | 'MANAGER';
        // Explicitly clear picture to prevent huge base64 from DB entering the token
        // We use /api/user/avatar instead
        token.picture = null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === '/login';
      const isRegisterPage = nextUrl.pathname === '/register';
      const isAdminPage = nextUrl.pathname.startsWith('/admin');

      if (isAdminPage) {
        if (!isLoggedIn) return false;
        if (auth.user.role !== 'ADMIN' && auth.user.role !== 'MANAGER') {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      if (isLoginPage) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true;
      }

      if (isRegisterPage) {
        return true;
      }

      // For all other pages (dashboard)
      if (isLoggedIn) return true;
      return false; // Redirect to login
    },
  },
} satisfies NextAuthConfig;
