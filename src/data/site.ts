// Single source of truth for brand facts. Feeds the UI, JSON-LD and llms.txt.
// Anything marked TODO is a placeholder awaiting confirmation from Genesyx.

export const site = {
  name: "Genesyx",
  tagline: "Try with intention.",
  description:
    "Genesyx is a 90-day XX / XY preconception programme inspired by the Shettles theory, combining a route-specific supplement formula, nutrition guide, at-home vaginal pH and ovulation tests, and a companion app.",
  shortDescription: "A considered 90-day preconception programme inspired by the Shettles theory.",
  locale: "en_GB",
  lang: "en-GB",
  // TODO: confirm registered company details.
  legalName: "Genesyx Ltd",
  email: "hello@genesyx.com",
  country: "GB",
  foundingYear: 2026,
  sameAs: [] as string[], // TODO: social profiles
  releaseWindow: "2027", // TODO: confirm first-release window
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
  { href: "/how-to-conceive-a-girl", label: "How to conceive a girl" },
  { href: "/how-to-conceive-a-boy", label: "How to conceive a boy" },
  { href: "/xx", label: "XX programme" },
  { href: "/xy", label: "XY programme" },
  { href: "/evidence", label: "The evidence" },
  { href: "/faq", label: "FAQ" },
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

export const indexable = import.meta.env.PUBLIC_INDEXABLE === "true";
