import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { site, services } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hot Tub Pad Services | Installation & More",
  description:
    "Expert hot tub pad installation, repair, and maintenance services across Ontario. Custom concrete pads, swim spa pads, and gravel alternatives. Free quotes.",
  openGraph: {
    title: "Hot Tub Pad Services | Installation & More",
    description:
      "Expert hot tub pad installation services across Ontario. Custom concrete pads, swim spa pads, and gravel alternatives.",
    url: `${site.url}/services`,
    images: [
      {
        url: "/images/concrete-pad-wide.webp",
        width: 1200,
        height: 630,
        alt: "Custom concrete hot tub pad installation services by Hot Tub Pads in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Tub Pad Services | Installation & More",
    description:
      "Expert hot tub pad installation services across Ontario. Concrete, swim spa, and gravel pad options.",
    images: ["/images/concrete-pad-wide.webp"],
  },
};

/* ─── JSON-LD Structured Data ─── */

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Hot Tub Pad Installation",
  provider: {
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  },
  areaServed: site.serviceAreas.map((area) => ({
    "@type": "City",
    name: `${area}, ON`,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hot Tub Pad Services",
    itemListElement: services.map((svc, idx) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: svc.name,
        description: svc.shortDesc,
        url: `${site.url}/services/${svc.slug}`,
      },
      position: idx + 1,
    })),
  },
};

/* ─── Page Component ─── */

export default function ServicesPage() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <NavBar />

      {/* ═══════════════ Page Hero ═══════════════ */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Our Services
          </h1>
          <p className="text-lg text-white/70">
            Reliable Concrete Solutions for Spas
          </p>
        </div>
      </section>

      {/* ═══════════════ Service 1: Custom Concrete Pads ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Column */}
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Most Popular
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Custom Concrete Pads
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-slate-muted">
                We install custom concrete pads for a variety of outdoor
                structures, offering a perfectly level and durable surface.
                Every pad is poured with high-strength 32 MPA concrete and
                reinforced with rebar and wire mesh for lasting strength. Choose
                from a smooth or broom finish for slip resistance.
              </p>
              <p className="mb-6 font-semibold text-navy">
                Our concrete pads are ideal for:
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Hot Tubs &amp; Spas
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Gazebos &amp; Pergolas
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Outdoor Kitchens &amp; BBQ Areas
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Fire Pits &amp; Seating Areas
                </li>
              </ul>
              <p className="text-sm text-slate-muted">
                All pads are poured with high-strength concrete and finished
                with a professional broom finish for safety and aesthetics.
              </p>
            </div>

            {/* Image Column */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/concrete-pad-wide.webp"
                alt="Custom concrete hot tub pad with broom finish installed by Hot Tub Pads in Ontario"
                width={720}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Service 2: Swim Spa Pads ═══════════════ */}
      <section className="bg-light-bg py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image Column (reversed — image first on desktop) */}
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/hot-tub-pad-hero.jpg"
                  alt="Reinforced concrete swim spa pad ready for installation in Ontario"
                  width={720}
                  height={480}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Secondary Image */}
              <div className="mt-6 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/hot-tub-pad-sq.png"
                  alt="Finished swim spa concrete pad with smooth surface by Hot Tub Pads"
                  width={600}
                  height={600}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="order-1 lg:order-2">
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Heavy Duty
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Swim Spa Pads
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-slate-muted">
                Swim spas are larger and heavier than standard hot tubs,
                requiring a stronger, thicker foundation to prevent shifting or
                cracking. Our reinforced concrete swim spa pads are designed to
                handle the extra weight and water movement while keeping your
                spa safe and level for years.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Supports the heavier weight of swim spas and resistance pools
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Prevents sinking, cracking, or shifting over time
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Includes proper drainage and conduit for electrical hookups
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Professional broom-finish surface for safety and durability
                </li>
              </ul>
              <Link
                href="/contact-us"
                className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
              >
                Get A Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Service 3: Gravel Hot Tub Pads ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Column */}
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Budget Friendly
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Gravel Hot Tub Pads
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-slate-muted">
                Gravel pads offer a cost-effective, well-draining base for hot
                tubs, small structures, and garden sheds. Our gravel pad
                installation includes full excavation, weed barrier, and
                compacted crushed gravel for a stable, level foundation.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Full excavation to proper depth with landscape weed barrier
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  High-quality 3/4-inch crushed gravel for excellent drainage
                </li>
                <li className="flex items-start gap-3 text-slate-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  Professional compaction for a flat, stable surface
                </li>
              </ul>
              <p className="rounded-xl border border-orange/20 bg-orange-pale p-4 text-sm text-navy">
                <strong>Ideal for:</strong> Budget-conscious homeowners,
                temporary installations, or lighter hot tubs that don&apos;t
                require the full strength of a concrete pad. Can be relocated or
                adjusted if needed.
              </p>
            </div>

            {/* Image Column */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hot-tub-pad-1.jpg"
                alt="Gravel hot tub pad installation with weed barrier and compacted crushed gravel in Ontario"
                width={720}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
