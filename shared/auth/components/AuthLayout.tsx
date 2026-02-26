'use client';

import { Box, Flex, VStack, Image, Text } from '@chakra-ui/react';

/**
 * AuthLayout - Shared two-panel layout for login and register pages.
 * 
 * Left panel: White background with border-right, renders children.
 * Right panel: Gradient background image with centered white UNIDOX logo and tagline.
 * 
 * Matches the Figma v3.0 "RTD Sign in & Login" design.
 */
interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box w="full" h="100vh" overflow="hidden" position="relative">
      <Flex h="full" position="relative">
        {/* Left Panel - Auth Content */}
        <Flex
          flex="1"
          bg="white"
          borderRight="1px solid"
          borderColor="neutral.200"
          direction="column"
          justify="center"
          align="center"
          overflowY="auto"
        >
          {children}
        </Flex>

        {/* Right Panel - Gradient background with logo and tagline */}
        <Flex
          flex="1"
          h="full"
          overflow="hidden"
          justify="center"
          align="center"
          display={{ base: 'none', lg: 'flex' }}
          position="relative"
        >
          {/* Gradient background image */}
          <Box
            position="absolute"
            inset="0"
            backgroundImage="url('/gradient-bg.jpg')"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          />

          {/* Logo and tagline overlay */}
          <VStack
            position="relative"
            zIndex={1}
            gap={4}
            align="center"
          >
            <Image
              src="/Logo-text-white.svg"
              alt="UNIDOX Logo"
              width="305px"
              height="auto"
            />
            <Text
              fontSize="lg"
              fontWeight="normal"
              color="white"
              textAlign="center"
              opacity={0.9}
            >
              Vos documents, centralisés et accessibles
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
