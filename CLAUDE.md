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

### Build-time mode stripping

`index.html` contains both the `#prelaunch-content` and `#launched-content` sections — wrapped in HTML build markers (`<!--build:mode-prelaunch:start-->` / `<!--build:mode-launched:start-->`). `scripts/build-modes.js` runs during CI deploy and **strips the inactive block** from the deployed HTML so crawlers only ever see one narrative (one `<h1>`, one meta-description-matching body).

Locally, both sections stay in the source so dev can preview either via the `?mode=launched` / `?mode=prelaunch` URL params. Run `make modes` to test the stripped output — it mutates `index.html` in place, so `git checkout index.html` after.

## Local Development

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Design System

**`DESIGN.md` (repo root) is the source of truth for the visual identity** — colors, typography, spacing, radii, elevation, components, and the brand do's & don'ts. It follows Google's [DESIGN.md format](https://github.com/google-labs-code/design.md) (YAML front-matter tokens + Markdown rationale). Read `DESIGN.md` before any UI / CSS / copy change so you stay on-system, and update it whenever a token, component, or rule is added, renamed, or removed in `css/styles.css`. The CSS custom properties in `css/styles.css` are the runtime mirror of those tokens and must stay in sync.

Quick reference (full detail in `DESIGN.md`):

- **Primary color:** `#F5A9A9` (Rebuy pink)
- **Gradient:** `#FBCECE` → `#F5A9A9` at 135°
- **Hover/Pressed:** `#E88888`
- **Font:** Instrument Sans (Google Fonts)
- **Background:** `#FAFAF9` (warm off-white)

## Brand Assets

Logo files in `assets/logos/` are sourced from `rebuy-core/brand/logos/`. The animated SVG features CSS keyframe animations of the mom+stroller mascot.

## App showcase screenshots

The launched-mode App Showcase renders raw, un-framed screenshots inside CSS-rendered device frames (`.phone-frame--ios` with a Dynamic Island, `.phone-frame--android` with a centered punch hole). The platform tab toggle (iOS / Android) defaults to the visitor's User-Agent; the hero/CTA store buttons reorder so the visitor's native store sits first.

Screenshots are **generated** from the sibling app repos by `scripts/sync-screenshots.js` — do not hand-edit the files in `assets/screenshots/`:

```bash
make screenshots          # or: node scripts/sync-screenshots.js
```

What it does:

1. Reads raw fastlane PNGs from `rebuy-ios/fastlane/screenshots/{da,en-US}/iPhone 17 Pro Max-*.png` and `rebuy-android/fastlane/metadata/android/{da-DK,en-US}/images/phoneScreenshots/*.png`.
2. Resizes with ImageMagick (default 360 px CSS width, 720 px for @2x), encodes WebP with `cwebp` at quality 85.
3. Writes to `assets/screenshots/{ios,android}/{da,en}/{slug}.webp` and `{slug}@2x.webp`.

To refresh screenshots after a new fastlane run, re-run `make screenshots`. To point at non-sibling clones: `IOS_REPO=/path ANDROID_REPO=/path make screenshots`.

The canonical five-screen sequence is defined in `SCREENS` in the script (feed → detail → messages → post → profile). To add/remove a screen, edit `SCREENS` AND the matching `<figure>` blocks in `index.html` — each phone-frame's `<img data-img="…">` slug must match a screen slug. Captions live in `js/i18n.js` under `showcase.*`.

Requires `magick` (ImageMagick 7+) and `cwebp` on PATH. Install with `brew install imagemagick webp` on macOS.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` which deploys the root directory to GitHub Pages. The `CNAME` file configures the custom domain.

## Blog & RSS feeds

Pre-launch content plan and post-by-post workflow live in **`BLOG-CONTENT-CALENDAR.md`** (16-post plan for building topical authority before launch).

Posts live at `blog/<slug>/index.html`. Two feeds are **generated** by `scripts/build-feed.js` during deploy — do not hand-edit them:

- `blog/feed.xml` — Danish (`<language>da-dk</language>`)
- `blog/en/feed.xml` — English (`<language>en</language>`)

The generator scans every `blog/*/index.html` (excluding `blog/en/`), extracts metadata, rewrites relative URLs to absolute, and emits RSS 2.0 with `<content:encoded>` (full per-language body) plus `<media:content>` / `<media:thumbnail>` / `<enclosure>` for the cover image. Run locally with `node scripts/build-feed.js`.

**Required per-post markup (Danish):**

- `<link rel="canonical" href="https://rebuy.dk/blog/<slug>/">`
- `<meta property="og:title" content="…">` (the " — Rebuy" suffix is stripped automatically)
- `<meta name="description" content="…">`
- `<meta property="article:published_time" content="YYYY-MM-DD">`
- `<meta property="og:image" content="https://rebuy.dk/assets/blog/…">` plus `og:image:width`, `og:image:height`, `og:image:alt`
- Body wrapped in `<div class="post-content" data-blog-lang="da">…</div>`

**Optional English overrides** (the English feed falls back to the Danish values if these are missing):

- `<meta name="rebuy:title:en" content="…">`
- `<meta name="rebuy:description:en" content="…">`
- `<meta name="rebuy:image:alt:en" content="…">`
- Sibling body wrapped in `<div class="post-content" data-blog-lang="en">…</div>`

## Legal RSS feeds

The privacy policy and terms of use are also published as single-item RSS feeds so the iOS and Android apps can fetch and render the text directly. Feeds are **generated** by `scripts/build-legal-feeds.js` during deploy — do not hand-edit them:

- `privacy-policy/feed.xml` — Danish
- `privacy-policy/en/feed.xml` — English
- `terms-of-use/feed.xml` — Danish
- `terms-of-use/en/feed.xml` — English

The generator loads `js/i18n.js` in a Node `vm` context, reads each legal page's `<main class="legal">` block, and for every element carrying `data-i18n="key"` it swaps in the translated string — mirroring what `i18n.js` does at runtime. Each feed emits one `<item>` whose `<content:encoded>` is the rendered HTML body. Run locally with `node scripts/build-legal-feeds.js`.

**Required per-page markup:**

- `<meta property="article:published_time" content="YYYY-MM-DD">` (drives `<pubDate>` / `<lastBuildDate>`)
- `<main class="legal">…</main>` body wrapper, with every translatable node carrying a `data-i18n` key that exists in both `da` and `en` dictionaries in `js/i18n.js`

To update the "last updated" date shown both on-page and in the feed, bump both the `privacy.updated` / `tou.updated` strings in `js/i18n.js` and the `article:published_time` meta in the HTML.

## Sitemap

`sitemap.xml` is **generated** by `scripts/build-sitemap.js` during deploy — do not hand-edit it. Run locally with `make sitemap` or `node scripts/build-sitemap.js`.

What it does:

1. Lists every public URL (home, blog index, legal pages, account deletion) plus every blog post discovered under `blog/<slug>/` (excluding `blog/en/`, which only hosts the English RSS feed).
2. Reads `<lastmod>` from `git log -1 --format=%cI -- <file>`. **Not** `fs.statSync().mtime` — CI checkouts rewrite mtime to checkout time, which makes Google ignore the field entirely (June 2023 lastmod guidance).
3. Emits trailing-slash URLs (`/blog/`, `/privacy-policy/`) because GitHub Pages 301-redirects no-slash → slash for directories; a sitemap entry that redirects is a soft error in Search Console.

To add a new sitemapped route, edit `STATIC_ROUTES` in `scripts/build-sitemap.js`. New blog posts are picked up automatically.

The deploy workflow uses `actions/checkout@v4` with `fetch-depth: 0` so the script can read full git history.

After deploy, sanity-check with:

```bash
for url in $(xmllint --xpath '//*[local-name()="loc"]/text()' sitemap.xml); do
  curl -sI -o /dev/null -w "%{http_code} %{url_effective}\n" "$url"
done
```

Every line should be `200 <same URL>` — no `301` and no redirected `url_effective`.

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
