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

### Previewing the inactive mode on production

`build-modes.js` also writes **`/index.preview.html`** with both sections present and a `noindex,nofollow` robots meta tag. Use it on production to flip between modes via URL param without touching the live `/`:

- `https://rebuy.dk/index.preview.html` — same as the live mode
- `https://rebuy.dk/index.preview.html?mode=launched` — preview launched
- `https://rebuy.dk/index.preview.html?mode=prelaunch` — preview prelaunch

The preview file is gitignored and regenerated fresh on every deploy. `robots.txt` also `Disallow:` it as belt-and-suspenders.

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

### Blog CTA store URLs

Each post carries an app-download CTA (`<section class="post-cta">`) with App Store / Google Play links. These stay **static HTML on purpose** (so they're crawlable and land in the RSS `<content:encoded>`), but that means the store URLs can drift from `site.config.js` — the class of bug in issue #102 (#90/PR #91 moved the App Store link to the DK storefront). `scripts/build-blog-cta.js` rewrites every `apps.apple.com` / `play.google.com` href **inside `post-cta` blocks** to `APP_STORE_URL` / `PLAY_STORE_URL` from `site.config.js`. Run with `make blog-cta`. It runs in `deploy.yml` before `build-feed.js`, and `check-generated.yml` fails a PR whose committed posts have drifted. Editing store URLs anywhere but `site.config.js` is therefore pointless — change them there and run `make blog-cta`.

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

## llms.txt (AI crawlers)

`robots.txt` explicitly allows ~20 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …) because Rebuy wants to be discoverable in AI answers. The two files those agents read are **generated** by `scripts/build-llms.js` during deploy — do not hand-edit them:

- `llms.txt` — llms.txt-format overview: H1, blockquote summary, then `## Section` link lists (Get the app, Key facts, Key pages, Blog posts, FAQ, For LLMs and AI assistants, About the company)
- `llms-full.txt` — the same product facts plus the full plain-markdown body of every blog post (Danish + English)

Run locally with `make llms` or `node scripts/build-llms.js`. Both files are committed (like `sitemap.xml` and the RSS feeds) so the served content is correct even outside a deploy, and so content drift shows up in review.

Everything is derived from existing sources, so the files can't go stale the way the hand-written originals did (they still said "join the waiting list" months after launch — see issue #93):

1. `site.config.js` → `SITE_MODE` (launched vs prelaunch narrative), `APP_STORE_URL`, `PLAY_STORE_URL`, `SUPPORT_EMAIL`. In launched mode the script **fails** if a store URL is missing.
2. `index.html` → which `faq.q*` entries exist and in what order; `js/i18n.js` → the English question/answer text. The FAQ section therefore always matches the visible FAQ and the FAQPage JSON-LD.
3. `js/i18n.js` → page titles (`fraud.title`, `privacy.title`, `tou.title`, `delete.title`) for the key-page list.
4. `blog/*/index.html` (excluding `blog/en/`) → post title/description/date from the same meta tags the RSS feed uses, plus the `post-content` body converted to markdown. Each post's `<section class="post-cta">` app-download CTA is **dropped** — not because it is stale copy (it isn't, since #92), but because both store URLs already appear twice in `llms-full.txt` (the "Where to get Rebuy" section and the footer), `BLOG-CONTENT-CALENDAR.md` mandates an identical CTA in all 16 planned posts so including it would be 32x duplicated boilerplate, and the button markup flattens to fragments rather than prose.

**Never** add ratings, review counts, testimonials, or user numbers here — same rule as the FAQPage JSON-LD (issue #47).

The step runs **before** `build-modes.js` in `.github/workflows/deploy.yml`, because the FAQ lives inside the `#launched-content` block that `build-modes.js` strips in a prelaunch deploy.

`.github/workflows/check-generated.yml` runs on every PR and **fails if the committed `llms.txt` / `llms-full.txt` differ from what `scripts/build-llms.js` produces** — the guard against the drift that caused #93. If it fails, run `make llms` and commit. It ignores the `Generated: <date>` line in `llms-full.txt`, which legitimately changes every day.

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

### The English homepage at `/en/`

Every page except the homepage serves English only through the runtime toggle, which means crawlers never see it. The homepage is the exception: **`en/index.html` is a real, indexable English page**, generated by `scripts/build-en.js` — do not hand-edit it, and note it is **gitignored** (like `index.preview.html`).

```bash
make en          # strips modes, generates, restores index.html
```

It is derived from `index.html` + the `en` dictionary in `js/i18n.js`, so the two languages cannot drift. The generator mirrors what `i18n.js` does at runtime — `[data-i18n]` text, `data-i18n-alt|-placeholder|-aria` attributes — and additionally rewrites the title/meta/OG block, the canonical, the hreflang set, the JSON-LD `@graph`, and every relative asset path (the page sits one directory down, so paths must be root-absolute).

Four things to know before touching any of this:

1. **Build order is load-bearing.** `build-en.js` must run **after** `build-modes.js` in `deploy.yml`, or the English page inherits both mode blocks and ships two `<h1>`s. The script asserts exactly one `<h1>` and fails the deploy otherwise.
2. **JSON-LD strings live in `js/i18n.js` under `schema.*`.** The Danish `@graph` in `index.html` contains literals not covered by `data-i18n` (`featureList`, HowTo names/descriptions, `og:image:alt`). Those are mirrored as `schema.*` keys in both dictionaries so the English page emits English structured data. **If you edit those literals in `index.html`, update the matching `schema.*` key.**
3. **hreflang must stay reciprocal.** `/` and `/en/` both declare the identical three-entry set (`da`, `en`, `x-default`). If one side drifts, Google discards the annotation entirely.
4. **The language toggle navigates when a sibling URL exists.** It looks for `link[rel="alternate"][hreflang="<target>"]:not([type])`. The `:not([type])` is essential — the legal and blog pages carry `rel="alternate"` links pointing at **RSS feeds**, and without the guard the toggle would navigate visitors to an XML file. Pages without a page-level alternate keep swapping in place. Navigation uses the path only, so it stays on the current origin instead of bouncing localhost to production.

`/en/` is locked with `data-lang-locked="en"` on `<html>`, which `I18N.detect()` honours first — otherwise a visitor whose stored preference is Danish would land on `/en/` from search and have it swapped to Danish client-side.

## Conventions

- All text content must have both Danish and English translations in `js/i18n.js`
- Danish is the default/fallback language
- Use GitHub issues for task tracking
- Create feature branches for all changes
- Follow conventional commit format

## Allowed Commands

- python3 (for local server)
- git
