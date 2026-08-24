import { revalidatePath } from "next/cache";
import { adminClient } from "@/lib/supabase";
import { sendLeadEmail } from "@/lib/leads";
import { getPackage, sortRankFor } from "@/lib/content";

export const runtime = "nodejs";

type Action = "approve" | "reject" | "mark_paid" | "unpublish";

/**
 * The approval gate.
 *
 * Approving is the only path by which an owner listing becomes public, and it
 * is also the moment the twelve-month clock starts — dated from going live
 * rather than from submission, so a slow review never eats an owner's term.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = adminClient();
  if (!db) return Response.json({ error: "Not configured." }, { status: 503 });

  const { action, note } = (await req.json().catch(() => ({}))) as { action?: Action; note?: string };

  const { data: property, error: readErr } = await db
    .from("osr_properties")
    .select("id, slug, name, package_tier, owner_id, package_status")
    .eq("id", id)
    .maybeSingle();
  if (readErr) return Response.json({ error: readErr.message }, { status: 500 });
  if (!property) return Response.json({ error: "No such listing." }, { status: 404 });

  const tier = property.package_tier as string | null;
  const pkg = tier ? getPackage(tier) : null;

  let patch: Record<string, unknown> = {};
  let ownerSubject = "";
  let ownerBody: [string, string][] = [];

  if (action === "approve") {
    const now = new Date();
    const expires = new Date(now);
    expires.setFullYear(expires.getFullYear() + 1);

    patch = {
      status: "published",
      package_status: "active",
      approved_at: now.toISOString(),
      package_started_at: now.toISOString(),
      package_expires_at: expires.toISOString(),
      sort_rank: sortRankFor(tier),
      rejection_note: null
    };

    await db
      .from("osr_package_orders")
      .update({ expires_at: expires.toISOString() })
      .eq("property_id", id)
      .neq("status", "cancelled");

    ownerSubject = `Your listing is live — ${property.name}`;
    ownerBody = [
      ["Listing", property.name as string],
      ["Package", pkg ? `${pkg.name} — ${pkg.priceLabel}` : "—"],
      ["Live until", expires.toLocaleDateString("en-CA", { day: "numeric", month: "long", year: "numeric" })],
      ["View it", `https://offseasonrentals.ca/rentals/${property.slug}`],
      ["Manage it", "https://offseasonrentals.ca/owners/dashboard"]
    ];
  } else if (action === "reject") {
    patch = {
      package_status: "rejected",
      status: "draft",
      rejection_note: String(note ?? "").trim() || "Please get in touch and we will talk it through."
    };
    ownerSubject = `A change needed on your listing — ${property.name}`;
    ownerBody = [
      ["Listing", property.name as string],
      ["What needs changing", String(patch.rejection_note)],
      ["Edit it", "https://offseasonrentals.ca/owners/dashboard"]
    ];
  } else if (action === "mark_paid") {
    patch = { package_status: "awaiting_payment" };
    await db
      .from("osr_package_orders")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("property_id", id)
      .eq("status", "invoiced");
  } else if (action === "unpublish") {
    patch = { status: "draft" };
  } else {
    return Response.json({ error: "Unknown action." }, { status: 400 });
  }

  const { error } = await db.from("osr_properties").update(patch).eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  // Tell the owner what happened. Their email lives on the profile row.
  if (ownerSubject && property.owner_id) {
    const { data: owner } = await db
      .from("osr_owners")
      .select("email, name")
      .eq("id", property.owner_id)
      .maybeSingle();
    if (owner?.email) {
      await sendLeadEmail(ownerSubject, ownerSubject, ownerBody, owner.email as string);
    }
  }

  revalidatePath("/", "layout");
  revalidatePath(`/rentals/${property.slug}`);
  return Response.json({ ok: true });
}
