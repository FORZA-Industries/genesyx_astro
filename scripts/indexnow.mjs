// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver).
// Run after a production deploy: `npm run indexnow`. Google does not use IndexNow.
import { readdirSync } from "node:fs";

const site = process.env.SITE_URL ?? "https://www.genesyx.life";
const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) =>
  /^[0-9a-f]{32}\.txt$/.test(f),
);
if (!keyFile) throw new Error("IndexNow key file missing from public/");
const key = keyFile.replace(/\.txt$/, "");

const locs = async (url) => {
  const xml = await (await fetch(url)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
};

const urlList = [];
for (const sitemap of await locs(`${site}/sitemap-index.xml`))
  urlList.push(...(await locs(sitemap)));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(site).host,
    key,
    keyLocation: `${site}/${keyFile}`,
    urlList,
  }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok) process.exit(1);
