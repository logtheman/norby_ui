# Design Atoms Reference

This document lists all design tokens (atoms) available in the component library.

## ✅ Color Atoms

### Primary Colors
- `--color-brand` through `--color-brand-900`
- `--color-brand-foreground`

### Secondary Colors
- `--color-secondary` through `--color-secondary-900`
- `--color-secondary-foreground`

### Semantic Colors
- `--color-success` through `--color-success-900`
- `--color-warning` through `--color-warning-900`
- `--color-danger` through `--color-danger-900`
- `--color-default` through `--color-default-900`

### Surface Colors
- `--color-bg` / `--color-fg`
- `--color-surface` through `--color-surface-4`
- `--color-surface-foreground` through `--color-surface-4-foreground`

### Border Colors
- `--color-border`
- `--color-border-hover`

### Other Colors
- `--color-focus`
- `--color-overlay`
- `--color-fg-muted`
- `--color-fg-subtle`

## ✅ Radius Atoms

- `--r-none` (0)
- `--r-sm` (6px)
- `--r-md` (8px)
- `--r-lg` (12px)
- `--r-xl` (16px)
- `--r-2xl` (20px)
- `--r-3xl` (24px)
- `--r-full` (9999px)

## ✅ Spacing Atoms

- `--space-0` (0)
- `--space-1` (4px)
- `--space-2` (8px)
- `--space-3` (12px)
- `--space-4` (16px)
- `--space-5` (20px)
- `--space-6` (24px)
- `--space-7` (28px)
- `--space-8` (32px)
- `--space-9` (36px)
- `--space-10` (40px)
- `--space-12` (48px)
- `--space-16` (64px)
- `--space-20` (80px)
- `--space-24` (96px)

## ✅ Border Atoms

### Border Width
- `--border-width-none` (0)
- `--border-width-thin` (1px)
- `--border-width-medium` (2px)
- `--border-width-thick` (4px)

### Border Style
- `--border-style-none`
- `--border-style-solid`
- `--border-style-dashed`
- `--border-style-dotted`
- `--border-style-double`

## ✅ Opacity Atoms

### Opacity Scale (0-100)
- `--opacity-0` (0)
- `--opacity-5` (0.05)
- `--opacity-10` (0.1)
- `--opacity-20` (0.2)
- `--opacity-25` (0.25)
- `--opacity-30` (0.3)
- `--opacity-40` (0.4)
- `--opacity-50` (0.5)
- `--opacity-60` (0.6)
- `--opacity-70` (0.7)
- `--opacity-75` (0.75)
- `--opacity-80` (0.8)
- `--opacity-90` (0.9)
- `--opacity-95` (0.95)
- `--opacity-100` (1)

### Semantic Opacity Tokens
- `--opacity-light` (0.2)
- `--opacity-border` (0.3)
- `--opacity-regular` (0.5)
- `--opacity-dark` (0.8)
- `--disabled-opacity` (0.5)

## ✅ Elevation Atoms

### Shadows
- `--shadow-none`
- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`
- `--shadow-xl`
- `--shadow-2xl`
- `--shadow-inner`

### Elevation Levels
- `--elevation-0` (none)
- `--elevation-1` (sm)
- `--elevation-2` (md)
- `--elevation-3` (lg)
- `--elevation-4` (xl)
- `--elevation-5` (2xl)

## ✅ Z-Index Layers

- `--z-base` (0)
- `--z-dropdown` (1000)
- `--z-sticky` (1020)
- `--z-fixed` (1030)
- `--z-modal-backdrop` (1040)
- `--z-modal` (1050)
- `--z-popover` (1060)
- `--z-tooltip` (1070)
- `--z-toast` (1080)

## ✅ Typography Atoms

### Font Families
- `--font-sans` (system sans-serif)
- `--font-mono` (monospace)
- `--font-serif` (serif)

### Font Sizes
- `--fs-xs` (0.75rem)
- `--fs-sm` (0.875rem)
- `--fs-md` (1rem)
- `--fs-lg` (1.125rem)
- `--fs-xl` (1.25rem)
- `--fs-2xl` (1.5rem)
- `--fs-3xl` (1.875rem)
- `--fs-4xl` (2rem)
- `--fs-5xl` (2.25rem)
- `--fs-6xl` (3rem)

### Typography Scale
Comprehensive typography scale with:
- **Headlines**: Large 1/2, Medium 1/2, Small 1/2
- **Titles**: Large, Medium
- **Subtitles**: Large, Medium, Small
- **Body**: Large 1/2/3, Medium 1/2/3, Small 1/2/3
- **Labels**: Large, Medium, Small
- **Links**: Large, Medium, Small
- **Legal Links**: Large, Medium, Small
- **Price**: Currency Large/Small, Label Large 1/2, Small 1/2
- **Simple Variants**: headline, title, subtitle, bodyRegular, bodyEmphasized, bodyStrikethrough, bodyLink, bodyLegalLink, accent

## Usage Examples

```css
/* Using radius tokens */
.my-component {
  border-radius: var(--r-lg);
}

/* Using spacing tokens */
.my-component {
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-8);
}

/* Using border tokens */
.my-component {
  border-width: var(--border-width-thin);
  border-style: var(--border-style-solid);
  border-color: var(--color-border);
}

/* Using opacity tokens */
.my-overlay {
  opacity: var(--opacity-50);
}

/* Using elevation tokens */
.my-card {
  box-shadow: var(--elevation-2);
}

/* Using z-index tokens */
.my-modal {
  z-index: var(--z-modal);
}

/* Using typography tokens */
.my-heading {
  font-family: var(--font-sans);
  font-size: var(--fs-2xl);
}
```

## Dark Mode Support

All tokens automatically adapt to dark mode via `@media (prefers-color-scheme: dark)`. Colors, shadows, and other visual tokens are automatically adjusted for optimal contrast and readability.
