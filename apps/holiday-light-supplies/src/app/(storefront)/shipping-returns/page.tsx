import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping across Canada from London, Ontario: free courier over $150, freight quoted for displays and trees, lead times, pickup and the 30-day return policy at Holiday Light Supplies.",
  alternates: { canonical: `${SITE_URL}/shipping-returns` }
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      title="Shipping & returns"
      updated="2026-10-14"
      intro="Everything ships from our warehouse in London, Ontario. Shipping is quoted per order so you pay the actual cost to your address rather than a blanket surcharge."
      sections={[
        { h: "Courier shipping", p: ["Bulbs, strands, spools, wire, plugs, clips, timers and small décor ship by courier. Orders over $150 CAD ship free anywhere in Canada; smaller orders are quoted. Typical transit is two to five business days in Ontario and three to eight elsewhere."] },
        { h: "Freight shipping", p: ["3D displays, trees, large wreaths, pole décor and pallet quantities ship by LTL freight on a pallet or in a crate. Freight is quoted on your order and depends on size, weight and destination. A loading dock or forklift is not required for most pieces; tell us if delivery is to a residence or a site without a dock so the carrier brings a liftgate."] },
        { h: "Lead times", p: ["In-stock product ships in one to two business days. Made-to-order displays, decorated trees and custom pieces carry two to six week lead times, which we confirm on the quote. For a December install, order by the end of September."] },
        { h: "Pickup", p: ["Warehouse pickup in London, Ontario is available by arrangement on approved orders."] },
        { h: "Multiple sites", p: ["Property portfolios, BIAs and municipalities can ship to several addresses on one order; each site is a line on the quote with its own freight."] },
        { h: "Returns", p: ["Unused product in original packaging may be returned within 30 days of delivery for a refund of the product price. Return shipping is the customer's responsibility; use a trackable method. Made-to-order items, including custom displays and decorated trees, are not returnable.", "Inspect freight on arrival and note any damage on the delivery receipt before signing, then email us the same day with photos so we can file with the carrier and replace the damaged piece."] },
        { h: "Questions", p: ["Email info@holidaylightsupplies.ca with your order or quote number."] }
      ]}
    />
  );
}
