// Astro.url.pathname includes ".html" when build.format is "file" (e.g. "/faq.html", "/index.html").
// Canonical URLs, breadcrumbs and link comparisons use the clean public path instead ("/faq", "/").
export const cleanPath = (pathname: string) =>
  pathname.replace(/\.html$/, "").replace(/\/index$/, "/") || "/";
