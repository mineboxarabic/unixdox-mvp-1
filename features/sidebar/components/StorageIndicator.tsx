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
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="xl"
      p={2.5}
    >
      <Flex direction="column" gap={1}>
        <Flex align="center" gap={1.5}>
          <LuHardDrive size={18} color="#52525b" />
          <Text fontSize="sm" color="text.fg.muted">
            Espace de stockage
          </Text>
        </Flex>

        <Flex direction="column" gap={2} py={2}>
          <Flex align="center" gap={1.5} w="full">
            <Text fontSize="sm" color="text.fg.muted">
              {storage.used}/{storage.total}{storage.unit}
            </Text>
            <Box flex="1" bg="bg.muted" borderRadius="full" h="6px" overflow="hidden">
              <Box
                bg="primary.600"
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
