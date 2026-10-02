// Links from genesyx.life to the shop on genesyx.co.uk carry UTM tags, so Shopify analytics
// can attribute visits and sales to the page and placement they came from.

// "/" -> "home", "/vaginal-ph" -> "vaginal-ph"
export const campaignFor = (pathname: string) => pathname.replace(/^\/+|\/+$/g, "") || "home";

export const shopUrl = (url: string, campaign: string, placement: string) => {
  const u = new URL(url);
  u.searchParams.set("utm_source", "genesyx.life");
  u.searchParams.set("utm_medium", "referral");
  u.searchParams.set("utm_campaign", campaign);
  u.searchParams.set("utm_content", placement);
  return u.toString();
};
