'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { LuHardDrive } from 'react-icons/lu';
import type { StorageInfo } from '../types';

interface StorageIndicatorProps {
  storage: StorageInfo;
  isCollapsed?: boolean;
}

export function StorageIndicator({ storage, isCollapsed = false }: StorageIndicatorProps) {
  const percentage = (storage.used / storage.total) * 100;

  if (isCollapsed) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
      >
        <LuHardDrive size={18} color="#52525b" />
      </Box>
    );
  }

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="neutral.200"
      borderRadius="xl"
      p={2.5}
    >
      <Flex direction="column" gap={1}>
        <Flex align="center" gap={1.5}>
          <LuHardDrive size={20} color="#52525b" />
          <Text fontSize="sm" color="gray.600">
            Espace de stockage
          </Text>
        </Flex>

        <Flex direction="column" gap={2} py={2}>
          <Flex align="center" gap={1.5} w="full">
            <Text fontSize="sm" color="gray.600" flexShrink={0}>
              {storage.used}/{storage.total}{storage.unit}
            </Text>
            <Box flex="1" bg="bg.muted" borderRadius="full" h="6px" overflow="hidden">
              <Box
                bg="primary.solid"
                h="full"
                w={`${percentage}%`}
                borderRadius="full"
                transition="width 0.3s"
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
