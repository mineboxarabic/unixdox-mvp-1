"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <Box
      bg="bg.surface"
      borderRadius="lg"
      border="1px solid"
      borderColor="border.muted"
      overflow="hidden"
      className={className}
    >
      {children}
    </Box>
  );
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <Flex
      px="4"
      py="4"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid"
      borderColor="border.muted"
      className={className}
    >
      {children}
    </Flex>
  );
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <Box px="4" py="4" className={className}>
      {children}
    </Box>
  );
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <Flex
      px="4"
      py="3"
      alignItems="center"
      justifyContent="flex-end"
      borderTop="1px solid"
      borderColor="border.muted"
      gap="2"
      className={className}
    >
      {children}
    </Flex>
  );
}
