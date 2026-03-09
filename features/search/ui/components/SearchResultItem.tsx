"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

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
  /**
   * Prevent the search input from losing focus (blur) before
   * the click event fires. Without this, the dropdown closes
   * in 200 ms via handleSearchBlur before onClick is processed.
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Box
      as="button"
      onClick={onClick}
      onMouseDown={handleMouseDown}
      px="2"
      py="2"
      borderRadius="md"
      width="full"
      textAlign="left"
      cursor="pointer"
      role="option"
      aria-label={label}
      _hover={{ bg: "bg.muted", transform: "translateX(2px)" }}
      _active={{ bg: "bg.subtle" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "colorPalette.focusRing", outlineOffset: "-2px" }}
      transition="all 0.15s ease"
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
