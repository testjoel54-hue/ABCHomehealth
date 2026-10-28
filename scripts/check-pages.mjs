import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const projectRoot = process.cwd();
const ignoredDirectories = new Set(['node_modules', 'dist', '.git', '.vercel']);

function findPages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return ignoredDirectories.has(entry.name) ? [] : findPages(path);
    return entry.isFile() && entry.name === 'index.html' ? [path] : [];
  });
}

const pages = findPages(projectRoot);
const errors = [];
let referencesChecked = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const referencedFile = /<(?:a|link|script|img|source)\b[^>]*?\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi;
  for (const [, , raw] of html.matchAll(referencedFile)) {
    if (/^(?:https?:|mailto:|tel:|data:|\/\/|#|javascript:)/i.test(raw)) continue;
    const target = decodeURIComponent(raw.split(/[?#]/)[0]);
    if (!target) continue;
    const absolute = target.startsWith('/')
      ? resolve(projectRoot, '.' + target)
      : resolve(dirname(page), target);
    referencesChecked++;
    if (!existsSync(absolute)) {
      errors.push(`${relative(projectRoot, page)} -> ${raw}`);
    }
  }
  if (!/<script\s+type="module"\s+src="[^"]*script\.js"/.test(html)) {
    errors.push(`${relative(projectRoot, page)} -> Vite module script missing`);
  }
}

if (errors.length) {
  console.error(`FAILED: ${errors.length} missing or invalid references:`);
  for (const error of errors) console.error('  ' + error);
  process.exit(1);
}
console.log(`PASS: ${pages.length} HTML pages and ${referencesChecked} local references verified.`);
