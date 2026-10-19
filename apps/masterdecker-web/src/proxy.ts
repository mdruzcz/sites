import { NextResponse, type NextRequest } from "next/server";

/**
 * Client pages get read out over the phone and typed with capitals
 * ("masterdecker.com/Jestr"). Paths are case-sensitive on Vercel and a
 * redirect rule matches case-insensitively (so /Jestr -> /jestr would loop),
 * so the lowercasing happens here, only for these pages.
 */
const CLIENT_PAGES = new Set(["/jestr", "/rotaryclub"]);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const lower = pathname.toLowerCase();
  if (lower !== pathname && CLIENT_PAGES.has(lower)) {
    const url = req.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/Jestr", "/JESTR", "/JEStr", "/RotaryClub", "/Rotaryclub", "/ROTARYCLUB", "/((?!_next|images|api|.*\\..*).*[A-Z].*)"] };
