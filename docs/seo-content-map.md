# SEO content map

One row per public page. "Owner" is who signs off the copy; it is unassigned until Genesyx names someone.
Nothing here guarantees rankings or AI citations: it records what each page is for and what evidence it
still needs.

| URL                              | Audience & question                                                               | Unique answer on the page                                                                   | Evidence status                                                                                                                                  | Key internal links                                                 | Owner      |
| -------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------- |
| `/`                              | Couples curious about trying for a girl or boy: "What is Genesyx and can I join?" | What the 90-day programme includes, the XX/XY choice, the no-guarantee disclaimer, waitlist | Product details from the design; ingredients, price and release date **missing**                                                                 | `/xx`, `/xy`, `/faq`, guides                                       | Unassigned |
| `/xx`                            | Couples hoping for a girl: "What's in the XX programme?"                          | Programme contents and XX timing                                                            | Route plan, cycle timeline, 90-day expectations, 3 references; formula ingredients and authorised claims **missing**                             | `/how-to-conceive-a-girl-or-boy`, `/ovulation-tests`               | Unassigned |
| `/xy`                            | Couples hoping for a boy: "What's in the XY programme?"                           | Programme contents and XY timing                                                            | Route plan, cycle timeline, 90-day expectations, 3 references; formula ingredients and authorised claims **missing**                             | `/how-to-conceive-a-girl-or-boy`, `/ovulation-tests`               | Unassigned |
| `/how-to-conceive-a-girl-or-boy` | "Can you choose a girl or a boy naturally?"                                       | Side-by-side XX/XY comparison, honest evidence summary, safety notes                        | 9 references (Wilcox 1995, Gray 1998, France 1984, diet studies, HFEA, NHS); XX/XY nutrition differences **missing**; named reviewer **missing** | `/shettles-method`, `/vaginal-ph`, `/ovulation-tests`, `/evidence` | Unassigned |
| `/shettles-method`               | "What is the Shettles method?"                                                    | Origin, what it proposes, what research says                                                | 6 references incl. origin (Embryo Project), timing and sperm studies; reviewer **missing**                                                       | `/evidence`, `/vaginal-ph`                                         | Unassigned |
| `/vaginal-ph`                    | "What is vaginal pH and does it matter for conception?"                           | Healthy range, the theory, why never to douche                                              | O'Hanlon 2019, Rahman 2019, NHS cited; per-route use of readings **missing**; reviewer **missing**                                               | `/shettles-method`                                                 | Unassigned |
| `/ovulation-tests`               | "When should I use ovulation tests?"                                              | Fertile window, LH surge, cycle-length table                                                | Wilcox 1995, NHS, Tommy's, StatPearls cited; kit LH test details and reviewer **missing**                                                        | `/how-to-conceive-a-girl-or-boy`                                   | Unassigned |
| `/evidence`                      | "Does this actually work?"                                                        | What Genesyx does and doesn't claim                                                         | 8 studies with evidence-strength table; named advisor with credentials **missing** (highest-impact gap)                                          | guides                                                             | Unassigned |
| `/faq`                           | Pre-purchase questions                                                            | 12 direct answers                                                                           | 4 answers contain placeholders and are excluded from FAQ structured data until completed                                                         | related pages per answer                                           | Unassigned |
| `/about`                         | "Who is behind Genesyx?"                                                          | Company, what the programme is, honesty standard, review cadence                            | Company details as used for the app (confirm for site)                                                                                           | `/xx`, `/xy`, `/evidence`, `/contact`                              | Unassigned |
| `/contact`                       | "How do I reach Genesyx?"                                                         | Email, scope of help, GP signposting, company details                                       | Contact email confirmed for the app                                                                                                              | `/privacy`, `/ovulation-tests`                                     | Unassigned |
| `/privacy`                       | Legal                                                                             | Data collected by the waitlist                                                              | Contact email, storage region, retention and governing law **missing**                                                                           | —                                                                  | Unassigned |

## Business identity (keep consistent everywhere)

Confirmed: name **Genesyx**, tagline **Try with intention.**, a 90-day XX / XY preconception programme
inspired by the Shettles theory, pre-launch waitlist, canonical address **https://www.genesyx.life** (`genesyx.life` and `genesyx.pages.dev` should 301
to it).

Official profiles in `sameAs` (Organization JSON-LD): genesyx.co.uk, App Store, Google Play.

Not yet confirmed, so deliberately absent from the site, structured data and `llms.txt`: legal entity,
contact email, address or service area, release date, prices, founders, authors and advisors, social profiles.
Add them to `src/data/site.ts` once verified.

## Freshness and review cadence

A page's `updated` date (shown on the page and in `dateModified`) changes only when its content really
changes. Review on this schedule and bump `updated` only if something was revised:

| Page type                                                                                                     | Review every                                                 | Owner                                 |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------- |
| Guides (`/evidence`, `/shettles-method`, `/vaginal-ph`, `/ovulation-tests`, `/how-to-conceive-a-girl-or-boy`) | 90 days, or when NHS guidance or new research changes        | Unassigned (needs the named reviewer) |
| Programme pages (`/xx`, `/xy`) and home                                                                       | 90 days, and whenever the kit, price or release date changes | Unassigned                            |
| Legal and company (`/privacy`, `/about`, `/contact`)                                                          | 90 days                                                      | Unassigned                            |
| Facts that change fast (prices, release date, app availability)                                               | Monthly                                                      | Unassigned                            |

After each review, re-check every reference link still resolves and still says what we cite it for.

## AI crawler access

`robots.txt` allows all crawlers and names the AI search and training bots explicitly
(`src/pages/robots.txt.ts`). Vercel Firewall: Bot Protection off, AI Bots set to Allow, no custom
rules (checked 30 Sept 2026). If either is ever turned on, robots.txt stops mattering for AI visibility.
