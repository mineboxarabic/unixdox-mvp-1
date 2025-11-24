"use client";

import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "solid" | "outline" | "subtle";
  colorScheme?: "primary" | "neutral" | "accent" | "success" | "warning" | "danger";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "subtle",
  colorScheme = "neutral",
  size = "sm",
}: BadgeProps) {
  const getColorStyles = () => {
    const baseColors = {
      primary: {
        solid: { bg: "primary.500", color: "white" },
        outline: { borderColor: "primary.500", color: "primary.600" },
        subtle: { bg: "primary.50", color: "primary.600" },
      },
      neutral: {
        solid: { bg: "neutral.700", color: "white" },
        outline: { borderColor: "neutral.300", color: "neutral.700" },
        subtle: { bg: "neutral.100", color: "neutral.700" },
      },
      accent: {
        solid: { bg: "accent.500", color: "white" },
        outline: { borderColor: "accent.500", color: "accent.500" },
        subtle: { bg: "#FEF3E2", color: "accent.500" },
      },
      success: {
        solid: { bg: "#10B981", color: "white" },
        outline: { borderColor: "#10B981", color: "#10B981" },
        subtle: { bg: "#D1FAE5", color: "#059669" },
      },
      warning: {
        solid: { bg: "#F59E0B", color: "white" },
        outline: { borderColor: "#F59E0B", color: "#F59E0B" },
        subtle: { bg: "#FEF3C7", color: "#D97706" },
      },
      danger: {
        solid: { bg: "#EF4444", color: "white" },
        outline: { borderColor: "#EF4444", color: "#EF4444" },
        subtle: { bg: "#FEE2E2", color: "#DC2626" },
      },
    };

    return baseColors[colorScheme][variant];
  };

  const sizeStyles = {
    sm: { fontSize: "xs", px: "2", py: "0.5", height: "20px" },
    md: { fontSize: "sm", px: "2.5", py: "1", height: "24px" },
  };

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      fontWeight="medium"
      whiteSpace="nowrap"
      border={variant === "outline" ? "1px solid" : undefined}
      {...getColorStyles()}
      {...sizeStyles[size]}
    >
      {children}
    </Box>
  );
}
