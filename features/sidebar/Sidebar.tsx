'use client';

import { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { 
  LuHouse, 
  LuFolderOpen, 
  LuFileText, 
  LuClock,
  LuLogOut,
  LuSettings,
  LuCircleHelp,
  LuChevronLeft,
  LuChevronRight
} from 'react-icons/lu';
import { signOut } from 'next-auth/react';
import {
  Logo,
  UserAccount,
  NavButton,
  Separator,
  PromoCard,
  StorageIndicator,
} from './components';
import type { NavItem, UserAccount as UserAccountType, StorageInfo } from './types';

interface SidebarProps {
  user?: UserAccountType;
}

export function Sidebar({ user }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems: NavItem[] = [
    {
      label: 'Accueil',
      icon: LuHouse,
      href: '/',
      isActive: true,
    },
    {
      label: 'Démarches',
      icon: LuFolderOpen,
      href: '/demarches',
      badge: 2,
    },
    {
      label: 'Mes documents',
      icon: LuFileText,
      href: '/documents',
      badge: 2,
    },
    {
      label: 'Echéances',
      icon: LuClock,
      href: '/echeances',
      isPremium: true,
      isDisabled: true,
      badge: 2,
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      label: 'Déconnexion',
      icon: LuLogOut,
      href: '#',
    },
    {
      label: 'Paramètres',
      icon: LuSettings,
      href: '/settings',
    },
    {
      label: 'Aide',
      icon: LuCircleHelp,
      href: '/help',
    },
  ];

  const storageInfo: StorageInfo = {
    used: 1.5,
    total: 6,
    unit: 'Go',
  };

  const defaultUser: UserAccountType = {
    name: user?.name || 'Segun Adebayo',
    email: user?.email || 'segunadebayo@example.com',
    avatarUrl: user?.avatarUrl,
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
          onClick={() => setIsCollapsed(!isCollapsed)}
          _hover={{ bg: 'bg.muted' }}
        >
          {isCollapsed ? <LuChevronRight /> : <LuChevronLeft />}
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
        </Flex>

        {/* Promo Card */}
        {!isCollapsed && <PromoCard isCollapsed={isCollapsed} />}
        {isCollapsed && <PromoCard isCollapsed={isCollapsed} />}

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
