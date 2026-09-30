import { getCollection } from "astro:content";
import { site } from "@/data/site";

// Builds /llms.txt per https://llmstxt.org: H1, blockquote summary, then H2 link lists.
// A convenience index only; the HTML pages, sitemap and structured data remain the source of truth.
export async function buildLlms(base: URL): Promise<string> {
  const url = (p: string) => new URL(p, base).toString();
  const guides = (await getCollection("guides")).sort((a, b) => a.data.order - b.data.order);
  const [programmes, articles] = [
    guides.filter((g) => g.data.type === "page"),
    guides.filter((g) => g.data.type === "article"),
  ];
  const link = (g: (typeof guides)[number]) =>
    `- [${g.data.title}](${url(`/${g.id}`)}): ${g.data.description}`;

  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "- Two routes: XX (for couples hoping for a girl) and XY (for couples hoping for a boy).",
    `- ${site.disclaimer}`,
    "- Genesyx is not a medical device or fertility treatment.",
    `- Pre-launch: people can join the first-release waitlist at ${url("/#join")}.`,
    "",
    "## Programme",
    "",
    `- [Genesyx home](${url("/")}): What the 90-day programme includes and how to join the waitlist.`,
    ...programmes.map(link),
    "",
    "## Guides",
    "",
    ...articles.map(link),
    "",
    "## FAQ",
    "",
    `- [Frequently asked questions](${url("/faq")}): What Genesyx is, what it can and cannot promise, and how the programme works.`,
    "",
    "## Official Genesyx properties",
    "",
    `- [Genesyx website](${url("/")}): This site, the programme and guides.`,
    `- [Genesyx for iPhone](${site.links.appStore}): The Genesyx companion app on the App Store.`,
    `- [Genesyx shop](${site.links.shop}): The Genesyx online shop.`,
    `- Genesyx is operated by ${site.legalName}.`,
    "",
  ].join("\n");
}
