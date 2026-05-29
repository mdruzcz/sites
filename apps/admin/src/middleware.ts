import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_PATHS = ["/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { response, user, supabase } = await updateSession(request);
  const path = request.nextUrl.pathname;

  // Static + public paths bypass auth
  if (
    PUBLIC_PATHS.some((p) => path.startsWith(p)) ||
    path.startsWith("/_next") ||
    path.startsWith("/favicon")
  ) {
    return response;
  }

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Must be present in ecom_admin_users to use the app at all.
  const { data: admin } = await supabase
    .from("ecom_admin_users")
    .select("auth_user_id, role")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (!admin) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "not_admin");
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
