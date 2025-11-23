'use client';

import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';

interface LogoProps {
  isCollapsed?: boolean;
}

export function Logo({ isCollapsed = false }: LogoProps) {
  if (isCollapsed) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={1}
        py={1}
        h="40px"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="primary.600"
          letterSpacing="tight"
        >
          U
        </Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      px={1}
      py={1}
      h="40px"
    >
      <Text
        fontSize="lg"
        fontWeight="bold"
        color="primary.600"
        letterSpacing="tight"
      >
        UNIDOX
      </Text>
    </Box>
  );
}
