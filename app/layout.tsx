import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/shared/components/ui/provider";
import { auth } from '@/auth';
import { LayoutWrapper } from '@/shared/components/LayoutWrapper';
import { Sidebar, getSidebarCounts, getSidebarStorageInfo } from "@/features/sidebar";
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
  let sidebarStorage;
  let isPremium = false;

  if (session?.user?.id) {
    const [countsResult, userResult, storageResult] = await Promise.allSettled([
      getSidebarCounts(),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { plan: true },
      }),
      getSidebarStorageInfo(),
    ]);

    sidebarCounts = countsResult.status === 'fulfilled'
      ? countsResult.value
      : { demarchesCount: 0, documentsCount: 0, echeancesCount: 0 };

    sidebarStorage = storageResult.status === 'fulfilled'
      ? (storageResult.value ?? undefined)
      : undefined;

    isPremium = userResult.status === 'fulfilled'
      ? (userResult.value?.plan !== 'FREE' && userResult.value?.plan != null)
      : false;
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
            <LayoutWrapper
              SideBar={Sidebar}
              authenticated={!!session?.user}
              user={userWithPremium}
              sidebarCounts={sidebarCounts}
              sidebarStorage={sidebarStorage}
            >
              {children}
            </LayoutWrapper>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
