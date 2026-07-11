.PHONY: screenshots serve feeds sitemap llms modes

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

# Local dev server on http://localhost:8000
serve:
	python3 -m http.server 8000
