# Genesyx marketing site

Astro 7 + Tailwind v4 static site for the Genesyx XX / XY waitlist launch. Lives alongside the
companion-app prototype in the repo root and shares its brand palette.

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + static build to dist/
npm run format
```

## Where things live

| What | Where |
| --- | --- |
| Brand facts (name, description, release window, disclaimer) | `src/data/site.ts` |
| FAQ (landing accordion, `/faq`, FAQPage JSON-LD, llms-full.txt) | `src/content/faq.yaml` |
| Guides (`/shettles-method`, `/vaginal-ph`, `/xx`, `/xy`, `/evidence`) | `src/content/guides/*.md` |
| Landing sections | `src/components/sections/*` |
| JSON-LD builders | `src/lib/schema.ts` |
| `llms.txt` / `llms-full.txt` generator | `src/lib/llms.ts` |
| Waitlist client (Supabase REST) | `src/lib/waitlist.ts` |
| Waitlist table + RLS | `supabase/migrations/*.sql` |

Content is written once and reused by the page, the structured data and `llms.txt`, so they can't drift.
`[PLACEHOLDER: …]` markers are visible on the page (so they get reviewed) but stripped from machine
outputs.

## Environment

Copy `.env.example` to `.env`.

- `SITE_URL`: canonical origin. Drives canonical tags, sitemap, JSON-LD and `llms.txt`.
- `PUBLIC_INDEXABLE`: **leave `false` until copy is final.** When false, every page is `noindex` and
  `robots.txt` disallows all crawlers. Set to `true` on launch to allow Google and the named AI crawlers.
- `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY`: without these, the form runs in preview mode
  and stores nothing.

## Supabase

Apply `supabase/migrations/20260924000000_create_waitlist.sql`. The anon/publishable key can only
`INSERT` into `public.waitlist`; nobody can read the list with it. Duplicate sign-ups (same email +
route) return 409, which the form treats as success.

## Deploying to Cloudflare

Workers static assets via `wrangler.jsonc` (`npx wrangler deploy` after `npm run build`), or
Cloudflare Pages with root directory `site`, build command `npm run build`, output `dist`. Set the
env vars above in the Cloudflare dashboard. `public/_headers` sets security and cache headers.

## Before launch

- [ ] Replace every `[PLACEHOLDER: …]` and set `reviewed: true` in each guide's frontmatter
- [ ] Claims reviewed against the GB nutrition and health claims register / ASA CAP Code
- [ ] Named advisor and references on `/evidence`
- [ ] Real privacy policy
- [ ] Final domain in `SITE_URL`, `PUBLIC_INDEXABLE=true`
- [ ] Submit sitemap in Google Search Console
