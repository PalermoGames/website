# CLAUDE.md

Marketing site for RIZ Games. Vite + React 19 + TypeScript 7 + Tailwind v4,
built around [React Bits](https://reactbits.dev) components.

See `README.md` for setup and commands. This file covers what will bite you.

## Never break these

`public/privacy.html`, `public/tos.html` and `public/app-ads.txt` are **served
verbatim at fixed URLs**. `app-ads.txt` is read by ad networks and the other two
are linked from Play Store listings. Vite copies `public/` to the build root
untouched, which is the whole reason they live there. Do not reformat them,
convert them to React routes, or change their paths. If you touch the SPA
fallback in `nginx.conf`, confirm they still resolve as real files first.

That fallback is `try_files $uri $uri.html $uri/ /index.html`. The `$uri.html`
arm serves the per-route entry points `scripts/og-routes.mjs` writes, so link
previews are route-specific — scrapers do not run the JS that would otherwise
set them. The three files above are requested *with* their extension, so `$uri`
still matches them first.

Images live in `src/assets/images/`, not `public/`, so only files that are
actually imported enter the bundle. `background.jpg` is 7.7 MB — moving the
folder to `public/` would ship it to every visitor.

## React Bits

Components are **copied into this repo**, not installed. Add them with:

```bash
npx shadcn@latest add @react-bits/<Component>-TS-TW
```

Always the `-TS-TW` variant. The registry is declared in `components.json`; the
CLI installs each component's own npm deps and drops the file **flat** in
`src/components/` (not in a per-component subdirectory).

**`src/components/WarpText.tsx` is patched locally** — it gained a `fontStyle`
prop because upstream omits font-style from its canvas font string, making
italic headlines impossible. Re-running `shadcn add` on it with `--overwrite`
silently discards this and the headline goes upright. Check the README's "Local
modifications" list before overwriting any component.

### Passing props to them

Several of these components list props in a `useEffect` dependency array. An
inline array or object literal is a new identity every render, which **tears
down and rebuilds the WebGL context on every render**. Hoist to a module
constant — see `GRID_MUL` in `src/sections/Hero.tsx`.

### Performance

Each one of these is a full-screen fragment shader and a live WebGL context.
`FaultyTerminal` calls `digit()` nine times per pixel; `chromaticAberration`
and `dither` multiply that further. Two contexts is roughly double the GPU
cost. If something stutters on mid-range Android, the `dpr` prop is the lever
before anything else.

## Conventions that are load-bearing

**Reduced motion.** The `@media (prefers-reduced-motion)` block in
`src/index.css` cannot stop a `requestAnimationFrame` loop. WebGL components
need it in JS — use `usePrefersReducedMotion` and the component's `pause` prop.
`WarpText` already handles this internally and needs nothing.

**Pointer events.** The foreground stack in `Hero.tsx` is `pointer-events-none`
so the cursor reaches the background canvas. **Any interactive element you add —
nav links, buttons, forms — needs `pointer-events-auto` or it will not be
clickable.**

**Canvas text is not text.** `WarpText` rasterises its headline into WebGL. It
is invisible to crawlers and to find-on-page, so it may only ever carry the
brand gesture — never the proposition. In `Hero.tsx` the canvas renders
"RIZ Games" and is `aria-hidden`; the real `<h1>` below it is visible HTML and
says what the page is actually for. Do not put a page's only heading in a
shader.

## TypeScript 7 (not 5.x)

- `baseUrl` was **removed**. Path aliases resolve relative to the tsconfig, so
  `"paths": { "@/*": ["./src/*"] }` stands alone.
- `noUncheckedSideEffectImports` rejects `import './index.css'` unless
  `src/vite-env.d.ts` exists. Do not delete it.

## Tailwind v4

There is no `tailwind.config.js`. Theme tokens are CSS-first in
`src/index.css` under `@theme` (`--color-neon-green`, `--font-display`, ...).
Add design tokens there, not in a config file.

## Deployment

Dokploy on a VPS, behind Cloudflare at rizgames.com.ar. The `Dockerfile` builds
and serves `dist/` with nginx. Pushing to `senpai` may auto-deploy — check
before pushing anything half-finished.

## The two routes

`/` sells work-for-hire, `/showcase` shows the studio's own games. That split is
deliberate and load-bearing: contract work is the revenue, so it gets the front
door, and the original IP earns its place on `/` as *evidence* — a studio that
makes its own games is the argument against every generic outsourcing shop the
homepage competes with. Do not re-merge them into one page.

`/showcase` was written as a publisher pitch, at `/original-ip`. Nobody is being
pitched: Tango District is self-published and Nitro Racers never released, so
the page is a showcase of both and its only conversion is a Steam wishlist. Do
not reintroduce "request the pitch deck" CTAs — there is no deck.

`/work-for-hire` redirects to `/` and `/original-ip` redirects to `/showcase`.
Both were live URLs — `/work-for-hire` is linked from the previously deployed
footer — so keep them resolving. `scripts/og-routes.mjs` still writes
`original-ip.html` so old links unfurl with the right card.

## Known issues

The hero shader still takes 15–20s to reach full density, far longer than the
2s `pageLoadAnimation` explains. Undiagnosed. Suspect the noise field evolving
from a low starting density at `timeScale={0.5}`. Do not "fix" it by guessing —
measure first.

It is no longer *visible* as a defect: `/` has no WebGL above the fold at all,
and the `/showcase` hero paints its gradient and grain underneath, then
composites the canvas in `mix-blend-screen` so the shader's black ground drops
out and only the lit digits arrive. The section is finished on the first frame
regardless of the ramp. If you diagnose the ramp properly, that scaffolding can
come out — but do not remove it before then.
