import { cookies } from "next/headers";
import { SESSION_COOKIE, createSession, sessionCookieOptions, safeEqual, adminEnabled } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!adminEnabled()) {
    return Response.json(
      { error: "The admin is not configured. Set ADMIN_PASSWORD and redeploy." },
      { status: 503 }
    );
  }

  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD!;

  if (!password || !safeEqual(password, expected)) {
    // One generic message: never confirm whether the password merely had the
    // wrong length, and slow brute force down a little.
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ error: "That password is not right." }, { status: 401 });
  }

  const session = await createSession();
  if (!session) {
    return Response.json({ error: "Session secret is not configured." }, { status: 503 });
  }

  (await cookies()).set(SESSION_COOKIE, session, sessionCookieOptions);
  return Response.json({ ok: true });
}
