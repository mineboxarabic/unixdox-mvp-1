'use client';

import { useState } from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuShield,
  LuPlus
} from 'react-icons/lu';
import { signOut } from 'next-auth/react';
import {
  Logo,
  UserAccount,
  NavButton,
  Separator,
  PromoCard,
  StorageIndicator,
} from './ui';
import type { NavItem, StorageInfo } from './types';
import { mainNavItems, bottomNavItems, storageInfo } from './config';

import { UserAccount as UserAccountType } from '@/shared/components';

interface SidebarProps {
  user?: UserAccountType;
}

export function Sidebar({ user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const defaultUser: UserAccountType = {
    name: user?.name || 'Segun Adebayo',
    email: user?.email || 'segunadebayo@example.com',
    avatarUrl: user?.avatarUrl,
    role: user?.role,
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Box
      position="relative"
      h="100vh"
      w={isCollapsed ? '64px' : '270px'}
      bg="bg.subtle"
      borderRight="1px solid"
      borderColor="border.default"
      transition="width 0.3s ease"
      display="flex"
      flexDirection="column"
    >
      {/* Toggle Button */}
      <Box
        position="absolute"
        top="12px"
        right="-12px"
        zIndex={10}
      >
        <IconButton
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          size="sm"
          borderRadius="full"
          bg="bg.surface"
          border="1px solid"
          borderColor="border.default"
          color="fg.default"
          onClick={() => setIsCollapsed(!isCollapsed)}
          _hover={{ bg: 'bg.muted' }}
        >
          {isCollapsed ? <LuChevronRight size={16} /> : <LuChevronLeft size={16} />}
        </IconButton>
      </Box>

      {/* Sidebar Content */}
      <Flex
        direction="column"
        gap={4}
        h="full"
        p={2}
        pt={2}
        overflow="hidden"
      >
        {/* Logo */}
        <Box px={1} pt={1}>
          <Logo isCollapsed={isCollapsed} />
        </Box>

        {/* User Account */}
        <UserAccount user={defaultUser} isCollapsed={isCollapsed} />

        <Separator variant="dashed" />

        {/* Main Navigation */}
        <Flex direction="column" gap={1} flex="1" overflow="auto">
          {mainNavItems.map((item) => (
            <NavButton key={item.label} item={item} isCollapsed={isCollapsed} />
          ))}

          {/* Admin Section */}
          {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
            <>
              <Separator variant="dashed" />
              <Box px={2} py={1}>
                <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider" mb={1} display={isCollapsed ? 'none' : 'block'}>
                  Admin
                </Text>
                <NavButton
                  item={{
                    label: 'All Models',
                    icon: LuShield,
                    href: '/admin/modele-demarche',
                    isActive: false,
                  }}
                  isCollapsed={isCollapsed}
                />
                <NavButton
                  item={{
                    label: 'Create Model',
                    icon: LuPlus,
                    href: '/admin/modele-demarche/create',
                    isActive: false,
                  }}
                  isCollapsed={isCollapsed}
                />
              </Box>
            </>
          )}
        </Flex>

        {/* Promo Card */}
        <PromoCard isCollapsed={isCollapsed} />

        {/* Bottom Section */}
        <Flex direction="column" gap={4}>
          {/* Storage Indicator */}
          <StorageIndicator storage={storageInfo} isCollapsed={isCollapsed} />

          <Separator variant="dashed" />

          {/* Bottom Navigation */}
          <Flex direction="column" gap={1}>
            {bottomNavItems.map((item) => (
              <Box
                key={item.label}
                onClick={item.label === 'Déconnexion' ? handleLogout : undefined}
              >
                <NavButton item={item} isCollapsed={isCollapsed} />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
