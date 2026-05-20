---
version: alpha
name: Rebuy
description: A warm, soft-pink consumer marketplace identity for a Danish location-based app for buying and selling kids' items. The system runs on a single brand voltage — Rebuy Pink (#F5A9A9) and its lighter sibling (#FBCECE) blended into a 135° gradient — sitting on a warm off-white canvas (#FAFAF9) with deep near-black ink (#1A1A1A). Type is Instrument Sans throughout, leaning on display weights at -0.02 to -0.03em tracking; there is no secondary brand color and no dark mode. Surfaces are friendly and rounded (8 / 12 / 16 / 24 / pill), elevation is restrained to soft shadows plus a single signature pink-glow on the primary CTA, and feature cards plus the sticky header use glassmorphism (translucent white at 0.7 alpha behind a 20px backdrop blur). The aesthetic is intentionally domestic and mom-friendly rather than enterprise-clean — the mascot is a hand-drawn mom-with-stroller SVG that floats gently in the hero.

colors:
  primary: "#F5A9A9"
  primary-light: "#FBCECE"
  primary-dark: "#E88888"

  bg: "#FAFAF9"
  bg-card: "#FFFFFF"
  bg-warm: "#FFF8F6"

  ink: "#1A1A1A"
  text-secondary: "#6B6B6B"
  text-muted: "#707070"

  border: "#EBEBEB"

  on-primary-light: "#5C2222"
  on-dark: "#FFFFFF"

  success: "#34C759"
  warning: "#FF9500"
  error: "#FF3B30"

  scrim: "#000000"

typography:
  display-xl:
    fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 3.25rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  display-lg:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 2.5rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.03em
  display-md:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  title-lg:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  title-md:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  title-sm:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-prose:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0
  body-md:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0
  nav-link:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  button-md:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  badge:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  eyebrow:
    fontFamily: "'Instrument Sans', sans-serif"
    fontSize: 0.875rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.06em
    textTransform: uppercase

rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  "2xl": 48px
  "3xl": 64px
  "4xl": 96px

components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.primary-light} 0%, {colors.primary} 100%)"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    height: 48px
  button-secondary-hover:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  store-button:
    backgroundColor: "linear-gradient(180deg, #2A2A2A 0%, #161616 100%)"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "10px 24px"
    height: 52px
    shadow: "0 4px 14px rgba(26, 26, 26, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.14)"
  store-button-hover:
    backgroundColor: "linear-gradient(180deg, #2A2A2A 0%, #161616 100%)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    filter: "brightness(1.12)"
    transform: "translateY(-3px)"
    shadow: "0 10px 26px rgba(26, 26, 26, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18)"
  store-button-on-cta:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  card-glass:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  card-icon:
    backgroundColor: "linear-gradient(135deg, {colors.primary-light} 0%, {colors.primary} 100%)"
    rounded: "{rounded.md}"
    size: 48px
  hero-badge:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.on-primary-light}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  cta-banner:
    backgroundColor: "linear-gradient(135deg, {colors.primary-light} 0%, {colors.primary} 100%)"
    textColor: "{colors.ink}"
    bodyTextColor: "{colors.on-primary-light}"
    rounded: "{rounded.xl}"
    padding: "64px 32px"
  input-text:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: 48px
  input-text-focus:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  lang-toggle:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.nav-link}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    height: 48px
    width: 48px
  lang-toggle-hover:
    backgroundColor: "{colors.bg-warm}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.full}"
  header-bar:
    backgroundColor: "rgba(250, 250, 249, 0.8)"
    textColor: "{colors.ink}"
    padding: "16px 0"
  modal-dialog:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  blog-card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
  post-cta:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xl}"
  alert-success:
    backgroundColor: "rgba(52, 199, 89, 0.1)"
    textColor: "{colors.success}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  alert-error:
    backgroundColor: "rgba(255, 59, 48, 0.08)"
    textColor: "{colors.error}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
---

## Overview

Rebuy is a Danish location-based marketplace for buying and selling kids' items. The marketing site is a small, two-mode brochure for the iOS/Android app — `prelaunch` (teaser + email capture) and `launched` (store buttons + screenshot showcase) — controlled by `site.config.js`. The visual identity is intentionally **domestic and mom-friendly** rather than enterprise-clean: warm off-white canvas, a single soft pink that runs every primary surface, generous rounded corners on every interactive element, and a hand-drawn mom-with-stroller SVG mascot that floats gently in the hero.

The base canvas is a **warm off-white** (`{colors.bg}` — #FAFAF9) — never pure white — with a deep near-black ink (`{colors.ink}` — #1A1A1A) for headlines and body. A single voltage of **Rebuy Pink** (`{colors.primary}` — #F5A9A9) and its lighter sibling **Pink Light** (`{colors.primary-light}` — #FBCECE) carries every primary moment: the CTA gradient, the hero badge, the feature-card icon tile, the pink-glow shadow, the focus ring, and the bottom-of-page CTA banner. There is no secondary brand color, no dark mode, and no accent palette — additional non-brand color appears only in semantic states (success / warning / error) borrowed straight from iOS system colors to match the app.

Type runs **Instrument Sans** (Google Fonts) for everything — display, body, navigation, captions. Display headlines lean on weight 700 with `-0.02em` to `-0.03em` letter spacing, which gives the brand its slightly editorial, grown-up feel; body weights stay at 400. There is no separate display family.

The shape language is **soft**. Buttons and inputs are 12px (`{rounded.md}`), feature cards and modals are 16px (`{rounded.lg}`), the bottom CTA banner is 24px (`{rounded.xl}`), and the language toggle plus hero badge are fully pill-shaped (`{rounded.full}`). The blog cards and the post-CTA card are the one exception — they use a flatter 8px (`{rounded.sm}`) corner because they read as editorial content, not as marketing surfaces. Touch targets are universally 48px tall.

**Key Characteristics:**
- **Single brand voltage:** `{colors.primary}` (#F5A9A9) plus its lighter `{colors.primary-light}` (#FBCECE), blended into a **135° linear gradient** that lives on `{components.button-primary}`, `{components.cta-banner}`, and `{components.card-icon}`. Used scarcely — most of the page is warm-white + ink with one or two pink moments per scroll.
- **Glassmorphism on two surfaces only:** `{components.header-bar}` (sticky, translucent #FAFAF9 at 0.8 alpha behind a 20px backdrop-blur) and `{components.card-glass}` (the three feature cards in pre-launch mode — white at 0.7 alpha, 0.4-alpha white border, blurred). Nothing else uses blur.
- **One signature shadow:** the **pink-glow** (`0 8px 32px rgba(245, 169, 169, 0.3)`) sits on `{components.button-primary}` at rest and intensifies (`0 12px 40px rgba(245, 169, 169, 0.4)` plus a 1px lift) on hover. This is the brand's single piece of "elevation as identity."
- **Floating mascot:** the hero logo is an animated SVG of a mom-with-stroller that runs a 4s `float` keyframe (translateY 0 → -10px → 0). The animation is suppressed under `prefers-reduced-motion`.
- **Bilingual by construction:** every visible string has a `data-i18n` attribute and lives in both `da` and `en` objects in `js/i18n.js`. Danish is the default; English is auto-detected from `navigator.language` and toggled via the pill `{components.lang-toggle}` in the header.
- **Mobile-first with iOS hospitality:** 48px touch targets everywhere, 16px font-size on inputs (prevents iOS zoom-on-focus), `env(safe-area-inset-*)` padding on notched devices, and `@media (hover: none)` blocks that strip lift/translate effects on touch.

## Colors

### Brand & Accent
- **Rebuy Pink** (`{colors.primary}` — #F5A9A9): The single brand color. Used as the gradient endpoint on `{components.button-primary}` and `{components.cta-banner}`, the focus-ring tint (`rgba(245, 169, 169, 0.2)` — a 3px outer halo on form-input focus), the eyebrow / read-more / back-link inline link color, and the hover border tone on `{components.button-secondary}` and `{components.input-text}`.
- **Pink Light** (`{colors.primary-light}` — #FBCECE): The gradient start point and the standalone background of the `{components.hero-badge}`. On the hero badge, the text color is `{colors.on-primary-light}` (#5C2222 — a deep burgundy chosen to clear AA contrast on the pink, since ink-on-pink-light is too low-contrast).
- **Pink Dark** (`{colors.primary-dark}` — #E88888): The hover-state solid background on `{components.button-primary}` (replacing the gradient), and the inline link color throughout body copy and the eyebrow / read-more / back-link tokens. Inline links flip to `{colors.ink}` on hover rather than darkening further.

### Surface
- **Warm Off-White Canvas** (`{colors.bg}` — #FAFAF9): The default page floor everywhere. Never pure white — the site's whole identity is the warmth of this off-white versus the slight cool of pure white card surfaces above it.
- **Card White** (`{colors.bg-card}` — #FFFFFF): The fill for `{components.modal-dialog}`, `{components.input-text}`, `{components.blog-card}`, `{components.post-cta}`, and `{components.lang-toggle}`. The white-on-warm-white separation is what gives the card surfaces lift even before any shadow.
- **Warm Peach** (`{colors.bg-warm}` — #FFF8F6): A pale peach used for blog-card image placeholders, the post-hero-image fallback, and the hover state of `{components.lang-toggle}` and the modal close button. The only non-pink warm tone in the system.

### Text
- **Ink** (`{colors.ink}` — #1A1A1A): The dominant text tone. Headlines, body, primary CTA labels, navigation links on hover or when active. Never pure black.
- **Secondary** (`{colors.text-secondary}` — #6B6B6B): Sub-headings, hero subtitle, card body copy, footer links, post body copy, and inactive nav links. The system's running text outside hero / display.
- **Muted** (`{colors.text-muted}` — #707070): Footer copyright line, post-meta dates, and form input placeholder text. Slightly warmer than pure neutral.

### Hairlines & Borders
- **Border** (`{colors.border}` — #EBEBEB): The single 1px / 1.5px hairline tone used on `{components.button-secondary}`, `{components.input-text}`, `{components.lang-toggle}`, `{components.blog-card}`, `{components.post-cta}`, the footer top border, and the scrolled-state header bottom border. There is no secondary border tone.

### Semantic (iOS System Colors)
The semantic tones are imported directly from iOS to match the app's banners and toasts:
- **Success** (`{colors.success}` — #34C759): Used in `{components.alert-success}` for signup-success and contact-success messages, with a 10% tint background and 30% tint border.
- **Warning** (`{colors.warning}` — #FF9500): Reserved for future use; currently unused in the marketing site.
- **Error** (`{colors.error}` — #FF3B30): Used in `{components.alert-error}` for signup and contact validation errors, with an 8% tint background and 30% tint border.

### Scrim
- **Scrim** (`{colors.scrim}` — #000000 at 0.45 opacity): The modal backdrop tone behind the contact dialog. Stored as the base hex; opacity is applied at render time.

## Typography

### Font Family
The system runs **Instrument Sans** (Google Fonts, weights 400 / 500 / 600 / 700) for everything — display, body, navigation, captions, microcopy, buttons. Fallbacks walk `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` so the brand reads cleanly even before the web font loads. There is no separate display family; the same family carries the entire scale.

The web font is preconnected to `fonts.googleapis.com` and `fonts.gstatic.com` and loaded with the `media="print" onload="this.media='all'"` swap pattern to keep first-contentful-paint fast.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 3.25rem (52px) | 700 | 1.1 | -0.03em | Hero `h1`, blog hero `h1`, post header `h1` (desktop) |
| `{typography.display-lg}` | 2.5rem (40px) | 700 | 1.1 | -0.03em | Hero / blog hero / post header `h1` (≤900px tablet) |
| `{typography.display-md}` | 2rem (32px) | 700 | 1.2 | -0.02em | Showcase `h2` ("Built for…"), CTA banner `h2`, hero `h1` (≤640px mobile) |
| `{typography.title-lg}` | 1.5rem (24px) | 600 | 1.2 | 0 | Signup `h2`, modal dialog `h2`, blog card `h2`, post-content `h2` |
| `{typography.title-md}` | 1.25rem (20px) | 600 | 1.25 | -0.02em | Header logo wordmark, mobile fall-down for signup / modal / cta titles |
| `{typography.title-sm}` | 1.125rem (18px) | 600 | 1.4 | 0 | Feature card `h3` ("Køb og sælg lokalt") |
| `{typography.body-lg}` | 1.25rem (20px) | 400 | 1.5 | 0 | Hero subtitle, blog hero dek, post dek |
| `{typography.body-prose}` | 1.125rem (18px) | 400 | 1.75 | 0 | Long-form post body — the only place line-height jumps to 1.75 for reading rhythm |
| `{typography.body-md}` | 1rem (16px) | 400 | 1.6 | 0 | Default running text everywhere else |
| `{typography.body-sm}` | 0.875rem (14px) | 400 | 1.5 | 0 | Feature card body, footer copy, footer links, contact button |
| `{typography.caption}` | 0.75rem (12px) | 400 | 1.2 | 0 | Store button "Download on the" / "Get it on" sub-label |
| `{typography.nav-link}` | 0.875rem (14px) | 600 | 1.25 | 0 | Header nav links, language toggle |
| `{typography.button-md}` | 1rem (16px) | 600 | 1.4 | 0 | Primary and secondary CTA labels |
| `{typography.badge}` | 0.875rem (14px) | 600 | 1.2 | 0 | Hero badge ("Pre-launch") |
| `{typography.eyebrow}` | 0.875rem (14px) | 700 | 1.2 | 0.06em (uppercase) | Blog eyebrow label above post titles |

### Principles
Display headlines are **tightly tracked** (-0.02em to -0.03em). Instrument Sans at 700 with negative tracking gives the brand its slightly editorial, grown-up feel — without it, the type would read too SaaS-clean for a domestic / family marketplace. Body copy stays at neutral tracking and 1.5–1.6 line-height; the post-content prose token bumps line-height to 1.75 as the only reading-rhythm exception.

The mobile fall-down is aggressive and deliberate. Hero `h1` runs the entire ladder — 3.25rem → 2.5rem (≤900px) → 2rem (≤640px) → 1.625rem (≤380px, iPhone SE) — with `word-break: break-word; hyphens: auto;` at the smallest tier, because Danish compound nouns ("børneudstyr", "tøjbørnetilbehør") need permission to wrap.

Form inputs are pinned at **16px** explicitly (not via the rem ladder) to suppress iOS Safari's zoom-on-focus behavior. This is the only place `font-size` is set in absolute pixels rather than `var(--text-*)`.

### Note on Font Substitutes
If Instrument Sans is unavailable (e.g., during font-loading flash), the system falls back to the platform UI stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`), all of which are tighter and less editorial than Instrument Sans. **Inter** is the closest open-source substitute if a self-hosted alternative is needed; nudge display headlines down ~2% in line-height to match Instrument's slightly looser cap height.

## Layout

### Spacing System
- **Base unit:** 4px (with no sub-step).
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.2xl}` 48px · `{spacing.3xl}` 64px · `{spacing.4xl}` 96px.
- The token names mirror the iOS app's `DesignTokens.swift` exactly so values read the same in design conversations across web and native.
- **Section padding (vertical):** `{spacing.4xl}` (96px) for top-level marketing sections (`.section`, hero, blog hero, post header, blog list bottom), collapsed to `{spacing.2xl}` (48px) on mobile.
- **Card internal padding:** `{spacing.xl}` (32px) on `{components.card-glass}` and `{components.modal-dialog}` and `{components.post-cta}`; `{spacing.lg}` (24px) on `{components.blog-card}`; `{spacing.md}` (16px) on `{components.alert-success}` and `{components.alert-error}`.
- **Gutters:** `{spacing.lg}` (24px) between feature cards and inside the showcase phone gallery; `{spacing.md}` (16px) between store buttons; `{spacing.sm}` (12px) between header nav items on mobile.

### Grid & Container
- **Max content width:** `1140px` on every page, centered with `0 var(--space-lg)` horizontal padding (`24px`), tightened to `0 var(--space-md)` (`16px`) on mobile.
- **Hero copy column:** capped at `700px` (h1) and `560px` (subtitle) and centered, so headline length stays readable without forcing a narrow page container.
- **Feature card grid:** 3-column at desktop (`grid-template-columns: repeat(3, 1fr)`), collapsing to 1-column with a `480px` max-width centered on tablet (≤900px).
- **Showcase phone gallery:** horizontal scroll-snap row with `240px` cards and `{spacing.xl}` (32px) gutters; the scroll-padding equation `max(var(--space-lg), calc((100vw - 1140px) / 2))` keeps the first card aligned with the page container at every viewport.
- **Blog list:** 2-column blog card (`minmax(260px, 0.8fr) 1fr`) capped at `920px` desktop, collapsing to 1-column at `620px` max on tablet.
- **Post body:** `720px` reading column, with the post hero image at `min(1040px, 100% - 48px)` — the image pokes wider than the prose column for visual relief.

### Whitespace Philosophy
The system is **generous at the macro and tight at the micro**. Major sections breathe at 96px vertical padding (one of the larger values in modern marketing systems — taller than Stripe or Linear), but card-internal padding stays at 24–32px and card gutters at 16–24px. The contrast reads as: "open, calm page rhythm; warm, contained card content." That tension is the layout signature.

## Elevation & Depth

The system has **four shadow tiers plus the pink-glow signature**, but uses them sparingly — the macro page is intentionally near-flat.

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.04)` | Reserved; not currently bound to a component. |
| `--shadow` | `0 2px 8px rgba(0, 0, 0, 0.06)` | Default card lift — `{components.card-glass}`, `{components.blog-card}`, `{components.post-cta}`. |
| `--shadow-md` | `0 4px 16px rgba(0, 0, 0, 0.08)` | Hover state on `{components.card-glass}`. |
| `--shadow-lg` | `0 8px 32px rgba(0, 0, 0, 0.1)` | `{components.modal-dialog}` only — the only modal in the system. |
| `--shadow-pink` | `0 8px 32px rgba(245, 169, 169, 0.3)` | The signature: `{components.button-primary}` at rest. Intensifies to `0 12px 40px rgba(245, 169, 169, 0.4)` on hover. |

There is also a single **drop-shadow filter** (`drop-shadow(0 18px 32px rgba(26, 26, 26, 0.12))`) applied to phone screenshot images in the showcase — distinct from the box-shadow tiers because it must clip to the phone bezel silhouette, not its bounding rectangle.

**Store-button depth (sanctioned drop + hairline).** `{components.store-button}` is the one component that pairs a drop shadow with an `inset 0 1px 0` white hairline — `0 4px 14px rgba(26,26,26,0.18)` at rest, deepening to `0 10px 26px rgba(26,26,26,0.28)` on hover. This is **not** a violation of the "never two shadow tiers at once" rule: the inset line is an *edge highlight* (functioning like a 1px top border to give the dark gradient a lit edge on the warm canvas), not a second elevation tier. The rest/hover shadows live in `--store-rest-shadow` / `--store-hover-shadow` custom props scoped to `.store-btn`, which the touch (`@media hover:none`) and CTA-variant blocks re-point rather than re-declare.

**Hover-lift pattern.** Cards translate `translateY(-4px)` to `-6px` on hover, store buttons `-3px` (settling to `-1px` on press), all on a `--transition-base` (250ms ease) ramp. Primary CTA lifts only `-1px` because the pink-glow does the work. **All lift effects are disabled** under `@media (hover: none)` for touch devices — both the `transform` and the increased `box-shadow` are reset, otherwise iOS Safari leaves a tap residue.

**Reduced motion.** Under `@media (prefers-reduced-motion: reduce)`, all animation-duration and transition-duration values collapse to `0.01ms`, the hero logo float keyframe is suppressed, the smooth-scroll behavior is replaced with `auto`, and the `[data-animate]` fade-in-up on scroll is short-circuited (`opacity: 1; transform: none;`). This is a hard rule — every animation honors it.

## Shapes

The shape language is **soft and rounded across the board**. There are no hard corners on interactive elements.

| Token | Value | Where it lives |
|---|---|---|
| `{rounded.sm}` 8px | Editorial card surfaces — `{components.blog-card}`, `{components.post-cta}`, `{components.blog-card}` images, post hero image, post hero image wrapper. The flatter corner reads as "content," not "marketing surface." |
| `{rounded.md}` 12px | The system default — `{components.button-primary}`, `{components.button-secondary}`, `{components.store-button}`, `{components.input-text}`, `{components.alert-*}`, `{components.card-icon}`. |
| `{rounded.lg}` 16px | Container surfaces — `{components.card-glass}`, `{components.modal-dialog}`, phone screenshots, mobile fall-down for the CTA banner. |
| `{rounded.xl}` 24px | The big-statement surface — `{components.cta-banner}` only. The largest rectangular radius in the system. |
| `{rounded.full}` 9999px | Pills — `{components.hero-badge}`, `{components.lang-toggle}`, the modal close button. |

The hero logo and the pink-glow shadow visually round the silhouette of the page even where geometry is rectangular.

## Components

### Buttons
- **`{components.button-primary}`** — the gradient pink CTA. 135° linear-gradient from `{colors.primary-light}` to `{colors.primary}`, ink text (not white — contrast ratio is friendlier on pink), 12px radius, 48px tall, padded 12/24, with the signature `--shadow-pink` glow. On hover, the gradient flips to a flat `{colors.primary-dark}` solid, the button lifts 1px, and the pink shadow intensifies. On press, the lift drops back to 0.
- **`{components.button-secondary}`** — white card surface with a 1.5px `{colors.border}` outline, ink text. Border tone shifts to `{colors.primary}` on hover; no fill change. Used as a quieter neighbor to the primary CTA.
- **`{components.store-button}`** — the iOS-style "Download on the App Store" / "Get it on Google Play" pill. A near-black **vertical gradient** (`#2A2A2A` → `#161616` at 180°, *not* the brand pink gradient) fill with white text, an inline 26×26 SVG icon, and a two-line label stack (caption + body-md). At rest it carries a soft drop shadow plus a 1px white inset top-edge highlight (see Elevation) so the dark pill lifts off the warm canvas and reads as a lit, tactile surface rather than a flat rectangle. **Hover** lifts it 3px, brightens the fill (`filter: brightness(1.12)`), and deepens the drop shadow; **press** settles it to a 1px lift with a tighter shadow; **focus-visible** draws a 3px pink ring (`rgba(245, 169, 169, 0.55)`, 2px offset). On the CTA banner, the variant `{components.store-button-on-cta}` flips to white fill with ink text (and a white inset highlight) so it survives the gradient backdrop — there the brightness filter is suppressed so the ink label never washes out, darkening the fill on hover instead.

### Cards
- **`{components.card-glass}`** — the three pre-launch feature cards. White at 0.7 alpha behind a 20px `backdrop-filter: blur(20px)`, a 1px white-at-0.4-alpha border, 16px radius, default `--shadow`. Hover lifts 4px and bumps to `--shadow-md`. Each card holds a 48×48 `{components.card-icon}` (gradient pink tile, 12px radius, centered emoji or icon glyph), a `{typography.title-sm}` headline, and a `{typography.body-sm}` body line.
- **`{components.blog-card}`** — flatter editorial surface. White fill, 1px `{colors.border}` outline, 8px radius, default `--shadow`. Two-column desktop layout (image + body), single-column on tablet.
- **`{components.post-cta}`** — same fill / border / shadow as blog card; sits at the bottom of every blog post as a "read next / convert" surface.

### Forms
- **`{components.input-text}`** — used for both signup email and contact form fields. White fill, 1.5px `{colors.border}`, 12px radius, 16px font-size (anti-zoom), 48px tall. **Focus state** swaps the border to `{colors.primary}` and adds a 3px outer halo (`0 0 0 3px rgba(245, 169, 169, 0.2)`) — the only place a `box-shadow` is used for a focus ring rather than `outline`.
- **`{components.alert-success}` / `{components.alert-error}`** — inline form-result banners. Tinted iOS semantic color at 8–10% alpha background, 30% alpha border, 12px radius, semantic text color, weight 500.

### Surfaces
- **`{components.header-bar}`** — sticky top bar. `rgba(250, 250, 249, 0.8)` background behind a 20px `backdrop-filter: blur(20px)`. Border is transparent at rest, becomes `{colors.border}` once `.header--scrolled` is set on scroll. Holds the logo on the left, language toggle plus nav links on the right. Padding includes `env(safe-area-inset-left/right)` on notched devices.
- **`{components.modal-dialog}`** — white fill, 16px radius, `--shadow-lg`, max-width 500px, max-height 90vh with internal scroll. The 36×36 close button is a pill at top-right that fills `{colors.bg-warm}` on hover. Backdrop is `{colors.scrim}` at 0.45 opacity, click-to-dismiss.
- **`{components.cta-banner}`** — the bottom-of-page conversion surface in launched mode. Full pink gradient fill, 24px radius, 64/32 padding, **ink** (`{colors.ink}`) display headline and a **deep-burgundy** (`{colors.on-primary-light}` — #5C2222) body line. White text (the original treatment) measured ~1.4–1.9:1 on the light gradient and failed WCAG AA, so the banner follows the same "ink on pink" rule as the primary button. The store buttons inside flip to `{components.store-button-on-cta}` (white fill, ink text) so they survive the pink backdrop.
- **`{components.hero-badge}`** — pre-launch teaser pill above the hero h1. Pink-light fill, deep burgundy `{colors.on-primary-light}` text (#5C2222 — chosen specifically because ink at #1A1A1A on #FBCECE is too low-contrast).
- **`{components.lang-toggle}`** — DA / EN pill in the header. White fill, 1.5px border, secondary text, 48×48 minimum hit area (despite being visually smaller). Hover swaps to warm peach fill, primary-dark text, primary border. Press scales to 0.96.

### Segmented Tabs & Step Strip (launched mode)
- **Segmented pill-tabs** — the showcase platform toggle (`.platform-tabs`, iPhone / Android) and the "Sådan virker det" flow toggle (`.flow-tabs`, Køb / Sælg) share one pattern: an inline-flex `{colors.bg-card}` track with a 1.5px `{colors.border}` outline and `{rounded.full}` radius, holding pill tabs that read `{colors.text-secondary}` at rest and flip to an ink fill with white text plus a soft ink shadow when `aria-selected="true"`. Both are real ARIA tablists driving `hidden` tabpanels.
- **How-it-works step** — each step in the 3-up strip (`.step-card`) layers onto the shared `{components.card-glass}` surface: a head row pairs the gradient `{components.card-icon}` tile (emoji glyph) with a large pink decorative numeral (`.step-card-num`, `{typography.display-lg}`-scale in `{colors.primary}`), above a `{typography.title-sm}` headline and a `{typography.body-sm}` line. The `<ol>` stays a semantic ordered list — the visible numeral is `aria-hidden`. The grid is 3-column on desktop and collapses to one column ≤900px, mirroring the feature-card grid.

### Animation
- **Hero logo float** — 4s `float` keyframe (`translateY(0)` → `-10px` → `0`) on `.hero-logo`, infinite. Suppressed under reduced-motion.
- **Scroll-in fade-up** — elements with `[data-animate]` start at `opacity: 0; transform: translateY(20px)` and animate to `opacity: 1; transform: translateY(0)` over `--transition-slow` (400ms). Stagger is via `[data-animate-delay="1|2|3"]` (100 / 200 / 300ms).
- **fadeInUp / pulse keyframes** are defined but currently unbound — reserve them for future entrances if needed.

## Do's and Don'ts

### Colors
- **Do** use the pink gradient (`linear-gradient(135deg, #FBCECE 0%, #F5A9A9 100%)`) for primary CTAs, the bottom CTA banner, and the feature card icon tile. These three surfaces are the brand's "pink moments." Don't add a fourth without owner approval.
- **Do** put ink text (`#1A1A1A`) on the pink gradient — not white — on **both** the primary button and the CTA banner. White on the light pink gradient fails WCAG AA (~1.4–1.9:1); ink clears 9:1+. For a softer body line on the gradient, use the deep-burgundy `{colors.on-primary-light}` (#5C2222), which still clears AA.
- **Do** use deep burgundy (`#5C2222`) for any text that sits on the lighter `{colors.primary-light}` (#FBCECE) background. Ink on pink-light is too low-contrast.
- **Do** keep semantic colors (success / warning / error) in their iOS hex values exactly. The app and the marketing site share a banner vocabulary.
- **Don't** introduce a secondary brand color — no blue accent, no green accent, no purple. The single-voltage system is the brand.
- **Don't** use pure white (`#FFFFFF`) for the page canvas — it must be `{colors.bg}` (#FAFAF9). The warm-on-cool separation between canvas and card is what gives surfaces lift before any shadow.
- **Don't** use pure black for text. `{colors.ink}` (#1A1A1A) is the floor.

### Type
- **Do** use Instrument Sans for everything. There is no display family.
- **Do** track display headlines tight (`-0.02em` to `-0.03em`). Without it, the brand reads SaaS-clean instead of editorial.
- **Do** pin form input `font-size` at `16px` literal (not `var(--text-*)`). This is the iOS no-zoom contract.
- **Don't** use a smaller line-height than 1.5 on body copy or 1.75 on long-form post prose. Reading rhythm is part of the brand.
- **Don't** use uppercase outside the eyebrow token. Uppercase is reserved for the editorial pre-title label on blog posts.

### Shape & Elevation
- **Do** use rounded corners on every interactive element. Hard corners are reserved for the page container and the body grid.
- **Do** keep the pink-glow shadow exclusive to `{components.button-primary}`. It's the brand's signature elevation; using it elsewhere dilutes it.
- **Don't** stack progressive shadow tiers. The system has four box-shadow tiers and uses one per surface — never two at the same time.
- **Don't** add `backdrop-filter: blur()` to a third surface. The header and the glass card are the only blurred surfaces; more would feel like macOS, not Rebuy.

### Motion
- **Do** honor `prefers-reduced-motion: reduce` on every new animation. The reduced-motion block in `css/styles.css` is a hard contract.
- **Do** wrap hover-lift effects in a behavior that disables them under `@media (hover: none)` — touch devices leave a residue otherwise.
- **Don't** add parallax, autoplay video, or scroll-jacking. The hero floats; everything else is a one-shot fade-up.
- **Don't** set transitions slower than `--transition-slow` (400ms). Anything longer feels like a glitch on a marketing site.

### Layout & Touch
- **Do** keep all touch targets at minimum 48px tall. The language toggle is visually small but its hit area is 48×48 — preserve that pattern.
- **Do** use `env(safe-area-inset-*)` on any new fixed / sticky element near the page edges.
- **Don't** ship copy inside an HTML element without a `data-i18n` attribute and corresponding entries in both the `da` and `en` objects in `js/i18n.js`. Danish is the default; English is the toggle. One-language-only strings are a regression.
- **Don't** introduce a third site mode beyond `prelaunch` and `launched` without first updating `site.config.js` and the documentation in `CLAUDE.md`.
