import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Unidox Design System v2.1
 * Based on DSU-2.1 Figma tokens
 * Primary brand: Electric indigo blue (#2f45ff)
 */
const customConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
        body: { value: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` },
      },
      colors: {
        // Primary brand colors (Electric indigo blue)
        primary: {
          50: { value: '#e8f1ff' },
          100: { value: '#d5e4ff' },
          200: { value: '#b3ccff' },
          300: { value: '#85a8ff' },
          400: { value: '#5676ff' },
          500: { value: '#2f45ff' },   // Main brand blue
          600: { value: '#0c0eff' },   // Active/Solid blue
          700: { value: '#0000fd' },
          800: { value: '#0609cd' },
          900: { value: '#10169f' },
          950: { value: '#0a0b5c' },
        },
        // Gray scale
        gray: {
          50: { value: '#fafafa' },
          100: { value: '#f4f4f5' },
          200: { value: '#e4e4e7' },
          300: { value: '#d4d4d8' },
          400: { value: '#a1a1aa' },
          500: { value: '#71717a' },
          600: { value: '#52525b' },
          700: { value: '#3f3f46' },
          800: { value: '#27272a' },
          900: { value: '#18181b' },
          950: { value: '#111111' },
        },
        // Neutral/Gray colors (kept for backward compat)
        neutral: {
          0: { value: '#FFFFFF' },
          1: { value: '#f7f7f8' },
          2: { value: '#f3f3f4' },
          50: { value: '#fafafa' },
          100: { value: '#f4f4f5' },
          200: { value: '#e4e4e7' },
          300: { value: '#d4d4d8' },
          400: { value: '#a1a1aa' },
          500: { value: '#71717a' },
          600: { value: '#52525b' },
          700: { value: '#3f3f46' },
          800: { value: '#27272a' },
          900: { value: '#18181b' },
        },
        // Red scale
        red: {
          50: { value: '#fef2f2' },
          100: { value: '#fee2e2' },
          200: { value: '#fecaca' },
          300: { value: '#fca5a5' },
          400: { value: '#f87171' },
          500: { value: '#ef4444' },
          600: { value: '#dc2626' },
          700: { value: '#991919' },
          800: { value: '#511111' },
          900: { value: '#300c0c' },
        },
        // Green scale
        green: {
          50: { value: '#f0fdf4' },
          100: { value: '#dcfce7' },
          200: { value: '#bbf7d0' },
          300: { value: '#86efac' },
          400: { value: '#4ade80' },
          500: { value: '#22c55e' },
          600: { value: '#16a34a' },
          700: { value: '#116932' },
          800: { value: '#124a28' },
          900: { value: '#042713' },
        },
        // Yellow scale
        yellow: {
          50: { value: '#fefce8' },
          100: { value: '#fef9c3' },
          200: { value: '#fef08a' },
          300: { value: '#fde047' },
          400: { value: '#facc15' },
          500: { value: '#eab308' },
          600: { value: '#ca8a04' },
          700: { value: '#845209' },
          800: { value: '#713f12' },
          900: { value: '#422006' },
        },
        // Orange scale
        orange: {
          50: { value: '#fff7ed' },
          100: { value: '#ffedd5' },
          200: { value: '#fed7aa' },
          300: { value: '#fdba74' },
          400: { value: '#fb923c' },
          500: { value: '#f97316' },
          600: { value: '#ea580c' },
          700: { value: '#92310a' },
          800: { value: '#6c2710' },
          900: { value: '#3b1106' },
        },
        // Purple scale
        purple: {
          50: { value: '#faf5ff' },
          100: { value: '#f3e8ff' },
          200: { value: '#e9d5ff' },
          300: { value: '#d8b4fe' },
          400: { value: '#c084fc' },
          500: { value: '#a855f7' },
          600: { value: '#9333ea' },
          700: { value: '#641ba3' },
          800: { value: '#4a1772' },
          900: { value: '#2f0553' },
        },
        // Pink scale
        pink: {
          50: { value: '#fdf2f8' },
          100: { value: '#fce7f3' },
          200: { value: '#fbcfe8' },
          300: { value: '#f9a8d4' },
          400: { value: '#f472b6' },
          500: { value: '#ec4899' },
          600: { value: '#db2777' },
          700: { value: '#a41752' },
          800: { value: '#6d0e34' },
          900: { value: '#45061f' },
        },
        // Cyan scale
        cyan: {
          50: { value: '#ecfeff' },
          100: { value: '#cffafe' },
          200: { value: '#a5f3fc' },
          300: { value: '#67e8f9' },
          400: { value: '#22d3ee' },
          500: { value: '#06b6d4' },
          600: { value: '#0891b2' },
          700: { value: '#0c5c72' },
          800: { value: '#134152' },
          900: { value: '#072a38' },
        },
        // Teal scale
        teal: {
          50: { value: '#f0fdfa' },
          100: { value: '#ccfbf1' },
          200: { value: '#99f6e4' },
          300: { value: '#5eead4' },
          400: { value: '#2dd4bf' },
          500: { value: '#14b8a6' },
          600: { value: '#0d9488' },
          700: { value: '#0c5d56' },
          800: { value: '#114240' },
          900: { value: '#032726' },
        },
        // Accent color (Orange)
        accent: {
          500: { value: '#F49C15' },
        },
        // Base color tokens
        bg: {
          default: { value: '#FFFFFF' },
          muted: { value: '#f4f4f5' },
          subtle: { value: '#fafafa' },
        },
        fg: {
          default: { value: '#27272a' },
          muted: { value: '#52525b' },
          subtle: { value: '#a1a1aa' },
        },
        border: {
          default: { value: '#e4e4e7' },
          muted: { value: '#f3f3f4' },
        },
      },
      fontSizes: {
        '2xs': { value: '0.625rem' }, // 10px
        xs: { value: '0.75rem' },     // 12px
        sm: { value: '0.875rem' },    // 14px
        md: { value: '1rem' },        // 16px
        lg: { value: '1.125rem' },    // 18px
        xl: { value: '1.25rem' },     // 20px
        '2xl': { value: '1.5rem' },   // 24px
        '3xl': { value: '1.875rem' }, // 30px
        '4xl': { value: '2.25rem' },  // 36px
        '5xl': { value: '3rem' },     // 48px
        '6xl': { value: '3.75rem' },  // 60px
        '7xl': { value: '4.5rem' },   // 72px
      },
      fontWeights: {
        thin: { value: '100' },
        extralight: { value: '200' },
        light: { value: '300' },
        normal: { value: '400' },
        medium: { value: '500' },
        semibold: { value: '600' },
        bold: { value: '700' },
        extrabold: { value: '800' },
        black: { value: '900' },
      },
      lineHeights: {
        shorter: { value: '1.125rem' },  // 18px
        short: { value: '1.375rem' },    // 22px
        moderate: { value: '1.5rem' },   // 24px
        tall: { value: '1.625rem' },     // 26px
        taller: { value: '2rem' },       // 32px
        none: { value: '1' },
        tight: { value: '1.25' },
        normal: { value: '1.5' },
        relaxed: { value: '1.75' },
      },
      letterSpacings: {
        tighter: { value: '-0.05em' },
        tight: { value: '-0.025em' },
        normal: { value: '0' },
        wide: { value: '0.025em' },
        wider: { value: '0.05em' },
        widest: { value: '0.1em' },
      },
      radii: {
        none: { value: '0' },
        '2xs': { value: '0.0625rem' }, // 1px
        xs: { value: '0.125rem' },     // 2px
        sm: { value: '0.25rem' },      // 4px
        md: { value: '0.375rem' },     // 6px
        lg: { value: '0.5rem' },       // 8px
        xl: { value: '0.75rem' },      // 12px
        '2xl': { value: '1rem' },      // 16px
        '3xl': { value: '1.5rem' },    // 24px
        '4xl': { value: '2rem' },      // 32px
        full: { value: '9999px' },
      },
      spacing: {
        0: { value: '0' },
        0.5: { value: '0.125rem' },    // 2px
        1: { value: '0.25rem' },       // 4px
        1.5: { value: '0.375rem' },    // 6px
        2: { value: '0.5rem' },        // 8px
        2.5: { value: '0.625rem' },    // 10px
        3: { value: '0.75rem' },       // 12px
        3.5: { value: '0.875rem' },    // 14px
        4: { value: '1rem' },          // 16px
        4.5: { value: '1.125rem' },    // 18px
        5: { value: '1.25rem' },       // 20px
        6: { value: '1.5rem' },        // 24px
        7: { value: '1.75rem' },       // 28px
        8: { value: '2rem' },          // 32px
        9: { value: '2.25rem' },       // 36px
        10: { value: '2.5rem' },       // 40px
        11: { value: '2.75rem' },      // 44px
        12: { value: '3rem' },         // 48px
        14: { value: '3.5rem' },       // 56px
        16: { value: '4rem' },         // 64px
        20: { value: '5rem' },         // 80px
        24: { value: '6rem' },         // 96px
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
          value: { base: '{colors.gray.700}', _dark: '{colors.gray.50}' },
        },
        'text.fg.muted': {
          value: { base: '{colors.gray.600}', _dark: '{colors.gray.400}' },
        },
        'text.fg.subtle': {
          value: { base: '{colors.gray.400}', _dark: '{colors.gray.500}' },
        },
        'text.fg.md': {
          value: { base: '#787d84', _dark: '{colors.gray.400}' },
        },
        'text.fg.inverted': {
          value: { base: '{colors.gray.50}', _dark: '{colors.gray.800}' },
        },
        'text.fg.error': {
          value: { base: '{colors.red.500}', _dark: '{colors.red.400}' },
        },
        'text.fg.warning': {
          value: { base: '{colors.yellow.600}', _dark: '{colors.yellow.300}' },
        },
        'text.fg.success': {
          value: { base: '{colors.green.600}', _dark: '{colors.green.300}' },
        },
        'text.fg.info': {
          value: { base: '{colors.primary.600}', _dark: '{colors.primary.300}' },
        },
        // Background colors
        'bg.canvas': {
          value: { base: '#ffffff', _dark: '#000000' },
        },
        'bg.surface': {
          value: { base: '#ffffff', _dark: '{colors.gray.950}' },
        },
        'bg.subtle': {
          value: { base: '{colors.gray.50}', _dark: '{colors.gray.950}' },
        },
        'bg.muted': {
          value: { base: '{colors.gray.100}', _dark: '{colors.gray.900}' },
        },
        'bg.emphasized': {
          value: { base: '{colors.gray.200}', _dark: '{colors.gray.800}' },
        },
        'bg.inverted': {
          value: { base: '#000000', _dark: '#ffffff' },
        },
        'bg.panel': {
          value: { base: '#ffffff', _dark: '{colors.gray.950}' },
        },
        'bg.error': {
          value: { base: '{colors.red.50}', _dark: '#1f0808' },
        },
        'bg.warning': {
          value: { base: '{colors.orange.50}', _dark: '#220a04' },
        },
        'bg.success': {
          value: { base: '{colors.green.50}', _dark: '#03190c' },
        },
        'bg.info': {
          value: { base: '{colors.primary.50}', _dark: '{colors.primary.950}' },
        },
        // Border colors
        'border.default': {
          value: { base: '{colors.gray.200}', _dark: '{colors.gray.800}' },
        },
        'border.subtle': {
          value: { base: '{colors.gray.50}', _dark: '{colors.gray.950}' },
        },
        'border.muted': {
          value: { base: '{colors.gray.100}', _dark: '{colors.gray.900}' },
        },
        'border.emphasized': {
          value: { base: '{colors.gray.300}', _dark: '{colors.gray.700}' },
        },
        'border.inverted': {
          value: { base: '{colors.gray.800}', _dark: '{colors.gray.200}' },
        },
        'border.error': {
          value: { base: '{colors.red.500}', _dark: '{colors.red.400}' },
        },
        'border.warning': {
          value: { base: '{colors.orange.500}', _dark: '{colors.orange.400}' },
        },
        'border.success': {
          value: { base: '{colors.green.500}', _dark: '{colors.green.400}' },
        },
        'border.info': {
          value: { base: '{colors.primary.500}', _dark: '{colors.primary.400}' },
        },
        // Foreground colors
        'fg.default': {
          value: { base: '{colors.gray.800}', _dark: '{colors.gray.100}' },
        },
        'fg.muted': {
          value: { base: '{colors.gray.600}', _dark: '{colors.gray.500}' },
        },
        'fg.subtle': {
          value: { base: '{colors.gray.400}', _dark: '{colors.gray.500}' },
        },
        'fg.inverted': {
          value: { base: '{colors.gray.50}', _dark: '#000000' },
        },
        'fg.error': {
          value: { base: '{colors.red.500}', _dark: '{colors.red.400}' },
        },
        'fg.warning': {
          value: { base: '{colors.orange.600}', _dark: '{colors.orange.300}' },
        },
        'fg.success': {
          value: { base: '{colors.green.600}', _dark: '{colors.green.300}' },
        },
        'fg.info': {
          value: { base: '{colors.primary.600}', _dark: '{colors.primary.300}' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
