import type { APIRoute } from "astro";
import { indexable } from "@/data/site";

// AI crawlers are named explicitly so the policy is obvious and easy to change per bot.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export const GET: APIRoute = ({ site, url }) => {
  const sitemap = new URL("/sitemap-index.xml", site ?? url).toString();
  const body = indexable
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        ...aiBots.map((b) => `User-agent: ${b}`),
        "Allow: /",
        "",
        `Sitemap: ${sitemap}`,
      ]
    : [
        "# Pre-launch: set PUBLIC_INDEXABLE=true to open the site to crawlers.",
        "User-agent: *",
        "Disallow: /",
      ];
  return new Response(body.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
