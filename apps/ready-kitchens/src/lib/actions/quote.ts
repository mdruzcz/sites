"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { createServerSupabase } from "@/lib/supabase";
import { getKitBySlug } from "@/lib/kits";
import { formatCad, SITE } from "@/lib/utils";

type SubmitInput = {
  name: string;
  email: string;
  phone?: string;
  postal_code?: string;
  pickup_preference?: string;
  notes?: string;
  turnstile_token?: string;
  lines: Array<{ slug: string; qty: number }>;
};

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

function lineRow(slug: string, name: string, pieces: number, qty: number, unit: number) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;font-family:monospace;font-size:11px;color:#a4521f;">${slug}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${name}<br><span style="font-size:11px;color:#4a5263;">${pieces} pieces</span></td>
    <td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;text-align:center;">${qty}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;text-align:right;">${formatCad(unit)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;text-align:right;font-weight:600;">${formatCad(unit * qty)}</td>
  </tr>`;
}

export async function submitOrder(input: SubmitInput) {
  if (!input.name?.trim() || !input.email?.trim()) {
    throw new Error("Name and email are required");
  }
  if (!input.lines || input.lines.length === 0) {
    throw new Error("Cart is empty");
  }
  const ok = await verifyTurnstile(input.turnstile_token);
  if (!ok) throw new Error("Captcha failed — please try again");

  const resolved = await Promise.all(
    input.lines.map(async (l) => {
      const kit = await getKitBySlug(l.slug);
      return kit ? { line: l, kit } : null;
    }),
  );
  const items = resolved.filter((x): x is { line: { slug: string; qty: number }; kit: NonNullable<Awaited<ReturnType<typeof getKitBySlug>>> } => x !== null);

  if (items.length === 0) throw new Error("Cart is empty");

  const subtotal = items.reduce((s, { line, kit }) => s + kit.price_cad * line.qty, 0);
  const totalPieces = items.reduce((s, { line, kit }) => s + kit.pieces * line.qty, 0);

  const supabase = createServerSupabase();
  const requestId = crypto.randomUUID();
  const { error: reqErr } = await supabase.from("readykitchens_quote_requests").insert({
    id: requestId,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim() || null,
    postal_code: input.postal_code?.trim() || null,
    pickup_preference: input.pickup_preference?.trim() || null,
    notes: input.notes?.trim() || null,
    subtotal_cad: subtotal,
    total_pieces: totalPieces,
  });

  if (reqErr) {
    console.error("Order insert failed", reqErr);
    throw new Error("Could not save your order — please try again.");
  }

  const { error: itemsErr } = await supabase.from("readykitchens_quote_request_items").insert(
    items.map(({ line, kit }) => ({
      request_id: requestId,
      kit_slug: kit.slug,
      kit_name: kit.name,
      qty: line.qty,
      pieces_each: kit.pieces,
      unit_price_cad: kit.price_cad,
    })),
  );

  if (itemsErr) console.error("Items insert failed", itemsErr);

  const itemsHtml = items
    .map(({ line, kit }) => lineRow(kit.slug, kit.name, kit.pieces, line.qty, kit.price_cad))
    .join("");
  const subtotalRow = `<tr><td colspan="4" style="padding:12px;text-align:right;font-weight:600;">Estimated subtotal</td><td style="padding:12px;text-align:right;font-weight:600;font-size:18px;">${formatCad(subtotal)}</td></tr>`;

  const internalHtml = `
    <div style="font-family:system-ui,sans-serif;color:#14181f;max-width:640px;">
      <h2 style="margin:0 0 16px 0;">New order request — ${SITE.name}</h2>
      <p style="margin:0 0 8px 0;"><strong>${input.name.trim()}</strong> &lt;${input.email.trim()}&gt;</p>
      ${input.phone ? `<p style="margin:0 0 8px 0;">Phone: ${input.phone}</p>` : ""}
      ${input.postal_code ? `<p style="margin:0 0 8px 0;">Postal code: ${input.postal_code}</p>` : ""}
      ${input.pickup_preference ? `<p style="margin:0 0 8px 0;">Pickup preference: ${input.pickup_preference}</p>` : ""}
      ${input.notes ? `<p style="margin:16px 0 8px 0;"><strong>Notes:</strong><br>${input.notes.replace(/\n/g, "<br>")}</p>` : ""}
      <table style="width:100%;border-collapse:collapse;margin-top:16px;font-size:14px;">
        <thead><tr style="background:#f5f1ea;text-align:left;">
          <th style="padding:8px 12px;">Slug</th>
          <th style="padding:8px 12px;">Kit</th>
          <th style="padding:8px 12px;text-align:center;">Qty</th>
          <th style="padding:8px 12px;text-align:right;">Unit</th>
          <th style="padding:8px 12px;text-align:right;">Line</th>
        </tr></thead>
        <tbody>${itemsHtml}${subtotalRow}</tbody>
      </table>
      <p style="margin-top:24px;font-size:12px;color:#666;">Request ID: ${requestId}<br>Total cabinets: ${totalPieces}</p>
    </div>`;

  const customerHtml = `
    <div style="font-family:system-ui,sans-serif;color:#14181f;max-width:640px;">
      <p>Hi ${input.name.trim().split(" ")[0]},</p>
      <p>Thanks for your order request — we&rsquo;ve received it and we&rsquo;ll get back to you within one business day to confirm stock, final pricing, and pickup or delivery details.</p>
      <p><strong>No payment has been taken.</strong> We&rsquo;ll send you a final total to approve before any charge.</p>
      <p>Here&rsquo;s what you sent us:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
        <thead><tr style="background:#f5f1ea;text-align:left;">
          <th style="padding:8px 12px;">Kit</th>
          <th style="padding:8px 12px;text-align:center;">Qty</th>
          <th style="padding:8px 12px;text-align:right;">Price</th>
        </tr></thead>
        <tbody>
          ${items
            .map(
              ({ line, kit }) =>
                `<tr><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;">${kit.name} <span style="color:#a4521f;font-family:monospace;font-size:11px;">${kit.pieces}-piece</span></td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;text-align:center;">${line.qty}</td><td style="padding:8px 12px;border-bottom:1px solid #e6e1d8;text-align:right;">${formatCad(kit.price_cad * line.qty)}</td></tr>`,
            )
            .join("")}
          <tr><td colspan="2" style="padding:12px;text-align:right;font-weight:600;">Estimated subtotal</td><td style="padding:12px;text-align:right;font-weight:600;">${formatCad(subtotal)}</td></tr>
        </tbody>
      </table>
      <p>Pickup: <strong>50432 Yorke Line, Belmont, ON</strong>. We&rsquo;ll confirm a time when we reply.</p>
      <p style="margin-top:24px;">— ${SITE.name}<br><span style="color:#666;font-size:13px;">${SITE.phoneDisplay} · readykitchens.ca/contact</span></p>
    </div>`;

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.CONTACT_FROM_EMAIL || `noreply@${SITE.domain}`;
      const to = process.env.CONTACT_TO_EMAIL || SITE.internalEmail;
      await resend.emails.send({
        from,
        to,
        replyTo: input.email.trim(),
        subject: `Order request — ${input.name.trim()} — ${items.length} kit${items.length === 1 ? "" : "s"} (${formatCad(subtotal)})`,
        html: internalHtml,
      });
      if (input.email.trim().toLowerCase() === to.toLowerCase()) return;
      await resend.emails.send({
        from,
        to: input.email.trim(),
        subject: `We got your order — ${SITE.name}`,
        html: customerHtml,
      });
    } catch (e) {
      console.error("Resend failed", e);
    }
  } else {
    console.log("RESEND_API_KEY not set — skipping email send");
  }

  redirect(`/request/submitted?id=${requestId}`);
}
