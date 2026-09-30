import type { Path } from "@/data/site";

export interface WaitlistResult {
  ok: boolean;
  message: string;
}

// Posts to the /api/waitlist Vercel Function, which adds the contact to the matching Resend
// segment. The Resend key stays server-side; the browser only ever talks to our own origin.
export async function submitWaitlist(input: {
  email: string;
  path: Path;
  company?: string;
}): Promise<WaitlistResult> {
  const label = input.path.toUpperCase();

  // `astro dev` doesn't run Vercel Functions, so local development shows a clearly-labelled
  // preview message. Production builds never claim success unless the function confirms it.
  if (import.meta.env.DEV) {
    console.warn("[waitlist] Dev mode: /api/waitlist not running; submission not stored.", input);
    return { ok: true, message: `Preview mode: you'd now be on the ${label} list.` };
  }

  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (res.ok) {
      return {
        ok: true,
        message: `You're on the ${label} list. We'll be in touch before release.`,
      };
    }
    if (res.status === 422) {
      return { ok: false, message: "Please check your email address and try again." };
    }
    if (res.status === 503 || res.status === 404) {
      // Function missing or not configured yet: be honest rather than fake success.
      return { ok: false, message: "Sign-ups aren't open just yet. Please check back soon." };
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error("[waitlist]", err);
    return { ok: false, message: "Something went wrong. Please try again in a moment." };
  }
}
