#!/usr/bin/env node
// Generates blog/feed.xml from blog/<slug>/index.html files.
// Each post must declare: <link rel="canonical">, <meta property="og:title">,
// <meta name="description">, <meta property="article:published_time">,
// <meta property="og:image"> (+ width/height/alt), and wrap its Danish body
// in <div class="post-content" data-blog-lang="da">…</div>.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUTPUT = path.join(BLOG_DIR, 'feed.xml');

const SITE_URL = 'https://rebuy.dk';
const FEED_TITLE = 'Rebuy Blog';
const FEED_DESCRIPTION = 'Noter fra Rebuy om lokalt genbrug, familieliv og de små kredsløb, der gør det lettere at sende børneting videre.';
const FEED_LANGUAGE = 'da-dk';
const FEED_AUTHOR_EMAIL = 'support@rebuy.dk';
const FEED_AUTHOR_NAME = 'Rebuy';
const FEED_IMAGE = `${SITE_URL}/assets/logos/og-image.png`;

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
  const orderA = new RegExp(`<meta\\s+[^>]*${attrName}=["']${v}["'][^>]*\\bcontent=["']([^"']*)["']`, 'i');
  const orderB = new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${attrName}=["']${v}["']`, 'i');
  const m = html.match(orderA) || html.match(orderB);
  return m ? m[1] : null;
}

function readLink(html, rel) {
  const r = escapeRegex(rel);
  const re = new RegExp(`<link\\s+[^>]*rel=["']${r}["'][^>]*\\bhref=["']([^"']+)["']`, 'i');
  const m = html.match(re);
  return m ? m[1] : null;
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

function listPostFiles() {
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(BLOG_DIR, entry.name, 'index.html'))
    .filter(file => fs.existsSync(file));
}

function parsePost(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const slug = path.basename(path.dirname(filePath));

  const url = readLink(html, 'canonical') || `${SITE_URL}/blog/${slug}/`;

  const ogTitle = readMeta(html, 'property', 'og:title');
  const title = (ogTitle || '').replace(/\s+[—–-]\s+Rebuy\s*$/u, '').trim();

  const description = readMeta(html, 'name', 'description') || '';

  const dateRaw = readMeta(html, 'property', 'article:published_time');
  if (!dateRaw) throw new Error(`Missing <meta property="article:published_time"> in ${filePath}`);
  const date = new Date(dateRaw);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid article:published_time "${dateRaw}" in ${filePath}`);

  const ogImage = readMeta(html, 'property', 'og:image');
  const ogImageWidth = readMeta(html, 'property', 'og:image:width');
  const ogImageHeight = readMeta(html, 'property', 'og:image:height');
  const ogImageAlt = readMeta(html, 'property', 'og:image:alt') || title;

  const bodyMatch = html.match(
    /<div\s+class="post-content"\s+data-blog-lang="da"[^>]*>([\s\S]*?)<\/div>\s*(?=<div\s+class="post-content"|<\/article>)/i
  );
  if (!bodyMatch) throw new Error(`Could not locate <div class="post-content" data-blog-lang="da"> in ${filePath}`);

  let body = bodyMatch[1].trim();
  body = stripBlogI18nAttrs(body);
  body = absolutizeUrls(body, url);

  let coverHtml = '';
  if (ogImage) {
    const w = ogImageWidth ? ` width="${escapeXml(ogImageWidth)}"` : '';
    const h = ogImageHeight ? ` height="${escapeXml(ogImageHeight)}"` : '';
    coverHtml = `<figure><img src="${escapeXml(ogImage)}" alt="${escapeXml(ogImageAlt)}"${w}${h} /></figure>\n`;
  }

  const contentHtml = coverHtml + body;

  return {
    slug,
    url,
    title,
    description,
    date,
    image: ogImage ? { url: ogImage, width: ogImageWidth, height: ogImageHeight, alt: ogImageAlt } : null,
    contentHtml,
  };
}

function renderItem(post) {
  const pubDate = rfc822(post.date);

  let mediaTags = '';
  if (post.image) {
    const w = post.image.width ? ` width="${escapeXml(post.image.width)}"` : '';
    const h = post.image.height ? ` height="${escapeXml(post.image.height)}"` : '';
    const ext = (post.image.url.match(/\.([a-z0-9]+)(?:\?.*)?$/i) || [, 'jpg'])[1].toLowerCase();
    const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : ext === 'gif' ? 'image/gif' : 'image/jpeg';
    mediaTags =
`      <media:content url="${escapeXml(post.image.url)}" medium="image" type="${mime}"${w}${h}>
        <media:title type="plain">${escapeXml(post.image.alt)}</media:title>
      </media:content>
      <media:thumbnail url="${escapeXml(post.image.url)}"${w}${h} />
      <enclosure url="${escapeXml(post.image.url)}" type="${mime}" length="0" />
`;
  }

  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(post.url)}</link>
      <guid isPermaLink="true">${escapeXml(post.url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${FEED_AUTHOR_EMAIL} (${FEED_AUTHOR_NAME})</author>
      <dc:creator>${escapeXml(FEED_AUTHOR_NAME)}</dc:creator>
      <description>${escapeXml(post.description)}</description>
${mediaTags}      <content:encoded>${cdata(post.contentHtml)}</content:encoded>
    </item>`;
}

function buildFeed(posts) {
  posts.sort((a, b) => b.date - a.date);
  const lastBuild = posts.length ? posts[0].date : new Date();
  const copyrightYear = new Date().getUTCFullYear();
  const items = posts.map(renderItem).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>${FEED_LANGUAGE}</language>
    <copyright>Copyright ${copyrightYear} Rebuy</copyright>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${FEED_IMAGE}</url>
      <title>${escapeXml(FEED_TITLE)}</title>
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
  fs.writeFileSync(OUTPUT, buildFeed(posts));
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)} with ${posts.length} item(s).`);
}

main();
