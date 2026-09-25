import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

type QuoteItem = {
  id: string;
  name: string;
  qty: number;
  price: number | null;
  list_price?: number | null;
  sale_label?: string | null;
  kind?: string;
};

type Assembly = { units: number; rate: number; total: number };

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
  const { name, email, phone, postal, notes, items, token, company, design: rawDesign, assembly: rawAssembly, financing } = body as {
    name?: string; email?: string; phone?: string; postal?: string; notes?: string;
    items?: QuoteItem[]; token?: string; company?: string;
    design?: { name?: string; link?: string; summary?: string; notes?: string[] };
    assembly?: Assembly | null; financing?: boolean;
  };
  // Kitchen Planner design attached from the planner (optional)
  const design =
    rawDesign && typeof rawDesign.link === "string" && /^https?:\/\//.test(rawDesign.link)
      ? {
          name: String(rawDesign.name ?? "My kitchen").slice(0, 80),
          link: rawDesign.link.slice(0, 6000),
          summary: String(rawDesign.summary ?? "").slice(0, 1000),
          notes: Array.isArray(rawDesign.notes) ? rawDesign.notes.map((n) => String(n).slice(0, 500)).slice(0, 50) : [],
        }
      : null;
  const designText = design
    ? [`Kitchen planner design: ${design.name}`, `Open: ${design.link}`, design.summary, ...(design.notes.length ? ["Design notes:", ...design.notes.map((n) => `- ${n}`)] : [])].join("\n")
    : "";
  // Options ticked on the form (server recomputes the assembly total from units × rate)
  const assembly: Assembly | null =
    rawAssembly && Number.isFinite(Number(rawAssembly.units)) && Number(rawAssembly.units) > 0
      ? { units: Math.min(500, Math.round(Number(rawAssembly.units))), rate: 75, total: Math.min(500, Math.round(Number(rawAssembly.units))) * 75 }
      : null;
  const wantsFinancing = financing === true;
  const optionsText = [assembly ? `Expert assembly requested: ${assembly.units} cabinet(s) × $${assembly.rate} = $${assembly.total.toFixed(2)}` : "", wantsFinancing ? "Customer asked for 0% APR financing details." : ""].filter(Boolean).join("\n");
  const notesForDb = [notes?.trim(), optionsText, designText].filter(Boolean).join("\n\n") || null;

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
  const listSubtotal = items.reduce((s: number, i: QuoteItem) => s + (i.list_price ?? i.price ?? 0) * i.qty, 0);
  const saved = Math.max(0, Math.round((listSubtotal - subtotal) * 100) / 100);
  const anySale = items.some((i) => i.list_price != null && i.price != null && i.list_price > i.price);

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
          subject: `New RTA Cabinets Quote Request from ${name}${design ? " (with kitchen design)" : ""}${assembly ? " + assembly" : ""}${wantsFinancing ? " + financing" : ""}`,
          html: `<h2>New Quote Request — RTA Cabinets Canada</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>Phone:</strong> ${esc(phone || "-")}</p>
            <p><strong>Postal:</strong> ${esc(postal || "-")}</p>
            <p><strong>Notes:</strong> ${esc(notes || "-")}</p>
            ${assembly ? `<p style="padding:8px;background:#fff7ed;border:1px solid #fdba74;"><strong>Expert assembly requested:</strong> ${assembly.units} cabinet(s) × $${assembly.rate} = <strong>$${assembly.total.toFixed(2)}</strong></p>` : ""}
            ${wantsFinancing ? `<p style="padding:8px;background:#eff6ff;border:1px solid #93c5fd;"><strong>Customer asked for 0% APR financing details.</strong></p>` : ""}
            ${
              design
                ? `<div style="margin:16px 0;padding:12px;border:1px solid #c2410c;background:#fbeae0;">
              <p style="margin:0 0 4px 0;"><strong>Kitchen planner design attached:</strong> ${esc(design.name)}</p>
              <p style="margin:0 0 4px 0;font-size:13px;">${esc(design.summary)}</p>
              <p style="margin:0;"><a href="${esc(design.link)}">Open the design in the planner</a></p>
              ${design.notes.length ? `<p style="margin:8px 0 0 0;font-size:13px;"><strong>Design notes:</strong></p><ul style="margin:4px 0 0 0;padding-left:18px;font-size:13px;">${design.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
            </div>`
                : ""
            }
            <h3>Items</h3>
            <ul>${items
              .map(
                (i: QuoteItem) =>
                  `<li>${i.qty}x ${esc(i.name)}${i.kind === "package" ? " (package)" : ""} — ${
                    i.price ? "$" + (i.price * i.qty).toFixed(2) : "Quote on request"
                  }${i.list_price != null && i.price != null && i.list_price > i.price ? ` <span style="color:#b91c1c;">(${esc(i.sale_label || "sale")}, regular $${(i.list_price * i.qty).toFixed(2)})</span>` : ""}</li>`
              )
              .join("")}</ul>
            ${anySale ? `<p><strong>Regular price:</strong> <s>$${listSubtotal.toFixed(2)}</s> &nbsp; <strong style="color:#b91c1c;">Sale savings: −$${saved.toFixed(2)}</strong></p>` : ""}
            <p><strong>Cabinet subtotal (sale prices):</strong> $${subtotal.toFixed(2)}</p>
            ${assembly ? `<p><strong>Assembly:</strong> $${assembly.total.toFixed(2)}</p><p><strong>Estimated total before tax/shipping:</strong> $${(subtotal + assembly.total).toFixed(2)}</p>` : ""}`,
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
      notes: notesForDb,
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
