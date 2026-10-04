# Supertonic!

Marketing / portfolio site for **Supertonic!**, Santa Clara University's oldest
contemporary all-gender a cappella group (est. 2007).

Plain HTML/CSS/JS — no build step. GSAP (via CDN) powers the animations.

## Run it locally

```bash
# from this folder
python3 -m http.server 3001
# then open http://localhost:3001
```

(The dev server for this project usually runs on **http://localhost:3001**.)

## Structure

- `index.html` — all sections (single-page scroll)
- `style.css`  — design tokens, layout, animations, responsive rules
- `script.js`  — data + rendering, carousel engine, nav, floating notes, GSAP, form
- `assets/`    — real photos & video
  - `members/` — current-roster headshots
  - `alumni/`  — class-of-2025 headshots
  - `gallery/` — 27 gallery photos (the carousel)
  - `supertonic-logo.png`, `hero.jpg`, `vibe.mp4` (background video)

## Sections

- **Hero** — split-screen, Instagram only (`@scsupertonic`)
- **About** — group history + animated stats
- **Vibe band** — looping background video with a headline
- **Members** — expanding-panel accordion (hover/tap), full color
- **Gallery** — drag/swipe/arrow carousel, autoplay, full color
- **Alumni** — Class of 2025 cards
- **Contact** — Instagram CTA + a form that routes to the board emails
  (`gspangler@scu.edu`, `aranade2@scu.edu`) via the visitor's mail app.
  The addresses are **not displayed** on the page.

## Editing content

- **Members / Alumni / Gallery** — edit the `MEMBERS`, `ALUMNI`, `GALLERY`
  arrays at the top of `script.js` (text + photo paths in one place).
- **Contact recipients** — `CONTACT_EMAILS` in `script.js`.
- **Background video** — replace `assets/vibe.mp4`.

## Notes

- Photos display in full color.
- Everything respects `prefers-reduced-motion`.
- Credit: Website design — Ajinkya Ranade × Zaxis Ventures LLC.
