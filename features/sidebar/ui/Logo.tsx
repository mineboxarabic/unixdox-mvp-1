'use client';

import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';


interface LogoProps {
  isCollapsed?: boolean;
}

/**
 * Sidebar logo component.
 * - Collapsed: shows the brand icon (logo-icon.svg) at 32x32
 * - Expanded: shows the brand icon (logo-icon.svg) at 48x48 with rounded container
 */
export function Logo({ isCollapsed = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  const size = isCollapsed ? 32 : 48;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={isCollapsed ? 'center' : 'flex-start'}
      py={1}
    >
      {!imageError ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={`${size}px`}
          h={`${size}px`}
          borderRadius="xl"
          overflow="hidden"
          flexShrink={0}
        >
          <Image
            src="/logo-icon.svg"
            alt="Unidox"
            width={size}
            height={size}
            onError={() => setImageError(true)}
            style={{ width: `${size}px`, height: `${size}px` }}
          />
        </Box>
      ) : (
        <Text
          fontSize={isCollapsed ? 'xl' : 'lg'}
          fontWeight="bold"
          color="primary.600"
          letterSpacing="tight"
        >
          {isCollapsed ? 'U' : 'UNIDOX'}
        </Text>
      )}
    </Box>
  );
}
