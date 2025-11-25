'use client';

import { usePathname } from 'next/navigation';
import { Box, Flex } from '@chakra-ui/react';
import { Toaster } from '@/shared/components/ui/toaster';

interface LayoutWrapperProps {
  children: React.ReactNode;
  authenticated: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  SideBar?: React.ComponentType<any>;
}

export function LayoutWrapper({ SideBar, children, authenticated, user }: LayoutWrapperProps) {
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
                avatarUrl: user.image || undefined,
                role: (user as any).role,
              }
              : undefined
          }
        />
      )}
      <Box flex="1" overflow="auto">
        <main>{children}</main>
      </Box>
      <Toaster />
    </Flex>
  );
}
