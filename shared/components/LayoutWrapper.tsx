'use client';

import { usePathname } from 'next/navigation';
import { Box, Flex } from '@chakra-ui/react';
import { Toaster } from '@/shared/components/ui/toaster';
import type { SidebarCounts } from '@/features/sidebar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  authenticated: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isPremium?: boolean;
  };
  SideBar?: React.ComponentType<any>;
  sidebarCounts?: SidebarCounts;
}

export function LayoutWrapper({ SideBar, children, authenticated, user, sidebarCounts }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Hide sidebar on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const showSidebar = authenticated && !isAuthPage && SideBar;

  return (
    <Flex h="100vh" overflow="hidden">
      {showSidebar && (
        <SideBar
          user={
            user
              ? {
                name: user.name || 'User',
                email: user.email || '',
                avatarUrl: undefined, // Always fetch from /api/user/avatar for fresh data
                role: (user as any).role,
                isPremium: user.isPremium,
              }
              : undefined
          }
          counts={sidebarCounts}
        />
      )}
      <Box flex="1" overflow="auto">
        <main>{children}</main>
      </Box>
      <Toaster />
    </Flex>
  );
}
