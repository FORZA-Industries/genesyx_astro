import type { APIRoute } from "astro";
import { indexable } from "@/data/site";

// Launch policy: all crawlers (search engines, AI search bots and AI training bots) may crawl.
// To treat AI training crawlers differently from search crawlers, add explicit groups here, e.g.
// "User-agent: GPTBot" / "Disallow: /". That is a business decision; don't change it silently.
export const GET: APIRoute = ({ site, url }) => {
  const sitemap = new URL("/sitemap-index.xml", site ?? url).toString();
  const body = indexable
    ? ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap}`]
    : [
        "# Crawling disabled for this build (PUBLIC_INDEXABLE=false).",
        "User-agent: *",
        "Disallow: /",
      ];
  return new Response(body.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
