// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Canonical origin (no trailing slash). genesyx.life redirects here (Vercel domain setting).
const site = process.env.SITE_URL ?? "https://www.genesyx.life";

// Content collections aren't available in config, so read each guide's `updated` frontmatter directly.
const guidesDir = new URL("./src/content/guides/", import.meta.url);
/** @type {Map<string, string>} */
const lastmod = new Map();
for (const f of readdirSync(guidesDir)) {
  if (!f.endsWith(".md")) continue;
  const updated = readFileSync(new URL(f, guidesDir), "utf8").match(/^updated:\s*(\S+)/m)?.[1];
  if (updated) lastmod.set(`/${f.replace(/\.md$/, "")}`, updated);
}
// The Learn hub lists every guide, so it is as fresh as the newest one.
const newest = [...lastmod.values()].sort().at(-1);
if (newest) lastmod.set("/learn", newest);
// The other pages keep their date in the page file: `updated={new Date("YYYY-MM-DD")}` on the
// layout, or `const updated = new Date("YYYY-MM-DD")` on the home page.
const pagesDir = new URL("./src/pages/", import.meta.url);
for (const f of readdirSync(pagesDir)) {
  if (!f.endsWith(".astro")) continue;
  const updated = readFileSync(new URL(f, pagesDir), "utf8").match(
    /\bupdated\s*=\s*\{?new Date\("([\d-]+)"\)/,
  )?.[1];
  if (updated) lastmod.set(f === "index.astro" ? "/" : `/${f.replace(/\.astro$/, "")}`, updated);
}

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      // Keep noindex pages out of the sitemap.
      filter: (page) => !["/privacy", "/404"].includes(new URL(page).pathname),
      serialize(item) {
        const updated = lastmod.get(new URL(item.url).pathname);
        if (updated) item.lastmod = new Date(updated).toISOString();
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
