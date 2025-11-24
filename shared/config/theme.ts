import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
        body: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
      },
      colors: {
        // Primary brand colors (Blue)
        primary: {
          50: { value: '#EFF6FF' },
          100: { value: '#DBEAFE' },
          200: { value: '#BFDBFE' },
          300: { value: '#93C5FD' },
          400: { value: '#60A5FA' }, // Light blue from Figma
          500: { value: '#3B82F6' }, // Main brand blue
          600: { value: '#2563EB' }, // Active/Selected blue
          700: { value: '#1D4ED8' },
          800: { value: '#1E40AF' },
          900: { value: '#1E3A8A' },
        },
        // Neutral/Gray colors
        neutral: {
          0: { value: '#FFFFFF' },
          1: { value: '#FAFAFA' },
          2: { value: '#F3F3F4' }, // Borders from Figma
          50: { value: '#FAFAFA' },
          100: { value: '#F4F4F5' },
          200: { value: '#E4E4E7' },
          300: { value: '#D4D4D8' },
          400: { value: '#A1A1AA' },
          500: { value: '#71717A' },
          600: { value: '#52525B' }, // Muted text from Figma
          700: { value: '#3F3F46' }, // Default text from Figma
          800: { value: '#27272A' }, // Dark buttons from Figma
          900: { value: '#18181B' },
        },
        // Accent color (Orange)
        accent: {
          500: { value: '#F49C15' }, // Orange accent from Figma
        },
        // Semantic tokens
        bg: {
          default: { value: '#FFFFFF' },
          muted: { value: '#F4F4F5' },
          subtle: { value: '#FAFAFA' },
        },
        fg: {
          default: { value: '#27272A' },
          muted: { value: '#52525B' },
          subtle: { value: '#71717A' },
        },
        border: {
          default: { value: '#E4E4E7' },
          muted: { value: '#F3F3F4' },
        },
      },
      fontSizes: {
        xs: { value: '0.75rem' },    // 12px
        sm: { value: '0.875rem' },   // 14px
        md: { value: '1rem' },       // 16px
        lg: { value: '1.125rem' },   // 18px
        xl: { value: '1.25rem' },    // 20px
        '2xl': { value: '1.5rem' },  // 24px
        '3xl': { value: '1.875rem' }, // 30px
        '4xl': { value: '2.25rem' },  // 36px
      },
      fontWeights: {
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
      },
      lineHeights: {
        none: { value: '1' },
        tight: { value: '1.25' },
        normal: { value: '1.5' },
        relaxed: { value: '1.75' },
      },
      radii: {
        sm: { value: '0.25rem' },    // 4px
        md: { value: '0.5rem' },     // 8px
        lg: { value: '0.75rem' },    // 12px
        xl: { value: '1rem' },       // 16px
        '2xl': { value: '1.5rem' },  // 24px
        full: { value: '9999px' },
      },
      spacing: {
        0: { value: '0' },
        1: { value: '0.25rem' },     // 4px
        2: { value: '0.5rem' },      // 8px
        3: { value: '0.75rem' },     // 12px
        4: { value: '1rem' },        // 16px
        5: { value: '1.25rem' },     // 20px
        6: { value: '1.5rem' },      // 24px
        8: { value: '2rem' },        // 32px
        10: { value: '2.5rem' },     // 40px
        12: { value: '3rem' },       // 48px
        16: { value: '4rem' },       // 64px
        20: { value: '5rem' },       // 80px
        24: { value: '6rem' },       // 96px
      },
      shadows: {
        sm: { value: '0px 1px 2px rgba(24, 24, 27, 0.10)' },
        md: { value: '0px 4px 6px rgba(24, 24, 27, 0.10)' },
        lg: { value: '0px 10px 15px rgba(24, 24, 27, 0.10)' },
      },
    },
    semanticTokens: {
      colors: {
        // Text colors
        'text.fg': {
          value: { base: '{colors.neutral.700}', _dark: '{colors.neutral.100}' },
        },
        'text.fg.muted': {
          value: { base: '{colors.neutral.600}', _dark: '{colors.neutral.400}' },
        },
        'text.fg.subtle': {
          value: { base: '{colors.neutral.500}', _dark: '{colors.neutral.500}' },
        },
        // Background colors
        'bg.canvas': {
          value: { base: '{colors.neutral.0}', _dark: '{colors.neutral.900}' },
        },
        'bg.surface': {
          value: { base: '{colors.neutral.0}', _dark: '{colors.neutral.800}' },
        },
        'bg.muted': {
          value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.800}' },
        },
        // Border colors
        'border.default': {
          value: { base: '{colors.neutral.200}', _dark: '{colors.neutral.700}' },
        },
        'border.muted': {
          value: { base: '{colors.neutral.2}', _dark: '{colors.neutral.800}' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
