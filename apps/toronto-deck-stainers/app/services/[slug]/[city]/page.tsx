import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateStaticParams() {
  const areas = getServiceAreas();
  return areas.cities.map((city) => ({ slug: "deck-staining", city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};

  return {
    title: `Deck Staining in ${city.name}, ON | Toronto Deck Stainers`,
    description: `Professional deck staining in ${city.name}, Ontario. Premium eco-friendly stains built for Canadian winters — UV, moisture & freeze-thaw protection. Free estimates.`,
    openGraph: {
      title: `Deck Staining ${city.name} | Toronto Deck Stainers`,
      description: `Expert deck staining, sealing, and restoration in ${city.name}, ON. 15+ years, 1,500+ decks restored across the GTA.`,
      url: `${site.url}/services/${slug}/${citySlug}`,
    },
  };
}

export const revalidate = 3600;

export default async function CityServicePage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const areas = getServiceAreas();
  const otherCities = areas.cities.filter((c) => c.slug !== citySlug).slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city.name)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Services", url: `${site.url}/services` },
        { name: service.title, url: `${site.url}/services/${slug}` },
        { name: city.name, url: `${site.url}/services/${slug}/${citySlug}` },
      ])) }} />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services/${slug}`} className="hover:text-white transition-colors">{service.title}</Link>
            <span>/</span>
            <span className="text-white/80">{city.name}</span>
          </nav>
          <p className="eyebrow">Local Service</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining in {city.name}, Ontario
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
            Professional deck staining, sealing, and restoration for {city.name} homeowners.
            Premium eco-friendly stains built for Ontario&apos;s climate — protecting your deck from
            freeze-thaw damage, UV fading, and spring moisture.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#get-quote" className="btn btn-primary">Get a Free Estimate in {city.name}</a>
            <a href={site.phoneHref} className="btn btn-ghost">{site.phone}</a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose-cd">
              <h2>Professional Deck Staining in {city.name}, ON</h2>
              <p>
                {city.description} At Toronto Deck Stainers, we&apos;ve been restoring and protecting
                outdoor wood surfaces across the GTA since 2008 — including {city.name} and the surrounding communities.
              </p>
              <p>
                Deck staining in {city.name} isn&apos;t just a cosmetic service — it&apos;s essential protection
                against Ontario&apos;s demanding climate. With 70+ freeze-thaw cycles per year, heavy spring
                rainfall, and intense UV summers, untreated wood deteriorates rapidly. Our premium oil-based
                penetrating stains are engineered specifically for these conditions, protecting your deck from
                within the wood fibres rather than just on the surface.
              </p>

              <h3>Our Deck Staining Process in {city.name}</h3>
              <p>
                Every deck staining project we complete in {city.name} follows our proven 6-step process:
                free on-site assessment, professional power washing, surface repairs where needed,
                surface preparation, professional stain application in your chosen colour, and a final
                walkthrough with care tips.
              </p>

              <h3>Why {city.name} Homeowners Choose Toronto Deck Stainers</h3>
              <ul>
                <li>15+ years restoring decks across the Greater Toronto Area</li>
                <li>1,500+ decks restored — proven results homeowners trust</li>
                <li>Premium eco-friendly, low-VOC stains and sealers</li>
                <li>Licensed, fully insured, and WSIB compliant</li>
                <li>Free on-site estimates with no obligation</li>
                <li>Transparent pricing — written estimate before any work begins</li>
              </ul>

              <h3>Deck Staining Services Available in {city.name}</h3>
              <ul>
                <li><strong>Deck Staining</strong> — 1 or 2 coat premium oil-based stain in your choice of colour</li>
                <li><strong>Deck Sealing</strong> — Complete waterproofing with clear or tinted sealer</li>
                <li><strong>Deck Refinishing</strong> — Full sand-down and fresh stain over weathered wood</li>
                <li><strong>Deck Restoration</strong> — Structural repairs plus complete staining and sealing</li>
                <li><strong>Fence Staining</strong> — Both-sides staining with power wash prep</li>
                <li><strong>Power Washing</strong> — Professional-grade pre-stain prep or standalone service</li>
              </ul>

              <h3>How Much Does Deck Staining Cost in {city.name}?</h3>
              <p>
                Deck staining in {city.name} typically ranges from $400–$700 for a small deck (single coat)
                to $1,200–$2,000+ for a large deck. The exact price depends on your deck&apos;s size,
                current condition, and the finish you choose. We provide free, detailed written estimates
                with no obligation — call us at <a href={site.phoneHref}>{site.phone}</a> or fill out the
                form below and we&apos;ll be in touch within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--charcoal)] mb-4 text-sm uppercase tracking-wide">
                  Serving {city.name} &amp; Nearby
                </h3>
                <ul className="space-y-2">
                  {otherCities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/services/deck-staining/${c.slug}`} className="text-sm text-[var(--accent)] hover:underline">
                        Deck Staining in {c.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-[var(--charcoal)] mb-2 text-sm">Contact Us</h3>
                <p className="text-sm text-[var(--concrete)] mb-3">Serving {city.name} — Free estimates within 24 hours.</p>
                <a href={site.phoneHref} className="btn btn-primary w-full text-sm">{site.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section id="get-quote" className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="eyebrow justify-center">Free Estimate</p>
            <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-3">
              Get a Free Deck Staining Quote in {city.name}
            </h2>
            <p className="text-[var(--concrete)]">
              We reply within {site.responseTime}. No obligation, no high-pressure sales.
            </p>
          </div>
          <QuoteForm defaultService={service.title} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
