import { getCategories, listProducts, priceRange } from "@/lib/catalog";
import { articles } from "@/lib/resources";
import { SEGMENTS } from "@/lib/commercial-content";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

/** llms.txt — a plain-text map of the site for AI search engines and assistants. */
export async function GET() {
  const [categories, products] = await Promise.all([getCategories(), listProducts()]);
  const lines: string[] = [
    "# Holiday Light Supplies",
    "",
    "> Commercial and wholesale Christmas lighting and décor supplier in London, Ontario, Canada. Supplies malls, BIAs (business improvement areas), municipalities and parks departments, property managers, hotels and professional Christmas light installers across Canada since 2010. Ordering is quote-based: customers submit a quote list or request and receive a line-item quote by email within one business day. Volume pricing on case and contract orders; net-30 PO invoicing and tax-exempt handling for public-sector buyers; free courier shipping over $150 CAD; freight quoted for displays and trees. Permanent LED roofline lighting kits are supplied by sister brand Forever Lights (foreverlights.ca).",
    "",
    "## Key pages",
    `- [Commercial & wholesale overview](${SITE_URL}/commercial)`,
    ...SEGMENTS.map((s) => `- [${s.name}](${SITE_URL}/commercial/${s.slug}): ${s.metaDescription}`),
    `- [Professional installer program](${SITE_URL}/professional-installer)`,
    `- [Municipal & BIA accounts](${SITE_URL}/municipalities)`,
    `- [Request a quote](${SITE_URL}/request-a-quote)`,
    `- [FAQ](${SITE_URL}/faq)`,
    `- [Shipping & returns](${SITE_URL}/shipping-returns)`,
    `- [Warranty](${SITE_URL}/warranty)`,
    "",
    "## Product categories",
    ...categories.map((c) => `- [${CATEGORY_META[c.slug]?.title ?? c.name}](${SITE_URL}/product-category/${c.slug}): ${c.description ?? ""}`),
    "",
    "## Products",
    ...products.map((p) => {
      const r = priceRange(p);
      const price = r?.quoteOnly ? "quote on request" : r ? (r.min === r.max ? `$${r.min.toFixed(2)} CAD` : `$${r.min.toFixed(2)}–$${r.max.toFixed(2)} CAD`) : "";
      return `- [${p.name}](${SITE_URL}/product/${p.slug})${price ? `: ${price}` : ""}`;
    }),
    "",
    "## Guides",
    ...articles.map((a) => `- [${a.title}](${SITE_URL}/resources/${a.slug}): ${a.metaDescription}`),
    "",
    "## Contact",
    "- Email: info@holidaylightsupplies.ca",
    "- Warehouse: London, Ontario, Canada (ships Canada-wide)"
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
