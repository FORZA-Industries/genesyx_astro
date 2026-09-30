// Single source of truth for brand facts. Feeds the UI, JSON-LD and llms.txt.
// Only facts confirmed by the design or the business belong here; never add guesses.

export const site = {
  name: "Genesyx",
  tagline: "Try with intention.",
  description:
    "Genesyx is a 90-day XX / XY preconception programme inspired by the Shettles theory, combining a route-specific supplement formula, nutrition guide, at-home vaginal pH and ovulation tests, and a companion app.",
  shortDescription: "A considered 90-day preconception programme inspired by the Shettles theory.",
  // Home page <title> suffix: says what Genesyx is, so brand searches can tell it apart.
  titleDescriptor: "XX / XY preconception programme and companion app",
  // Confirmed by the business (Sept 2026): the operating company and the brand's other properties.
  legalName: "SF MEDIA & PR LTD",
  links: {
    appStore: "https://apps.apple.com/app/genesyx/id6787682466",
    shop: "https://genesyx.co.uk/",
  },
  // Contact email for the site, app and genesyx.co.uk (confirmed by the business, Sept 2026).
  email: "info@genesyx.co.uk",
  locale: "en_GB",
  lang: "en-GB",
  // Not yet confirmed: company number, address, service area, release date.
  // Add them here (and they flow into the footer, JSON-LD and llms.txt) once supplied.
  sameAs: ["https://genesyx.co.uk/", "https://apps.apple.com/app/genesyx/id6787682466"],
  disclaimer:
    "Evidence for the Shettles theory is mixed. Genesyx helps you follow the theory consistently; no outcome is guaranteed.",
} as const;

export const nav = [
  { href: "/#why", label: "Why Genesyx" },
  { href: "/#inside", label: "What's inside" },
  { href: "/#app", label: "The app" },
  { href: "/#questions", label: "Questions" },
] as const;

export const learnLinks = [
  { href: "/shettles-method", label: "The Shettles method" },
  { href: "/vaginal-ph", label: "Vaginal pH" },
  { href: "/ovulation-tests", label: "Ovulation tests" },
  { href: "/how-to-conceive-a-girl-or-boy", label: "Conceiving a girl or boy" },
  { href: "/xx", label: "XX programme" },
  { href: "/xy", label: "XY programme" },
  { href: "/evidence", label: "The evidence" },
  { href: "/faq", label: "FAQ" },
] as const;

export const companyLinks = [
  { href: "/about", label: "About Genesyx" },
  { href: "/contact", label: "Contact" },
] as const;

export type Path = "xx" | "xy";

export const paths: Record<Path, { label: string; hope: string; href: string }> = {
  xx: { label: "XX", hope: "a girl", href: "/xx" },
  xy: { label: "XY", hope: "a boy", href: "/xy" },
};

export const programme = [
  { n: "01", title: "Formula", detail: "Three monthly packs" },
  { n: "02", title: "Nutrition", detail: "Route-specific programme" },
  { n: "03", title: "Measure", detail: "pH + cycle tests" },
  { n: "04", title: "Companion app", detail: "pH · cycle · timing" },
] as const;

// Crawling and indexing are on by default. Set PUBLIC_INDEXABLE=false to hide a build (e.g. staging).
export const indexable = import.meta.env.PUBLIC_INDEXABLE !== "false";
