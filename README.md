# ABC Home Health — Vite / Vercel

Converted from the supplied 28-page static HTML website into a Vite multi-page build. The layout, wording, styles, images and navigation are retained.

## Requirements
- Node.js 20.19 or newer (Node.js 22 recommended)
- npm

## Local development
```bash
npm install
npm run dev
```
Open the local URL shown in the terminal. All original subpage URLs remain available, including `/about/`, `/services/`, `/services/physical-therapy/`, and `/contact/`.

## Production test
```bash
npm run check
npm run build
npm run preview
```
The production output appears in `dist/`. Vite is configured to compile **all 28 HTML pages**, not just the homepage.

## Deploy to Vercel with GitHub
1. Push **all project files** in this folder to the root of a GitHub repository. Do not upload only the `dist` folder.
2. In Vercel, select **Add New > Project** and import that repository.
3. The project auto-detects Vite. Use these settings if needed:
   - Framework Preset: `Vite`
   - Root Directory: `./`
   - Install Command: `npm install` (or leave default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy.

## Files
- `vite.config.js`: adds every nested page as a separate Vite HTML entry.
- `package.json`: Vite dependency and npm scripts; `npm install` generates `package-lock.json` in your environment.
- `vercel.json`: Vercel framework/build/output settings.
- `styles.css`, `script.js`, `assets/`, `**/index.html`: original website files.

### Important site-content note
The original ZIP described the site as a **preview** with sample company content. Contact details, care availability, service areas, coverage, and other agency information remain unverified placeholders. Review this information before publishing the website publicly. Do not treat the preview as validated agency information.

## Note on local build verification
The package contains a validated multi-page Vite setup. Its static HTML links can be checked offline with `npm run check`. A complete `npm run build` additionally requires installing Vite through npm.
