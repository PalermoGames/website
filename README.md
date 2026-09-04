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

## Layout

- `src/` — application source
- `src/assets/images/` — logos and artwork; only files that are *imported* end up
  in the build, so unused art costs nothing
- `public/` — copied to the build root verbatim, URLs preserved:
  `/privacy.html`, `/tos.html`, `/app-ads.txt`

## Deployment

Served from Dokploy (project Meta / riz-website), behind Cloudflare at
rizgames.com.ar. The included `Dockerfile` builds the site and serves `dist/`
with nginx.
