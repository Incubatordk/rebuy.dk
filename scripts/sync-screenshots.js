#!/usr/bin/env node
/* ==========================================================================
   Rebuy.dk — Screenshot sync
   Pulls raw PNG screenshots from the rebuy-ios and rebuy-android repos,
   resizes them, encodes WebP at @1x and @2x, and writes them into
   assets/screenshots/{platform}/{lang}/{slug}.webp

   Run: node scripts/sync-screenshots.js  (or `make screenshots`)

   Env overrides:
     IOS_REPO=/path/to/rebuy-ios
     ANDROID_REPO=/path/to/rebuy-android
     TARGET_WIDTH_1X=360   (final CSS width for the @1x asset)
   ========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const REPO_ROOT = path.resolve(__dirname, "..");
const SIBLING_ROOT = path.resolve(REPO_ROOT, "..");

const IOS_REPO = process.env.IOS_REPO || path.join(SIBLING_ROOT, "rebuy-ios");
const ANDROID_REPO = process.env.ANDROID_REPO || path.join(SIBLING_ROOT, "rebuy-android");
const TARGET_WIDTH_1X = parseInt(process.env.TARGET_WIDTH_1X || "360", 10);
const OUT_ROOT = path.join(REPO_ROOT, "assets", "screenshots");

// Canonical screen sequence. The website shows these five in this order
// on both platforms so the parallel galleries stay symmetric.
const SCREENS = [
  { slug: "01-feed",    ios: "01_Feed",       android: "01-feed" },
  { slug: "02-detail",  ios: "02_ItemDetail", android: "02-item-detail" },
  { slug: "03-messages",ios: "03_Messages",   android: "04-messages" },
  { slug: "04-post",    ios: "04_PostItem",   android: "03-sell" },
  { slug: "05-profile", ios: "05_Profile",    android: "05-profile" },
];

const LANGS = [
  { code: "da", iosDir: "da",    androidDir: "da-DK" },
  { code: "en", iosDir: "en-US", androidDir: "en-US" },
];

function sourceFor(platform, screen, lang) {
  if (platform === "ios") {
    return path.join(
      IOS_REPO, "fastlane", "screenshots",
      lang.iosDir,
      `iPhone 17 Pro Max-${screen.ios}.png`,
    );
  }
  return path.join(
    ANDROID_REPO, "fastlane", "metadata", "android",
    lang.androidDir, "images", "phoneScreenshots",
    `${screen.android}.png`,
  );
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: ["ignore", "ignore", "inherit"] });
}

// Resize source PNG -> intermediate PNG -> WebP, twice (1x and 2x).
function encode(srcPng, outWebp, widthPx) {
  const tmpPng = outWebp.replace(/\.webp$/, ".__tmp__.png");
  run("magick", [srcPng, "-resize", `${widthPx}x`, "-strip", tmpPng]);
  run("cwebp", ["-q", "85", "-m", "6", "-quiet", tmpPng, "-o", outWebp]);
  fs.unlinkSync(tmpPng);
}

function syncPlatform(platform) {
  let count = 0, missing = 0;
  for (const lang of LANGS) {
    const outDir = path.join(OUT_ROOT, platform, lang.code);
    ensureDir(outDir);
    for (const screen of SCREENS) {
      const src = sourceFor(platform, screen, lang);
      if (!fs.existsSync(src)) {
        console.warn(`  ! missing: ${path.relative(REPO_ROOT, src)}`);
        missing++;
        continue;
      }
      const base = path.join(outDir, screen.slug);
      encode(src, `${base}.webp`, TARGET_WIDTH_1X);
      encode(src, `${base}@2x.webp`, TARGET_WIDTH_1X * 2);
      count++;
    }
  }
  console.log(`  ${platform}: wrote ${count} screen(s), missing ${missing}`);
}

function main() {
  for (const repo of [IOS_REPO, ANDROID_REPO]) {
    if (!fs.existsSync(repo)) {
      console.error(`✗ Source repo not found: ${repo}`);
      console.error(`  Set IOS_REPO / ANDROID_REPO env vars or clone the repos alongside rebuy.dk.`);
      process.exit(1);
    }
  }
  console.log(`Syncing screenshots → ${path.relative(REPO_ROOT, OUT_ROOT)} (1x=${TARGET_WIDTH_1X}px, 2x=${TARGET_WIDTH_1X * 2}px)`);
  syncPlatform("ios");
  syncPlatform("android");
  console.log("Done.");
}

main();
