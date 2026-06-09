// One-off backfill: recover customer + phone + shipping address for RSD orders
// that were paid before the webhook captured them correctly.
// Pulls the data back from Stripe (where it still lives) and writes it to Supabase.
//
// Run from the repo root:  node apps/ready-seal-direct/scripts/backfill-orders.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse the app's .env.local without adding a dotenv dependency.
const env = {};
for (const line of readFileSync(join(__dirname, "..", ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

// Prefer a key passed via the environment (e.g. the live key) over .env.local.
const stripeKey = process.env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-12-18.acacia"
});
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

function splitName(full) {
  if (!full) return { first: null, last: null };
  const p = full.trim().split(/\s+/);
  return p.length === 1 ? { first: p[0], last: null } : { first: p[0], last: p.slice(1).join(" ") };
}

const { data: tier } = await sb.from("ecom_pricing_tiers").select("id").eq("slug", "public").maybeSingle();

const { data: orders, error } = await sb
  .from("ecom_orders")
  .select("id, order_number, status, stripe_checkout_session_id")
  .eq("status", "paid")
  .not("stripe_checkout_session_id", "is", null)
  .order("created_at", { ascending: true });

if (error) {
  console.error("Failed to load orders:", error);
  process.exit(1);
}

console.log(`Found ${orders.length} paid order(s) to inspect.\n`);

for (const order of orders) {
  try {
    const session = await stripe.checkout.sessions.retrieve(order.stripe_checkout_session_id);
    const shipping = session.collected_information?.shipping_details ?? session.shipping_details ?? null;
    const shipAddr = shipping?.address ?? null;
    const email = session.customer_details?.email ?? null;
    const phone = session.customer_details?.phone ?? shipping?.phone ?? null;
    const fullName = shipping?.name ?? session.customer_details?.name ?? null;
    const { first, last } = splitName(fullName);
    const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;

    // Customer
    let customerId = null;
    if (email) {
      const payload = { email };
      if (tier?.id) payload.tier_id = tier.id;
      if (first) payload.first_name = first;
      if (last) payload.last_name = last;
      if (phone) payload.phone = phone;
      if (stripeCustomerId) payload.stripe_customer_id = stripeCustomerId;
      const { data: cust, error: ce } = await sb
        .from("ecom_customers")
        .upsert(payload, { onConflict: "email" })
        .select("id")
        .single();
      if (ce) console.error(`  ${order.order_number} customer upsert error:`, ce.message);
      customerId = cust?.id ?? null;
    }

    // Order link (don't touch totals — already correct)
    await sb
      .from("ecom_orders")
      .update({ customer_id: customerId, email: email ?? undefined, phone: phone ?? undefined })
      .eq("id", order.id);

    // Address (delete-then-insert keeps it idempotent on re-runs)
    let addrNote = "no address on session";
    if (shipAddr) {
      await sb.from("ecom_order_addresses").delete().eq("order_id", order.id).eq("type", "shipping");
      const { error: ae } = await sb.from("ecom_order_addresses").insert({
        order_id: order.id,
        type: "shipping",
        recipient: fullName ?? "Customer",
        line1: shipAddr.line1 ?? "",
        line2: shipAddr.line2 ?? null,
        city: shipAddr.city ?? "",
        province: shipAddr.state ?? "",
        postal_code: shipAddr.postal_code ?? "",
        country: shipAddr.country ?? "CA",
        phone
      });
      addrNote = ae ? `address error: ${ae.message}` : `address saved (${shipAddr.city}, ${shipAddr.state})`;
    }

    console.log(
      `✓ ${order.order_number}: ${email ?? "no email"} | ${fullName ?? "no name"} | phone ${phone ?? "—"} | ${addrNote}`
    );
  } catch (e) {
    console.error(`✗ ${order.order_number}: ${e.message}`);
  }
}

console.log("\nBackfill complete.");
