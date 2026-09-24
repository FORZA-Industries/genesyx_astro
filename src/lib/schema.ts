import { site } from "@/data/site";

type Thing = Record<string, unknown>;

export const abs = (path: string, base: URL | string) => new URL(path, base).toString();

export function organization(base: URL | string): Thing {
  return {
    "@type": "Organization",
    "@id": abs("/#organization", base),
    name: site.name,
    legalName: site.legalName,
    url: abs("/", base),
    logo: abs("/brand/wordmark.png", base),
    email: site.email,
    foundingDate: String(site.foundingYear),
    description: site.description,
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function website(base: URL | string): Thing {
  return {
    "@type": "WebSite",
    "@id": abs("/#website", base),
    url: abs("/", base),
    name: site.name,
    description: site.shortDescription,
    inLanguage: site.lang,
    publisher: { "@id": abs("/#organization", base) },
  };
}

export function faqPage(items: { question: string; answer: string }[]): Thing {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function breadcrumbs(items: { name: string; path: string }[], base: URL | string): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      item: abs(i.path, base),
    })),
  };
}

export function article(
  data: { title: string; description: string; updated: Date; path: string },
  base: URL | string,
): Thing {
  return {
    "@type": "Article",
    headline: data.title,
    description: data.description,
    dateModified: data.updated.toISOString(),
    inLanguage: site.lang,
    mainEntityOfPage: abs(data.path, base),
    author: { "@id": abs("/#organization", base) },
    publisher: { "@id": abs("/#organization", base) },
    about: { "@type": "Thing", name: "Shettles method" },
  };
}

export const graph = (...nodes: Thing[]) => ({ "@context": "https://schema.org", "@graph": nodes });
