// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import path from 'node:path';

/** @type {import('astro').AstroIntegration} */
function singleSitemapFile() {
  return {
    name: 'single-sitemap-file',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const dist = fileURLToPath(dir);
        const chunkPath = path.join(dist, 'sitemap-0.xml');
        const indexPath = path.join(dist, 'sitemap-index.xml');
        const outPath = path.join(dist, 'sitemap.xml');

        try {
          const xml = await fs.readFile(chunkPath, 'utf8');
          await fs.writeFile(outPath, xml);
          await fs.unlink(chunkPath);
        } catch {
          // sitemap chunk missing — skip
        }

        try {
          await fs.unlink(indexPath);
        } catch {
          // index missing — skip
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://theamazingdigitalcircus.org',
  trailingSlash: 'never',
  integrations: [sitemap(), singleSitemapFile()],
});
