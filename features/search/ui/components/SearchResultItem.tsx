"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface SearchResultItemProps {
  icon: ReactNode;
  label: string;
  rightIcon?: ReactNode;
  onClick: () => void;
}

export function SearchResultItem({
  icon,
  label,
  rightIcon,
  onClick,
}: SearchResultItemProps) {
  return (
    <Box
      as="button"
      onClick={onClick}
      px="2"
      py="1.5"
      borderRadius="sm"
      width="full"
      textAlign="left"
      cursor="pointer"
      _hover={{ bg: "bg.muted" }}
      transition="background 0.15s ease"
    >
      <Flex gap="1.5" alignItems="center">
        <Box flexShrink={0} display="flex" alignItems="center">
          {icon}
        </Box>
        <Text
          flex="1"
          fontSize="sm"
          fontWeight="normal"
          lineHeight="20px"
          color="text.fg.muted"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {label}
        </Text>
        {rightIcon && (
          <Box flexShrink={0} display="flex" alignItems="center">
            {rightIcon}
          </Box>
        )}
      </Flex>
    </Box>
  );
}
