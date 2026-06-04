import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  GROUPS,
  getGroups,
  getCabinetsByGroup,
  groupLabel,
  groupPriceRange,
} from "@/lib/catalog";
import CabinetCard from "@/components/CabinetCard";

export const revalidate = 3600;

export function generateStaticParams() {
  return getGroups().map((group) => ({ group }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const label = groupLabel(group);
  const items = getCabinetsByGroup(group);
  if (items.length === 0) return {};
  const title = `${label} — White Shaker RTA`;
  const description = `Shop ${items.length} White Shaker ${label.toLowerCase()} (${groupPriceRange(
    group
  )}). Ready-to-assemble, shipped across Canada. Build your list and request a free quote.`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `/shop/${group}` },
    openGraph: { title, description: description.slice(0, 160) },
    twitter: { card: "summary_large_image", title, description: description.slice(0, 160) },
  };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const items = getCabinetsByGroup(group);
  if (items.length === 0) notFound();
  const label = groupLabel(group);
  const meta = GROUPS.find((g) => g.slug === group);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} — White Shaker RTA Cabinets`,
    url: `${site.url}/shop/${group}`,
    description: meta?.blurb,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${site.url}/shop` },
      { "@type": "ListItem", position: 3, name: label, item: `${site.url}/shop/${group}` },
    ],
  };

  return (
    <div className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <nav className="text-sm text-ink-soft mb-4">
        <Link href="/shop" className="hover:text-accent">Shop</Link> / {label}
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{label}</h1>
      <p className="text-ink-soft mb-8 max-w-2xl">{meta?.blurb}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((c) => (
          <CabinetCard key={c.slug} cabinet={c} />
        ))}
      </div>
    </div>
  );
}
