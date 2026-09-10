# RIZ Games — website

Static marketing site for RIZ Games. Vite + React 19 + TypeScript + Tailwind CSS v4,
with UI components pulled in from [React Bits](https://reactbits.dev).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # type-checks, then emits static files to dist/
npm run preview   # serve the built output locally
```

## Adding React Bits components

Components are *copied into this repo*, not installed as a dependency. The
`@react-bits` registry is registered in `components.json`, so:

```bash
npx shadcn@latest add @react-bits/<Component>-TS-TW
```

Always use the `-TS-TW` (TypeScript + Tailwind) variant to match this project.
The CLI drops the source in `src/components/` and installs whatever npm packages
that component needs (`motion`, `gsap`, `ogl`, `three`, ...).

Browse components at https://reactbits.dev — each page lists its exact command.

### Local modifications

These files have been edited after being pulled from the registry. Re-running
`shadcn add ... --overwrite` on them will discard the change:

- `src/components/WarpText.tsx` — added a `fontStyle` prop. Upstream builds its
  canvas font string without a style, so italic headlines are impossible; the
  patch threads `fontStyle` through the probe element and `ctx.font`.

### Removed

`Dock` was the site's navigation and is gone. Five unlabeled circular icons
could not communicate "work-for-hire", never indicated the current section, and
overlapped body copy at desktop widths — a marketing site cannot spend its
information architecture on a flourish. `src/components/site/SiteHeader.tsx`
replaces it. Re-add the component with
`npx shadcn@latest add @react-bits/Dock-TS-TW` if it finds a decorative home.

## Layout

- `src/` — application source
- `src/assets/images/` — logos and artwork; only files that are *imported* end up
  in the build, so unused art costs nothing
- `public/` — copied to the build root verbatim, URLs preserved:
  `/privacy.html`, `/tos.html`, `/app-ads.txt`, `/og.jpg`
- `scripts/` — build and pre-deploy checks, run through npm scripts

## Deployment

Served from Dokploy (project Meta / riz-website), behind Cloudflare at
rizgames.com.ar. The included `Dockerfile` builds the site and serves `dist/`
with nginx.

## Routes

| Path | Serves | Notes |
|---|---|---|
| `/` | Work-for-hire | The front door. Contract work is the revenue. |
| `/showcase` | Tango District, Nitro Racers | The studio's own games. Self-published; the ask is a Steam wishlist, not a pitch deck. |
| `/original-ip` | redirect to `/showcase` | The old URL for the games page; kept so old links resolve. |
| `/work-for-hire` | redirect to `/` | Was the live URL for this content; kept so old links resolve. |

## Copy

`src/content/site.ts` holds every string the sections render. Anything marked
`TODO(copy):` is a fact the file does not know — a commercial term, an elevator
pitch — and is waiting on a human.
`pitch.md` is the source of truth for the studio's history, team and work. The
`src/content/site.ts` copy is derived from it, and should be kept in sync.

```bash
npm run check:copy   # fails if any TODO(copy): marker is left
```

Run it before deploying. Two invented game pitches, written only to prove out
the showcase layout, were live in front of publishers for months because
nothing checked. Sections also call `pending()` and render nothing rather than
show a raw marker, but that is the seatbelt, not the gate.

## Game media

`Showcase` falls back to generated key art, so a game with no media still
renders. To drop real media in, set the fields on the game in
`src/content/site.ts`:

- `media.video` — a short (~5s) silent WebM loop, imported from `src/assets/`
- `media.poster` — the first frame while the video buffers, and, with no video
  set, the still that fills the viewport instead (this is what Nitro Racers uses)
- `media.logo` — wordmark; falls back to the title set in the display face

Import them from `src/assets/`, **never** `public/`. Only imported files enter
the bundle, so unused art in `src/assets/` costs nothing, while everything in
`public/` ships to every visitor — `background.jpg` alone is 7.7 MB.

> `nitroracersnologo` was 1.7 MB of PNG; it is now a 93 KB WebP (quality 82,
> 39 dB PSNR, alpha dropped because every pixel was opaque). The PNG is gone —
> re-encode from git history if a higher quality is ever needed. It is the only
> large image the bundle pulls in; `background.jpg` and `RIZ.png` are unimported
> and cost nothing.

## Link previews

Slack, Discord, LinkedIn and X do not run JavaScript when they scrape a link,
so per-route `og:` tags cannot come from React. `scripts/og-routes.mjs` runs
after `vite build` and writes `dist/showcase.html` (plus `dist/original-ip.html`
for the old URL) — copies of the built `index.html` with the `og:` block
swapped. nginx resolves them through `try_files $uri $uri.html`.

Adding a route with its own preview card means adding an entry to `ROUTES` in
that script. The `<!-- og:start -->` / `<!-- og:end -->` markers in `index.html`
are load-bearing; the script fails loudly if they go missing.

`public/og.jpg` is the preview image, rendered from an HTML card rather than
designed in an image editor. Regenerate it the same way if the headline changes.
