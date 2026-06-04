import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  getGroups,
  getCabinets,
  getCabinetsByGroup,
  groupLabel,
  groupPriceRange,
} from "@/lib/catalog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop White Shaker RTA Cabinets",
  description:
    "Shop the full White Shaker ready-to-assemble cabinet collection — base, wall, drawer, sink, corner, pantry, specialty and accessories. Build your list and request a quote.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop White Shaker RTA Cabinets",
    description:
      "Browse the full White Shaker RTA cabinet collection, shipped across Canada.",
  },
};

export default function ShopPage() {
  const groups = getGroups();
  const total = getCabinets().length;

  function groupImage(slug: string): string {
    const first = getCabinetsByGroup(slug).find((c) => c.images[0]);
    return first?.images[0] ?? "/images/placeholder.svg";
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop White Shaker RTA Cabinets",
    url: `${site.url}/shop`,
    description: `Browse ${total} White Shaker RTA cabinets across ${groups.length} categories.`,
  };

  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-2">Shop Cabinets</h1>
      <p className="text-ink-soft mb-10 max-w-2xl">
        Browse our full collection of premium White Shaker ready-to-assemble
        cabinets by type. Add what you need to your quote and we&apos;ll confirm
        pricing and Canada-wide shipping.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {groups.map((g) => (
          <Link
            key={g}
            href={`/shop/${g}`}
            className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3] bg-sand overflow-hidden">
              <Image
                src={groupImage(g)}
                alt={`${groupLabel(g)} - White Shaker RTA cabinets`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold group-hover:text-accent">{groupLabel(g)}</h2>
              <p className="text-sm text-ink-soft mt-1">
                {getCabinetsByGroup(g).length} cabinets · {groupPriceRange(g)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
