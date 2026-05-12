#!/usr/bin/env node
// Generates RSS feeds for the legal pages so the iOS/Android apps can fetch
// and render the text directly:
//
//   privacy-policy/feed.xml      (Danish)
//   privacy-policy/en/feed.xml   (English)
//   terms-of-use/feed.xml        (Danish)
//   terms-of-use/en/feed.xml     (English)
//
// Each feed contains a single <item> whose <content:encoded> is the rendered
// <main class="legal"> block with every [data-i18n] element's text content
// swapped for the translated string — mirroring what js/i18n.js does at
// runtime. The build inputs are:
//
//   • js/i18n.js                       — translation source of truth
//   • <page>/index.html                — body structure + meta
//     · <meta property="article:published_time" content="YYYY-MM-DD">
//     · <main class="legal">…</main>   (each translatable node has data-i18n)

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://rebuy.dk';
const FEED_AUTHOR_EMAIL = 'support@rebuy.dk';
const FEED_AUTHOR_NAME = 'Rebuy';
const FEED_IMAGE = `${SITE_URL}/assets/logos/og-image.png`;

const PAGES = [
  {
    id: 'privacy-policy',
    canonicalPath: '/privacy-policy',
    feed: {
      da: {
        title: 'Rebuy — Privatlivspolitik',
        description: 'Rebuys privatlivspolitik. Sådan behandler vi dine personoplysninger.',
      },
      en: {
        title: 'Rebuy — Privacy Policy',
        description: 'Rebuy\'s privacy policy. How we handle your personal data.',
      },
    },
  },
  {
    id: 'terms-of-use',
    canonicalPath: '/terms-of-use',
    feed: {
      da: {
        title: 'Rebuy — Vilkår for brug',
        description: 'Rebuys vilkår for brug for købere og sælgere på markedspladsen.',
      },
      en: {
        title: 'Rebuy — Terms of Use',
        description: 'Rebuy\'s Terms of Use for buyers and sellers on the marketplace.',
      },
    },
  },
];

const LANGS = {
  da: { code: 'da', rssLanguage: 'da-dk', feedDir: '' },
  en: { code: 'en', rssLanguage: 'en', feedDir: 'en' },
};

function loadI18n() {
  const code = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');
  const sandbox = {
    localStorage: { getItem: () => null, setItem: () => {} },
    navigator: { language: 'da' },
    document: {
      documentElement: { lang: 'da' },
      querySelector: () => null,
      querySelectorAll: () => [],
    },
  };
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__I18N__ = I18N;`, sandbox);
  return sandbox.__I18N__;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtmlText(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function cdata(s) {
  return `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

function rfc822(date) {
  return date.toUTCString().replace(/GMT$/, '+0000');
}

function readMeta(html, attrName, attrValue) {
  const v = attrValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `<meta\\s+[^>]*${attrName}=(["'])${v}\\1[^>]*\\bcontent=(["'])((?:(?!\\2).)*)\\2`,
    'i'
  );
  const m = html.match(re);
  return m ? m[3] : null;
}

function extractMain(html) {
  const m = html.match(/<main\s+class="legal"[^>]*>([\s\S]*?)<\/main>/i);
  if (!m) throw new Error('Could not find <main class="legal"> block');
  return m[1].trim();
}

// Walks every element that carries data-i18n="key" and replaces its inner
// content with the translated string (escaped as HTML text). This matches
// the runtime behaviour of js/i18n.js, which assigns el.textContent = t(key).
// Element matching is regex-based and assumes simple, single-line opening
// tags (no nested elements of the same tag inside an element that has
// data-i18n on it) — the legal pages follow that shape.
function renderBody(mainHtml, t, lang) {
  // Replace inner content of every element with a data-i18n attribute.
  // Pattern: <tag ... data-i18n="key" ...>...</tag>
  const replaced = mainHtml.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)\s+([^>]*\bdata-i18n=(["'])([^"']+)\3[^>]*)>[\s\S]*?<\/\1>/g,
    (match, tag, attrs, _q, key) => {
      const value = t(key, lang);
      // Strip the data-i18n attribute from the surviving open tag.
      const cleanedAttrs = attrs
        .replace(/\s*\bdata-i18n=(["'])[^"']*\1/, '')
        .replace(/\s+/g, ' ')
        .trim();
      const open = cleanedAttrs ? `<${tag} ${cleanedAttrs}>` : `<${tag}>`;
      return `${open}${escapeHtmlText(value)}</${tag}>`;
    }
  );
  // Sanity check: no surviving data-i18n attributes should remain on simple
  // elements. If any do, the regex didn't cover them — fail loudly.
  if (/\bdata-i18n=/.test(replaced)) {
    throw new Error(`Unresolved data-i18n attribute(s) after rendering (lang=${lang})`);
  }
  return replaced;
}

function buildItem(page, lang, body, pubDate) {
  const cfg = page.feed[lang];
  const url = `${SITE_URL}${page.canonicalPath}`;
  // GUID is per-language so iOS/Android clients can dedupe correctly when
  // both feeds happen to share the same canonical URL.
  const guid = `${url}#${lang}`;
  return `    <item>
      <title>${escapeXml(cfg.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${escapeXml(guid)}</guid>
      <pubDate>${rfc822(pubDate)}</pubDate>
      <author>${FEED_AUTHOR_EMAIL} (${FEED_AUTHOR_NAME})</author>
      <dc:creator>${escapeXml(FEED_AUTHOR_NAME)}</dc:creator>
      <description>${escapeXml(cfg.description)}</description>
      <content:encoded>${cdata(body)}</content:encoded>
    </item>`;
}

function buildFeed(page, lang, body, pubDate) {
  const cfg = page.feed[lang];
  const langCfg = LANGS[lang];
  const altLang = lang === 'da' ? 'en' : 'da';
  const altCfg = LANGS[altLang];
  const altFeedUrl = `${SITE_URL}/${page.id}${altCfg.feedDir ? `/${altCfg.feedDir}` : ''}/feed.xml`;
  const selfFeedUrl = `${SITE_URL}/${page.id}${langCfg.feedDir ? `/${langCfg.feedDir}` : ''}/feed.xml`;
  const pageUrl = `${SITE_URL}${page.canonicalPath}`;
  const copyrightYear = new Date().getUTCFullYear();
  const item = buildItem(page, lang, body, pubDate);

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(cfg.title)}</title>
    <link>${escapeXml(pageUrl)}</link>
    <description>${escapeXml(cfg.description)}</description>
    <language>${langCfg.rssLanguage}</language>
    <copyright>Copyright ${copyrightYear} Rebuy</copyright>
    <lastBuildDate>${rfc822(pubDate)}</lastBuildDate>
    <atom:link href="${selfFeedUrl}" rel="self" type="application/rss+xml" />
    <atom:link href="${altFeedUrl}" rel="alternate" type="application/rss+xml" hreflang="${altCfg.code}" title="${escapeXml(page.feed[altLang].title)}" />
    <image>
      <url>${FEED_IMAGE}</url>
      <title>${escapeXml(cfg.title)}</title>
      <link>${escapeXml(pageUrl)}</link>
    </image>
${item}
  </channel>
</rss>
`;
}

function processPage(page, i18n) {
  const htmlPath = path.join(ROOT, page.id, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  const dateRaw = readMeta(html, 'property', 'article:published_time');
  if (!dateRaw) throw new Error(`Missing <meta property="article:published_time"> in ${htmlPath}`);
  const pubDate = new Date(dateRaw);
  if (Number.isNaN(pubDate.getTime())) {
    throw new Error(`Invalid article:published_time "${dateRaw}" in ${htmlPath}`);
  }

  const mainHtml = extractMain(html);

  for (const lang of Object.keys(LANGS)) {
    const body = renderBody(mainHtml, i18n.t, lang);
    const xml = buildFeed(page, lang, body, pubDate);
    const langCfg = LANGS[lang];
    const feedDir = path.join(ROOT, page.id, langCfg.feedDir);
    fs.mkdirSync(feedDir, { recursive: true });
    const feedPath = path.join(feedDir, 'feed.xml');
    fs.writeFileSync(feedPath, xml);
    console.log(`Wrote ${path.relative(ROOT, feedPath)}`);
  }
}

function main() {
  const i18n = loadI18n();
  for (const page of PAGES) processPage(page, i18n);
}

main();
