import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Toronto & GTA | Toronto Deck Stainers`,
    description: `${service.shortDescription} Serving Toronto, Richmond Hill, Vaughan, Markham & all GTA. Free estimates — call (647) 478-7379.`,
    openGraph: { title: `${service.title} — Toronto Deck Stainers`, description: service.shortDescription, url: `${site.url}/services/${slug}` },
  };
}

export const revalidate = 3600;

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();
  const cityPages = slug === "deck-staining" ? areas.cities : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Services", url: `${site.url}/services` },
        { name: service.title, url: `${site.url}/services/${slug}` },
      ])) }} />

      {/* Hero */}
      <section className="relative bg-[var(--charcoal-900)] min-h-[50vh] flex items-center">
        <Image src={service.image} alt={`${service.title} in Toronto GTA by Toronto Deck Stainers`} fill className="object-cover opacity-25" priority />
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white/80">{service.title}</span>
          </nav>
          <p className="eyebrow">Professional Service</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            {service.title} in Toronto &amp; GTA
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
            {service.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#get-quote" className="btn btn-primary">Get a Free Estimate</a>
            <a href={site.phoneHref} className="btn btn-ghost">{site.phone}</a>
          </div>
        </div>
      </section>

      {/* Full description */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="eyebrow">About This Service</p>
              <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-6">
                What Is {service.title}?
              </h2>
              <div className="prose-cd">
                {service.fullDescription.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--charcoal)] mb-4 text-sm uppercase tracking-wide">Key Benefits</h3>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-[var(--charcoal)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-[var(--charcoal)] mb-2 text-sm">Why Toronto Deck Stainers?</h3>
                <ul className="space-y-1.5 text-sm text-[var(--concrete)]">
                  <li>✓ 15+ years GTA experience</li>
                  <li>✓ 1,500+ decks restored</li>
                  <li>✓ Licensed &amp; fully insured</li>
                  <li>✓ Free on-site estimates</li>
                  <li>✓ Eco-friendly products</li>
                  <li>✓ Satisfaction guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City pages for deck staining */}
      {cityPages.length > 0 && (
        <section className="py-14 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-2 text-center">
              Deck Staining Across the GTA
            </h2>
            <p className="text-[var(--concrete)] text-center mb-8">
              Serving all of Greater Toronto — click your city for local information.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {cityPages.map((city) => (
                <Link
                  key={city.slug}
                  href={`/services/deck-staining/${city.slug}`}
                  className="card p-4 text-center hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all group"
                >
                  <p className="font-semibold text-[var(--charcoal)] group-hover:text-[var(--accent)] text-sm transition-colors">
                    {city.name}
                  </p>
                  <p className="text-xs text-[var(--concrete)] mt-1">View →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote */}
      <section id="get-quote" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="eyebrow justify-center">Free Estimate</p>
            <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-3">
              Get a Quote for {service.title}
            </h2>
            <p className="text-[var(--concrete)]">
              We reply within {site.responseTime}. No obligation.
            </p>
          </div>
          <QuoteForm defaultService={service.title} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
