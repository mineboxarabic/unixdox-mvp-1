import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/shared/components/ui/provider";
import { auth } from '@/auth';
import { LayoutWrapper } from '@/shared/components/LayoutWrapper';
import { Sidebar, getSidebarCounts } from "@/features/sidebar";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@/shared/config/prisma";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UnixDox",
  description: "Document management made simple",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // Fetch sidebar counts and user plan if user is authenticated
  let sidebarCounts;
  let isPremium = false;

  if (session?.user?.id) {
    const [counts, user] = await Promise.all([
      getSidebarCounts(),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true },
      }),
    ]);
    sidebarCounts = counts;
    isPremium = user?.plan === 'PREMIUM' || user?.plan === 'ENTERPRISE';
  }

  const userWithPremium = session?.user ? {
    ...session.user,
    isPremium,
  } : undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: 'var(--font-inter)' }}>
        <SessionProvider session={session}>
          <Provider>
            <LayoutWrapper SideBar={Sidebar} authenticated={!!session?.user} user={userWithPremium} sidebarCounts={sidebarCounts}>
              {children}
            </LayoutWrapper>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
