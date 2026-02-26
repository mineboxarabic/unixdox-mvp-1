'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { LuChevronsUpDown, LuCrown } from 'react-icons/lu';
import { useSession } from 'next-auth/react';
import type { UserAccount as UserAccountType } from '../types';
import { Avatar } from '@/shared/components/ui/avatar';

interface UserAccountProps {
  user: UserAccountType;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function UserAccount({ user, isCollapsed = false, onClick }: UserAccountProps) {
  // Use session to trigger re-render when profile is updated
  const { data: session, status } = useSession();
  const [avatarKey, setAvatarKey] = useState(() => Date.now());

  // Update the avatar key when session changes (e.g., after profile update)
  useEffect(() => {
    if (status === 'authenticated') {
      setAvatarKey(Date.now());
    }
  }, [session, status]);

  // Create a cache-busting URL that changes when session updates
  const avatarUrl = user.avatarUrl || `/api/user/avatar?t=${avatarKey}`;

  // Premium badge component
  const PremiumBadge = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="yellow.100"
      borderRadius="full"
      p={0.5}
      title="Premium"
    >
      <LuCrown size={12} color="#D97706" />
    </Box>
  );

  if (isCollapsed) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        cursor="pointer"
        onClick={onClick}
        position="relative"
      >
        <Avatar
          name={user.name}
          src={avatarUrl}
          size="sm"
        />
        {user.isPremium && (
          <Box position="absolute" bottom={1} right={1}>
            <PremiumBadge />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Flex
      align="center"
      gap={1}
      pl={2.5}
      pr={0.5}
      py={3}
      bg="white"
      border="1px solid"
      borderColor="neutral.200"
      borderRadius="xl"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: 'bg.muted' }}
      transition="all 0.2s"
    >
      <Flex flex="1" align="center" gap={2} minW={0}>
        <Avatar
          name={user.name}
          src={avatarUrl}
          size="sm"
        />
        <Box flex="1" minW={0}>
          <Flex align="center" gap={1.5}>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="gray.700"
              truncate
            >
              {user.name}
            </Text>
            {user.isPremium && <PremiumBadge />}
          </Flex>
          <Text
            fontSize="xs"
            color="gray.600"
            truncate
          >
            {user.email}
          </Text>
        </Box>
      </Flex>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="36px"
        h="36px"
        borderRadius="full"
        flexShrink={0}
      >
        <LuChevronsUpDown size={18} />
      </Box>
    </Flex>
  );
}

