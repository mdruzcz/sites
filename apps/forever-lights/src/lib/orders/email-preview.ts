// Renders the order emails for review in a browser. Sends nothing.
//
// SAME FILE in every store that uses src/lib/orders — keep the copies identical.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { OrderDoc } from "./documents";
import { loadOrderDoc } from "./order-doc";
import { orderConfirmationHtml, type StoreEmailBrand } from "./emails";
import { abandonedCheckoutHtml, abandonedCheckoutSubject, resumeLinks, staffAbandonedHtml, type RecoveryStore } from "./recovery";

function sampleOrder(store: RecoveryStore & { prefix?: string }): OrderDoc {
  const unit = 1989;
  const subtotal = unit + 49;
  const tax = Math.round(subtotal * 13) / 100;
  return {
    id: "00000000-0000-4000-8000-000000000000",
    number: `${store.prefix ?? "WEB"}-10000`,
    status: "cancelled",
    storeName: store.name,
    storeDomain: store.siteUrl.replace(/^https?:\/\//, ""),
    createdAt: new Date().toISOString(),
    paidAt: null,
    email: "jordan@example.com",
    phone: "(519) 555-0142",
    shipTo: {
      recipient: "Jordan Sample",
      company: null,
      line1: "123 Example Street",
      line2: null,
      city: "London",
      province: "ON",
      postal: "N6A 1A1",
      country: "CA",
      phone: "(519) 555-0142"
    },
    lines: [
      { name: "Permanent Lighting Kit – 100 ft", variant: "White", sku: "SAMPLE-KIT-100-WHITE", qty: 1, unit, total: unit },
      { name: "Aluminum Track for 12V LED Lights, 2 Pack", variant: "White", sku: "SAMPLE-TRACK-WHITE", qty: 1, unit: 49, total: 49 }
    ],
    subtotal,
    discount: 0,
    shipping: 0,
    shippingLabel: "Free local delivery (about 25 km)",
    tax,
    taxLabel: "HST 13% (ON)",
    total: Math.round((subtotal + tax) * 100) / 100,
    paymentRef: null,
    customerNote: null
  };
}

export async function previewEmail(o: {
  service: SupabaseClient;
  store: RecoveryStore & { prefix?: string };
  brand: StoreEmailBrand;
  type: string | null;
  /** A real order number to render instead of the sample. */
  orderNumber: string | null;
}): Promise<string> {
  let doc: OrderDoc | null = null;
  if (o.orderNumber) {
    const { data } = await o.service.from("ecom_orders").select("id").eq("order_number", o.orderNumber).eq("store_id", o.store.id).maybeSingle();
    if (data) doc = await loadOrderDoc(o.service, data.id);
  }
  doc ??= sampleOrder(o.store);
  const links = resumeLinks(o.store, doc.id);
  const type = o.type ?? "reminder";
  const frame = (subject: string, to: string, html: string) =>
    html.replace(
      /<body([^>]*)>/,
      `<body$1><div style="font:13px/1.5 -apple-system,Segoe UI,Arial,sans-serif;background:#111;color:#fff;padding:10px 16px">PREVIEW ONLY, nothing sent &nbsp;|&nbsp; <strong>To:</strong> ${to} &nbsp;|&nbsp; <strong>Subject:</strong> ${subject} &nbsp;|&nbsp; other previews: <a style="color:#7dd3fc" href="?type=reminder">reminder</a> · <a style="color:#7dd3fc" href="?type=staff">shop alert</a> · <a style="color:#7dd3fc" href="?type=confirmation">order confirmation</a></div>`
    );
  if (type === "staff") {
    return frame(
      `Checkout not completed: ${doc.number} - ${doc.shipTo?.recipient ?? doc.email}`,
      process.env.CONTACT_TO_EMAIL || "shop inbox",
      staffAbandonedHtml(doc, o.brand, { customer: `Checkout reminder emailed to ${doc.email} with a link back to this order.`, resume: links.resume })
    );
  }
  if (type === "confirmation") {
    return frame(`Order ${doc.number} confirmed - ${o.brand.name}`, doc.email, orderConfirmationHtml({ ...doc, status: "paid" }, o.brand));
  }
  return frame(abandonedCheckoutSubject(doc, o.brand), doc.email, abandonedCheckoutHtml(doc, o.brand, links));
}
