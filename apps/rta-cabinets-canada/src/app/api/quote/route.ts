import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { Resend } from "resend";

export const runtime = "nodejs";

type QuoteItem = {
  id: string;
  name: string;
  qty: number;
  price: number | null;
  kind?: string;
};

const HOSTNAME = "rtacabinetscanada.ca";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, postal, notes, items, token, company } = body;

  // Honeypot
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify Turnstile token via shared Worker
  if (process.env.TURNSTILE_VERIFY_ENDPOINT && token) {
    try {
      const vr = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, hostname: HOSTNAME }),
      });
      const vj = await vr.json();
      if (!vj.success) {
        return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
      }
    } catch {
      // allow through if verifier unreachable
    }
  }

  const subtotal = items.reduce(
    (s: number, i: QuoteItem) => s + (i.price || 0) * i.qty,
    0
  );

  const supabase = createServerSupabase();
  if (supabase) {
    // Pre-generate the id so the parent insert doesn't need INSERT...RETURNING
    // (which would require an anon SELECT policy and expose customer PII).
    const reqId = crypto.randomUUID();
    const { error: reqErr } = await supabase
      .from("rtacabinets_quote_requests")
      .insert({
        id: reqId,
        name,
        email,
        phone: phone || null,
        postal_code: postal || null,
        notes: notes || null,
        subtotal_cad: subtotal,
      });
    if (reqErr) {
      // Don't 500 — fall through so the Resend email still captures the lead.
      console.error("Supabase quote error:", reqErr);
    } else {
      const itemRows = items.map((i: QuoteItem) => ({
        request_id: reqId,
        sku: i.id,
        name: i.name,
        qty: i.qty,
        unit_price_cad: i.price,
      }));
      const { error: itemErr } = await supabase
        .from("rtacabinets_quote_request_items")
        .insert(itemRows);
      if (itemErr) console.error("Supabase items error:", itemErr);
    }
  }

  // Email via Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      // Resend only has masterdecker.com verified — any other from-domain 403s silently.
      from: process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com",
      to: process.env.CONTACT_TO_EMAIL || "service@masterdecker.com",
      subject: `New RTA Cabinets Quote Request from ${name}`,
      html: `<h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Postal:</strong> ${postal || "-"}</p>
        <p><strong>Notes:</strong> ${notes || "-"}</p>
        <h3>Items</h3>
        <ul>${items
          .map(
            (i: QuoteItem) =>
              `<li>${i.qty}x ${i.name}${i.kind === "package" ? " (package)" : ""} — ${
                i.price ? "$" + (i.price * i.qty).toFixed(2) : "Quote on request"
              }</li>`
          )
          .join("")}</ul>
        <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>`,
    });
  }

  return NextResponse.json({ ok: true });
}
