import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/shared/config/prisma";
import LoginPageClient from "./LoginPageClient";

/**
 * Login page server wrapper.
 * Redirects valid authenticated users to home.
 * Shows the login form for unauthenticated or stale-session users.
 */
export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.id) {
    // Check if user actually exists in DB (not a stale JWT for a deleted user)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true },
    });

    if (user) {
      redirect('/');
    }
    // Stale session — fall through to show login form so they can re-authenticate
  }

  return <LoginPageClient />;
}
