'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import type { UserAccount as UserAccountType } from '../types';
import { Avatar } from '@/shared/components/ui/avatar';

interface UserAccountProps {
  user: UserAccountType;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function UserAccount({ user, isCollapsed = false, onClick }: UserAccountProps) {
  if (isCollapsed) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        cursor="pointer"
        onClick={onClick}
      >
        <Avatar
          name={user.name}
          src={user.avatarUrl || `/api/user/avatar`}
          size="sm"
        />
      </Box>
    );
  }

  return (
    <Flex
      align="center"
      gap={2}
      p={3}
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="xl"
      cursor="pointer"
      onClick={onClick}
      _hover={{ bg: 'bg.muted' }}
      transition="all 0.2s"
    >
      <Avatar
        name={user.name}
        src={user.avatarUrl || `/api/user/avatar`}
        size="sm"
      />
      <Box flex="1" minW={0}>
        <Text
          fontSize="sm"
          fontWeight="medium"
          color="text.fg"
          truncate
        >
          {user.name}
        </Text>
        <Text
          fontSize="xs"
          color="text.fg.muted"
          truncate
        >
          {user.email}
        </Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        borderRadius="full"
      >
        <LuChevronDown size={16} />
      </Box>
    </Flex>
  );
}
