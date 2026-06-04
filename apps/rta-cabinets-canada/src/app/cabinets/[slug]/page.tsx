import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import {
  getCabinet,
  getCabinets,
  getCabinetsByGroup,
  groupLabel,
} from "@/lib/catalog";
import AddToQuoteButton from "@/components/AddToQuoteButton";
import CabinetCard from "@/components/CabinetCard";
import CabinetGallery from "@/components/CabinetGallery";

export const revalidate = 3600;

export function generateStaticParams() {
  return getCabinets().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCabinet(slug);
  if (!c) return {};
  const price = c.price_cad !== null ? `$${c.price_cad.toFixed(2)} CAD` : "Request a quote";
  const desc =
    c.description ||
    `${c.name} — premium White Shaker ready-to-assemble cabinet (SKU ${c.sku}, ${price}). Shipped across Canada.`;
  const ogTitle = `${c.name} (${c.sku})`;
  return {
    title: c.name,
    description: desc.slice(0, 160),
    alternates: { canonical: `/cabinets/${c.slug}` },
    openGraph: {
      title: ogTitle,
      description: desc.slice(0, 160),
      images: c.images[0] ? [c.images[0]] : undefined,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc.slice(0, 160) },
  };
}

export default async function CabinetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCabinet(slug);
  if (!c) notFound();
  const img = c.images[0] ?? "/images/placeholder.svg";
  const related = getCabinetsByGroup(c.group)
    .filter((r) => r.slug !== c.slug)
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    sku: c.sku,
    image: c.images.map((i) => `${site.url}${i}`),
    description: c.description || `${c.name} — White Shaker RTA cabinet.`,
    brand: { "@type": "Brand", name: site.name },
    category: c.group_label,
    ...(c.price_cad !== null
      ? {
          offers: {
            "@type": "Offer",
            price: c.price_cad.toFixed(2),
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
            url: `${site.url}/cabinets/${c.slug}`,
          },
        }
      : {}),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${site.url}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: c.group_label,
        item: `${site.url}/shop/${c.group}`,
      },
      { "@type": "ListItem", position: 4, name: c.name, item: `${site.url}/cabinets/${c.slug}` },
    ],
  };

  return (
    <div className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <nav className="text-sm text-ink-soft mb-6">
        <Link href="/shop" className="hover:text-accent">Shop</Link> /{" "}
        <Link href={`/shop/${c.group}`} className="hover:text-accent">{c.group_label}</Link> /{" "}
        {c.name}
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <CabinetGallery images={c.images} name={c.name} />

        <div>
          <p className="text-sm text-accent font-medium mb-1">{c.group_label}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{c.name}</h1>
          <p className="text-sm text-ink-soft mb-4">SKU: {c.sku}</p>
          <p className="text-3xl font-bold text-accent mb-6">
            {c.price_cad !== null ? `$${c.price_cad.toFixed(2)} CAD` : "Request a quote"}
          </p>
          {c.description && <p className="text-ink-soft mb-6">{c.description}</p>}

          {c.width_in !== null && (
            <table className="w-full text-sm mb-6 border border-border rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-b border-border">
                  <th className="text-left bg-sand px-3 py-2 font-medium w-32">Width</th>
                  <td className="px-3 py-2">{c.width_in}&quot;</td>
                </tr>
                <tr className="border-b border-border">
                  <th className="text-left bg-sand px-3 py-2 font-medium">Height</th>
                  <td className="px-3 py-2">34.5&quot; (base) / 36&quot; (wall)</td>
                </tr>
                <tr>
                  <th className="text-left bg-sand px-3 py-2 font-medium">Depth</th>
                  <td className="px-3 py-2">24&quot; (base) / 12&quot; (wall)</td>
                </tr>
              </tbody>
            </table>
          )}

          <AddToQuoteButton
            slug={c.slug}
            name={c.name}
            price_cad={c.price_cad}
            image={img}
            kind="cabinet"
            className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-md font-medium min-h-[48px]"
            label={c.price_cad !== null ? "Add to Quote" : "Add to Quote (request price)"}
          />

          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>• Solid hardwood face frame &amp; doors, plywood box</li>
            <li>• Soft-close doors and drawers</li>
            <li>• Ready to assemble — ships flat-packed</li>
            <li>• Shipped across Canada · limited lifetime warranty</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More {c.group_label}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((r) => (
              <CabinetCard key={r.slug} cabinet={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
