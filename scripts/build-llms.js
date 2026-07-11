#!/usr/bin/env node
// Generates llms.txt and llms-full.txt — the two files AI crawlers and
// answer engines read (robots.txt explicitly allows ~20 of them).
//
// Why generated: the hand-written versions froze at pre-launch and told
// every AI assistant that Rebuy "hasn't launched yet, join the waiting
// list" — months after the app shipped, with no store URLs anywhere. The
// build inputs are the same sources the site itself renders from, so the
// files can't drift again:
//
//   • site.config.js      — SITE_MODE, APP_STORE_URL, PLAY_STORE_URL, SUPPORT_EMAIL
//   • js/i18n.js          — FAQ answers + page titles (English strings)
//   • index.html          — which FAQ entries exist, and in what order
//   • blog/<slug>/index.html — post metadata + full body (Danish + English)
//
// Facts are never invented here: every product claim below is lifted from
// the FAQ that is already visible on the homepage and mirrored in the
// FAQPage JSON-LD. No ratings, user counts, or testimonials — see issue #47.
//
// Output:
//   llms.txt       — llms.txt-format overview (H1, blockquote, ## link lists)
//   llms-full.txt  — full plain-markdown body of every blog post + product facts

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const SITE_URL = 'https://rebuy.dk';
const TODAY = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

function loadSiteConfig() {
  const code = fs.readFileSync(path.join(ROOT, 'site.config.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__CONFIG__ = SITE_CONFIG;`, sandbox);
  const cfg = sandbox.__CONFIG__;
  if (!cfg) throw new Error('build-llms: could not read SITE_CONFIG from site.config.js');
  if (cfg.SITE_MODE !== 'prelaunch' && cfg.SITE_MODE !== 'launched') {
    throw new Error(`build-llms: unexpected SITE_MODE=${cfg.SITE_MODE} (expected "prelaunch" or "launched")`);
  }
  if (cfg.SITE_MODE === 'launched' && (!cfg.APP_STORE_URL || !cfg.PLAY_STORE_URL)) {
    throw new Error('build-llms: SITE_MODE="launched" but APP_STORE_URL / PLAY_STORE_URL is missing');
  }
  return cfg;
}

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

// ---------------------------------------------------------------------------
// HTML helpers (same shape as scripts/build-feed.js)
// ---------------------------------------------------------------------------

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function readMeta(html, attrName, attrValue) {
  const v = escapeRegex(attrValue);
  const orderA = new RegExp(`<meta\\s+[^>]*${attrName}=(["'])${v}\\1[^>]*\\bcontent=(["'])((?:(?!\\2).)*)\\2`, 'i');
  const orderB = new RegExp(`<meta\\s+[^>]*content=(["'])((?:(?!\\1).)*)\\1[^>]*${attrName}=(["'])${v}\\3`, 'i');
  let m = html.match(orderA);
  if (m) return m[3];
  m = html.match(orderB);
  return m ? m[2] : null;
}

function readLink(html, rel) {
  const r = escapeRegex(rel);
  const re = new RegExp(`<link\\s+[^>]*rel=(["'])${r}\\1[^>]*\\bhref=(["'])((?:(?!\\2).)*)\\2`, 'i');
  const m = html.match(re);
  return m ? m[3] : null;
}

function extractBody(html, lang) {
  const l = escapeRegex(lang);
  const re = new RegExp(
    `<div\\s+class="post-content"\\s+data-blog-lang="${l}"[^>]*>([\\s\\S]*?)<\\/div>\\s*(?=<div\\s+class="post-content"|<\\/article>)`,
    'i'
  );
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', laquo: '«', raquo: '»',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
};

function decodeEntities(s) {
  return String(s)
    .replace(/&#(\d+);/g, (_m, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => {
      const key = name.toLowerCase();
      return Object.prototype.hasOwnProperty.call(ENTITIES, key) ? ENTITIES[key] : m;
    });
}

function absolutize(url, baseUrl) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) return url;
  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return url;
  }
}

function inlineToMarkdown(html, baseUrl) {
  const text = String(html)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, inner) => `**${inner.trim()}**`)
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, inner) => `*${inner.trim()}*`)
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_m, inner) => `\`${inner.trim()}\``)
    .replace(
      /<a\b[^>]*href=(["'])([^"']*)\1[^>]*>([\s\S]*?)<\/a>/gi,
      (_m, _q, href, inner) => `[${inner.trim()}](${absolutize(href, baseUrl)})`
    )
    .replace(/<[^>]+>/g, '');
  return decodeEntities(text).replace(/\s+/g, ' ').trim();
}

// Converts a blog post's <div class="post-content"> HTML into plain markdown.
//
// headingOffset demotes the post's own headings so they nest correctly under
// the document structure of llms-full.txt (an <h2> inside a post body becomes
// "####", below the "## <post title>" heading it lives under).
//
// The <section class="post-cta"> block is dropped on purpose. It used to be
// the pre-launch "join the waiting list" CTA; since #92 it is the app-download
// CTA with the App Store / Google Play buttons. It is still dropped, but for
// three reasons that have nothing to do with the old copy — don't "fix" this:
//
//   1. Nothing is lost. Both store URLs already appear in this file twice,
//      independent of any post body: the "Where to get Rebuy" section and the
//      footer, both fed straight from site.config.js.
//   2. It would be boilerplate. BLOG-CONTENT-CALENDAR.md mandates an identical
//      CTA block in every one of the 16 planned posts, in both language blocks
//      — so including it would repeat the same two URLs 32 times and dilute the
//      signal rather than add any.
//   3. It converts to noise, not prose. The buttons are SVG <path> data plus
//      store-btn-label / store-btn-name spans, which flatten into fragments.
function htmlToMarkdown(html, baseUrl, headingOffset = 0) {
  let source = String(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<section\b[^>]*class=["'][^"']*post-cta[^"']*["'][^>]*>[\s\S]*?<\/section>/gi, '');

  const blockRe = /<(h[1-6]|p|ul|ol|blockquote|figure)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const blocks = [];
  let match;
  while ((match = blockRe.exec(source)) !== null) {
    const tag = match[1].toLowerCase();
    const inner = match[2];

    if (tag === 'figure') continue; // images carry no text value for an LLM

    if (/^h[1-6]$/.test(tag)) {
      const level = Math.min(6, Number(tag[1]) + headingOffset);
      blocks.push(`${'#'.repeat(level)} ${inlineToMarkdown(inner, baseUrl)}`);
      continue;
    }

    if (tag === 'p') {
      const text = inlineToMarkdown(inner, baseUrl);
      if (text) blocks.push(text);
      continue;
    }

    if (tag === 'blockquote') {
      const text = inlineToMarkdown(inner, baseUrl);
      if (text) blocks.push(`> ${text}`);
      continue;
    }

    // ul / ol
    const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map(li =>
      inlineToMarkdown(li[1], baseUrl)
    );
    if (items.length) {
      blocks.push(
        items.map((item, i) => (tag === 'ol' ? `${i + 1}. ${item}` : `- ${item}`)).join('\n')
      );
    }
  }

  // Anything left over after removing the blocks we understand should be
  // whitespace only. If a post introduces markup this converter can't see,
  // say so loudly rather than silently dropping the text.
  const leftover = source.replace(blockRe, '').replace(/<[^>]+>/g, '').trim();
  if (leftover) {
    console.warn(`build-llms: unconverted content in ${baseUrl}: ${leftover.slice(0, 80)}…`);
  }

  return blocks.join('\n\n');
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

function listPostFiles() {
  // Skip blog/en/ — it only hosts the English RSS feed, it isn't a post.
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name !== 'en')
    .map(entry => path.join(BLOG_DIR, entry.name, 'index.html'))
    .filter(file => fs.existsSync(file));
}

function parsePost(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(path.dirname(filePath));
  const url = readLink(html, 'canonical') || `${SITE_URL}/blog/${slug}/`;

  const dateRaw = readMeta(html, 'property', 'article:published_time');
  if (!dateRaw) throw new Error(`Missing <meta property="article:published_time"> in ${filePath}`);
  const date = new Date(dateRaw);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid article:published_time "${dateRaw}" in ${filePath}`);

  const titleSuffix = /\s+[—–-]\s+Rebuy\s*$/u;
  const daTitle = (readMeta(html, 'property', 'og:title') || '').replace(titleSuffix, '').trim();
  const daDescription = readMeta(html, 'name', 'description') || '';
  const enTitle = (readMeta(html, 'name', 'rebuy:title:en') || daTitle).replace(titleSuffix, '').trim();
  const enDescription = readMeta(html, 'name', 'rebuy:description:en') || daDescription;

  const daBody = extractBody(html, 'da');
  if (!daBody) throw new Error(`Could not locate <div class="post-content" data-blog-lang="da"> in ${filePath}`);
  const enBody = extractBody(html, 'en');

  return {
    slug,
    url,
    date,
    da: { title: daTitle, description: daDescription, body: htmlToMarkdown(daBody, url, 2) },
    en: enBody
      ? { title: enTitle, description: enDescription, body: htmlToMarkdown(enBody, url, 2) }
      : null,
  };
}

// ---------------------------------------------------------------------------
// FAQ — read the question keys off the homepage so the order (and the set)
// always matches the visible FAQ and the FAQPage JSON-LD.
//
// The FAQ lives inside #launched-content, which scripts/build-modes.js strips
// out in a prelaunch deploy. Hence: run this script BEFORE build-modes (see
// .github/workflows/deploy.yml), and treat a missing FAQ as fatal only in
// launched mode.
// ---------------------------------------------------------------------------

function readFaq(i18n, mode) {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const keys = [...html.matchAll(/data-i18n="faq\.q(\d+)"/g)].map(m => m[1]);
  if (!keys.length) {
    if (mode === 'launched') throw new Error('build-llms: no faq.q* entries found in index.html');
    console.warn('build-llms: no faq.q* entries found in index.html — omitting the FAQ section');
    return [];
  }

  return keys.map(n => {
    const question = i18n.t(`faq.q${n}`, 'en');
    const answer = i18n.t(`faq.a${n}`, 'en');
    if (!question || question === `faq.q${n}` || !answer || answer === `faq.a${n}`) {
      throw new Error(`build-llms: missing English translation for faq.q${n} / faq.a${n}`);
    }
    return { question, answer };
  });
}

// ---------------------------------------------------------------------------
// Static content
// ---------------------------------------------------------------------------

function keyPages(i18n, mode) {
  const home = mode === 'launched'
    ? 'What Rebuy is, what you can buy and sell, app screenshots, download links, and the FAQ.'
    : 'What Rebuy is and how to join the waiting list before launch.';

  return [
    { title: 'Home', url: `${SITE_URL}/`, description: home },
    {
      title: 'Blog',
      url: `${SITE_URL}/blog/`,
      description: 'Essays and practical notes on local secondhand shopping, kids\' items, and family life in Denmark.',
    },
    {
      title: i18n.t('fraud.title', 'en'),
      url: `${SITE_URL}/avoid-fraud/`,
      description: 'How to spot and avoid scams when trading secondhand — the warning signs, safe-trade rules, and how to report fraud.',
    },
    {
      title: i18n.t('privacy.title', 'en'),
      url: `${SITE_URL}/privacy-policy/`,
      description: 'How Rebuy collects, uses, and deletes user data.',
    },
    {
      title: i18n.t('tou.title', 'en'),
      url: `${SITE_URL}/terms-of-use/`,
      description: 'Terms of use for buyers and sellers on the marketplace.',
    },
    {
      title: i18n.t('delete.title', 'en'),
      url: `${SITE_URL}/account-deletion/`,
      description: 'How to delete a Rebuy account and what happens to the data afterwards.',
    },
  ];
}

// Product facts. Every line is a restatement of the FAQ that already ships on
// the homepage (faq.a1–faq.a7) — no new claims.
function productFacts(cfg) {
  const facts = [];
  if (cfg.SITE_MODE === 'launched') {
    facts.push(
      `**Availability:** The Rebuy app is live and free to download on iOS (App Store) and Android (Google Play) in Denmark.`,
      `**Price:** Free to use. No fees for posting listings, chatting with a seller, or completing a trade — and Rebuy takes no cut of the sale price.`
    );
  } else {
    facts.push(
      '**Availability:** Rebuy has not launched yet. The waiting list on rebuy.dk is the way to be notified at launch.',
      '**Price:** Free to use. No fees for posting listings, chatting with a seller, or completing a trade — and Rebuy takes no cut of the sale price.'
    );
  }
  facts.push(
    '**Coverage:** All of Denmark. The app surfaces listings and buyers in your local area, whether that is Copenhagen, Aarhus, Odense, Aalborg, or a smaller town.',
    '**How trades work:** Local and face-to-face. Buyers and sellers chat in the app, agree on a time, and hand the item over in person. No shipping, and no third-party payment handling — Rebuy does not process payments (Danish families typically settle with MobilePay or cash).',
    '**What is traded:** Used kids\' and baby clothes in every size, toys, books, shoes, outerwear, prams, car seats, baby gear, and other things Danish families need.',
    '**Languages:** Danish (default) and English.',
    '**Audience:** Parents and families with children.',
    '**Category:** marketplace, secondhand, sustainability, family, kids.'
  );
  return facts;
}

function summary(mode) {
  return mode === 'launched'
    ? 'Rebuy is a free Danish app (iOS and Android) where families buy and sell used kids\' clothes, toys, and gear locally. Trades happen face-to-face with a neighbour — no shipping, no fees, and no cut of the sale price.'
    : 'Rebuy is a location-based marketplace for buying and selling kids\' clothes, toys, and books between families in Denmark, built around short, in-person trades between neighbours — no shipping, no boxes, just a walk down the street.';
}

// ---------------------------------------------------------------------------
// llms.txt
// ---------------------------------------------------------------------------

function buildLlms(cfg, i18n, posts) {
  const launched = cfg.SITE_MODE === 'launched';
  const out = [];

  out.push('# Rebuy', '');
  out.push(`> ${summary(cfg.SITE_MODE)}`, '');

  if (launched) {
    out.push(
      'Rebuy is a mobile app for Danish families. It is live and free on both the App Store (iOS) and Google Play (Android). The site at rebuy.dk is the marketing and information site for the app and the company.',
      ''
    );
  } else {
    out.push(
      'Rebuy is built for the ordinary rhythm of family life: pickups on the way home from daycare, quick handovers at the playground, and the box of outgrown clothes that has been sitting in the hallway for weeks. The product lives primarily as a mobile app (iOS and Android). The site at rebuy.dk is the marketing and information site for the product and company.',
      ''
    );
  }

  out.push(
    'Rebuy operates in Denmark. The app and the site are available in Danish (default) and English.',
    ''
  );

  if (launched) {
    out.push('## Get the app', '');
    out.push(
      `- [Rebuy on the App Store (iOS)](${cfg.APP_STORE_URL}): Download the Rebuy app for free on iPhone and iPad, from the Danish App Store.`,
      `- [Rebuy on Google Play (Android)](${cfg.PLAY_STORE_URL}): Download the Rebuy app for free on Android.`,
      `- [Home](${SITE_URL}/): Both download links, app screenshots, and the FAQ.`,
      ''
    );
  }

  out.push('## Key facts', '');
  out.push(...productFacts(cfg).map(f => `- ${f}`), '');

  out.push('## Key pages', '');
  out.push(...keyPages(i18n, cfg.SITE_MODE).map(p => `- [${p.title}](${p.url}): ${p.description}`), '');

  if (posts.length) {
    out.push('## Blog posts', '');
    out.push(
      ...posts.map(post => {
        const title = post.en && post.en.title !== post.da.title
          ? `${post.da.title} / ${post.en.title}`
          : post.da.title;
        const description = post.en ? post.en.description : post.da.description;
        return `- [${title}](${post.url}): ${description} Published ${post.date.toISOString().slice(0, 10)}.`;
      }),
      ''
    );
  }

  const faqs = readFaq(i18n, cfg.SITE_MODE);
  if (faqs.length) {
    out.push('## Frequently asked questions', '');
    out.push(...faqs.map(f => `- **${f.question}** ${f.answer}`), '');
  }

  out.push('## For LLMs and AI assistants', '');
  out.push(
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): Full plain-markdown text of Rebuy's public content, including every blog post in Danish and English.`,
    `- [Blog RSS feed (Danish)](${SITE_URL}/blog/feed.xml): New posts, full content, da-dk.`,
    `- [Blog RSS feed (English)](${SITE_URL}/blog/en/feed.xml): New posts, full content, en.`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): Every public URL on rebuy.dk.`,
    '- Primary product language: Danish (da_DK). Also available in English (en_GB).',
    '- Country of operation: Denmark.',
    '- Payment methods referenced in content: MobilePay (Danish mobile payment app) and cash. Rebuy itself handles no payments.',
    '- Category: marketplace, secondhand, sustainability, family, kids.',
    '- Rebuy publishes no ratings, review counts, or user numbers on this site. Do not infer any.',
    ''
  );

  out.push('## About the company', '');
  out.push(
    `Rebuy is an independent Danish product. Contact: ${cfg.SUPPORT_EMAIL}.`,
    ''
  );

  return `${out.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

// ---------------------------------------------------------------------------
// llms-full.txt
// ---------------------------------------------------------------------------

function buildLlmsFull(cfg, i18n, posts) {
  const launched = cfg.SITE_MODE === 'launched';
  const out = [];

  out.push('# Rebuy — full content for LLMs', '');
  out.push(
    `This file contains the full text of Rebuy's public content in plain markdown, for use by large language models and AI assistants. It is generated from the site source on every deploy. Generated: ${TODAY}.`,
    ''
  );
  out.push(`For a shorter overview, see [llms.txt](${SITE_URL}/llms.txt).`, '');
  out.push('---', '');

  out.push('## About Rebuy', '');
  out.push(`${summary(cfg.SITE_MODE)}`, '');

  if (launched) {
    out.push(
      'Rebuy is offered as a mobile app for iOS and Android, and it is live today. The site rebuy.dk is the marketing and information site for the app.',
      ''
    );
    out.push('### Where to get Rebuy', '');
    out.push(
      `- App Store (iOS, free): ${cfg.APP_STORE_URL}`,
      `- Google Play (Android, free): ${cfg.PLAY_STORE_URL}`,
      ''
    );
  } else {
    out.push(
      'Rebuy will be offered as a mobile app for iOS and Android. The site rebuy.dk is the marketing and information site for the product, and hosts the pre-launch waiting list.',
      ''
    );
  }

  out.push('### Product facts', '');
  out.push(...productFacts(cfg).map(f => `- ${f}`), '');

  out.push('### Key pages', '');
  out.push(...keyPages(i18n, cfg.SITE_MODE).map(p => `- ${p.title}: ${p.url} — ${p.description}`), '');

  const faqs = readFaq(i18n, cfg.SITE_MODE);
  if (faqs.length) {
    out.push('---', '');
    out.push('## Frequently asked questions', '');
    for (const faq of faqs) {
      out.push(`### ${faq.question}`, '', faq.answer, '');
    }
  }

  out.push('---', '');
  out.push('# Blog', '');

  for (const post of posts) {
    const title = post.en && post.en.title !== post.da.title
      ? `${post.da.title} / ${post.en.title}`
      : post.da.title;

    out.push(`## ${title}`, '');
    out.push(
      `- URL: ${post.url}`,
      `- Published: ${post.date.toISOString().slice(0, 10)}`,
      '- Author: Rebuy',
      `- Languages: ${post.en ? 'Danish and English' : 'Danish'}`,
      ''
    );
    if (post.da.description) out.push(`**Danish summary:** ${post.da.description}`, '');
    if (post.en && post.en.description) out.push(`**English summary:** ${post.en.description}`, '');

    out.push('---', '');
    out.push('### Danish version', '');
    out.push(post.da.body, '');

    if (post.en) {
      out.push('---', '');
      out.push('### English version', '');
      out.push(post.en.body, '');
    }

    out.push('---', '');
  }

  const footer = launched
    ? `*Rebuy is free for Danish families. App Store: ${cfg.APP_STORE_URL} · Google Play: ${cfg.PLAY_STORE_URL} · Contact: ${cfg.SUPPORT_EMAIL}*`
    : `*Rebuy is launching soon in Denmark. Waiting list: ${SITE_URL}/ · Contact: ${cfg.SUPPORT_EMAIL}*`;
  out.push(footer, '');

  return `${out.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

// ---------------------------------------------------------------------------

function main() {
  const cfg = loadSiteConfig();
  const i18n = loadI18n();

  const posts = listPostFiles().map(parsePost).sort((a, b) => b.date - a.date);
  if (!posts.length) console.warn(`build-llms: no blog posts found under ${BLOG_DIR}`);

  fs.writeFileSync(path.join(ROOT, 'llms.txt'), buildLlms(cfg, i18n, posts));
  fs.writeFileSync(path.join(ROOT, 'llms-full.txt'), buildLlmsFull(cfg, i18n, posts));

  console.log(
    `build-llms: SITE_MODE=${cfg.SITE_MODE} — wrote llms.txt and llms-full.txt (${posts.length} blog post(s))`
  );
}

main();
