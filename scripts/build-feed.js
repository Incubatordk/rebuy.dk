#!/usr/bin/env node
// Generates blog/feed.xml (Danish) and blog/en/feed.xml (English) from
// every blog/<slug>/index.html.
//
// Required per-post markup:
//   <link rel="canonical" href="…">
//   <meta property="og:title" content="…">              (Danish title, " — Rebuy" suffix stripped)
//   <meta name="description" content="…">               (Danish description)
//   <meta property="article:published_time" content="YYYY-MM-DD">
//   <meta property="og:image" content="…">              (+ og:image:width / :height / :alt)
//   <div class="post-content" data-blog-lang="da">…</div>
//
// Optional English overrides (post falls back to Danish if absent):
//   <meta name="rebuy:title:en" content="…">
//   <meta name="rebuy:description:en" content="…">
//   <meta name="rebuy:image:alt:en" content="…">
//   <div class="post-content" data-blog-lang="en">…</div>

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const SITE_URL = 'https://rebuy.dk';
const FEED_AUTHOR_EMAIL = 'support@rebuy.dk';
const FEED_AUTHOR_NAME = 'Rebuy';
const FEED_IMAGE = `${SITE_URL}/assets/logos/og-image.png`;

const LANGS = {
  da: {
    code: 'da',
    rssLanguage: 'da-dk',
    feedPath: path.join(BLOG_DIR, 'feed.xml'),
    feedUrl: `${SITE_URL}/blog/feed.xml`,
    title: 'Rebuy Blog',
    description: 'Noter fra Rebuy om lokalt genbrug, familieliv og de små kredsløb, der gør det lettere at sende børneting videre.',
  },
  en: {
    code: 'en',
    rssLanguage: 'en',
    feedPath: path.join(BLOG_DIR, 'en', 'feed.xml'),
    feedUrl: `${SITE_URL}/blog/en/feed.xml`,
    title: 'Rebuy Blog',
    description: 'Stories and practical notes from Rebuy about local secondhand shopping for families.',
  },
};

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function cdata(s) {
  return `<![CDATA[${String(s).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

function rfc822(date) {
  return date.toUTCString().replace(/GMT$/, '+0000');
}

function readMeta(html, attrName, attrValue) {
  const v = escapeRegex(attrValue);
  // The capture group for the value uses a backreference for the closing
  // quote so apostrophes/double quotes inside the value don't truncate it.
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

function absolutizeUrls(html, baseUrl) {
  return html.replace(/\b(src|href)=(["'])([^"']+)\2/gi, (match, attr, quote, url) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) return match;
    try {
      const resolved = new URL(url, baseUrl).toString();
      return `${attr}=${quote}${resolved}${quote}`;
    } catch {
      return match;
    }
  });
}

function stripBlogI18nAttrs(html) {
  return html
    .replace(/\s+data-blog-i18n(?:-[a-z]+)?=["'][^"']*["']/g, '')
    .replace(/\s+data-blog-lang=["'][^"']*["']/g, '');
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

function listPostFiles() {
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

  const imageUrl = readMeta(html, 'property', 'og:image');
  const imageWidth = readMeta(html, 'property', 'og:image:width');
  const imageHeight = readMeta(html, 'property', 'og:image:height');
  const daImageAlt = readMeta(html, 'property', 'og:image:alt') || daTitle;
  const enImageAlt = readMeta(html, 'name', 'rebuy:image:alt:en') || daImageAlt;

  const daBody = extractBody(html, 'da');
  if (!daBody) throw new Error(`Could not locate <div class="post-content" data-blog-lang="da"> in ${filePath}`);
  const enBody = extractBody(html, 'en') || daBody;

  function variant(title, description, body, imageAlt) {
    let cleaned = stripBlogI18nAttrs(body);
    cleaned = absolutizeUrls(cleaned, url);
    let cover = '';
    if (imageUrl) {
      const w = imageWidth ? ` width="${escapeXml(imageWidth)}"` : '';
      const h = imageHeight ? ` height="${escapeXml(imageHeight)}"` : '';
      cover = `<figure><img src="${escapeXml(imageUrl)}" alt="${escapeXml(imageAlt)}"${w}${h} /></figure>\n`;
    }
    return {
      title,
      description,
      contentHtml: cover + cleaned,
      imageAlt,
    };
  }

  return {
    slug,
    url,
    date,
    image: imageUrl ? { url: imageUrl, width: imageWidth, height: imageHeight } : null,
    variants: {
      da: variant(daTitle, daDescription, daBody, daImageAlt),
      en: variant(enTitle, enDescription, enBody, enImageAlt),
    },
  };
}

function renderItem(post, lang) {
  const v = post.variants[lang];
  const pubDate = rfc822(post.date);

  let mediaTags = '';
  if (post.image) {
    const w = post.image.width ? ` width="${escapeXml(post.image.width)}"` : '';
    const h = post.image.height ? ` height="${escapeXml(post.image.height)}"` : '';
    const ext = (post.image.url.match(/\.([a-z0-9]+)(?:\?.*)?$/i) || [, 'jpg'])[1].toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
    mediaTags =
`      <media:content url="${escapeXml(post.image.url)}" medium="image" type="${mime}"${w}${h}>
        <media:title type="plain">${escapeXml(v.imageAlt)}</media:title>
      </media:content>
      <media:thumbnail url="${escapeXml(post.image.url)}"${w}${h} />
      <enclosure url="${escapeXml(post.image.url)}" type="${mime}" length="0" />
`;
  }

  return `    <item>
      <title>${escapeXml(v.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${FEED_AUTHOR_EMAIL} (${FEED_AUTHOR_NAME})</author>
      <dc:creator>${escapeXml(FEED_AUTHOR_NAME)}</dc:creator>
      <description>${escapeXml(v.description)}</description>
${mediaTags}      <content:encoded>${cdata(v.contentHtml)}</content:encoded>
    </item>`;
}

function buildFeed(posts, lang) {
  const cfg = LANGS[lang];
  const altLang = lang === 'da' ? 'en' : 'da';
  const altCfg = LANGS[altLang];

  posts.sort((a, b) => b.date - a.date);
  const lastBuild = posts.length ? posts[0].date : new Date();
  const copyrightYear = new Date().getUTCFullYear();
  const items = posts.map(p => renderItem(p, lang)).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(cfg.title)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(cfg.description)}</description>
    <language>${cfg.rssLanguage}</language>
    <copyright>Copyright ${copyrightYear} Rebuy</copyright>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${cfg.feedUrl}" rel="self" type="application/rss+xml" />
    <atom:link href="${altCfg.feedUrl}" rel="alternate" type="application/rss+xml" hreflang="${altCfg.code}" title="${escapeXml(altCfg.title)} (${altCfg.code})" />
    <image>
      <url>${FEED_IMAGE}</url>
      <title>${escapeXml(cfg.title)}</title>
      <link>${SITE_URL}/blog/</link>
    </image>
${items}
  </channel>
</rss>
`;
}

function main() {
  const files = listPostFiles();
  if (!files.length) {
    console.error(`No blog posts found under ${BLOG_DIR}`);
    process.exit(1);
  }
  const posts = files.map(parsePost);

  for (const lang of Object.keys(LANGS)) {
    const cfg = LANGS[lang];
    fs.mkdirSync(path.dirname(cfg.feedPath), { recursive: true });
    fs.writeFileSync(cfg.feedPath, buildFeed(posts.slice(), lang));
    console.log(`Wrote ${path.relative(ROOT, cfg.feedPath)} with ${posts.length} item(s).`);
  }
}

main();
