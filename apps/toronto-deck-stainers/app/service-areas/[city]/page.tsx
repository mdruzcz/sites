import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas, getCityBySlug, getServices } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  return {
    title: `Deck Staining in ${city.name}, ON | Toronto Deck Stainers`,
    description: `Professional deck staining, sealing, and restoration in ${city.name}, Ontario. 15+ years, 1,500+ decks restored. Licensed, insured, free estimates.`,
    openGraph: { title: `Deck Staining ${city.name}`, description: `Expert deck and fence staining in ${city.name}, ON.`, url: `${site.url}/service-areas/${citySlug}` },
  };
}

export const revalidate = 3600;

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const services = getServices();
  const areas = getServiceAreas();
  const otherCities = areas.cities.filter((c) => c.slug !== citySlug).slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Service Areas", url: `${site.url}/service-areas` },
        { name: city.name, url: `${site.url}/service-areas/${citySlug}` },
      ])) }} />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/service-areas" className="hover:text-white">Service Areas</Link>
            <span>/</span>
            <span className="text-white/80">{city.name}</span>
          </nav>
          <p className="eyebrow">Serving {city.name}</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining &amp; Restoration in {city.name}, Ontario
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-8">
            {city.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#get-quote" className="btn btn-primary">Get a Free Estimate in {city.name}</a>
            <a href={site.phoneHref} className="btn btn-ghost">{site.phone}</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 prose-cd">
              <h2>Deck Staining in {city.name}, ON</h2>
              <p>
                Toronto Deck Stainers provides professional deck staining, sealing, refinishing, and full
                restoration services throughout {city.name} and surrounding areas. Our team brings the same
                15+ years of GTA expertise and premium eco-friendly products to every {city.name} project —
                protecting your outdoor wood surfaces against Ontario&apos;s demanding climate.
              </p>
              <p>
                We understand that {city.name} homeowners expect quality and professionalism. That&apos;s why
                every project starts with a free on-site assessment, includes a written estimate before any
                work begins, and ends with a final walkthrough to ensure your complete satisfaction.
              </p>

              <h3>Services Available in {city.name}</h3>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}><strong>{s.title}</strong> — {s.shortDescription}</li>
                ))}
              </ul>

              <h3>Why {city.name} Homeowners Trust Us</h3>
              <ul>
                <li>Over 15 years serving Toronto and the GTA, including {city.name}</li>
                <li>1,500+ decks restored — a proven track record of results</li>
                <li>Licensed, fully insured, and WSIB compliant</li>
                <li>Free on-site estimates with no obligation</li>
                <li>Premium eco-friendly, low-VOC stains safe for families and pets</li>
                <li>Transparent written pricing — no surprises, no hidden fees</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--charcoal)] mb-4 text-sm uppercase tracking-wide">Other Service Areas</h3>
                <ul className="space-y-2">
                  {otherCities.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/service-areas/${c.slug}`} className="text-sm text-[var(--accent)] hover:underline">
                        {c.name}, ON →
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/service-areas" className="block mt-3 text-xs text-[var(--concrete)] hover:text-[var(--accent)]">View all service areas</Link>
              </div>

              <div className="card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-[var(--charcoal)] mb-2 text-sm">Contact Us</h3>
                <p className="text-sm text-[var(--concrete)] mb-3">Serving {city.name} — call or request a free estimate online.</p>
                <a href={site.phoneHref} className="btn btn-primary w-full text-sm">{site.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="get-quote" className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="eyebrow justify-center">Free Estimate</p>
            <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-3">
              Get a Free Quote in {city.name}
            </h2>
            <p className="text-[var(--concrete)]">
              We reply within {site.responseTime}. No obligation.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
