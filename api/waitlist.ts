// Vercel Function: POST /api/waitlist
// Adds a waitlist sign-up to Resend as a contact in the XX or XY segment.
// The Resend API key never reaches the browser: it lives in Vercel env vars only.
//
// Required env vars (Vercel → Settings → Environment Variables, Production + Preview):
//   RESEND_API_KEY      a Resend API key with "Full access" (contacts need it)
//   RESEND_SEGMENT_XX   Resend segment id for the XX (girl) list
//   RESEND_SEGMENT_XY   Resend segment id for the XY (boy) list

const RESEND = "https://api.resend.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only accept posts from our own pages (production, Vercel previews, local dev).
const allowedOrigin = (origin: string | null) => {
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return (
      host === "www.genesyx.life" ||
      host === "genesyx.life" ||
      // Vercel previews of this project only (e.g. genesyx-astro-git-<branch>-<team>.vercel.app).
      (host.startsWith("genesyx-astro") && host.endsWith(".vercel.app")) ||
      host === "localhost"
    );
  } catch {
    return false;
  }
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

async function resend(path: string, key: string, body?: unknown) {
  return fetch(`${RESEND}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export async function POST(request: Request): Promise<Response> {
  if (!allowedOrigin(request.headers.get("origin"))) {
    return json(403, { ok: false, error: "forbidden" });
  }

  let input: { email?: unknown; path?: unknown; company?: unknown };
  try {
    input = await request.json();
  } catch {
    return json(400, { ok: false, error: "bad_request" });
  }

  // Honeypot filled in = bot. Pretend success so it doesn't retry.
  if (typeof input.company === "string" && input.company.trim() !== "") {
    return json(200, { ok: true });
  }

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const path = input.path;
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json(422, { ok: false, error: "invalid_email" });
  }
  if (path !== "xx" && path !== "xy") {
    return json(422, { ok: false, error: "invalid_path" });
  }

  const key = process.env.RESEND_API_KEY;
  const segmentId = path === "xx" ? process.env.RESEND_SEGMENT_XX : process.env.RESEND_SEGMENT_XY;
  if (!key || !segmentId) {
    console.error("[waitlist] RESEND_API_KEY or RESEND_SEGMENT_XX/XY not set.");
    return json(503, { ok: false, error: "not_configured" });
  }

  try {
    // 1) New contact: create it straight into the right segment.
    const created = await resend("/contacts", key, {
      email,
      unsubscribed: false,
      segments: [{ id: segmentId }],
    });
    if (created.ok) return json(200, { ok: true });
    if (created.status === 429 || created.status >= 500) {
      console.error("[waitlist] Resend create failed", created.status, await created.text());
      return json(502, { ok: false, error: "upstream" });
    }

    // 2) Most likely the contact already exists: add it to this segment instead.
    const added = await resend(
      `/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`,
      key,
    );
    if (added.ok || added.status === 409) return json(200, { ok: true });

    console.error(
      "[waitlist] Resend add-to-segment failed",
      created.status,
      added.status,
      await added.text(),
    );
    return json(502, { ok: false, error: "upstream" });
  } catch (err) {
    console.error("[waitlist] Resend request error", err);
    return json(502, { ok: false, error: "upstream" });
  }
}
