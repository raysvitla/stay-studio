// Stay Studio — NextAuth route
// Gated behind AUTH_ENABLED so dev still works without Google creds set up.
//
// In production:
//   1. Create a Google Cloud OAuth client (web, internal consent).
//   2. Restrict consent screen to the stayinsured.de organisation.
//   3. Set AUTH_ENABLED=true, GOOGLE_CLIENT_ID / _SECRET, NEXTAUTH_URL,
//      NEXTAUTH_SECRET in the deployment env.

import type { NextRequest } from "next/server";

const AUTH_ENABLED = process.env.AUTH_ENABLED === "true";

async function handler(req: NextRequest) {
  if (!AUTH_ENABLED) {
    return new Response(
      JSON.stringify({
        error: "auth_disabled",
        message: "AUTH_ENABLED=false. Set env vars and flip this on to enable Google SSO.",
      }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  // Lazy-import so missing deps don't crash dev when auth is disabled.
  const { default: NextAuth } = await import("next-auth");
  const { default: Google } = await import("next-auth/providers/google");

  const allowedDomains = (process.env.ALLOWED_EMAIL_DOMAINS ?? "stayinsured.de")
    .split(",")
    .map((d) => d.trim().toLowerCase());

  const { handlers } = NextAuth({
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
    ],
    callbacks: {
      async signIn({ profile }) {
        const email = profile?.email?.toLowerCase() ?? "";
        const domain = email.split("@")[1];
        return allowedDomains.includes(domain);
      },
    },
  });

  const url = new URL(req.url);
  const action = url.pathname.split("/").pop() ?? "";
  if (req.method === "GET") return handlers.GET(req);
  if (req.method === "POST") return handlers.POST(req);
  return new Response(`Method ${req.method} not allowed on ${action}`, { status: 405 });
}

export const GET = handler;
export const POST = handler;
