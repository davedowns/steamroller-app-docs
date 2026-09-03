# Warmachine: Tactical Companion — Marketing Site

A single-page, Bootstrap 5 marketing/landing site for Warmachine: Tactical Companion
(tabletop wargame session tracker for Warmachine &amp; Hordes).

## Structure

- `index.html` — the whole site (hero, features, screenshots, stats, FAQ, footer).
- `privacy/index.html` — privacy policy page (served at `/privacy/`), linked from the footer.
- `assets/css/style.css` — custom styling layered on top of Bootstrap 5 (via CDN).
- `assets/img/app-icon.png` — app icon, used as the nav/footer logo and favicon.
- `images/screenshots/` — phone screenshots shown in the hero and "Screenshots"
  section: `home.png`, `games.png`, `stats.png`, `profile.png`. Replace these
  with real device screenshots (ideally ~390×844 portrait, matching a modern
  phone aspect ratio) — the current files are placeholders.

## Viewing locally

No build step required. Serve the folder with any static file server, e.g.:

```
python -m http.server 8000
```

Then open http://localhost:8000.
