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

Edit `SITE_MODE` in `site.config.js`:

- `"prelaunch"` — teaser page with email signup
- `"launched"` — app download landing page
