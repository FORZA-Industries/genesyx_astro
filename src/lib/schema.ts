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
    logo: abs("/brand/icon-512.png", base),
    description: site.description,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      availableLanguage: "en-GB",
    },
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

export function mobileApplication(base: URL | string): Thing {
  return {
    "@type": "MobileApplication",
    "@id": abs("/#app", base),
    name: site.name,
    url: site.links.appStore,
    operatingSystem: "iOS 16.0 or later",
    applicationCategory: "HealthApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
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
  data: { title: string; description: string; updated: Date; published?: Date; path: string },
  base: URL | string,
): Thing {
  return {
    "@type": "Article",
    headline: data.title,
    description: data.description,
    ...(data.published ? { datePublished: data.published.toISOString() } : {}),
    dateModified: data.updated.toISOString(),
    image: abs("/og.png", base),
    inLanguage: site.lang,
    mainEntityOfPage: abs(data.path, base),
    isPartOf: { "@id": abs("/#website", base) },
    author: { "@id": abs("/#organization", base) },
    publisher: { "@id": abs("/#organization", base) },
  };
}

export function webPage(
  data: { title: string; description: string; updated: Date; path: string },
  base: URL | string,
): Thing {
  return {
    "@type": "WebPage",
    "@id": abs(data.path, base),
    url: abs(data.path, base),
    name: data.title,
    description: data.description,
    dateModified: data.updated.toISOString(),
    inLanguage: site.lang,
    isPartOf: { "@id": abs("/#website", base) },
  };
}

export const graph = (...nodes: Thing[]) => ({ "@context": "https://schema.org", "@graph": nodes });
