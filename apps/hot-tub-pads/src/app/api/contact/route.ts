import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/* --- Helpers --- */

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

/* --- Route Handler --- */

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    /* ── Extract fields ── */
    const first_name = (formData.get("first_name") as string | null)?.trim() ?? "";
    const last_name = (formData.get("last_name") as string | null)?.trim() ?? "";
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const phone = (formData.get("phone") as string | null)?.trim() ?? "";
    const message = (formData.get("message") as string | null)?.trim() ?? "";
    const website = (formData.get("website") as string | null) ?? "";
    const loadedAt = parseInt(
      (formData.get("_loaded") as string | null) ?? "0",
      10,
    );
    const photoFiles = formData.getAll("photos") as File[];

    /* ── Honeypot check ── */
    if (website) {
      // Bot filled the hidden field — return success silently
      return json({ success: true });
    }

    /* ── Timing check (< 3 seconds = likely bot) ── */
    if (loadedAt > 0 && Date.now() - loadedAt < 3000) {
      return json({ success: true });
    }

    /* ── Validation ── */
    const errors: string[] = [];
    if (!first_name) errors.push("First name is required.");
    if (!last_name) errors.push("Last name is required.");
    if (!email) {
      errors.push("Email is required.");
    } else if (!EMAIL_RE.test(email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!message) errors.push("Message is required.");

    if (errors.length > 0) {
      return json({ success: false, error: errors.join(" ") }, 400);
    }

    const fullName = `${first_name} ${last_name}`;

    /* ── Upload photos to Supabase Storage (if configured) ── */
    const photoUrls: string[] = [];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && photoFiles.length > 0) {
      for (const file of photoFiles) {
        if (!(file instanceof File) || file.size === 0) continue;

        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const ts = Date.now();
        const path = `leads/${ts}-${randomId()}.${ext}`;

        try {
          const uploadRes = await fetch(
            `${supabaseUrl}/storage/v1/object/hot-tub-pads-photos/${path}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": file.type || "application/octet-stream",
                "x-upsert": "true",
              },
              body: file,
            },
          );

          if (uploadRes.ok) {
            photoUrls.push(
              `${supabaseUrl}/storage/v1/object/public/hot-tub-pads-photos/${path}`,
            );
          }
        } catch {
          // Photo upload failed silently — we still process the lead
        }
      }
    }

    /* ── Insert into Supabase ── */
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/hottubpads_quote_requests`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            phone: phone || null,
            message,
            photo_urls: photoUrls.length > 0 ? photoUrls : null,
            status: "new",
          }),
        });
      } catch {
        // Supabase insert failed — continue to send email
      }
    }

    /* ── Send email via Resend ── */
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const fromEmail =
        process.env.CONTACT_FROM_EMAIL || "noreply@hottubpads.ca";
      const toEmail =
        process.env.CONTACT_TO_EMAIL || "service@masterdecker.com";

      const photoRowsHtml =
        photoUrls.length > 0
          ? `<tr>
              <td style="padding:12px 16px;font-weight:600;color:#223035;border-bottom:1px solid #e5e7eb;vertical-align:top;">Photos</td>
              <td style="padding:12px 16px;color:#374151;border-bottom:1px solid #e5e7eb;">
                ${photoUrls
                  .map(
                    (url, i) =>
                      `<a href="${url}" style="color:#f47a55;text-decoration:underline;" target="_blank" rel="noopener">Photo ${i + 1}</a>`,
                  )
                  .join("<br/>")}
              </td>
            </tr>`
          : "";

      const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background:#223035;padding:24px 32px;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Quote Request</h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:14px;">Hot Tub Pads</p>
    </div>

    <!-- Body -->
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;">
        <tr style="background:#f9fafb;">
          <td style="padding:12px 16px;font-weight:600;color:#223035;border-bottom:1px solid #e5e7eb;width:140px;">Name</td>
          <td style="padding:12px 16px;color:#374151;border-bottom:1px solid #e5e7eb;">${escapeHtml(fullName)}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#223035;border-bottom:1px solid #e5e7eb;">Email</td>
          <td style="padding:12px 16px;color:#374151;border-bottom:1px solid #e5e7eb;">
            <a href="mailto:${escapeHtml(email)}" style="color:#f47a55;text-decoration:underline;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:12px 16px;font-weight:600;color:#223035;border-bottom:1px solid #e5e7eb;">Phone</td>
          <td style="padding:12px 16px;color:#374151;border-bottom:1px solid #e5e7eb;">${phone ? escapeHtml(phone) : '<span style="color:#9ca3af;">Not provided</span>'}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#223035;border-bottom:1px solid #e5e7eb;vertical-align:top;">Message</td>
          <td style="padding:12px 16px;color:#374151;border-bottom:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(message)}</td>
        </tr>
        ${photoRowsHtml}
      </table>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">
        Sent from hottubpads.ca contact form
      </p>
    </div>
  </div>
</body>
</html>`.trim();

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: toEmail,
            subject: `Quote Request from ${fullName} - Hot Tub Pads`,
            html,
            reply_to: email,
          }),
        });
      } catch {
        // Email send failed — lead is already stored in Supabase
      }
    }

    return json({ success: true });
  } catch {
    return json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      500,
    );
  }
}

/* --- HTML Escaping --- */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
