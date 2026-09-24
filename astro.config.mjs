// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Set SITE_URL in the Cloudflare build environment once the domain is confirmed.
const site = process.env.SITE_URL ?? "https://genesyx.com";

// Content collections aren't available in config, so read each guide's `updated` frontmatter directly.
const guidesDir = new URL("./src/content/guides/", import.meta.url);
/** @type {Map<string, string>} */
const lastmod = new Map();
for (const f of readdirSync(guidesDir)) {
  if (!f.endsWith(".md")) continue;
  const updated = readFileSync(new URL(f, guidesDir), "utf8").match(/^updated:\s*(\S+)/m)?.[1];
  if (updated) lastmod.set(`/${f.replace(/\.md$/, "")}`, updated);
}

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [
    sitemap({
      serialize(item) {
        const updated = lastmod.get(new URL(item.url).pathname);
        if (updated) item.lastmod = new Date(updated).toISOString();
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
