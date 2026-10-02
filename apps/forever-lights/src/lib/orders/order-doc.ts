// Loads one web order (any store) from the shared ecom_* tables into the shape
// the invoice / pick-list renderers and the confirmation email take.
//
// SAME FILE in apps/permanent-lighting-direct and apps/forever-lights.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { OrderDoc } from "./documents";
import { shippingLabelFor, taxFor } from "./policy";

const ORDER_SELECT = `
  id, order_number, status, email, phone, created_at, paid_at, customer_note,
  subtotal_cad, discount_cad, shipping_cad, tax_cad, total_cad,
  shipping_service_code, stripe_payment_intent_id,
  ecom_stores(name, domain),
  ecom_order_items(product_name_snapshot, variant_name_snapshot, sku_snapshot, quantity, unit_price_cad, line_subtotal_cad, created_at),
  ecom_order_addresses(type, recipient, company, line1, line2, city, province, postal_code, country, phone)
`;

type Row = Record<string, unknown>;
const num = (v: unknown) => Number(v ?? 0) || 0;
const str = (v: unknown) => (v == null ? "" : String(v));
const one = <T,>(v: T | T[] | null | undefined): T | null => (Array.isArray(v) ? v[0] ?? null : v ?? null);

export async function loadOrderDoc(client: SupabaseClient, orderId: string): Promise<OrderDoc | null> {
  const { data, error } = await client.from("ecom_orders").select(ORDER_SELECT).eq("id", orderId).maybeSingle();
  if (error || !data) return null;
  const o = data as Row;
  const store = one(o.ecom_stores as Row | Row[] | null);
  const items = ((o.ecom_order_items as Row[]) ?? []).sort((a, b) => str(a.created_at).localeCompare(str(b.created_at)));
  const addresses = (o.ecom_order_addresses as Row[]) ?? [];
  const ship = addresses.find((a) => a.type === "shipping") ?? addresses[0] ?? null;
  const province = str(ship?.province);
  const tax = taxFor(province);
  const taxAmount = num(o.tax_cad);
  const subtotal = num(o.subtotal_cad);
  const shipping = num(o.shipping_cad);
  // Name the rate when it is one we charge; otherwise show the effective %.
  const effective = subtotal + shipping > 0 ? Math.round((taxAmount / (subtotal + shipping)) * 1000) / 10 : 0;
  const taxLabel = tax ? tax.display : taxAmount > 0 ? `Tax (${effective}%)` : "Tax";

  return {
    id: str(o.id),
    number: str(o.order_number),
    status: str(o.status),
    storeName: str(store?.name) || "Web store",
    storeDomain: str(store?.domain),
    createdAt: str(o.created_at),
    paidAt: o.paid_at ? str(o.paid_at) : null,
    email: str(o.email),
    phone: o.phone ? str(o.phone) : null,
    shipTo: ship
      ? {
          recipient: str(ship.recipient),
          company: ship.company ? str(ship.company) : null,
          line1: str(ship.line1),
          line2: ship.line2 ? str(ship.line2) : null,
          city: str(ship.city),
          province,
          postal: str(ship.postal_code),
          country: ship.country ? str(ship.country) : "CA",
          phone: ship.phone ? str(ship.phone) : null
        }
      : null,
    lines: items.map((it) => ({
      name: str(it.product_name_snapshot),
      variant: it.variant_name_snapshot ? str(it.variant_name_snapshot) : null,
      sku: str(it.sku_snapshot),
      qty: num(it.quantity),
      unit: num(it.unit_price_cad),
      total: num(it.line_subtotal_cad) || num(it.unit_price_cad) * num(it.quantity)
    })),
    subtotal,
    discount: num(o.discount_cad),
    shipping,
    shippingLabel: shippingLabelFor(str(o.shipping_service_code), str(ship?.postal_code)),
    tax: taxAmount,
    taxLabel,
    total: num(o.total_cad),
    paymentRef: o.stripe_payment_intent_id ? str(o.stripe_payment_intent_id) : null,
    customerNote: o.customer_note ? str(o.customer_note) : null
  };
}
