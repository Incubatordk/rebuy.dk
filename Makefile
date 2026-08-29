.PHONY: screenshots serve feeds sitemap llms modes blog-cta en

# Pull raw fastlane screenshots from rebuy-ios + rebuy-android,
# resize, encode WebP @1x/@2x, write to assets/screenshots/<platform>/<lang>/.
screenshots:
	node scripts/sync-screenshots.js

# Rebuild the blog + legal RSS feeds locally.
feeds:
	node scripts/build-feed.js
	node scripts/build-legal-feeds.js

# Regenerate sitemap.xml from filesystem + git history.
sitemap:
	node scripts/build-sitemap.js

# Regenerate llms.txt + llms-full.txt from site.config.js, js/i18n.js,
# index.html (FAQ) and blog/<slug>/index.html.
llms:
	node scripts/build-llms.js

# Strip the inactive mode block (prelaunch/launched) from index.html.
# WARNING: mutates index.html in place — typically only run in CI.
# Locally, use ?mode=launched / ?mode=prelaunch URL params to preview instead.
modes:
	node scripts/build-modes.js

# Sync the app-download CTA store URLs in every blog post with site.config.js.
blog-cta:
	node scripts/build-blog-cta.js

# Generate en/index.html from index.html + the `en` dictionary in js/i18n.js.
# WARNING: must be built from the MODE-STRIPPED index.html. Locally index.html
# still holds both mode blocks, so this target strips, generates, and restores.
en:
	@cp index.html .index.html.bak
	@node scripts/build-modes.js >/dev/null
	@node scripts/build-en.js; status=$$?; \
	 cp .index.html.bak index.html; rm -f .index.html.bak index.preview.html; \
	 exit $$status

# Local dev server on http://localhost:8000
serve:
	python3 -m http.server 8000
