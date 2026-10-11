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
| `/about`                         | "Who is behind Genesyx?"                                                          | Company, what the programme is, honesty standard, review cadence                            | Company (SF MEDIA & PR LTD, UK) and email confirmed                                                                                              | `/xx`, `/xy`, `/evidence`, `/contact`                              | Unassigned |
| `/contact`                       | "How do I reach Genesyx?"                                                         | Email, scope of help, GP signposting, company details                                       | Contact email confirmed for the site                                                                                                             | `/privacy`, `/ovulation-tests`                                     | Unassigned |
| `/privacy`                       | Legal                                                                             | Data collected by the waitlist                                                              | Contact email, storage region, retention and governing law **missing**                                                                           | —                                                                  | Unassigned |

## Business identity (keep consistent everywhere)

Confirmed: name **Genesyx**, tagline **Try with intention.**, a 90-day XX / XY preconception programme
inspired by the Shettles theory, pre-launch waitlist, canonical address **https://www.genesyx.life** (`genesyx.life` 308-redirects to it; hosted on Vercel).

Official profiles in `sameAs` (Organization JSON-LD): genesyx.co.uk (Shopify shop) and the App Store.
There is no Google Play app.

Confirmed: contact email info@genesyx.co.uk; products XX Formula and XY Formula, sold (with prices and
Product structured data) on genesyx.co.uk.

**Open conflict:** genesyx.life and the App Store name SF MEDIA & PR LTD as operator; genesyx.co.uk's
structured data names Genesyx Ltd (Companies House 16913651, Ashford, Kent). Settle which entity
operates which property before adding a company number or address here.

Not yet confirmed, so deliberately absent: release date, founders, authors and medical reviewer,
social profiles.
