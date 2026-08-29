#!/usr/bin/env node
// Generates en/index.html — a real, indexable English version of the homepage.
//
// Why this exists: English used to be served only by the in-page JS toggle on
// the Danish URL, so search engines and AI crawlers never saw it. #34 removed
// the invalid hreflang="en" that pointed at the Danish canonical and deferred
// the real fix; this script is that fix (issue #97).
//
// The page is DERIVED, never hand-written, so the two languages cannot drift:
//
//   • index.html   — structure, JSON-LD, meta (the Danish source of truth)
//   • js/i18n.js   — every English string, via the same keys the runtime uses
//
// What it does, mirroring what js/i18n.js apply() does in the browser:
//   1. <html lang="en"> + data-lang-locked so i18n.js does not re-swap it
//   2. <title>, meta description, Open Graph / Twitter, canonical, og:url
//   3. reciprocal hreflang (da -> /, en -> /en/, x-default -> /)
//   4. every [data-i18n] element's text content
//   5. every [data-i18n-alt|-placeholder|-aria] attribute
//   6. the JSON-LD @graph (FAQ, HowTo, featureList, descriptions, screenshots)
//   7. relative asset paths -> root-absolute (the page lives one dir down)
//
// ORDERING: must run AFTER scripts/build-modes.js, because the English page has
// to be generated from the mode-stripped HTML — otherwise it inherits both the
// prelaunch and launched blocks and ships two <h1>s. See deploy.yml.
//
// Run locally with `make en`. Note that locally index.html still contains both
// mode blocks, so the generated page will too; that is only correct in CI.

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://rebuy.dk';
const OUT_DIR = path.join(ROOT, 'en');
const OUT_FILE = path.join(OUT_DIR, 'index.html');

// ---------------------------------------------------------------------------
// i18n — same vm trick as scripts/build-legal-feeds.js
// ---------------------------------------------------------------------------

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

// Look up an English string and fail loudly if it is missing. A silent
// fallback to the key (or to Danish) is exactly the drift this script exists
// to prevent, so every lookup is checked.
function en(i18n, key) {
  const value = i18n.t(key, 'en');
  if (!value || value === key) {
    throw new Error(`build-en: missing English translation for "${key}"`);
  }
  return value;
}

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img',
  'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function escapeText(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return escapeText(s).replace(/"/g, '&quot;');
}

// Find the index just past the matching close tag for an element that opens at
// `openStart`. Counts nesting depth so an element containing children of the
// same tag name is handled correctly. Regex alone cannot do this.
function findElementEnd(html, openStart, tagName) {
  const openTag = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  const closeTag = new RegExp(`</${tagName}\\s*>`, 'gi');
  let depth = 0;
  let cursor = openStart;
  while (cursor < html.length) {
    openTag.lastIndex = cursor;
    closeTag.lastIndex = cursor;
    const o = openTag.exec(html);
    const c = closeTag.exec(html);
    if (!c) return -1;
    if (o && o.index < c.index) {
      // Ignore self-closing forms like <div />, which do not open a level.
      if (!o[0].endsWith('/>')) depth += 1;
      cursor = o.index + o[0].length;
      continue;
    }
    depth -= 1;
    cursor = c.index + c[0].length;
    if (depth === 0) return cursor;
  }
  return -1;
}

// Replace the inner content of every [data-i18n] element with its English
// string — the build-time equivalent of `el.textContent = t(key)`.
function translateElements(html, i18n) {
  const pattern = /<([a-zA-Z][\w-]*)\b([^>]*\bdata-i18n="([^"]+)"[^>]*)>/g;
  let out = '';
  let cursor = 0;
  let count = 0;
  let m;
  while ((m = pattern.exec(html)) !== null) {
    const [openTag, tagName, , key] = m;
    if (VOID_TAGS.has(tagName.toLowerCase())) continue;
    const end = findElementEnd(html, m.index, tagName);
    if (end === -1) {
      throw new Error(`build-en: unbalanced <${tagName}> for data-i18n="${key}"`);
    }
    const closeTag = `</${tagName}>`;
    out += html.slice(cursor, m.index) + openTag + escapeText(en(i18n, key)) + closeTag;
    cursor = end;
    pattern.lastIndex = end;
    count += 1;
  }
  out += html.slice(cursor);
  console.log(`build-en:   ${count} [data-i18n] element(s) translated`);
  return out;
}

// Attribute-only translations: alt / placeholder / aria-label.
function translateAttributes(html, i18n) {
  const MAP = [
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-aria', 'aria-label'],
  ];
  let total = 0;
  for (const [dataAttr, targetAttr] of MAP) {
    html = html.replace(
      new RegExp(`<([a-zA-Z][\\w-]*)\\b([^>]*\\b${dataAttr}="([^"]+)"[^>]*)>`, 'g'),
      (tag, tagName, attrs, key) => {
        const value = escapeAttr(en(i18n, key));
        total += 1;
        const re = new RegExp(`\\b${targetAttr}="[^"]*"`);
        const updated = re.test(attrs)
          ? attrs.replace(re, `${targetAttr}="${value}"`)
          : `${attrs} ${targetAttr}="${value}"`;
        return `<${tagName}${updated}>`;
      }
    );
  }
  console.log(`build-en:   ${total} i18n attribute(s) translated`);
  return html;
}

function replaceMeta(html, selectorAttr, name, content) {
  const re = new RegExp(`(<meta\\s+${selectorAttr}="${name}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) {
    console.warn(`build-en: meta ${name} not found — skipped`);
    return html;
  }
  return html.replace(re, `$1${escapeAttr(content)}$2`);
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

function translateJsonLd(html, i18n) {
  const faqKeys = [...html.matchAll(/data-i18n="faq\.q(\d+)"/g)].map(m => m[1]);

  return html.replace(
    /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,
    (full, open, body, close) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        return full; // not our structured data — leave untouched
      }
      const nodes = data['@graph'] || [data];
      for (const node of nodes) translateNode(node, i18n, faqKeys);
      const json = JSON.stringify(data, null, 2).replace(/\n/g, '\n  ');
      return `${open}\n  ${json}\n  ${close}`;
    }
  );
}

function translateNode(node, i18n, faqKeys) {
  switch (node['@type']) {
    case 'WebSite':
    case 'Organization':
      // Entity names and URLs are language-neutral. Only the logo alt-ish
      // fields would change, and there are none.
      break;

    case 'MobileApplication':
      node.url = `${SITE_URL}/en/`;
      node.description = en(i18n, 'meta.description');
      node.featureList = [1, 2, 3, 4, 5].map(n => en(i18n, `schema.app.feature${n}`));
      if (Array.isArray(node.screenshot)) {
        node.screenshot = node.screenshot.map(u => u.replace('/da/', '/en/'));
      }
      break;

    case 'FAQPage':
      if (!Array.isArray(node.mainEntity)) break;
      if (node.mainEntity.length !== faqKeys.length) {
        throw new Error(
          `build-en: FAQPage has ${node.mainEntity.length} entries but index.html ` +
          `exposes ${faqKeys.length} faq.q* keys — they must match`);
      }
      node.mainEntity.forEach((q, i) => {
        const n = faqKeys[i];
        q.name = en(i18n, `faq.q${n}`);
        if (q.acceptedAnswer) q.acceptedAnswer.text = en(i18n, `faq.a${n}`);
      });
      break;

    case 'HowTo': {
      // @id is the stable handle: #howto-buy / #howto-sell.
      const kind = String(node['@id'] || '').endsWith('howto-sell') ? 'sell' : 'buy';
      node['@id'] = `${SITE_URL}/en/#howto-${kind}`;
      node.name = en(i18n, `schema.howto.${kind}.name`);
      node.description = en(i18n, `schema.howto.${kind}.desc`);
      if (Array.isArray(node.step)) {
        node.step.forEach((step, i) => {
          step.name = en(i18n, `howit.${kind}.${i + 1}.title`);
          step.text = en(i18n, `howit.${kind}.${i + 1}.text`);
        });
      }
      break;
    }
    default:
      break;
  }
}

// ---------------------------------------------------------------------------
// Path rewriting — the page lives at /en/, one directory below the root
// ---------------------------------------------------------------------------

function absolutisePaths(html) {
  let count = 0;
  // Only rewrite genuinely relative refs: not /root, not http(s):, not #,
  // not mailto:/tel:, not data:.
  html = html.replace(
    /\b(src|href)="(?!https?:|\/\/|\/|#|mailto:|tel:|data:)([^"]+)"/g,
    (_m, attr, url) => { count += 1; return `${attr}="/${url}"`; }
  );
  // srcset carries a comma-separated list of "url descriptor" pairs.
  html = html.replace(/\bsrcset="([^"]+)"/g, (m, value) => {
    const rewritten = value.split(',').map(part => {
      const trimmed = part.trim();
      const [url, ...rest] = trimmed.split(/\s+/);
      if (/^(https?:|\/\/|\/|data:)/.test(url)) return trimmed;
      count += 1;
      return [`/${url}`, ...rest].join(' ');
    }).join(', ');
    return `srcset="${rewritten}"`;
  });
  console.log(`build-en:   ${count} relative path(s) made root-absolute`);
  return html;
}

// The showcase screenshots are per-language; point them at the English set so
// the static HTML matches what i18n would load at runtime.
function useEnglishScreenshots(html) {
  const before = (html.match(/\/screenshots\/(ios|android)\/da\//g) || []).length;
  html = html.replace(/\/screenshots\/(ios|android)\/da\//g, '/screenshots/$1/en/');
  console.log(`build-en:   ${before} screenshot path(s) switched to /en/`);
  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function build() {
  const i18n = loadI18n();
  const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  let html = src;

  console.log('build-en: generating en/index.html');

  // 1. Root element. data-lang-locked stops js/i18n.js re-detecting and
  //    swapping this page back to Danish for a da-locale visitor.
  html = html.replace(/<html lang="da">/, '<html lang="en" data-lang-locked="en">');

  // 2. Title + description.
  const title = en(i18n, 'meta.title');
  const description = en(i18n, 'meta.description');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`);
  html = replaceMeta(html, 'name', 'description', description);

  // 3. Canonical + Open Graph / Twitter.
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_URL}/en/$2`);
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:url', `${SITE_URL}/en/`);
  html = replaceMeta(html, 'property', 'og:locale', 'en_GB');
  html = replaceMeta(html, 'property', 'og:locale:alternate', 'da_DK');
  html = replaceMeta(html, 'property', 'og:image:alt', en(i18n, 'schema.og.imageAlt'));
  html = replaceMeta(html, 'name', 'twitter:title', title);
  html = replaceMeta(html, 'name', 'twitter:description', description);

  // 4. Reciprocal hreflang. Both pages must list the same full set or Google
  //    ignores the annotation entirely.
  html = html.replace(
    /[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">\n/g, '');
  const hreflang =
    `  <link rel="alternate" hreflang="da" href="${SITE_URL}/">\n` +
    `  <link rel="alternate" hreflang="en" href="${SITE_URL}/en/">\n` +
    `  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">\n`;
  html = html.replace(/([ \t]*<link rel="canonical"[^>]*>\n)/, `$1${hreflang}`);

  // 5. Body content.
  html = translateElements(html, i18n);
  html = translateAttributes(html, i18n);

  // 6. Structured data.
  html = translateJsonLd(html, i18n);

  // 7. Assets.
  html = useEnglishScreenshots(html);
  html = absolutisePaths(html);

  // Sanity checks — fail the build rather than deploy a broken English page.
  // Check the <html> element specifically — a bare /lang="da"/ also matches the
  // reciprocal hreflang="da" link, which is supposed to be there.
  if (!/<html lang="en"/.test(html)) {
    throw new Error('build-en: <html> is not lang="en"');
  }
  if (!/hreflang="en"/.test(html) || !/hreflang="da"/.test(html) ||
      !/hreflang="x-default"/.test(html)) {
    throw new Error('build-en: incomplete hreflang set');
  }
  const h1s = (html.match(/<h1\b/g) || []).length;
  if (h1s !== 1) {
    throw new Error(`build-en: expected exactly 1 <h1>, found ${h1s} — did this ` +
      'run before build-modes.js?');
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, html);
  console.log(`build-en: wrote en/index.html (${(html.length / 1024).toFixed(1)} KB)`);
}

build();
