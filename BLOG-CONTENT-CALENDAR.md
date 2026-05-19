# Rebuy Blog — Content Calendar

Planning artifact for [#43](https://github.com/Incubatordk/rebuy.dk/issues/43). The blog is the most important pre-launch SEO investment: it's the only way to build topical authority for the queries Danish parents actually search (*"brugt børnetøj"*, *"babyudstyr brugt"*, *"sælg babytøj"*) before competitors like Reshopper, DBA, and Facebook groups become the default answer.

## Strategy

- **Audience.** Danish mothers with kids 0–14, who are simultaneously buyers (looking for affordable, sustainable gear) and sellers (decluttering things their kids outgrew).
- **Intent split.** ~60% informational (top of funnel — how-to and trust-building), ~30% transactional (high-intent buying/selling guides), ~10% brand (Rebuy's story, values).
- **Volume.** Target **16 posts** before launch (12 minimum per #43 acceptance criteria, 4 buffer). One post per week ≈ 4 months runway.
- **Language.** Every post must ship in both Danish (default) and English. The current blog post infrastructure handles bilingual content in a single HTML file via `data-blog-lang` blocks — keep that pattern.
- **Internal linking.** Every post must link to the homepage waitlist CTA at least once. Posts in the same cluster should cross-link.
- **Format.** 800–1500 words, original cover image (1024×1051 to match `assets/blog/rebuy-blog.jpg`), 1–2 supporting photos where the topic justifies them.

## Per-post markup contract

Each post must follow the contract in `CLAUDE.md` → "Blog & RSS feeds":

- `<link rel="canonical" href="https://rebuy.dk/blog/<slug>/">`
- `<meta property="og:title" content="…">` (Danish; " — Rebuy" suffix stripped from feeds automatically)
- `<meta name="description" content="…">`
- `<meta property="article:published_time" content="YYYY-MM-DD">`
- `<meta property="og:image" content="…">` plus `og:image:width`, `og:image:height`, `og:image:alt`
- Body wrapped in `<div class="post-content" data-blog-lang="da">…</div>`
- Optional English overrides via `<meta name="rebuy:title:en">`, `<meta name="rebuy:description:en">`, `<meta name="rebuy:image:alt:en">`, plus sibling `<div class="post-content" data-blog-lang="en">…</div>`
- `BreadcrumbList` JSON-LD (template: see the existing `blog/the-secondhand-shop-at-the-end-of-your-street/index.html`)

Easiest path for a new post: copy the existing post directory, rename, and edit.

## The 16-post plan

Slugs follow Danish blog conventions but are URL-safe ASCII. Status: `📝 draft`, `🚧 in progress`, `✅ published`.

### Cluster 1 — Buying used kids' gear (4 posts)

| # | Slug | DA Title | Primary keyword | Intent | Status |
|---|------|----------|-----------------|--------|--------|
| 1 | `koeb-brugt-boernetoej-sikkert` | Sådan køber du brugt børnetøj sikkert — guide for forældre | brugt børnetøj | informational | 📝 |
| 2 | `tjekliste-brugt-autostol` | Brugt autostol: 7 ting du skal tjekke før du køber | brugt autostol | transactional | 📝 |
| 3 | `koeb-brugt-barnevogn` | Brugt barnevogn: sådan finder du en god handel | brugt barnevogn | transactional | 📝 |
| 4 | `babyudstyr-aldrig-brugt` | Babyudstyr du aldrig bør købe brugt | babyudstyr brugt | informational | 📝 |

### Cluster 2 — Selling (4 posts)

| # | Slug | DA Title | Primary keyword | Intent | Status |
|---|------|----------|-----------------|--------|--------|
| 5 | `klargor-boernetoej-til-salg` | Klargør børnetøj til salg — rens, fold, fotografér | sælg brugt børnetøj | transactional | 📝 |
| 6 | `pris-paa-brugt-boernetoej` | Sådan sætter du den rigtige pris på brugt børnetøj | priser brugt børnetøj | informational | 📝 |
| 7 | `boerneting-der-saelger-hurtigt` | De 5 ting der altid sælger hurtigt | sælg babytøj | informational | 📝 |
| 8 | `fotos-der-saelger` | Fotos der sælger: enkle tricks med din telefon | annonce børnetøj | informational | 📝 |

### Cluster 3 — Sustainability & family economy (4 posts)

| # | Slug | DA Title | Primary keyword | Intent | Status |
|---|------|----------|-----------------|--------|--------|
| 9 | `hvad-sparer-en-familie` | Hvad sparer en gennemsnitsfamilie på at købe brugt? | bæredygtig børnefamilie | informational | 📝 |
| 10 | `baeredygtige-boernefamilier` | Bæredygtige børnefamilier — små vaner med stor effekt | bæredygtig familie | informational | 📝 |
| 11 | `boernetoejs-stoerrelser-aldre` | Børnetøjsstørrelser: så ofte skifter børn størrelse | børnetøjsstørrelser | informational | 📝 |
| 12 | `hvor-meget-toej-har-en-baby-brug-for` | Hvor meget tøj har en baby egentlig brug for? | baby tøj guide | informational | 📝 |

### Cluster 4 — Local & community (4 posts)

| # | Slug | DA Title | Primary keyword | Intent | Status |
|---|------|----------|-----------------|--------|--------|
| 13 | `loppemarked-vs-apps` | Loppemarked vs. apps — hvor sælger man bedst børneting? | loppemarked børn | informational | 📝 |
| 14 | `facebook-grupper-boernefamilier` | Lokale Facebook-grupper for børnefamilier — pros og cons | facebook gruppe børnetøj | informational | 📝 |
| 15 | `mor-til-mor-handel` | Mor-til-mor handel: sådan undgår du de typiske faldgruber | trygt handel forældre | informational | 📝 |
| 16 | `dba-trendsales-reshopper-alternativ` | Hvor sælger danske familier brugt børnetøj? | DBA børnetøj alternativ | transactional | 📝 |

> **Note on post #16:** be factual when comparing — describe what each platform does and where Rebuy fits, not what the competitors do "wrong". The post is for searchers actively shopping for a tool, not for picking fights.

## Workflow for a new post

1. **Pick the next post** from this calendar and update the status to `🚧 in progress`.
2. **Outline + keyword research.** Confirm the primary keyword still has search volume; add 2–3 secondary keywords.
3. **Copy the template directory:** `cp -r blog/the-secondhand-shop-at-the-end-of-your-street blog/<new-slug>`.
4. **Write both languages** in their own `data-blog-lang` blocks. Danish first — write it natively; English mirror should feel native too (avoid literal translation).
5. **Add cover image** at `assets/blog/<slug>.jpg` (1024×1051 to match the existing post). Update all `og:image*` meta tags.
6. **Update all meta tags + JSON-LD** (canonical, dates, BreadcrumbList).
7. **Add at least one internal link** to the homepage waitlist (`/#signup` or just `/`).
8. **Run `node scripts/build-feed.js`** locally to confirm the post appears in both `blog/feed.xml` and `blog/en/feed.xml`.
9. **Bump the post entry** in `blog/index.html` (the listing page also has a `blogPost` array in its JSON-LD).
10. **PR + merge.** The CI workflow rebuilds the RSS feeds and the sitemap.
11. **After deploy:** request indexing in Google Search Console; mark post `✅ published` in this file.

## Internal linking map (suggested)

| From → To | Why |
|---|---|
| Post 1 → Post 2, Post 3, Post 4 | Buying cluster cross-links |
| Post 5 → Post 6, Post 7, Post 8 | Selling cluster cross-links |
| Post 9 → Post 10, Post 11 | Sustainability cluster cross-links |
| Post 13 → Post 14, Post 15, Post 16 | Community cluster cross-links |
| All posts → `/` | Waitlist CTA (required) |
| Posts 2, 3 (gear) → Posts 1, 5 | Cross-cluster: gear buying ↔ general buying/selling |
| Post 16 (competitor compare) → Post 15 (trust) | Trust is the answer to "why Rebuy" |

## Open questions for the team

- **Brand voice.** Single warm-knowledgeable voice or rotating contributors? Decision affects byline strategy.
- **Cover image budget.** Stock photos vs. custom photography? The existing post uses a single illustration — consistent style is worth it.
- **Editorial review.** Native-Danish + native-English reviewer in the loop before publish, or trust the author? Recommend at least one native eye per language.
- **Cadence.** Weekly is the plan above. Compressing to bi-weekly = 8 months pre-launch; expanding to twice weekly = 2 months. Decide based on launch date and writer capacity.
