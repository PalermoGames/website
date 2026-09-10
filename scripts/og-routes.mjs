/**
 * Emits one HTML entry point per real route, plus the 404 page and the sitemap.
 *
 * This site is a client-rendered SPA: without this script every route would be
 * served the same index.html. Two things break when that happens.
 *
 * Link previews: Slack, Discord, LinkedIn and X do not run JavaScript when they
 * scrape a link, so per-route og: tags cannot be set from React — anyone sent
 * https://rizgames.com.ar/showcase would see the work-for-hire pitch in the
 * preview card. The fix is a copy of the built index.html with the og: block
 * swapped, written to dist/showcase.html. nginx resolves it via
 * `try_files $uri $uri.html`; the app still boots and routes normally from
 * there, because the only difference between the files is inside <head>.
 *
 * Status codes: because a file exists for every route the app answers, nginx
 * can `=404` everything else instead of falling back to index.html. Before
 * that, /sitemap.xml and /whatever-typo both returned the homepage with a 200,
 * which is a soft-404 across an infinite URL space.
 *
 * So this list is load-bearing twice over: **a route the app resolves and this
 * script does not write will now 404 in production.** Adding a route means
 * adding an entry here.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const ORIGIN = 'https://rizgames.com.ar';

const SHOWCASE = {
  url: `${ORIGIN}/showcase`,
  title: 'The games RIZ Games makes for itself',
  description:
    "Tango District, a self-published PC title in development, and Nitro Racers, a stylised arcade racer built end to end in house — from the Buenos Aires engineers behind Focus Friend, Google Play's App of the Year 2025.",
};

const ROUTES = [
  { file: 'showcase.html', ...SHOWCASE },
  // The old URL, redirected in the app. Same card, same canonical.
  { file: 'original-ip.html', ...SHOWCASE },
  /**
   * Served for any path with no file behind it, with a 404 status (see
   * `error_page` in nginx.conf). The SPA boots from it and the router renders
   * the not-found screen for whatever the path was.
   *
   * `noindex`, and deliberately no canonical: a canonical pointing at "/" would
   * tell a crawler this URL *is* the homepage, which is precisely the soft-404
   * the status code exists to deny.
   */
  {
    file: '404.html',
    noindex: true,
    title: 'Page not found — RIZ Games',
    description: 'That page does not exist. RIZ Games is a Unity game development studio in Buenos Aires.',
  },
];

/**
 * Copies of index.html, byte for byte.
 *
 * /work-for-hire is the homepage under its old URL — it is linked from the
 * footer of the previously deployed site — so index.html's card and canonical
 * are already the right ones. The file exists only so nginx can resolve the
 * route without a fallback, which is what lets every other unknown path 404.
 */
const ALIASES = ['work-for-hire.html'];

/**
 * Every URL worth indexing, and the only two.
 *
 * The redirect aliases above are deliberately absent: listing a URL that
 * redirects spends crawl budget to be told to go somewhere else, and
 * contradicts the canonical those pages already carry.
 */
const SITEMAP_URLS = [`${ORIGIN}/`, SHOWCASE.url];

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
  // A page nobody should index gets no card at all — an unfurl is an invitation
  // to share the URL, and this one is a dead end.
  const head = route.noindex ? '' : ogBlock(route);
  let html = source.slice(0, start) + head + source.slice(end + OG_END.length);

  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[\s\S]*?(")/, `$1${escapeAttr(route.description)}$2`);

  html = route.noindex
    ? html.replace(/<link\s+rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />')
    : html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${route.url}$2`);

  await writeFile(path.join(DIST, route.file), html, 'utf8');
  console.log(`og-routes: wrote dist/${route.file}`);
}

for (const file of ALIASES) {
  await writeFile(path.join(DIST, file), source, 'utf8');
  console.log(`og-routes: wrote dist/${file} (copy of index.html)`);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...SITEMAP_URLS.map(url => `  <url><loc>${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log(`og-routes: wrote dist/sitemap.xml (${SITEMAP_URLS.length} urls)`);
