'use client';

import { Box } from '@chakra-ui/react';

interface SeparatorProps {
  variant?: 'solid' | 'dashed';
}

export function Separator({ variant = 'dashed' }: SeparatorProps) {
  return (
    <Box
      w="full"
      h="1px"
      bg={variant === 'solid' ? 'border.default' : 'transparent'}
      borderTop={variant === 'dashed' ? '1px dashed' : 'none'}
      borderColor="border.default"
    />
  );
}
