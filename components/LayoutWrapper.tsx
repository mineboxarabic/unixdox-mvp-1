'use client';

import { usePathname } from 'next/navigation';
import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from '@/features/sidebar';
import { Toaster } from '@/components/ui/toaster';

interface LayoutWrapperProps {
  children: React.ReactNode;
  authenticated: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function LayoutWrapper({ children, authenticated, user }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide sidebar on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const showSidebar = authenticated && !isAuthPage;

  return (
    <Flex h="100vh" overflow="hidden">
      {showSidebar && (
        <Sidebar
          user={
            user
              ? {
                  name: user.name || 'User',
                  email: user.email || '',
                  avatarUrl: user.image || undefined,
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
