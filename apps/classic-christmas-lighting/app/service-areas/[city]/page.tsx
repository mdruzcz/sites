import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { getServiceAreas, getServiceAreaBySlug } from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const areas = getServiceAreas();
  return areas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) return {};
  return {
    title: `Christmas Light Installation in ${area.city}, ${area.region} | Classic Christmas Lighting`,
    description: `Professional Christmas light installation in ${area.city}, Ontario. Classic Christmas Lighting serves homes and businesses in ${area.city} with custom LED displays, tree lighting & decorations. Get a free quote.`,
    openGraph: {
      title: `Christmas Light Installation in ${area.city}, ON — Classic Christmas Lighting`,
      description: `Professional holiday lighting services in ${area.city}, Ontario. Family-owned, 15 years experience. Full installation, maintenance & takedown.`,
      images: [{ url: "/images/Classic-Christmas-Lighting.webp", alt: `Professional Christmas light installation in ${area.city}, Ontario` }],
    },
  };
}

const cityImages: Record<string, string> = {
  kitchener: "/images/Classic-Christmas-Lighting-Residential-Light-Installation.jpg",
  waterloo: "/images/Christmas-LIghting-For-Homes-Kitchener-Waterloo.jpg",
  cambridge: "/images/new-pic-2.png",
  guelph: "/images/Christmas-Lighting-Guelph.jpg",
  hamilton: "/images/Christmas-LIght-Installation-For-Businesses-Guelph.jpg",
  woodstock: "/images/new-pic-services-1.jpg",
  stratford: "/images/new-pic-services-3.jpg",
};

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const area = getServiceAreaBySlug(city);
  if (!area) notFound();

  const heroImage = cityImages[city] || "/images/Classic-Christmas-Lighting.webp";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              `Christmas Light Installation in ${area.city}`,
              `Professional Christmas light installation in ${area.city}, Ontario. Classic Christmas Lighting serves homes and businesses with custom LED displays, tree lighting, and decoration services.`,
              area.city
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
              { name: area.city, url: `${site.url}/service-areas/${area.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[var(--dark-bg)]">
        <Image
          src={heroImage}
          alt={`Professional Christmas light installation in ${area.city}, ${area.region} by Classic Christmas Lighting`}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 via-[var(--dark-bg)]/20 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <nav className="text-xs text-white/40 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span>/</span>
            <span className="text-white/60">{area.city}</span>
          </nav>
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-[var(--accent-gold)]" />
            <span className="text-[var(--accent-gold)] text-sm tracking-[0.2em] uppercase font-medium">
              {area.city}, {area.region}
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Professional Christmas Light Installation in{" "}
            <span className="text-[var(--accent)]">{area.city}</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Classic Christmas Lighting brings professional-grade holiday lighting to homes and businesses throughout {area.city} and surrounding {area.region} communities.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[52px] px-10 text-lg">
              Get a Free Quote in {area.city}
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost min-h-[52px] px-10 flex items-center gap-2 justify-center">
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main content + form */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
                  Serving {area.city}, {area.region}
                </p>
                <h2
                  className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-5"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Classic Christmas Lighting in {area.city}
                </h2>
                <div className="space-y-4 text-[var(--muted)] text-sm leading-relaxed">
                  <p>{area.description}</p>
                  <p>
                    Whether you&apos;re looking to transform your home into the most stunning on the street or give your business the festive curb appeal it deserves, our experienced team brings the same professionalism and attention to detail to every project in {area.city}.
                  </p>
                  <p>
                    We never charge travel fees to reach {area.city}. Your quote covers the full service — design, installation, season-long maintenance, and takedown — with no hidden costs.
                  </p>
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl font-bold text-[var(--foreground)] mb-6"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Our Services in {area.city}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Residential Lighting", desc: `Custom LED Christmas light installation for homes throughout ${area.city} — rooflines, trees, windows, and more.`, href: "/services/christmas-lighting-for-homes" },
                    { title: "Commercial Lighting", desc: `Professional holiday lighting for ${area.city} businesses, storefronts, and commercial properties.`, href: "/services/christmas-lighting-for-businesses" },
                    { title: "Tree Lighting", desc: `Beautiful tree wrapping services for indoor and outdoor trees of any size in ${area.city}.`, href: "/services/tree-lighting-services" },
                    { title: "Wreaths & Garlands", desc: `Complete Christmas decoration services including wreaths, garlands, and custom arrangements.`, href: "/services/christmas-decoration-services" },
                  ].map((s) => (
                    <Link key={s.title} href={s.href} className="card p-5 group hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors text-sm" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                        {s.title}
                      </h3>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{s.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl font-bold text-[var(--foreground)] mb-6"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Why {area.city} Homeowners Choose Classic Christmas Lighting
                </h2>
                <div className="space-y-4">
                  {[
                    `No travel charges to ${area.city} — ever`,
                    "15+ years of industry experience",
                    "Commercial-grade, energy-efficient LED lights",
                    "Fully insured — complete peace of mind",
                    "Season-long maintenance included",
                    "Careful, damage-free installation and takedown",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--accent)] shrink-0" />
                      <span className="text-sm text-[var(--foreground)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-5" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  Our Work in {area.region}
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[heroImage, "/images/Classic-Christmas-Lighting-Residential-Light-Installation.jpg", "/images/Classic-Christmas-Lighting.webp"].map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image
                        src={img}
                        alt={`Christmas lights installation in ${area.city}, Ontario by Classic Christmas Lighting`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby areas */}
              {area.nearbyAreas && area.nearbyAreas.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-4" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                    Also Serving Nearby Communities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {area.nearbyAreas.map((nearbyCity) => {
                      const nearbyArea = getServiceAreas().find((a) => a.city === nearbyCity);
                      return nearbyArea ? (
                        <Link
                          key={nearbyCity}
                          href={`/service-areas/${nearbyArea.slug}`}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/40 transition-colors"
                        >
                          <MapPin className="h-3 w-3 text-[var(--accent)]" />
                          {nearbyCity}
                        </Link>
                      ) : (
                        <span
                          key={nearbyCity}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--muted)]"
                        >
                          <MapPin className="h-3 w-3 text-[var(--accent)]" />
                          {nearbyCity}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky form */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="card p-6">
                <QuoteForm heading={`Free Quote in ${area.city}`} showPromise />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Ready to Get Started?</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Book Your {area.city} Christmas Lighting Today
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            November and December slots book up fast. Secure your installation date in {area.city} before they&apos;re gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[52px] px-10 text-base">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost min-h-[52px] px-10 text-base flex items-center gap-2 justify-center">
              <Phone className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
