---
name: Credentials Generator
colors:
  surface: '#fcf8fd'
  surface-dim: '#dcd9de'
  surface-bright: '#fcf8fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7ec'
  surface-container-highest: '#e5e1e6'
  on-surface: '#1b1b1f'
  on-surface-variant: '#46464f'
  inverse-surface: '#313034'
  inverse-on-surface: '#f3eff4'
  outline: '#777680'
  outline-variant: '#c7c5d0'
  surface-tint: '#575a8b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131643'
  on-primary-container: '#7d80b3'
  inverse-primary: '#c0c2f9'
  secondary: '#2b18ea'
  on-secondary: '#ffffff'
  secondary-container: '#4842ff'
  on-secondary-container: '#dfddff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201e'
  on-tertiary-container: '#00938d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#c0c2f9'
  on-primary-fixed: '#131643'
  on-primary-fixed-variant: '#404371'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c1c1ff'
  on-secondary-fixed: '#0a006b'
  on-secondary-fixed-variant: '#2506e6'
  tertiary-fixed: '#4efaf1'
  tertiary-fixed-dim: '#13ddd4'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#00504c'
  background: '#fcf8fd'
  on-background: '#1b1b1f'
  surface-variant: '#e5e1e6'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-padding: 80px
---

## Brand & Style

This design system establishes a high-performance, tech-forward identity for the Latin American education sector. It balances the authority of a traditional institution with the agility of a modern startup. The visual language utilizes a "Dual-Zone" aesthetic: high-density dark surfaces for navigation and immersive headers, contrasted against expansive, airy light layouts for learning and consumption.

The style is **Corporate / Modern** with a **Glassmorphic** twist. It relies on deep saturation, vibrant gradients, and precise geometry to signal innovation, while the softened corners and fluid spacing keep the experience approachable for students and educators.

## Colors

The palette is anchored by the **Dark Primary (#040535)**, used to create a "command center" feel in headers and sidebars. The **Purple Accent** acts as the bridge between the dark brand space and the interactive elements.

**Interactive & Functional:**
- **Turquoise CTA:** Reserved for primary calls-to-action to ensure maximum "pop" against both dark and light backgrounds.
- **Vibrant Accents:** Green and Orange are used exclusively for status indicators (success/warning) or small data visualization points to prevent visual fatigue.
- **Body Text:** Avoid pure black; use the desaturated #4a4a68 to maintain a professional, high-end editorial feel.

## Typography

This design system uses a dual-font strategy to balance impact with readability.

**Montserrat** is the voice of the brand, used for headings to convey strength and architectural stability. Use tighter letter spacing on larger display sizes to maintain a "tech-heavy" look.

**Poppins** handles all functional UI and long-form content. Its geometric but friendly construction ensures legibility in educational modules. Use 500 or 600 weight for UI labels and 400 for paragraph text.

## Layout & Spacing

The layout follows a **12-column fixed grid** on desktop, centering content within a 1280px container to ensure readability on ultrawide monitors.

**Responsive Behavior:**
- **Desktop:** 24px gutters, 64px side margins.
- **Tablet:** 8-column grid, 16px gutters, 32px side margins.
- **Mobile:** 4-column fluid grid, 16px gutters, 20px side margins.

Use an **8px base unit** for all internal component spacing to maintain a rhythmic vertical flow. White space should be used generously between major sections (80px+) to distinguish between different learning modules.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layering** to create a sense of organized hierarchy.

- **Primary Elevation (Cards/Inputs):** Use a soft, diffused shadow tinted with the secondary color: `0px 10px 30px rgba(71, 64, 255, 0.08)`. This creates a "lift" that feels integrated with the brand color rather than a generic grey shadow.
- **The Header Zone:** Uses the Header Gradient. Elements placed on top of this (like profile dropdowns) should use **Glassmorphism**—a 10% white fill with a 20px background blur—to maintain the depth of the dark primary zone.
- **Interactive States:** When hovering over interactive cards, the shadow should slightly expand and increase in opacity to `0.12` to provide tactile feedback.

## Shapes

The shape language is "Friendly-Tech." All interactive containers and cards use a **20px radius (radius-lg)** to soften the high-contrast professional look.

- **Buttons & Small Components:** Use a **12px radius** to feel precise but not sharp.
- **Large Content Sections:** For containers that house video players or course modules, use a **24px radius**.
- **Icons:** Use icons with rounded terminals (e.g., Lucide or Feather style) to match the curvature of the UI elements.

## Components

### Buttons
- **Primary:** Uses the "Action Gradient" (#4740ff to #2ae5dc) with white text. High-contrast shadow on hover.
- **Secondary:** Transparent background with a 1.5px border of #4740ff.
- **Ghost:** No border, Purple Accent text, subtle light-purple background on hover.

### Cards
Cards are the primary container for course info. Use the Background Light (#fafafa) with a 1px border (#e5e5ec). On hover, remove the border and apply the primary ambient shadow.

### Input Fields
Inputs use #fafafa background with a #e5e5ec border. On focus, the border transitions to the Purple Accent and a soft focus ring (3px spread, 10% opacity) is applied. Labels should be in Poppins 600, 14px.

### Navigation Header
The main header uses the "Header Gradient." Navigation links are white with 70% opacity, transitioning to 100% opacity with a small Turquoise CTA colored dot underneath on the active state.

### Progress Bars (Unique to Education)
Background of #e5e5ec with the "Action Gradient" used for the fill. Use a subtle inner shadow to give the bar a "carved-in" look.