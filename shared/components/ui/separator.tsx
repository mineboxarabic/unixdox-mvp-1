"use client";

import { Box } from "@chakra-ui/react";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Separator({ orientation = "horizontal", className }: SeparatorProps) {
  return (
    <Box
      bg="border.default"
      width={orientation === "horizontal" ? "full" : "1px"}
      height={orientation === "horizontal" ? "1px" : "full"}
      className={className}
    />
  );
}
