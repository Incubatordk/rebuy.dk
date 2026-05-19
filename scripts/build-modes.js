#!/usr/bin/env node
// Strips the inactive mode block from index.html based on SITE_MODE in
// site.config.js.
//
// Why: keeping both <section id="prelaunch-content"> and <section
// id="launched-content"> in the deployed HTML creates contradictory signals
// for crawlers — two <h1> tags, "coming soon" meta description next to a
// downloadable-app body, etc. This script removes whichever block doesn't
// match the active mode so the deployed page has exactly one narrative.
//
// Source repo keeps both sections (with HTML build markers around them) so
// local dev can preview either via ?mode=launched / ?mode=prelaunch URL
// params. The script only runs in CI deploy. Locally, run `make modes`
// to test the stripped output.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'index.html');
const CONFIG_PATH = path.join(ROOT, 'site.config.js');

function readSiteMode() {
  const src = fs.readFileSync(CONFIG_PATH, 'utf8');
  const match = src.match(/SITE_MODE:\s*["']([^"']+)["']/);
  if (!match) {
    throw new Error('build-modes: could not find SITE_MODE in site.config.js');
  }
  const mode = match[1];
  if (mode !== 'prelaunch' && mode !== 'launched') {
    throw new Error(`build-modes: unexpected SITE_MODE=${mode} (expected "prelaunch" or "launched")`);
  }
  return mode;
}

function stripBlock(html, name) {
  const startMarker = `<!--build:mode-${name}:start-->`;
  const endMarker = `<!--build:mode-${name}:end-->`;
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    console.warn(`build-modes: markers for "${name}" not found — nothing to strip`);
    return html;
  }
  // Remove start..end inclusive plus the trailing newline if present.
  const sliceEnd = endIdx + endMarker.length;
  return html.slice(0, startIdx) + html.slice(sliceEnd).replace(/^\n/, '');
}

function unhideLaunched(html) {
  // When deploying in launched mode, the surviving launched section should
  // not start hidden. The CSS .hidden class is added by main.js as a
  // mode-switching guard; in launched-only builds the guard is moot, but
  // dropping it here means the section is visible even if main.js fails.
  return html.replace(
    '<section id="launched-content" class="hidden">',
    '<section id="launched-content">'
  );
}

function build() {
  const mode = readSiteMode();
  let html = fs.readFileSync(HTML_PATH, 'utf8');

  if (mode === 'prelaunch') {
    html = stripBlock(html, 'launched');
  } else {
    html = stripBlock(html, 'prelaunch');
    html = unhideLaunched(html);
  }

  fs.writeFileSync(HTML_PATH, html);
  console.log(`build-modes: SITE_MODE=${mode} — stripped the inactive section from index.html`);
}

build();
