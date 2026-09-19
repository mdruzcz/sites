"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createServerSupabase } from "@/lib/supabase";
import { getCabinetBySku } from "@/lib/catalog";
import { formatCad, SITE } from "@/lib/utils";

type SubmitInput = {
  name: string;
  email: string;
  phone?: string;
  postal_code?: string;
  address?: string;
  referrer_site?: string;
  notes?: string;
  turnstile_token?: string;
  lines: Array<{ sku: string; qty: number }>;
  design?: { name: string; link: string; summary: string; notes: string[] };
};

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function designNotesText(d: NonNullable<SubmitInput["design"]>): string {
  const lines = [`Kitchen planner design: ${d.name}`, `Open: ${d.link}`, d.summary];
  if (d.notes?.length) lines.push("Design notes:", ...d.notes.map((n) => `- ${n}`));
  return lines.join("\n");
}

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  if (!token) return process.env.NODE_ENV !== "production"; // dev mode — skip
  const endpoint = process.env.TURNSTILE_VERIFY_ENDPOINT ?? "https://turnstile.masterdecker.com";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, hostname: "forevercabinets.ca" }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

function lineItemRow(sku: string, name: string, qty: number, unit: number) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;font-family:monospace;font-size:11px;color:#a8853e;">${sku}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;">${name}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;text-align:center;">${qty}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;text-align:right;">${formatCad(unit)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;text-align:right;font-weight:600;">${formatCad(unit * qty)}</td>
  </tr>`;
}

export async function submitQuote(input: SubmitInput) {
  if (!input.name?.trim() || !input.email?.trim()) {
    throw new Error("Name and email are required");
  }
  if (!input.lines || input.lines.length === 0) {
    throw new Error("Request list is empty");
  }
  const ok = await verifyTurnstile(input.turnstile_token);
  if (!ok) throw new Error("Captcha failed — please try again");

  const items = input.lines
    .map((l) => {
      const cab = getCabinetBySku(l.sku);
      if (!cab) return null;
      return { line: l, cabinet: cab };
    })
    .filter((x): x is { line: { sku: string; qty: number }; cabinet: NonNullable<ReturnType<typeof getCabinetBySku>> } => x !== null);

  if (items.length === 0) throw new Error("Request list is empty");

  const subtotal = items.reduce((s, { line, cabinet }) => s + cabinet.price_cad * line.qty, 0);

  const design =
    input.design && typeof input.design.link === "string" && /^https?:\/\//.test(input.design.link)
      ? {
          name: String(input.design.name ?? "My kitchen").slice(0, 80),
          link: input.design.link.slice(0, 6000),
          summary: String(input.design.summary ?? "").slice(0, 1000),
          notes: Array.isArray(input.design.notes) ? input.design.notes.map((n) => String(n).slice(0, 500)).slice(0, 50) : [],
        }
      : undefined;
  const notesForDb = [input.notes?.trim(), design ? designNotesText(design) : ""].filter(Boolean).join("\n\n") || null;

  const supabase = createServerSupabase();
  const requestId = crypto.randomUUID();
  const { error: reqErr } = await supabase.from("fc_quote_requests").insert({
    id: requestId,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    postal_code: input.postal_code?.trim() || null,
    address: input.address?.trim() || null,
    referrer_site: input.referrer_site?.trim() || null,
    notes: notesForDb,
    subtotal_cad: subtotal,
  });

  if (reqErr) {
    console.error("Quote insert failed", reqErr);
    throw new Error("Could not save your request — please try again.");
  }

  const { error: itemsErr } = await supabase.from("fc_quote_request_items").insert(
    items.map(({ line, cabinet }) => ({
      request_id: requestId,
      sku: cabinet.sku,
      name: cabinet.name,
      qty: line.qty,
      unit_price_cad: cabinet.price_cad,
    })),
  );

  if (itemsErr) console.error("Items insert failed", itemsErr);

  const itemsHtml = items
    .map(({ line, cabinet }) => lineItemRow(cabinet.sku, cabinet.name, line.qty, cabinet.price_cad))
    .join("");
  const subtotalRow = `<tr><td colspan="4" style="padding:12px;text-align:right;font-weight:600;">Estimated subtotal</td><td style="padding:12px;text-align:right;font-weight:600;font-size:18px;">${formatCad(subtotal)}</td></tr>`;

  const internalHtml = `
    <div style="font-family:system-ui,sans-serif;color:#0d1b2a;max-width:640px;">
      <h2 style="margin:0 0 16px 0;">New quote request — ${SITE.name}</h2>
      <p style="margin:0 0 8px 0;"><strong>${input.name.trim()}</strong> &lt;${input.email.trim()}&gt;</p>
      ${input.phone ? `<p style="margin:0 0 8px 0;">Phone: ${input.phone}</p>` : ""}
      ${input.postal_code ? `<p style="margin:0 0 8px 0;">Postal code: ${input.postal_code}</p>` : ""}
      ${input.address ? `<p style="margin:0 0 8px 0;">Address: ${input.address}</p>` : ""}
      ${input.referrer_site ? `<p style="margin:0 0 8px 0;">Kitchen purchased from: ${input.referrer_site}</p>` : ""}
      ${input.notes ? `<p style="margin:16px 0 8px 0;"><strong>Notes:</strong><br>${escapeHtml(input.notes).replace(/\n/g, "<br>")}</p>` : ""}
      ${
        design
          ? `<div style="margin:16px 0;padding:12px;border:1px solid #c5a059;background:#f5f0e6;">
        <p style="margin:0 0 4px 0;"><strong>Kitchen planner design attached:</strong> ${escapeHtml(design.name)}</p>
        <p style="margin:0 0 4px 0;font-size:13px;">${escapeHtml(design.summary)}</p>
        <p style="margin:0 0 4px 0;"><a href="${escapeHtml(design.link)}">Open the design in the planner</a></p>
        ${design.notes.length ? `<p style="margin:8px 0 0 0;font-size:13px;"><strong>Design notes:</strong></p><ul style="margin:4px 0 0 0;padding-left:18px;font-size:13px;">${design.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>` : ""}
      </div>`
          : ""
      }
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
        <thead><tr style="background:#f0e7dc;text-align:left;">
          <th style="padding:8px 12px;">SKU</th>
          <th style="padding:8px 12px;">Item</th>
          <th style="padding:8px 12px;text-align:center;">Qty</th>
          <th style="padding:8px 12px;text-align:right;">Unit</th>
          <th style="padding:8px 12px;text-align:right;">Line</th>
        </tr></thead>
        <tbody>${itemsHtml}${subtotalRow}</tbody>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#666;">Request ID: ${requestId}</p>
    </div>`;

  const customerHtml = `
    <div style="font-family:system-ui,sans-serif;color:#0d1b2a;max-width:640px;">
      <p>Hi ${input.name.trim().split(" ")[0]},</p>
      <p>Thanks for your request — we&rsquo;ve received it and a real person will get back to you within one business day.</p>
      <p>Here&rsquo;s what you sent us:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
        <thead><tr style="background:#f0e7dc;text-align:left;">
          <th style="padding:8px 12px;">Item</th>
          <th style="padding:8px 12px;text-align:center;">Qty</th>
          <th style="padding:8px 12px;text-align:right;">Price</th>
        </tr></thead>
        <tbody>
          ${items
            .map(
              ({ line, cabinet }) =>
                `<tr><td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;">${cabinet.name} <span style="color:#a8853e;font-family:monospace;font-size:11px;">${cabinet.sku}</span></td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;text-align:center;">${line.qty}</td><td style="padding:8px 12px;border-bottom:1px solid #e8e0d3;text-align:right;">${formatCad(cabinet.price_cad * line.qty)}</td></tr>`,
            )
            .join("")}
          <tr><td colspan="2" style="padding:12px;text-align:right;font-weight:600;">Estimated subtotal</td><td style="padding:12px;text-align:right;font-weight:600;">${formatCad(subtotal)}</td></tr>
        </tbody>
      </table>
      ${design ? `<p>Your kitchen plan <strong>${escapeHtml(design.name)}</strong> came through with the request — <a href="${escapeHtml(design.link)}">open it any time</a>.</p>` : ""}
      <p>Next we&rsquo;ll confirm stock, quote freight to your postal code, and send you a final total. No payment is needed yet.</p>
      <p style="margin-top:24px;">— ${SITE.name}<br><span style="color:#666;font-size:13px;">${SITE.email}</span></p>
    </div>`;

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.CONTACT_FROM_EMAIL || "noreply@masterdecker.com";
      const to = process.env.CONTACT_TO_EMAIL || SITE.email;
      await resend.emails.send({
        from,
        to,
        replyTo: input.email.trim(),
        subject: `Quote request — ${input.name.trim()} — ${items.length} item${items.length === 1 ? "" : "s"} (${formatCad(subtotal)})`,
        html: internalHtml,
      });
      // courtesy: don't double-send if matt is testing with his own email as recipient
      if (input.email.trim().toLowerCase() === to.toLowerCase()) return;
      await resend.emails.send({
        from,
        to: input.email.trim(),
        subject: `We got your quote request — ${SITE.name}`,
        html: customerHtml,
      });
    } catch (e) {
      console.error("Resend failed", e);
      // Don't block the user — request already saved in Supabase
    }
  } else {
    console.log("RESEND_API_KEY not set — skipping email send");
  }

  redirect(`/request/submitted?id=${requestId}`);
}
