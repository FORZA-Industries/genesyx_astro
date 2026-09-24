// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Set SITE_URL in the Cloudflare build environment once the domain is confirmed.
const site = process.env.SITE_URL ?? "https://genesyx.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
