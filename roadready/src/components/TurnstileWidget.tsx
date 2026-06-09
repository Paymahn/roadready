"use client";

import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Shared invisible Turnstile widget for the enquiry forms. Centralises the site key + invisible
// config + the token plumbing. Renders nothing (and the route skips verification) when the site
// key isn't set, so the whole feature stays dark until the env vars are configured.
//
// Tokens are single-use: the parent remounts this via a changing `key` after each submit to get
// a fresh one. Invisible mode runs the challenge in the background — real users see nothing.
export default function TurnstileWidget({ onToken }: { onToken: (token: string | null) => void }) {
  if (!SITE_KEY) return null;
  return (
    <Turnstile
      siteKey={SITE_KEY}
      options={{ size: "invisible" }}
      onSuccess={(token) => onToken(token)}
      onExpire={() => onToken(null)}
      onError={() => onToken(null)}
    />
  );
}
