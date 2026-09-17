import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type QuoteItem = {
  id: string;
  name: string;
  qty: number;
  price: number | null;
  kind?: string;
};

const HOSTNAME = "rtacabinetscanada.ca";
const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const { name, email, phone, postal, notes, items, token, company } = body as {
    name?: string; email?: string; phone?: string; postal?: string; notes?: string;
    items?: QuoteItem[]; token?: string; company?: string;
  };

  // Honeypot
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify Turnstile token via the shared Worker. Only enforced when the widget
  // is configured for this deployment (NEXT_PUBLIC_TURNSTILE_SITE_KEY), so a
  // missing env var can never silently block every quote.
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    if (!token) {
      return NextResponse.json({ error: "Please complete the security check." }, { status: 400 });
    }
    try {
      const vr = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, hostname: HOSTNAME }),
      });
      const vj = (await vr.json()) as { success: boolean };
      if (!vj.success) {
        return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Security check unavailable. Please try again or call us." }, { status: 400 });
    }
  }

  const subtotal = items.reduce((s: number, i: QuoteItem) => s + (i.price || 0) * i.qty, 0);

  // Email is the critical path; the DB rows are the backup.
  let emailed = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          // Resend only has masterdecker.com verified — any other from-domain 403s silently.
          from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
          to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
          reply_to: email,
          subject: `New RTA Cabinets Quote Request from ${name}`,
          html: `<h2>New Quote Request — RTA Cabinets Canada</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>Phone:</strong> ${esc(phone || "-")}</p>
            <p><strong>Postal:</strong> ${esc(postal || "-")}</p>
            <p><strong>Notes:</strong> ${esc(notes || "-")}</p>
            <h3>Items</h3>
            <ul>${items
              .map(
                (i: QuoteItem) =>
                  `<li>${i.qty}x ${esc(i.name)}${i.kind === "package" ? " (package)" : ""} — ${
                    i.price ? "$" + (i.price * i.qty).toFixed(2) : "Quote on request"
                  }</li>`
              )
              .join("")}</ul>
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error:", r.status, await r.text());
    } catch (e) {
      console.error("Resend fetch failed:", e);
    }
  }

  let stored = false;
  const supabase = createServerSupabase();
  if (supabase) {
    // Pre-generate the id so the parent insert doesn't need INSERT...RETURNING
    // (which would require an anon SELECT policy and expose customer PII).
    const reqId = crypto.randomUUID();
    const { error: reqErr } = await supabase.from("rtacabinets_quote_requests").insert({
      id: reqId,
      name,
      email,
      phone: phone || null,
      postal_code: postal || null,
      notes: notes || null,
      subtotal_cad: subtotal,
    });
    if (reqErr) {
      console.error("Supabase quote error:", reqErr);
    } else {
      stored = true;
      const itemRows = items.map((i: QuoteItem) => ({
        request_id: reqId,
        sku: i.id,
        name: i.name,
        qty: i.qty,
        unit_price_cad: i.price,
      }));
      const { error: itemErr } = await supabase.from("rtacabinets_quote_request_items").insert(itemRows);
      if (itemErr) console.error("Supabase items error:", itemErr);
    }
  }

  if (!emailed && !stored) {
    return NextResponse.json({ error: "We couldn't send your request. Please call us." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, emailed, stored });
}
