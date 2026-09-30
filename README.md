# Genesyx marketing site

Astro 7 + Tailwind v4 static site for the Genesyx XX / XY waitlist launch. Shares its brand palette
with the Genesyx companion app.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + static build to dist/
npm run format
```

## Where things live

| What                                                                  | Where                       |
| --------------------------------------------------------------------- | --------------------------- |
| Brand facts (name, description, release window, disclaimer)           | `src/data/site.ts`          |
| FAQ (landing accordion, `/faq`, FAQPage JSON-LD)                      | `src/content/faq.yaml`      |
| Guides (`/shettles-method`, `/vaginal-ph`, `/xx`, `/xy`, `/evidence`) | `src/content/guides/*.md`   |
| Landing sections                                                      | `src/components/sections/*` |
| JSON-LD builders                                                      | `src/lib/schema.ts`         |
| `llms.txt` generator                                                  | `src/lib/llms.ts`           |
| Waitlist client (Supabase REST)                                       | `src/lib/waitlist.ts`       |
| Waitlist table + RLS                                                  | `supabase/migrations/*.sql` |

Content is written once and reused by the page, the structured data and `llms.txt`, so they can't drift.
`[PLACEHOLDER: …]` markers are visible on the page (so they get reviewed). FAQ answers that still contain
one are left out of the FAQPage structured data, which must match visible text exactly.

## Environment

Copy `.env.example` to `.env`.

- `SITE_URL`: canonical origin. Drives canonical tags, sitemap, JSON-LD and `llms.txt`.
- `PUBLIC_INDEXABLE`: crawling is **on by default**. Set to `false` (e.g. on a staging project) to make
  every page `noindex` and have `robots.txt` disallow all crawlers.
- `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY`: without these, the form runs in preview mode
  and stores nothing.

## Supabase

Apply `supabase/migrations/20260924000000_create_waitlist.sql`. The anon/publishable key can only
`INSERT` into `public.waitlist`; nobody can read the list with it. Duplicate sign-ups (same email +
route) return 409, which the form treats as success.

## Hosting

Hosted on **Vercel** (project `genesyx-astro`); DNS for `genesyx.life` is at **ICUK**.

- Merging to `main` deploys production; every PR gets a preview URL.
- `vercel.json` sets the build, clean URLs (`/faq` serves `faq.html`), security/cache headers and
  redirects for retired URLs.
- Domains: `www.genesyx.life` is primary; `genesyx.life` redirects to it (Vercel → Settings → Domains).
- ICUK DNS: `www` CNAME to the Vercel value shown in the dashboard, `@` A `76.76.21.21`. Leave the MX,
  SPF and Bing verification records alone.
- Env vars live in Vercel → Settings → Environment Variables. Changing them needs a redeploy.

## Before launch

- [ ] Replace every `[PLACEHOLDER: …]` and set `reviewed: true` in each guide's frontmatter
- [ ] Claims reviewed against the GB nutrition and health claims register / ASA CAP Code
- [ ] Named advisor and references on `/evidence`
- [ ] Real privacy policy
- [x] Final domain: `https://www.genesyx.life`
- [ ] Submit sitemap in Google Search Console
