# assets/

Drop your real files here, then update the references:

## Logo
- Save the official logo as **`supertonic-logo.png`** here.
- In `index.html`, swap the text logo (`.brand`) for the image version — the
  commented block right above it shows exactly how. The CSS already applies
  `filter: grayscale(100%) brightness(0)` so the turquoise logo renders solid
  black on the light hero side (as requested).

## Photos
Current site uses Lorem Picsum placeholders (stable, seeded). Replace them:

- **Hero photo** → `index.html`, `.hero__photo` `src` → e.g. `assets/hero.jpg`
  (use a strong vertical / portrait shot).
- **Member headshots** → `script.js`, the `MEMBERS` array, each `photo` field →
  e.g. `assets/members/jessica.jpg`.
- **Gallery** → `script.js`, the `GALLERY` array → list your own file paths,
  e.g. `assets/gallery/beach-retreat.jpg`.

Photos display in black & white and animate to full color on hover — no need to
make two versions, the CSS `grayscale` filter handles it.

## Media
- YouTube: `index.html` → replace `dQw4w9WgXcQ` in the embed `src`.
- Spotify: Share → Embed on any track/playlist, paste the `src`.
