'use client';

import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import type { UseAvatarProps as ChakraAvatarProps } from '@chakra-ui/react';

export interface AvatarProps extends Omit<ChakraAvatarProps, 'size'> {
  name?: string;
  src?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Avatar({ name, src, size = 'md', ...props }: AvatarProps) {
  const sizeMap = {
    'xs': '24px',
    'sm': '32px',
    'md': '40px',
    'lg': '48px',
    'xl': '56px',
    '2xl': '64px',
  };

  return (
    <ChakraAvatar.Root
      scale={sizeMap[size]}


      {...props}
    >
      {src && <ChakraAvatar.Image src={src} alt={name} />}
      <ChakraAvatar.Fallback>
        {name
          ? name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
          : '?'}
      </ChakraAvatar.Fallback>
    </ChakraAvatar.Root>
  );
}
