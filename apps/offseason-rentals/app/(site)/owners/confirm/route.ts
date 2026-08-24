import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { setOwnerCookies, ensureOwnerProfile } from "@/lib/owner-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Where the confirmation email lands.
 *
 * Supabase sends one of two shapes depending on the project's flow: a PKCE
 * `?code=` to exchange, or a `?token_hash=&type=` to verify. Both are handled,
 * and if neither is present — which happens when the redirect target is not on
 * the project's allow list and Supabase falls back to its own site_url — the
 * visitor is simply sent to the login page, where signing in works normally
 * because the confirmation itself already succeeded.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    { auth: { persistSession: false, autoRefreshToken: false, flowType: "pkce" } }
  );

  try {
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.session && data.user) {
        await setOwnerCookies(data.session.access_token, data.session.refresh_token);
        await ensureOwnerProfile(data.user.id, data.user.email ?? "");
        return NextResponse.redirect(new URL("/owners/dashboard", url.origin));
      }
    } else if (tokenHash && type) {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: type as "signup" | "email" | "recovery" | "magiclink"
      });
      if (!error && data.session && data.user) {
        await setOwnerCookies(data.session.access_token, data.session.refresh_token);
        await ensureOwnerProfile(data.user.id, data.user.email ?? "");
        return NextResponse.redirect(new URL("/owners/dashboard", url.origin));
      }
    }
  } catch (err) {
    console.error("Owner confirmation failed:", err);
  }

  return NextResponse.redirect(new URL("/owners/login?confirmed=1", url.origin));
}
