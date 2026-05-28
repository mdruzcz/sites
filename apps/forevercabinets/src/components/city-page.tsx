import Image from "next/image";
import Link from "next/link";
import { CabinetCard } from "./cabinet-card";
import { FindByWidth } from "./find-by-width";
import { getAllCabinets } from "@/lib/catalog";
import type { CityConfig } from "@/lib/cities";
import { formatCad, SITE } from "@/lib/utils";

type Props = {
  city: CityConfig;
};

const POPULAR_SKUS = ["B24", "B30", "SB33", "DB18", "W2436", "WP249024"];

export function CityPage({ city }: Props) {
  const cabinets = getAllCabinets();
  const popular = POPULAR_SKUS.map((sku) => cabinets.find((c) => c.sku === sku)).filter(Boolean) as ReturnType<typeof getAllCabinets>;

  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}/cabinets-${city.slug}#org`,
        name: `${SITE.name} — ${city.name}`,
        url: `${SITE.url}/cabinets-${city.slug}`,
        email: SITE.email,
        telephone: SITE.phone,
        description: city.metaDescription,
        priceRange: "$$",
        areaServed: {
          "@type": "City",
          name: city.name,
          containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
          ...(city.geo
            ? {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: city.geo.lat,
                  longitude: city.geo.lng,
                },
              }
            : {}),
        },
        makesOffer: {
          "@type": "Offer",
          name: `Free local delivery to ${city.name} on orders over ${formatCad(SITE.freeLocalShippingThreshold)}`,
          eligibleRegion: { "@type": "City", name: city.name },
          priceCurrency: "CAD",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Service Area",
            item: `${SITE.url}/service-area`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.pathLabel,
            item: `${SITE.url}/cabinets-${city.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      <section className="relative isolate overflow-hidden border-b border-[var(--color-line)]">
        <Image
          src="/images/hero/kitchen-hero.jpg"
          alt={`A White Shaker kitchen the type we deliver across ${city.name}, Ontario.`}
          width={1536}
          height={1229}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-navy)]/85 via-[var(--color-navy)]/55 to-[var(--color-navy)]/15" />
        <div className="mx-auto max-w-6xl px-4 py-20 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-widest text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/service-area" className="hover:text-white">Service Area</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{city.pathLabel}</span>
          </nav>
          <div className="max-w-2xl text-white">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
              {city.region} · White Shaker · Free Local Shipping
            </p>
            <h1 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Kitchen Cabinets in<br />
              <span className="font-medium">{city.name}, Ontario.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {city.blurb} Plywood box, painted birch &amp; MDF doors, 36″ wall cabinets as standard — <strong className="text-[var(--color-brass)] font-medium">free local delivery to {city.name} on orders over {formatCad(SITE.freeLocalShippingThreshold)}</strong>.
            </p>
            <div className="mt-8 rounded-sm bg-[var(--color-cream)] p-4">
              <FindByWidth />
            </div>
            <p className="mt-4 text-xs text-white/75">
              {city.shippingNote} · {SITE.leadTime} lead time · No payment until your order is confirmed
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid items-center gap-6 lg:grid-cols-[2fr_1fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
                Why {city.name}
              </p>
              <h2 className="mt-2 font-display text-2xl text-[var(--color-navy)] sm:text-3xl">
                We know this market.
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-soft)]">
                {city.context}
              </p>
              {city.neighborhoods.length > 0 && (
                <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
                  <strong className="text-[var(--color-navy)]">Neighborhoods we deliver to:</strong>{" "}
                  {city.neighborhoods.join(" · ")}
                </p>
              )}
            </div>
            <div className="border-l-4 border-[var(--color-brass)] bg-white p-6">
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                Local shipping
              </p>
              <p className="mt-2 font-display text-3xl text-[var(--color-navy)]">
                Free over {formatCad(SITE.freeLocalShippingThreshold)}
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Any order to {city.name} over {formatCad(SITE.freeLocalShippingThreshold)} ships free. Below that, freight is typically $40–$80.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
          Popular in {city.name}
        </p>
        <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)] sm:text-4xl">
          Cabinets people order most
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
          These are the SKUs we ship most often — gap-fillers, standard sizes, and the showstoppers like the tall pantry.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((c) => (
            <CabinetCard key={c.sku} cabinet={c} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/cabinets" className="btn-secondary">
            Browse the full catalog (58 SKUs) →
          </Link>
          <Link href="/visualizer" className="btn-primary">
            Build your kitchen with our visualizer
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[var(--color-navy)] text-[var(--color-sandstone)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Not sure it&rsquo;ll match?
              </p>
              <h3 className="mt-3 font-display text-2xl text-white">Order a {formatCad(SITE.sampleDoorPrice)} sample door</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                See the finish in person before you commit. Refundable on your first {city.name} order.
              </p>
              <Link href="/cabinets/sample-door" className="mt-4 inline-block text-sm uppercase tracking-widest text-[var(--color-brass)] underline underline-offset-4">
                Order sample →
              </Link>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                How it works
              </p>
              <h3 className="mt-3 font-display text-2xl text-white">Quote-first, no surprises</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Add to your Request List, we confirm stock + final price in {city.name} by email within one business day.
              </p>
              <Link href="/how-it-works" className="mt-4 inline-block text-sm uppercase tracking-widest text-[var(--color-brass)] underline underline-offset-4">
                Read the process →
              </Link>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
                Contractors &amp; designers
              </p>
              <h3 className="mt-3 font-display text-2xl text-white">Trade pricing available</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                We work directly with renovation pros across {city.region}. Ask about volume pricing on your next project.
              </p>
              <Link href="/contact" className="mt-4 inline-block text-sm uppercase tracking-widest text-[var(--color-brass)] underline underline-offset-4">
                Contact us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
