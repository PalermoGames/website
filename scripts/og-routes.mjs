/**
 * Emits a second HTML entry point so /original-ip unfurls as itself.
 *
 * This site is a client-rendered SPA: every route is served the same
 * index.html. Slack, Discord, LinkedIn and X do not run JavaScript when they
 * scrape a link, so per-route og: tags cannot be set from React — a publisher
 * sent https://rizgames.com.ar/original-ip would see the work-for-hire pitch in
 * the preview card.
 *
 * The fix is a copy of the built index.html with the og: block swapped, written
 * to dist/original-ip.html. nginx resolves it via `try_files $uri $uri.html`;
 * the app itself still boots and routes normally from there, because the only
 * difference between the two files is inside <head>.
 *
 * Run after `vite build` (see package.json). Adding another route means adding
 * an entry to ROUTES.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const ORIGIN = 'https://rizgames.com.ar';

const ROUTES = [
  {
    file: 'original-ip.html',
    url: `${ORIGIN}/original-ip`,
    title: 'RIZ Games — Original PC titles seeking a publisher',
    description:
      'Two original PC titles in development from a Buenos Aires studio whose team has shipped and operated games at hundreds of millions of players.',
  },
];

const OG_START = '<!-- og:start -->';
const OG_END = '<!-- og:end -->';

const escapeAttr = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function ogBlock({ url, title, description }) {
  return [
    OG_START,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="RIZ Games" />',
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${ORIGIN}/og.jpg" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    OG_END,
  ].join('\n    ');
}

const source = await readFile(path.join(DIST, 'index.html'), 'utf8');

const start = source.indexOf(OG_START);
const end = source.indexOf(OG_END);
if (start === -1 || end === -1) {
  // Fail loudly: silently shipping the wrong preview card is the bug this
  // script exists to prevent.
  throw new Error('og:start / og:end markers missing from dist/index.html');
}

for (const route of ROUTES) {
  let html = source.slice(0, start) + ogBlock(route) + source.slice(end + OG_END.length);

  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[\s\S]*?(")/, `$1${escapeAttr(route.description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${route.url}$2`);

  await writeFile(path.join(DIST, route.file), html, 'utf8');
  console.log(`og-routes: wrote dist/${route.file}`);
}
