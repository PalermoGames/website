/**
 * Fails if any `TODO(copy):` marker is left in src/content/.
 *
 * Two invented game pitches, written to prove out the showcase layout, were
 * live on rizgames.com.ar in front of publishers for months. The markers were
 * right there in the source; nothing checked them. This does.
 *
 * Deliberately NOT wired into `npm run build`, so a local build still works
 * while copy is outstanding. Run it in CI, or before a deploy:
 *
 *   npm run check:copy
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const MARKER = 'TODO(copy):';
const CONTENT_DIR = path.resolve(import.meta.dirname, '..', 'src', 'content');

const files = await readdir(CONTENT_DIR, { recursive: true, withFileTypes: true });
const findings = [];

for (const entry of files) {
  if (!entry.isFile()) continue;

  const filePath = path.join(entry.parentPath ?? CONTENT_DIR, entry.name);
  const lines = (await readFile(filePath, 'utf8')).split('\n');

  lines.forEach((line, index) => {
    if (line.includes(MARKER)) {
      findings.push(`${path.relative(process.cwd(), filePath)}:${index + 1}  ${line.trim()}`);
    }
  });
}

if (findings.length > 0) {
  console.error(`\nUnwritten copy — ${findings.length} TODO(copy) marker(s) still in src/content/:\n`);
  for (const finding of findings) console.error(`  ${finding}`);
  console.error('\nWrite the real text, or delete the field, before deploying.\n');
  process.exit(1);
}

console.log('check:copy — no TODO(copy) markers left.');
