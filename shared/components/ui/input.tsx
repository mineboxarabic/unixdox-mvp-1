"use client";

import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface InputProps extends Omit<ChakraInputProps, "variant" | "size"> {
  variant?: "outline" | "filled";
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "outline", size = "md", ...props }, ref) => {
    const sizeStyles = {
      sm: { height: "8", fontSize: "sm", px: "3" },
      md: { height: "10", fontSize: "md", px: "4" },
      lg: { height: "12", fontSize: "lg", px: "4" },
    };

    return (
      <ChakraInput
        ref={ref}
        borderRadius="md"
        border="1px solid"
        borderColor="border.default"
        bg={variant === "filled" ? "bg.muted" : "bg.surface"}
        color="text.fg"
        _placeholder={{ color: "text.fg.subtle" }}
        _hover={{ borderColor: "primary.400" }}
        _focus={{
          borderColor: "primary.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
        }}
        {...sizeStyles[size]}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
