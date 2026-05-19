#!/usr/bin/env node
// Generates sitemap.xml from filesystem + git history.
//
// Why git-derived lastmod (NOT fs.statSync().mtime):
//   CI checkouts rewrite file mtimes to checkout time. Using mtime makes
//   every deploy ship a sitemap claiming every URL changed today — Google
//   detects that pattern and ignores <lastmod> entirely (June 2023 guidance),
//   which is worse than omitting the field. `git log -1 --format=%cI -- <path>`
//   gives the commit date of the file's last meaningful change.
//
// Why trailing-slash URLs:
//   GitHub Pages 301-redirects `/foo` → `/foo/` for directory routes. A
//   sitemap entry that redirects counts as a soft error in Search Console,
//   so we list the destination URL directly.

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://rebuy.dk';
const TODAY = new Date().toISOString().slice(0, 10);

// Static routes: { public URL → source file driving lastmod, plus crawl hints }.
const STATIC_ROUTES = [
  { url: '/',                  file: 'index.html',                  changefreq: 'weekly',  priority: '1.0' },
  { url: '/blog/',             file: 'blog/index.html',             changefreq: 'weekly',  priority: '0.6' },
  { url: '/privacy-policy/',   file: 'privacy-policy/index.html',   changefreq: 'monthly', priority: '0.3' },
  { url: '/terms-of-use/',     file: 'terms-of-use/index.html',     changefreq: 'monthly', priority: '0.3' },
  { url: '/account-deletion/', file: 'account-deletion/index.html', changefreq: 'monthly', priority: '0.3' },
];

// Auto-discover blog posts at blog/<slug>/index.html (skip blog/en/, which
// only hosts the English RSS feed — there's no /blog/en/ landing page).
function discoverBlogPosts() {
  const blogDir = path.join(ROOT, 'blog');
  return fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name !== 'en')
    .map(entry => ({
      url: `/blog/${entry.name}/`,
      file: `blog/${entry.name}/index.html`,
      changefreq: 'monthly',
      priority: '0.7',
    }))
    .filter(route => fs.existsSync(path.join(ROOT, route.file)));
}

function gitLastmod(relativePath) {
  try {
    const out = execSync(
      `git log -1 --format=%cI -- ${JSON.stringify(relativePath)}`,
      { cwd: ROOT, encoding: 'utf8' }
    ).trim();
    return out ? out.slice(0, 10) : null;
  } catch {
    return null;
  }
}

function buildSitemap() {
  const routes = [...STATIC_ROUTES, ...discoverBlogPosts()];

  const urls = routes.map(route => {
    const absolutePath = path.join(ROOT, route.file);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`build-sitemap: skipping ${route.url} — ${route.file} not found`);
      return null;
    }
    const lastmod = gitLastmod(route.file) || TODAY;
    return `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).filter(Boolean);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
  console.log(`build-sitemap: wrote ${urls.length} URLs to sitemap.xml`);
}

buildSitemap();
