import type { APIRoute } from "astro";
import { buildLlms } from "@/lib/llms";

export const GET: APIRoute = async ({ site, url }) =>
  new Response(await buildLlms(site ?? url, false), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
