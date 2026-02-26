# UnixDox Design System

## Overview
This document describes the design system configuration for the UnixDox application. All design tokens (colors, typography, spacing, etc.) are centralized in `/config/theme.ts` using Chakra UI v3.

## Font Family

### Inter Font
- **Primary Font**: Inter (Google Fonts)
- **Weights Used**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Application**: Used for all headings, body text, and UI elements
- **Configuration**: Loaded in `app/layout.tsx` and applied globally

## Color Palette

### Primary Colors (Electric Indigo Blue)
Brand identity colors used for CTAs, links, and interactive elements.

| Token | Value | Usage |
|-------|-------|-------|
| `primary.50` | #e8f1ff | Very light backgrounds |
| `primary.100` | #d5e4ff | Light backgrounds, hover states |
| `primary.200` | #b3ccff | Borders, subtle accents |
| `primary.300` | #85a8ff | Gradient accents, secondary |
| `primary.400` | #5676ff | Gradient accents, active |
| `primary.500` | #2f45ff | Main brand color, primary buttons |
| `primary.600` | #0c0eff | Active states, solid buttons |
| `primary.700` | #0000fd | Deep active states |
| `primary.800` | #0609cd | Dark accents |
| `primary.900` | #10169f | Very dark accents |
| `primary.950` | #0a0b5c | Darkest brand shade |

### Neutral Colors (Gray Scale)
Used for text, backgrounds, and borders.

| Token | Value | Usage |
|-------|-------|-------|
| `neutral.0` | #FFFFFF | White backgrounds |
| `neutral.2` | #F3F3F4 | Subtle borders (Figma specific) |
| `neutral.100` | #F4F4F5 | Muted backgrounds |
| `neutral.200` | #E4E4E7 | Default borders |
| `neutral.300` | #D4D4D8 | Disabled states |
| `neutral.600` | #52525B | Muted text |
| `neutral.700` | #3F3F46 | Default text color |
| `neutral.800` | #27272A | Dark buttons, emphasis |
| `neutral.900` | #18181B | Maximum contrast |

### Accent Colors
| Token | Value | Usage |
|-------|-------|-------|
| `accent.500` | #F49C15 | Orange accent for highlights |

## Semantic Tokens

Semantic tokens automatically adapt to light/dark mode and provide meaningful naming.

### Text Colors
- `text.fg` - Default foreground text (gray.700 / gray.50)
- `text.fg.muted` - Secondary/muted text (gray.600 / gray.400)
- `text.fg.subtle` - Tertiary/placeholder text (gray.400 / gray.500)
- `text.fg.md` - Medium text (#787d84 / gray.400)
- `text.fg.inverted` - Inverted text (gray.50 / gray.800)
- `text.fg.error` - Error text (red.500 / red.400)
- `text.fg.warning` - Warning text (yellow.600 / yellow.300)
- `text.fg.success` - Success text (green.600 / green.300)
- `text.fg.info` - Info text (primary.600 / primary.300)

### Background Colors
- `bg.canvas` - Page background (white / black)
- `bg.surface` - Card/component surface (white / gray.950)
- `bg.subtle` - Subtle backgrounds (gray.50 / gray.950)
- `bg.muted` - Muted backgrounds (gray.100 / gray.900)
- `bg.emphasized` - Emphasized backgrounds (gray.200 / gray.800)
- `bg.inverted` - Inverted backgrounds (black / white)
- `bg.panel` - Panel backgrounds (white / gray.950)
- `bg.error` - Error backgrounds (red.50)
- `bg.warning` - Warning backgrounds (orange.50)
- `bg.success` - Success backgrounds (green.50)
- `bg.info` - Info backgrounds (primary.50)

### Border Colors
- `border.default` - Standard borders (gray.200 / gray.800)
- `border.subtle` - Subtle borders (gray.50 / gray.950)
- `border.muted` - Muted borders (gray.100 / gray.900)
- `border.emphasized` - Emphasized borders (gray.300 / gray.700)
- `border.inverted` - Inverted borders (gray.800 / gray.200)
- `border.error` - Error borders (red.500 / red.400)
- `border.warning` - Warning borders (orange.500 / orange.400)
- `border.success` - Success borders (green.500 / green.400)
- `border.info` - Info borders (primary.500 / primary.400)

### Foreground Colors
- `fg.default` - Default foreground (gray.800 / gray.100)
- `fg.muted` - Muted foreground (gray.600 / gray.500)
- `fg.subtle` - Subtle foreground (gray.400 / gray.500)
- `fg.inverted` - Inverted foreground (gray.50 / black)
- `fg.error` - Error foreground (red.500 / red.400)
- `fg.warning` - Warning foreground (orange.600 / orange.300)
- `fg.success` - Success foreground (green.600 / green.300)
- `fg.info` - Info foreground (primary.600 / primary.300)

## Typography Scale

### Font Sizes
| Token | Size | Usage |
|-------|------|-------|
| `xs` | 12px | Small labels, captions |
| `sm` | 14px | Body text, UI elements |
| `md` | 16px | Default body text |
| `lg` | 18px | Large text, subheadings |
| `xl` | 20px | Section headings |
| `2xl` | 24px | Page headings |
| `3xl` | 30px | Large headings |
| `4xl` | 36px | Hero text |

### Font Weights
- `normal` - 400 (body text)
- `medium` - 500 (emphasis)
- `semibold` - 600 (headings)
- `bold` - 700 (strong emphasis)

### Line Heights
- `tight` - 1.25 (compact layouts)
- `normal` - 1.5 (default body text)
- `relaxed` - 1.75 (spacious text)

## Spacing Scale

Based on 4px increments for consistency.

| Token | Size | Pixels |
|-------|------|--------|
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `10` | 2.5rem | 40px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| `2xs` | 1px | Hairline borders |
| `xs` | 2px | Tiny elements |
| `sm` | 4px | Small elements, checkboxes |
| `md` | 6px | Buttons, inputs |
| `lg` | 8px | Cards, toggles |
| `xl` | 12px | Large cards |
| `2xl` | 16px | Hero sections |
| `3xl` | 24px | Large sections |
| `4xl` | 32px | Extra large sections |
| `full` | 9999px | Pills, circular elements |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 0px 1px 2px rgba(24, 24, 27, 0.10) | Subtle elevation |
| `md` | 0px 4px 6px rgba(24, 24, 27, 0.10) | Cards, dropdowns |
| `lg` | 0px 10px 15px rgba(24, 24, 27, 0.10) | Modals, popovers |

## Usage Examples

### Using Theme Colors
```tsx
// Chakra UI props
<Box bg="primary.500" color="neutral.0">
  Primary Button
</Box>

// With semantic tokens (recommended)
<Text color="text.fg.muted">
  Secondary text that adapts to dark mode
</Text>
```

### Using Typography
```tsx
<Heading fontSize="2xl" fontWeight="semibold" color="text.fg">
  Page Heading
</Heading>

<Text fontSize="sm" fontWeight="normal" color="text.fg.muted">
  Body text with proper sizing
</Text>
```

### Using Spacing
```tsx
<VStack gap={4}>  {/* 16px gap */}
  <Box p={6}>     {/* 24px padding */}
    Content
  </Box>
</VStack>
```

## Modifying the Theme

### Changing Global Colors
Edit `/config/theme.ts`:

```typescript
primary: {
  500: { value: '#2f45ff' }, // Change this to update everywhere
}
```

### Adding New Colors
```typescript
// In config/theme.ts
tokens: {
  colors: {
    success: {
      500: { value: '#10B981' },
    }
  }
}
```

### Customizing Component Styles
Override default Chakra component styles in the theme configuration for consistent behavior across the app.

## File Structure

```
config/
  theme.ts              # Central theme configuration
app/
  layout.tsx            # Font loading and global setup
components/
  ui/
    provider.tsx        # Chakra provider with custom theme
features/
  auth/
    ui/
      registration/     # Components using theme tokens
```

## Best Practices

1. **Always use theme tokens** instead of hardcoded values
2. **Prefer semantic tokens** (`text.fg`) over specific colors (`neutral.700`)
3. **Use consistent spacing** from the scale (4px increments)
4. **Test dark mode** by using semantic tokens
5. **Keep typography hierarchy** with proper font sizes and weights
6. **Update theme.ts** for global changes, not individual components

## Dark Mode Support

The theme includes semantic tokens that automatically adapt to dark mode. When implementing dark mode:

1. Use semantic tokens (`text.fg`, `bg.surface`, etc.)
2. Test with `<ColorModeProvider>` toggle
3. Avoid hardcoded colors that don't adapt

---

**Last Updated**: June 2025  
**Design Reference**: [Figma - RTD Unidox v.3.0](https://www.figma.com/design/HFxN3Zy8d9RCmBruqMCX16/RTD-Unidox-v.3.0)  
**Design Tokens**: DSU-2.1
