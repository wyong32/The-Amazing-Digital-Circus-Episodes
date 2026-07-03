# Home Page Override

> Overrides `MASTER.md` for `/` only.

## Layout

- Hero height: **content-driven only** — no `vh`, no `min-height` on hero.
- Typography: compact — H1 max ~2rem, section H2 ~1.35rem, body ~0.78–0.86rem.
- Keep `bg-01.jpg` visible via global `body` background; hero uses glow overlays only.

## Style (Retro-Futurism + Circus)

- Marquee ticker, tilted stickers, glitch title layer, neon ticket stubs.
- Poster card with red/gold/purple glow on hover.
- CRT scanline overlay on hero (very subtle, 4% opacity).
- Curtain edge stripe under hero.

## CSS Source

- Global tokens: `src/styles/global.css` (`--neon-*`, `--curtain-gradient`)
- Home layout: `src/styles/home-circus.css` (scoped with `.page-home` wrapper)
- Do **not** use Astro scoped `<style>` for home layout — import via global.css.

## Interactive

- All links/buttons: `cursor: pointer`, 200ms transitions.
- Respect `prefers-reduced-motion` for marquee, glitch, pulse sticker.
