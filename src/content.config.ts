import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const faq = defineCollection({
  loader: file("src/content/faq.yaml"),
  schema: z.object({
    order: z.number(),
    question: z.string(),
    answer: z.string(),
    // Shown in the landing-page accordion (the rest live on /faq).
    featured: z.boolean().default(false),
    related: z.string().optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/guides" }),
  schema: z.object({
    title: z.string(),
    // Used for <meta name="description"> and llms.txt link notes.
    description: z.string(),
    eyebrow: z.string(),
    // One-paragraph answer shown at the top of the page for readers and AI engines.
    summary: z.string(),
    path: z.enum(["xx", "xy"]).optional(),
    // "page" for programme pages (WebPage schema); "article" for editorial guides.
    type: z.enum(["article", "page"]).default("article"),
    order: z.number(),
    // First publication date (Article datePublished). `updated` changes on every real revision.
    published: z.coerce.date().optional(),
    updated: z.coerce.date(),
    // Flip to true once copy has been reviewed for accuracy and compliant claims.
    reviewed: z.boolean().default(false),
  }),
});

export const collections = { faq, guides };
