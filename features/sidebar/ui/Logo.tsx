'use client';

import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';


interface LogoProps {
  isCollapsed?: boolean;
}

export function Logo({ isCollapsed = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);

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
      {!imageError ? (
        <Image
          src="/logo.svg"
          alt="Unidox Logo"
          width={120}
          height={40}
          onError={() => setImageError(true)}
          style={{ width: 'auto', height: '100%' }}
        />
      ) : (
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="primary.600"
          letterSpacing="tight"
        >
          UNIDOX
        </Text>
      )}
    </Box>
  );
}
