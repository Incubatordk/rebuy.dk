# rebuy.dk

Marketing website for [Rebuy](https://rebuy.dk) — a location-based marketplace for buying and selling kids' items in Denmark.

## Local Development

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via GitHub Actions.

## Site Modes

The site has two modes: a pre-launch teaser and a post-launch app download page.

### Switching from pre-launch to launched

Open `site.config.js` and change `SITE_MODE` from `"prelaunch"` to `"launched"`:

```js
const SITE_CONFIG = {
  SITE_MODE: "launched",  // was "prelaunch"
  // ...
};
```

Commit and push — the site will redeploy automatically.

### Mode overview

| Mode | What it shows |
|------|---------------|
| `"prelaunch"` | Teaser page with "Coming soon" badge and email signup form |
| `"launched"` | App download page with App Store / Google Play buttons |

### Testing both modes locally

Add `?mode=prelaunch` or `?mode=launched` to the URL to override the config:

```
http://localhost:8000/?mode=prelaunch
http://localhost:8000/?mode=launched
```
