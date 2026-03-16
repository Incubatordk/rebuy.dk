# Rebuy.dk

Marketing website for Rebuy — a location-based marketplace for buying and selling kids' items in Denmark.

## Tech Stack

- **Framework:** None (plain HTML/CSS/JS)
- **Styling:** Hand-written CSS with CSS custom properties (design tokens)
- **Hosting:** GitHub Pages with auto-deploy on push to `main`
- **i18n:** Danish (da) and English (en) with auto-detection and language toggle

## Site Modes

The site operates in two modes, controlled by `site.config.js`:

- `"prelaunch"` — Teaser page with email signup for launch notifications
- `"launched"` — App download page with iOS and Android links

To switch modes, edit `site.config.js` and change `SITE_MODE`.

## Local Development

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Design Tokens

CSS custom properties in `css/styles.css` match the iOS app theme:

- **Primary color:** `#F5A9A9` (Rebuy pink)
- **Gradient:** `#FBCECE` → `#F5A9A9`
- **Hover/Pressed:** `#E88888`
- **Font:** Instrument Sans (Google Fonts)
- **Background:** `#FAFAF9` (warm off-white)

## Brand Assets

Logo files in `assets/logos/` are sourced from `rebuy-core/brand/logos/`. The animated SVG features CSS keyframe animations of the mom+stroller mascot.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` which deploys the root directory to GitHub Pages. The `CNAME` file configures the custom domain.

## Related Repos

- `rebuy-core` — Design system, tokens, brand assets
- `rebuy-ios` — iOS app (SwiftUI)
- `rebuy-android` — Android app (Kotlin/Jetpack Compose)

## Internationalization (i18n)

The site supports Danish and English via `js/i18n.js`:

- **Auto-detection:** Uses `navigator.language` to pick da/en on first visit
- **Manual toggle:** Language button in the header (persisted in `localStorage`)
- **Translation keys:** All translatable text uses `data-i18n` attributes on HTML elements
- **Placeholders/aria:** Use `data-i18n-placeholder` and `data-i18n-aria` for input attributes
- **Adding strings:** Add keys to both `da` and `en` objects in `js/i18n.js`, then add `data-i18n="key"` to the HTML element

## Conventions

- All text content must have both Danish and English translations in `js/i18n.js`
- Danish is the default/fallback language
- Use GitHub issues for task tracking
- Create feature branches for all changes
- Follow conventional commit format

## Allowed Commands

- python3 (for local server)
- git
