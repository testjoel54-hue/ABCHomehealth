import { defineConfig } from 'vite';
import { readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';

// Multi-page build: include the homepage and every nested /page/index.html.
// Without this, a default Vite build would output only the homepage.
function findHtmlEntries(directory) {
  const entries = [];
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    if (item.isDirectory()) {
      if (['node_modules', 'dist', '.git', '.vercel'].includes(item.name)) continue;
      entries.push(...findHtmlEntries(resolve(directory, item.name)));
    } else if (item.isFile() && item.name === 'index.html') {
      entries.push(resolve(directory, item.name));
    }
  }
  return entries;
}

const root = process.cwd();
const pageFiles = findHtmlEntries(root);

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pageFiles.map(file => [relative(root, file).replace(/\\/g, '/'), file])
      ),
    },
  },
});
