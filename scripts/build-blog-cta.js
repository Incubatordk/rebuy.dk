#!/usr/bin/env node
/**
 * build-blog-cta.js — keep the app-download CTA store URLs in every blog post
 * in sync with site.config.js.
 *
 * Blog posts are hand-authored static HTML on purpose: the CTA must stay in the
 * static markup so it's crawlable and lands in the RSS <content:encoded>. The
 * cost of that is drift — the App Store / Google Play hrefs inside each post's
 * <section class="post-cta"> can fall out of sync with the canonical URLs in
 * site.config.js. That already bit us once: #90 / PR #91 moved the App Store
 * link from the US to the DK storefront, and BLOG-CONTENT-CALENDAR.md mandates
 * an identical CTA in all 16 planned posts, so the blast radius grows per post.
 * See issue #102 (same drift class as #92 / #93).
 *
 * This rewrites every apps.apple.com / play.google.com href inside a post-cta
 * block to the canonical APP_STORE_URL / PLAY_STORE_URL from site.config.js.
 * Like sitemap.xml and llms.txt the result is committed, and
 * .github/workflows/check-generated.yml fails a PR whose committed posts have
 * drifted — so bad URLs can't reach main.
 *
 * Run: node scripts/build-blog-cta.js   (or: make blog-cta)
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');

// Load SITE_CONFIG the same way build-llms.js does — site.config.js is a plain
// `const SITE_CONFIG = {...}` with no module.exports, so run it in a vm sandbox.
function loadConfig() {
  const code = fs.readFileSync(path.join(ROOT, 'site.config.js'), 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\nthis.__CONFIG__ = SITE_CONFIG;`, sandbox);
  const cfg = sandbox.__CONFIG__;
  if (!cfg) throw new Error('build-blog-cta: could not read SITE_CONFIG from site.config.js');
  if (!cfg.APP_STORE_URL || !cfg.PLAY_STORE_URL) {
    throw new Error('build-blog-cta: APP_STORE_URL / PLAY_STORE_URL missing in site.config.js');
  }
  return cfg;
}

// Every blog/<slug>/index.html, excluding blog/en/ (which only hosts the feed).
function findPosts() {
  const blogDir = path.join(ROOT, 'blog');
  return fs.readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'en')
    .map((d) => path.join(blogDir, d.name, 'index.html'))
    .filter((p) => fs.existsSync(p));
}

// Rewrite store hrefs only inside <section class="post-cta"> … </section> blocks
// (a post may carry a DA and an EN block), so nothing outside the CTA is touched.
function rewriteCtas(html, cfg) {
  return html.replace(/<section class="post-cta"[\s\S]*?<\/section>/g, (block) =>
    block
      .replace(/href="https:\/\/apps\.apple\.com\/[^"]*"/g, `href="${cfg.APP_STORE_URL}"`)
      .replace(/href="https:\/\/play\.google\.com\/[^"]*"/g, `href="${cfg.PLAY_STORE_URL}"`)
  );
}

function main() {
  const cfg = loadConfig();
  const posts = findPosts();
  let changed = 0;
  for (const file of posts) {
    const before = fs.readFileSync(file, 'utf8');
    const after = rewriteCtas(before, cfg);
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed++;
      console.log('updated', path.relative(ROOT, file));
    }
  }
  console.log(`build-blog-cta: ${posts.length} post(s) scanned, ${changed} updated.`);
}

main();
