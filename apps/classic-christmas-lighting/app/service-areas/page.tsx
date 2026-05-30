import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { getServiceAreas } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas | Christmas Light Installation in Southern Ontario — Classic Christmas Lighting",
  description:
    "Classic Christmas Lighting serves Kitchener, Waterloo, Cambridge, Guelph, Hamilton, Woodstock, Stratford, and surrounding Southern Ontario communities. No travel charges.",
  openGraph: {
    title: "Christmas Light Installation Service Areas — Classic Christmas Lighting",
    description: "Serving Kitchener-Waterloo, Guelph, Cambridge, Hamilton, Woodstock, Stratford & Southern Ontario. No travel charges within our service area.",
    images: [{ url: "/images/Classic-Christmas-Lighting.webp", alt: "Classic Christmas Lighting service areas in Southern Ontario" }],
  },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-[var(--dark-bg)] overflow-hidden">
        <Image
          src="/images/Christmas-Lighting-Guelph.jpg"
          alt="Classic Christmas Lighting serving homes and businesses across Kitchener-Waterloo and Southern Ontario"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Service Areas</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">Where We Work</p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Serving Kitchener-Waterloo &amp; Southern Ontario
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            We travel to customers throughout the Kitchener-Waterloo region and beyond. We never charge for travel within our service area.
          </p>
        </div>
      </section>

      {/* Area cards */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Communities We Serve
          </p>
          <h2
            className="text-center text-3xl font-bold text-[var(--foreground)] mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Christmas Light Installation Across Southern Ontario
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="card p-6 group hover:shadow-lg transition-shadow hover:border-[var(--accent)]/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h2
                      className="font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
                      style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                    >
                      {area.city}
                    </h2>
                    <p className="text-xs text-[var(--muted)]">{area.region}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                  {area.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--accent)] group-hover:text-[var(--accent-dark)] transition-colors">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wide service area section */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">No Travel Charges</p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                We Come to You — At No Extra Cost
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Unlike some companies, we never add travel fees for any location within our service area. Whether you&apos;re in downtown Kitchener or a rural property outside Woodstock, you pay for our service — not our drive time.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                We travel within one hour to customers throughout the Kitchener-Waterloo region and Southern Ontario. If you&apos;re not sure whether we serve your area, just give us a call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn btn-primary min-h-[48px]">
                  Get a Free Quote
                </Link>
                <a href={site.phoneHref} className="btn btn-ghost min-h-[48px] flex items-center gap-2 justify-center">
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/Classic-Christmas-Lighting-Residential-Light-Installation.jpg"
                alt="Classic Christmas Lighting serving all of Southern Ontario with professional Christmas light installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
