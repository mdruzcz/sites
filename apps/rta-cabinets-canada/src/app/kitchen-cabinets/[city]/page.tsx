import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getCity, getCities } from "@/lib/content";
import { getPackages, getGroups, groupLabel, getCabinetsByGroup } from "@/lib/catalog";
import ArticleBody, { FaqList, faqJsonLd } from "@/components/ArticleBody";
import TrustStrip from "@/components/TrustStrip";
import PackageCard from "@/components/PackageCard";
import { KITCHEN_SALE } from "@/lib/sale";

export const revalidate = 3600;

const HERO: Record<string, string> = {
  "london-ontario": "/images/gallery/white-shaker-kitchen-1.webp",
  "kitchener-waterloo": "/images/gallery/white-shaker-kitchen-3.webp",
  hamilton: "/images/gallery/white-shaker-kitchen-4.webp",
  "st-thomas": "/images/gallery/white-shaker-kitchen-5.webp",
  woodstock: "/images/gallery/white-shaker-kitchen-6.webp",
};

export function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const img = HERO[c.slug] ?? "/images/gallery/white-shaker-kitchen-1.webp";
  return {
    title: c.title.slice(0, 60),
    description: c.description.slice(0, 160),
    alternates: { canonical: `/kitchen-cabinets/${c.slug}` },
    openGraph: { title: c.title, description: c.description.slice(0, 160), images: [img] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description.slice(0, 160) },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const img = HERO[c.slug] ?? "/images/gallery/white-shaker-kitchen-1.webp";
  const packages = getPackages().slice(0, 3);
  const groups = getGroups();
  const otherCities = getCities().filter((o) => o.slug !== c.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Kitchen cabinet supply and free delivery",
    name: c.h1,
    description: c.description,
    provider: { "@type": "Store", name: site.name, url: site.url, telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "ON", addressCountry: "CA" } },
    areaServed: { "@type": "City", name: c.city, containedInPlace: { "@type": "State", name: c.region } },
    offers: { "@type": "Offer", description: `Free delivery within ${site.freeDeliveryKm} km of London, Ontario`, priceCurrency: "CAD" },
    url: `${site.url}/kitchen-cabinets/${c.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: `Kitchen Cabinets ${c.city}`, item: `${site.url}/kitchen-cabinets/${c.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {c.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(c.faqs)) }} />}

      <section className="bg-sand border-b border-border">
        <div className="container py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">Free delivery to {c.city} · {KITCHEN_SALE.pct}% off complete kitchens</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">{c.h1}</h1>
            <p className="text-lg text-ink-soft mb-4 max-w-xl">{c.intro}</p>
            <p className="text-sm text-ink-soft mb-8 max-w-xl">{c.distanceNote}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
                Design your kitchen free
              </Link>
              <Link href="/shop" className="border border-accent text-accent px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream">
                Shop cabinets
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm bg-white">
            <Image src={img} alt={`White Shaker kitchen cabinets delivered free in ${c.city}, ${c.region} by ${site.name}`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <div className="container py-12">
        <TrustStrip className="mb-14" />

        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
          <div>
            <ArticleBody sections={c.sections} />
            <FaqList faqs={c.faqs} title={`${c.city} kitchen cabinet questions`} />
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-border bg-white p-5">
              <h2 className="font-semibold mb-3">Shop by cabinet type</h2>
              <ul className="space-y-2 text-sm">
                {groups.map((g) => (
                  <li key={g}>
                    <Link href={`/shop/${g}`} className="flex justify-between hover:text-accent">
                      <span>{groupLabel(g)}</span>
                      <span className="text-ink-soft">{getCabinetsByGroup(g).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-ink text-white p-5">
              <h2 className="font-semibold mb-2">Talk to a real person</h2>
              <p className="text-sm text-white/80 mb-3">We&rsquo;re in London, Ontario. Call or email with your measurements and we&rsquo;ll price your {c.city} kitchen within one business day.</p>
              <a href={site.phoneHref} className="block font-semibold text-accent">{site.phone}</a>
              <a href={`mailto:${site.email}`} className="block text-sm text-white/80 break-all hover:text-white">{site.email}</a>
            </div>
            <div className="rounded-lg border border-border bg-sand p-5">
              <h2 className="font-semibold mb-2">Also delivering free to</h2>
              <ul className="space-y-1 text-sm">
                {otherCities.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/kitchen-cabinets/${o.slug}`} className="hover:text-accent">Kitchen cabinets {o.city}</Link>
                  </li>
                ))}
                {c.nearby.map((n) => (
                  <li key={n} className="text-ink-soft">{n}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold">Complete kitchens, delivered free to {c.city}</h2>
              <p className="text-ink-soft mt-2">Package prices already include the {KITCHEN_SALE.pct}% kitchen sale.</p>
            </div>
            <Link href="/kitchen-packages" className="hidden sm:inline text-accent font-medium hover:underline">All packages →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
