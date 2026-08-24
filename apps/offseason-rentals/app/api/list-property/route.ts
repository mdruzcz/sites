import { verifyTurnstile, sendLeadEmail, storeLead, leadResponse, sendSms } from "@/lib/leads";

export const runtime = "edge";

interface Body {
  name?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  city?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  monthsAvailable?: string;
  askingRate?: string;
  listingUrl?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
}

/** Only accept links we can actually import from. */
function classifyListing(raw: string | undefined): { url: string | null; platform: string | null } {
  const value = raw?.trim();
  if (!value) return { url: null, platform: null };
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" && u.protocol !== "http:") return { url: null, platform: null };
    const host = u.hostname.replace(/^www\./, "");
    if (host.includes("airbnb.")) return { url: u.toString(), platform: "Airbnb" };
    if (host.includes("vrbo.") || host.includes("homeaway.") || host.includes("expedia."))
      return { url: u.toString(), platform: "VRBO" };
    return { url: u.toString(), platform: "Other" };
  } catch {
    return { url: null, platform: null };
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  if (body.website?.trim()) return Response.json({ ok: true });

  const captcha = await verifyTurnstile(body.turnstileToken);
  if (captcha) return captcha;

  for (const f of ["name", "email", "phone", "propertyAddress", "city"] as const) {
    if (!String(body[f] ?? "").trim()) {
      return Response.json({ error: "Please fill in every required field." }, { status: 400 });
    }
  }

  const listing = classifyListing(body.listingUrl);
  const bedrooms = Number.parseInt(String(body.bedrooms ?? ""), 10);
  const bathrooms = Number.parseFloat(String(body.bathrooms ?? ""));

  const row = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    property_address: body.propertyAddress!.trim(),
    city: body.city!.trim(),
    property_type: body.propertyType?.trim() || null,
    bedrooms: Number.isFinite(bedrooms) ? bedrooms : null,
    bathrooms: Number.isFinite(bathrooms) ? bathrooms : null,
    months_available: body.monthsAvailable?.trim() || null,
    asking_rate: body.askingRate?.trim() || null,
    listing_url: listing.url,
    listing_platform: listing.platform,
    message: body.message?.trim() || null,
    status: "new"
  };

  const lines: [string, string][] = [
    ["Owner", row.name],
    ["Email", row.email],
    ["Phone", row.phone],
    ["Property", `${row.property_address}, ${row.city}`],
    ["Type", row.property_type ?? "—"],
    ["Bedrooms", row.bedrooms !== null ? String(row.bedrooms) : "—"],
    ["Bathrooms", row.bathrooms !== null ? String(row.bathrooms) : "—"],
    ["Months offered", row.months_available ?? "—"],
    ["Asking rate", row.asking_rate ?? "—"],
    ["Existing listing", row.listing_url ? `${row.listing_platform}: ${row.listing_url}` : "—"],
    ["Message", row.message ?? "—"]
  ];

  const emailed = await sendLeadEmail(
    `New property offered — ${row.property_address}, ${row.city} | Off Season Rentals`,
    "An owner wants to list their property",
    lines,
    row.email
  );
  const stored = await storeLead("osr_listing_requests", row);

  await sendSms(
    `Off Season Rentals — owner wants to list ${row.property_address}, ${row.city}. ${row.name}, ${
      row.phone
    }.${row.listing_url ? ` ${row.listing_platform} link supplied.` : ""}`
  );

  return leadResponse(emailed, stored);
}
