import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

interface CityPageProps {
  city: string;
  region: string;
  slug: string;
  intro: string;
  localDetail: string;
}

export function generateCityMetadata(city: string, region: string, slug: string): Metadata {
  return {
    title: `Retaining Wall Contractor in ${city}, ${region} | London Retaining Walls`,
    description: `Professional retaining wall installation and repair in ${city}, ${region}. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes from London Retaining Walls.`,
    openGraph: {
      title: `Retaining Wall Contractor in ${city} | London Retaining Walls`,
      description: `Expert retaining wall installation and repair in ${city}, ${region}. Free quotes, all wall types, Ontario Building Code compliant.`,
      url: `${site.url}/${slug}`,
    },
  };
}

export default function CityPageTemplate({ city, region, slug, intro, localDetail }: CityPageProps) {
  const faqs = [
    { q: `Do you install retaining walls in ${city}, ${region}?`, a: `Yes — ${city} is one of our primary service areas. Kyle and his team regularly build and repair retaining walls throughout ${city} and the surrounding area.` },
    { q: "What types of retaining walls do you build?", a: "We build concrete (poured and precast), interlocking block (Permacon, Allan Block), and pressure-treated wood and timber retaining walls. We recommend the best material for your specific site and soil conditions." },
    { q: "Do you provide free quotes?", a: "Yes — all quotes are free and come with no obligation. We assess your site and provide a detailed written estimate before any work begins." },
    { q: "Are your retaining walls Ontario Building Code compliant?", a: "Yes. Walls over 1 metre typically require a permit in Ontario. We handle the compliance process and ensure all work meets or exceeds Ontario Building Code requirements." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Retaining Wall Installation", `Professional retaining wall installation and repair in ${city}, ${region}.`, city)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: city, href: `/${slug}` }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow={`${city}, ${region}`}
        title={`Retaining Wall Contractor in ${city}, ${region}`}
        subtitle={intro}
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Services in city */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Our Services in {city}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {site.services.map((s) => (
                  <Link key={s.href} href={s.href} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all text-sm font-medium group">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Local detail */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Retaining Walls in {city}</h2>
              <p className="text-gray-600 leading-relaxed">{localDetail}</p>
            </div>

            {/* Why us */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Why {city} Homeowners Choose Us</h2>
              <ul className="space-y-3">
                {[
                  "8+ years of retaining wall experience in Southwestern Ontario",
                  "All wall types — concrete, block (Permacon, Allan Block) and wood",
                  "Ontario Building Code compliant — we handle permit requirements",
                  "Proper drainage solutions included in every installation",
                  "Transparent pricing — detailed written quotes before work begins",
                  "Residential and commercial projects welcome",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Pricing in {city}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { service: "Block Wall Installation", price: "$200–$350/ft" },
                  { service: "Concrete Wall", price: "Custom Quote" },
                  { service: "Repair / Assessment", price: "Free Quote" },
                ].map((p) => (
                  <div key={p.service} className="bg-white rounded-xl p-4 shadow-sm text-center border border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 mb-1">{p.service}</p>
                    <p className="text-lg font-extrabold text-[var(--accent)]">{p.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">FAQs — {city}</h2>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-1 text-sm">{f.q}</h3>
                    <p className="text-gray-600 text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="bg-[var(--accent)] -mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-6">
                <h3 className="text-lg font-bold text-white text-center">Free Quote in {city}</h3>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={`Build Your Retaining Wall in ${city}`} />
    </>
  );
}
