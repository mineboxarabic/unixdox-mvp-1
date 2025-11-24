import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/shared/components/ui/provider";
import { auth } from '@/auth';
import { LayoutWrapper } from '@/shared/components/LayoutWrapper';
import { Sidebar } from "@/features/sidebar";
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: 'var(--font-inter)' }}>
        <Provider>
          <LayoutWrapper SideBar={Sidebar} authenticated={!!session?.user} user={session?.user}>
            {children}
          </LayoutWrapper>
        </Provider>
      </body>
    </html>
  );
}
