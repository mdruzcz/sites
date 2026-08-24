import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

/**
 * Gate everything under /admin. (Next 16 renamed this convention from
 * `middleware` to `proxy`; same runtime, same matcher.) The login page and the login endpoint have to
 * stay reachable or there is no way in.
 */
export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const ok = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next();

  // API callers get a status code; humans get the login form.
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
