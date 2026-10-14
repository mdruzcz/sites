import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for ordering commercial Christmas lighting and décor from Holiday Light Supplies, London, Ontario: quotes, payment, shipping, returns and warranty.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="2026-10-14"
      sections={[
        { h: "Quotes and orders", p: ["Products on this site are offered on a quote basis. Submitting a quote list, inquiry or quote request is not a purchase and does not commit you to buy. A binding order is formed only when you approve a written quote from Holiday Light Supplies and we confirm the order.", "Quotes are valid for 30 days unless stated otherwise. Prices are in Canadian dollars and exclude applicable taxes and shipping unless the quote says otherwise."] },
        { h: "Payment", p: ["Orders are payable on approval of the quote by credit card or e-transfer. Verified public-sector accounts may be extended net-30 terms against a purchase order. Overdue invoices may be subject to interest at 1.5% per month."] },
        { h: "Shipping and risk", p: ["Orders ship from London, Ontario. Lead times and freight are stated on the quote and are estimates. Risk of loss passes to you on delivery to the carrier for freight shipments and on delivery to your address for courier shipments. Please inspect freight on arrival and note any damage on the carrier's delivery receipt before signing."] },
        { h: "Returns", p: ["Unused product in original packaging may be returned within 30 days of delivery for a refund of the product price. Return shipping is at the customer's expense. Made-to-order items, including custom displays and decorated trees, are not returnable. See the shipping and returns page for the full policy."] },
        { h: "Warranty", p: ["LED lighting product is warranted against manufacturing defects for five years from delivery, limited to repair or replacement at our discretion. The warranty does not cover damage from improper installation, electrical surges, misuse or normal wear. See the warranty page for details."] },
        { h: "Limitation of liability", p: ["To the extent permitted by law, Holiday Light Supplies is not liable for indirect, incidental or consequential losses, including lost revenue or installation labour, arising from the use of our products. Our total liability for any order is limited to the amount paid for that order."] },
        { h: "Website content", p: ["Product images, descriptions and specifications are provided for guidance and may vary from the product shipped. We correct errors when we find them and will honour a corrected quote rather than a listing error."] },
        { h: "Governing law", p: ["These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein."] },
        { h: "Contact", p: ["Questions about these terms: info@holidaylightsupplies.ca."] }
      ]}
    />
  );
}
