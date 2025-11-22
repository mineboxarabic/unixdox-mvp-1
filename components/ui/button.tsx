import React from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export type ButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonVariant = 'solid' | 'subtle' | 'surface' | 'outline' | 'ghost' | 'plain';
export type ButtonColorPalette = 'gray' | 'red' | 'blue' | 'green';

export interface ButtonProps extends Omit<ChakraButtonProps, 'size' | 'variant' | 'colorPalette'> {
  /**
   * Button size - controls height, padding, and font size
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Button visual style variant
   * @default 'solid'
   */
  variant?: ButtonVariant;
  
  /**
   * Color scheme for the button
   * @default 'gray'
   */
  colorPalette?: ButtonColorPalette;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactElement;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactElement;
  
  /**
   * If true, the button will take up the full width of its container
   */
  fullWidth?: boolean;
}

// Size configurations matching Figma design system
const sizeStyles: Record<ButtonSize, {
  height: string;
  px: string;
  fontSize: string;
  lineHeight: string;
  iconSize: string;
  gap: string;
}> = {
  '2xs': {
    height: '24px',
    px: '8px',
    fontSize: '12px',
    lineHeight: '16px',
    iconSize: '16px',
    gap: '4px',
  },
  xs: {
    height: '32px',
    px: '12px',
    fontSize: '12px',
    lineHeight: '16px',
    iconSize: '16px',
    gap: '6px',
  },
  sm: {
    height: '36px',
    px: '14px',
    fontSize: '14px',
    lineHeight: '20px',
    iconSize: '20px',
    gap: '8px',
  },
  md: {
    height: '40px',
    px: '16px',
    fontSize: '14px',
    lineHeight: '20px',
    iconSize: '20px',
    gap: '8px',
  },
  lg: {
    height: '44px',
    px: '20px',
    fontSize: '16px',
    lineHeight: '24px',
    iconSize: '20px',
    gap: '8px',
  },
  xl: {
    height: '48px',
    px: '20px',
    fontSize: '16px',
    lineHeight: '24px',
    iconSize: '24px',
    gap: '12px',
  },
  '2xl': {
    height: '64px',
    px: '28px',
    fontSize: '18px',
    lineHeight: '28px',
    iconSize: '24px',
    gap: '12px',
  },
};

// Variant styles matching Figma design system
const variantStyles: Record<ButtonVariant, Record<ButtonColorPalette, {
  bg: string;
  color: string;
  border?: string;
  _hover: { bg: string };
  _active?: { bg: string };
}>> = {
  solid: {
    gray: {
      bg: 'gray.800',
      color: 'white',
      _hover: { bg: 'gray.700' },
      _active: { bg: 'gray.900' },
    },
    red: {
      bg: 'red.600',
      color: 'white',
      _hover: { bg: 'red.700' },
      _active: { bg: 'red.800' },
    },
    blue: {
      bg: 'blue.600',
      color: 'white',
      _hover: { bg: 'blue.700' },
      _active: { bg: 'blue.800' },
    },
    green: {
      bg: 'green.600',
      color: 'white',
      _hover: { bg: 'green.700' },
      _active: { bg: 'green.800' },
    },
  },
  subtle: {
    gray: {
      bg: 'gray.100',
      color: 'gray.800',
      _hover: { bg: 'gray.200' },
      _active: { bg: 'gray.300' },
    },
    red: {
      bg: 'red.100',
      color: 'red.800',
      _hover: { bg: 'red.200' },
      _active: { bg: 'red.300' },
    },
    blue: {
      bg: 'blue.100',
      color: 'blue.800',
      _hover: { bg: 'blue.200' },
      _active: { bg: 'blue.300' },
    },
    green: {
      bg: 'green.100',
      color: 'green.800',
      _hover: { bg: 'green.200' },
      _active: { bg: 'green.300' },
    },
  },
  surface: {
    gray: {
      bg: 'gray.50',
      color: 'gray.800',
      _hover: { bg: 'gray.100' },
      _active: { bg: 'gray.200' },
    },
    red: {
      bg: 'red.50',
      color: 'red.800',
      _hover: { bg: 'red.100' },
      _active: { bg: 'red.200' },
    },
    blue: {
      bg: 'blue.50',
      color: 'blue.800',
      _hover: { bg: 'blue.100' },
      _active: { bg: 'blue.200' },
    },
    green: {
      bg: 'green.50',
      color: 'green.800',
      _hover: { bg: 'green.100' },
      _active: { bg: 'green.200' },
    },
  },
  outline: {
    gray: {
      bg: 'transparent',
      color: 'gray.800',
      border: '1px solid',
      _hover: { bg: 'gray.50' },
      _active: { bg: 'gray.100' },
    },
    red: {
      bg: 'transparent',
      color: 'red.600',
      border: '1px solid',
      _hover: { bg: 'red.50' },
      _active: { bg: 'red.100' },
    },
    blue: {
      bg: 'transparent',
      color: 'blue.600',
      border: '1px solid',
      _hover: { bg: 'blue.50' },
      _active: { bg: 'blue.100' },
    },
    green: {
      bg: 'transparent',
      color: 'green.600',
      border: '1px solid',
      _hover: { bg: 'green.50' },
      _active: { bg: 'green.100' },
    },
  },
  ghost: {
    gray: {
      bg: 'transparent',
      color: 'gray.800',
      _hover: { bg: 'gray.100' },
      _active: { bg: 'gray.200' },
    },
    red: {
      bg: 'transparent',
      color: 'red.600',
      _hover: { bg: 'red.50' },
      _active: { bg: 'red.100' },
    },
    blue: {
      bg: 'transparent',
      color: 'blue.600',
      _hover: { bg: 'blue.50' },
      _active: { bg: 'blue.100' },
    },
    green: {
      bg: 'transparent',
      color: 'green.600',
      _hover: { bg: 'green.50' },
      _active: { bg: 'green.100' },
    },
  },
  plain: {
    gray: {
      bg: 'transparent',
      color: 'gray.600',
      _hover: { bg: 'transparent' },
    },
    red: {
      bg: 'transparent',
      color: 'red.600',
      _hover: { bg: 'transparent' },
    },
    blue: {
      bg: 'transparent',
      color: 'blue.600',
      _hover: { bg: 'transparent' },
    },
    green: {
      bg: 'transparent',
      color: 'green.600',
      _hover: { bg: 'transparent' },
    },
  },
};

/**
 * Button component based on CUI 2.1 design system from Figma
 * 
 * Features:
 * - 7 sizes: 2xs, xs, sm, md, lg, xl, 2xl
 * - 6 variants: solid, subtle, surface, outline, ghost, plain
 * - 4 color palettes: gray, red, blue, green
 * - Left and right icon support
 * - Full Chakra UI compatibility
 * 
 * @example
 * ```tsx
 * <Button size="md" variant="solid" colorPalette="blue">
 *   Click me
 * </Button>
 * 
 * <Button 
 *   size="lg" 
 *   variant="outline" 
 *   colorPalette="green"
 *   leftIcon={<IconElement />}
 * >
 *   With Icon
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'solid',
      colorPalette = 'gray',
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeStyles[size];
    const variantConfig = variantStyles[variant][colorPalette];

    // Clone icons with proper size
    const clonedLeftIcon = leftIcon && React.cloneElement(leftIcon, {
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
    } as any);

    const clonedRightIcon = rightIcon && React.cloneElement(rightIcon, {
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
    } as any);

    return (
      <ChakraButton
        ref={ref}
        h={sizeConfig.height}
        px={sizeConfig.px}
        fontSize={sizeConfig.fontSize}
        lineHeight={sizeConfig.lineHeight}
        fontWeight="normal"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={sizeConfig.gap}
        w={fullWidth ? 'full' : 'auto'}
        transition="all 0.2s"
        {...variantConfig}
        {...props}
      >
        {clonedLeftIcon}
        {children}
        {clonedRightIcon}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
