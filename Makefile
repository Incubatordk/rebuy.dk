.PHONY: screenshots serve feeds

# Pull raw fastlane screenshots from rebuy-ios + rebuy-android,
# resize, encode WebP @1x/@2x, write to assets/screenshots/<platform>/<lang>/.
screenshots:
	node scripts/sync-screenshots.js

# Rebuild the blog + legal RSS feeds locally.
feeds:
	node scripts/build-feed.js
	node scripts/build-legal-feeds.js

# Local dev server on http://localhost:8000
serve:
	python3 -m http.server 8000
