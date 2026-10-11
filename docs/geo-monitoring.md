# Search and AI visibility checks

A monthly routine for tracking how Genesyx shows up in Google, Bing and AI answers. Nothing here
guarantees rankings or citations; it records what is happening so changes can be judged.

## After every production deploy

1. `npm run indexnow` submits every sitemap URL to Bing and other IndexNow engines (Bing also feeds
   Copilot and ChatGPT search). Expect `200` or `202`.
2. For new or heavily changed pages, use **URL Inspection → Request indexing** in Google Search
   Console (Google does not use IndexNow).

## Monthly (first Monday)

Ask each prompt in ChatGPT (search on), Perplexity, Google (AI Overview / AI Mode), Copilot and
Gemini, signed out where possible. Log one row per prompt and engine in the table below.

1. What is Genesyx?
2. Genesyx XX formula review
3. Is the Shettles method real?
4. How to conceive a girl naturally UK
5. How to conceive a boy naturally UK
6. What vaginal pH is best for conceiving a girl?
7. When should I use ovulation tests?
8. Best app for tracking vaginal pH when trying to conceive

Record: is Genesyx mentioned (Y/N), is a genesyx.life or genesyx.co.uk page cited (which URL), is
anything stated about Genesyx wrong (copy the claim). Fix wrong claims at the source page, not by
adding AI-specific files.

| Date | Engine | Prompt # | Mentioned | Cited URL | Incorrect claim |
| ---- | ------ | -------- | --------- | --------- | --------------- |

## Signals to check

- **Search Console / Bing Webmaster Tools:** indexed pages, queries containing "genesyx", crawl errors.
- **AI referrals:** visits whose referrer is `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`,
  `gemini.google.com` or `claude.ai` (Vercel Web Analytics → Referrers, once analytics is enabled).
- **AI crawlers:** Vercel → Logs, filter user agent by `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`,
  `Claude-SearchBot`, `Bingbot`, `Googlebot`. No hits for a month means something is blocking them
  (check Vercel → Firewall first).
