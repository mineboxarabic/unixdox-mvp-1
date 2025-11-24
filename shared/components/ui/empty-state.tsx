"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface EmptyStateProps {
  icon: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      py="12"
      px="4"
      gap="4"
      textAlign="center"
    >
      <Box color="neutral.400" fontSize="4xl">
        {icon}
      </Box>
      {title && (
        <Text fontSize="lg" fontWeight="medium" color="text.fg">
          {title}
        </Text>
      )}
      {description && (
        <Text fontSize="sm" color="text.fg.muted" maxW="md">
          {description}
        </Text>
      )}
      {action && <Box mt="2">{action}</Box>}
    </Flex>
  );
}
