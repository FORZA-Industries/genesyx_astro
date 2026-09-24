import { getCollection } from "astro:content";
import { site } from "@/data/site";
import { cleanForMachines } from "./text";

// Builds llms.txt per https://llmstxt.org: H1, blockquote summary, then H2 link lists.
export async function buildLlms(base: URL, full: boolean): Promise<string> {
  const url = (p: string) => new URL(p, base).toString();
  const guides = (await getCollection("guides")).sort((a, b) => a.data.order - b.data.order);
  const faqs = (await getCollection("faq")).sort((a, b) => a.data.order - b.data.order);

  const out: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Key facts:",
    "",
    "- Genesyx offers two routes: XX (for couples hoping for a girl) and XY (for couples hoping for a boy).",
    "- Each 90-day programme includes three monthly packs of the XX or XY Formula, a route-specific nutrition programme, vaginal pH test strips, ovulation and pregnancy tests, and the Genesyx companion app for pH, cycle and timing.",
    "- Genesyx does not guarantee the sex of a baby. Evidence for the Shettles theory is mixed.",
    "- Genesyx is not a medical device or fertility treatment, and never recommends douching.",
    `- Status: pre-launch, first release planned for ${site.releaseWindow}; join the waitlist at ${url("/#join")}.`,
    `- Based in the United Kingdom. Contact: ${site.email}.`,
    "",
  ];

  if (!full) {
    out.push("## Guides", "");
    for (const g of guides)
      out.push(`- [${g.data.title}](${url(`/${g.id}`)}): ${g.data.description}`);
    out.push(
      "",
      "## FAQ",
      "",
      `- [Frequently asked questions](${url("/faq")}): ${faqs.length} answers about Genesyx and the Shettles method.`,
    );
    out.push(
      "",
      "## Optional",
      "",
      `- [Full text for LLMs](${url("/llms-full.txt")}): every guide and FAQ answer in one file.`,
    );
    out.push(`- [Privacy policy](${url("/privacy")})`);
    return out.join("\n") + "\n";
  }

  for (const g of guides) {
    out.push(
      `## ${g.data.title}`,
      "",
      `Source: ${url(`/${g.id}`)}`,
      "",
      cleanForMachines(g.data.summary),
      "",
      cleanForMachines(g.body ?? ""),
      "",
    );
  }
  out.push("## Frequently asked questions", "", `Source: ${url("/faq")}`, "");
  for (const f of faqs) out.push(`### ${f.data.question}`, "", cleanForMachines(f.data.answer), "");
  return out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}
