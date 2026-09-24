import type { Path } from "@/data/site";

export interface WaitlistResult {
  ok: boolean;
  message: string;
}

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

// Talks to Supabase PostgREST directly instead of bundling supabase-js (~40 kB) for one insert.
// The anon key is public by design; RLS only allows INSERT into public.waitlist.
export async function submitWaitlist(input: {
  email: string;
  path: Path;
}): Promise<WaitlistResult> {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  const label = input.path.toUpperCase();

  if (!url || !key) {
    console.warn("[waitlist] Supabase env vars missing; submission not stored.", input);
    return { ok: true, message: `Preview mode: you'd now be on the ${label} list.` };
  }

  const params = new URLSearchParams(location.search);
  const utm = Object.fromEntries(utmKeys.map((k) => [k, params.get(k)]).filter(([, v]) => v));

  try {
    const res = await fetch(`${url}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: key,
        // Legacy anon keys are JWTs and also go in Authorization; new sb_publishable_ keys must not.
        ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: input.email.toLowerCase(),
        path: input.path,
        source_page: location.pathname,
        referrer: document.referrer || null,
        utm,
        consent_text: "launch-emails-v1",
      }),
    });

    // 409 = unique violation: already signed up. Treat as success to avoid leaking membership.
    if (res.ok || res.status === 409) {
      return {
        ok: true,
        message: `You're on the ${label} list. We'll be in touch before release.`,
      };
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error("[waitlist]", err);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }
}
