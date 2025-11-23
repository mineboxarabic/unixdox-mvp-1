'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { LuCrown } from 'react-icons/lu';
import type { NavItem } from '../types';
import Link from 'next/link';

interface NavButtonProps {
  item: NavItem;
  isCollapsed?: boolean;
}

export function NavButton({ item, isCollapsed = false }: NavButtonProps) {
  const content = (
    <Flex
      align="center"
      gap={2}
      px={isCollapsed ? 2 : 2.5}
      py={2}
      borderRadius="lg"
      position="relative"
      cursor={item.isDisabled ? 'not-allowed' : 'pointer'}
      opacity={item.isDisabled ? 0.43 : 1}
      bg={item.isActive ? 'bg.surface' : 'transparent'}
      border={item.isActive ? '1px solid' : 'none'}
      borderColor={item.isActive ? 'neutral.2' : 'transparent'}
      _hover={!item.isDisabled ? { bg: 'bg.muted' } : {}}
      transition="all 0.2s"
      justifyContent={isCollapsed ? 'center' : 'flex-start'}
      w="full"
    >
      {item.isActive && !isCollapsed && (
        <Box
          position="absolute"
          left="4px"
          top="50%"
          transform="translateY(-50%)"
          w="2px"
          h="22px"
          bg="primary.500"
          borderRadius="sm"
        />
      )}
      
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        w="18px"
        h="18px"
      >
        <item.icon />
      </Box>

      {!isCollapsed && (
        <>
          <Text
            flex="1"
            fontSize="sm"
            fontWeight="normal"
            color={item.isActive ? 'neutral.700' : 'neutral.600'}
          >
            {item.label}
          </Text>

          {item.isPremium && (
            <Box display="flex" alignItems="center" justifyContent="center">
              <LuCrown size={18} />
            </Box>
          )}

          {item.badge !== undefined && item.badge > 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={1}
              borderRadius="full"
            >
              <Text fontSize="xs" color="neutral.600">
                {item.badge}
              </Text>
            </Box>
          )}
        </>
      )}
    </Flex>
  );

  return item.href ? <Link href={item.href}>{content}</Link> : content;
}
