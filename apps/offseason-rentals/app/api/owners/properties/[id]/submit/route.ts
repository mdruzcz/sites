import { getOwnerSession, getOwnerProfile } from "@/lib/owner-auth";
import { getOwnerProperty, submitOwnerProperty } from "@/lib/owner-listings";
import { sendLeadEmail, sendSms } from "@/lib/leads";
import { getPackage } from "@/lib/content";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getOwnerSession();
  if (!session) return Response.json({ error: "Please sign in." }, { status: 401 });

  const { id } = await params;
  const { tier } = (await req.json().catch(() => ({}))) as { tier?: string };

  const result = await submitOwnerProperty(session.userId, id, String(tier ?? ""));
  if ("error" in result) return Response.json({ error: result.error }, { status: 400 });

  const property = await getOwnerProperty(session.userId, id);
  const profile = await getOwnerProfile(session.userId);
  const pkg = getPackage(String(tier));

  await sendLeadEmail(
    `Listing submitted — ${property?.name ?? "Untitled"} (${pkg?.name} $${result.price}) | Off Season Rentals`,
    "An owner submitted a listing for review",
    [
      ["Listing", property?.name ?? "—"],
      ["Address", `${property?.street_address ?? "—"}, ${property?.city ?? "—"}`],
      ["Package", `${pkg?.name} — $${result.price} for ${pkg?.term}`],
      ["Owner", (profile?.name as string) || session.email],
      ["Email", session.email],
      ["Phone", (profile?.phone as string) || "—"],
      ["Beds / baths", `${property?.bedrooms ?? "?"} / ${property?.bathrooms ?? "?"}`],
      ["Monthly rate", property?.monthly_rate ? `$${property.monthly_rate}` : "—"],
      ["Photographs", String(property?.photos.length ?? 0)],
      ["Review it", `https://offseasonrentals.ca/admin/review`]
    ],
    session.email
  );

  await sendSms(
    `Off Season Rentals: ${(profile?.name as string) || session.email} submitted "${
      property?.name ?? "a listing"
    }" on ${pkg?.name} ($${result.price}). Invoice + approve at offseasonrentals.ca/admin/review`
  );

  return Response.json({ ok: true, price: result.price });
}
