import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCabinets, getPackages } from "@/lib/catalog";
import { getInventoryMap, stockKey, inventoryUpdatedAt } from "@/lib/inventory";
import { KITCHEN_SALE, OVERSTOCK_TIERS, pricingFor } from "@/lib/sale";
import CabinetCard from "@/components/CabinetCard";
import PackageCard from "@/components/PackageCard";
import { SaleBadge } from "@/components/SaleBadge";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cabinet Sale — Overstock Deals & 8% Off Kitchens",
  description:
    "Current sales at RTA Cabinets Canada: 8% off every complete White Shaker kitchen designed in the planner or bought as a package, plus 10–15% off overstocked cabinets. Free delivery within 300 km of London, Ontario.",
  alternates: { canonical: "/sale" },
  openGraph: { title: "Cabinet Sale | RTA Cabinets Canada", description: "8% off complete kitchens and 10–15% off overstocked White Shaker cabinets." },
  twitter: { card: "summary_large_image", title: "Cabinet Sale | RTA Cabinets Canada", description: "8% off complete kitchens and 10–15% off overstocked White Shaker cabinets." },
};

export default async function SalePage() {
  const stock = await getInventoryMap();
  const onSale = getCabinets()
    .map((c) => ({ c, p: pricingFor(c.sku, c.price_cad, { comingSoon: c.coming_soon }) }))
    .filter((x) => x.p?.onSale)
    .sort((a, b) => b.p!.pct - a.p!.pct || (b.p!.list - b.p!.price) - (a.p!.list - a.p!.price));
  const packages = getPackages();
  const updated = inventoryUpdatedAt().toLocaleDateString("en-CA", { year: "numeric", month: "long" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "RTA Cabinets Canada sale",
    url: `${site.url}/sale`,
    itemListElement: onSale.slice(0, 30).map(({ c, p }) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: c.name, sku: c.sku, url: `${site.url}/cabinets/${c.slug}` },
      price: p!.price.toFixed(2),
      priceCurrency: "CAD",
    })),
  };
  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h1 className="text-4xl font-bold">Sale</h1>
        <SaleBadge text="Limited time" size="lg" className="-rotate-3" />
      </div>
      <p className="text-ink-soft mb-10 max-w-2xl">
        Two deals running right now. Every sale price on this site is in Canadian dollars, includes free delivery within {site.freeDeliveryKm} km of London, Ontario, and is the price you get on your written quote — no promo codes.
      </p>

      <section className="rounded-xl bg-ink text-white p-6 md:p-10 mb-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Deal 1 · {KITCHEN_SALE.label}</p>
          <h2 className="text-3xl font-bold mb-3">{KITCHEN_SALE.pct}% off every complete kitchen</h2>
          <p className="text-white/80 max-w-xl">
            Design your kitchen in the free 3D planner or pick a 10×10, 10×12 or 12×12 package and every cabinet in it is {KITCHEN_SALE.pct}% off. The planner shows the regular price struck through and the sale price live as you build; add it to your quote and the sale carries through.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center justify-center">
            Design a kitchen
          </Link>
          <Link href="/kitchen-packages" className="border border-white/30 text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center justify-center hover:bg-white/10">
            See packages
          </Link>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-2">Kitchen packages on sale</h2>
        <p className="text-ink-soft mb-6">Fixed cabinet lists for the three most common layouts, with the {KITCHEN_SALE.pct}% kitchen sale already applied.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Deal 2 · Overstock sale</p>
        <h2 className="text-2xl font-bold mb-2">
          {OVERSTOCK_TIERS[OVERSTOCK_TIERS.length - 1].pct}–{OVERSTOCK_TIERS[0].pct}% off {onSale.length} overstocked cabinets
        </h2>
        <p className="text-ink-soft mb-6 max-w-2xl">
          We count the warehouse monthly (last count {updated}). Cabinets we hold a lot of get a sale tag — they ship right away, and the discount comes off individual cabinets too, no kitchen required.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {onSale.map(({ c }) => (
            <CabinetCard key={c.slug} cabinet={c} stock={stock[stockKey(c.sku)]} />
          ))}
        </div>
      </section>

      <TrustStrip />
    </div>
  );
}
