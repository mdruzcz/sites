import { verifyTurnstile, sendLeadEmail, storeLead, leadResponse } from "@/lib/leads";

export const runtime = "edge";

interface Body {
  name?: string;
  email?: string;
  phone?: string;
  arrival?: string;
  duration?: string;
  guests?: string;
  reason?: string;
  message?: string;
  propertySlug?: string;
  propertyName?: string;
  website?: string;
  turnstileToken?: string;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  // Honeypot — accept silently so the bot learns nothing.
  if (body.website?.trim()) return Response.json({ ok: true });

  const captcha = await verifyTurnstile(body.turnstileToken);
  if (captcha) return captcha;

  for (const f of ["name", "email", "phone"] as const) {
    if (!String(body[f] ?? "").trim()) {
      return Response.json({ error: "Please fill in every required field." }, { status: 400 });
    }
  }

  const guests = Number.parseInt(String(body.guests ?? ""), 10);

  const row = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    property_slug: body.propertySlug?.trim() || null,
    property_name: body.propertyName?.trim() || null,
    arrival: body.arrival?.trim() || null,
    duration: body.duration?.trim() || null,
    guests: Number.isFinite(guests) ? guests : null,
    reason: body.reason?.trim() || null,
    message: body.message?.trim() || null,
    source_url: req.headers.get("referer") || null
  };

  const which = row.property_name ?? "General enquiry";
  const lines: [string, string][] = [
    ["Property", which],
    ["Name", row.name],
    ["Email", row.email],
    ["Phone", row.phone],
    ["Arrival", row.arrival ?? "—"],
    ["Length of stay", row.duration ?? "—"],
    ["Guests", row.guests ? String(row.guests) : "—"],
    ["Reason for stay", row.reason ?? "—"],
    ["Message", row.message ?? "—"]
  ];

  const emailed = await sendLeadEmail(
    `Rental enquiry — ${which} | Off Season Rentals`,
    "New off-season rental enquiry",
    lines,
    row.email
  );
  const stored = await storeLead("osr_booking_inquiries", row);

  return leadResponse(emailed, stored);
}
