import { signInOwner } from "@/lib/owner-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = (await req.json().catch(() => ({}))) as Record<string, string>;
  if (!email || !password) {
    return Response.json({ error: "Enter your email and password." }, { status: 400 });
  }

  const session = await signInOwner(String(email).trim().toLowerCase(), String(password));
  if (!session) {
    // One message for both "no such account" and "wrong password" — confirming
    // which would tell an attacker whose email is registered here.
    await new Promise((r) => setTimeout(r, 500));
    return Response.json({ error: "That email and password do not match." }, { status: 401 });
  }
  return Response.json({ ok: true });
}
