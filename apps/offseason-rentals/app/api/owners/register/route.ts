import { signUpOwner } from "@/lib/owner-auth";
import { sendLeadEmail, sendSms } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ error: "Passwords need to be at least 8 characters." }, { status: 400 });
  }

  const result = await signUpOwner(email, password, name, phone);
  if (result.error) {
    // Supabase says "User already registered" — pass that through, since the
    // person is trying to make an account and needs to know to sign in instead.
    return Response.json({ error: result.error }, { status: 400 });
  }

  await sendLeadEmail(
    `New owner account — ${name} | Off Season Rentals`,
    "Someone registered an owner account",
    [["Name", name], ["Email", email], ["Phone", phone || "—"]],
    email
  );
  await sendSms(`Off Season Rentals: new owner account — ${name}, ${email}${phone ? `, ${phone}` : ""}`);

  return Response.json({ ok: true, needsConfirmation: result.needsConfirmation });
}
