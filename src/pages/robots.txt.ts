import type { APIRoute } from "astro";
import { indexable } from "@/data/site";

// Launch policy: every crawler may crawl, including AI search and AI training bots, because the
// goal is maximum visibility in search and AI answers. The named groups below change nothing for
// those bots (the wildcard already allows them); they document the decision so nobody "tidies"
// them into a block by accident. To opt out of AI *training* while staying in AI *search*, change
// GPTBot, ClaudeBot, Google-Extended and Applebot-Extended to "Disallow: /" and leave the search
// and user-fetch bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot,
// Perplexity-User) allowed. That is a business decision; don't change it silently.
const aiBots = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export const GET: APIRoute = ({ site, url }) => {
  const sitemap = new URL("/sitemap-index.xml", site ?? url).toString();
  const body = indexable
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        "# AI search and assistant crawlers: explicitly welcome.",
        ...aiBots.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
        `Sitemap: ${sitemap}`,
      ]
    : [
        "# Crawling disabled for this build (PUBLIC_INDEXABLE=false).",
        "User-agent: *",
        "Disallow: /",
      ];
  return new Response(body.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
