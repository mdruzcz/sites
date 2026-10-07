import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { QuoteForm } from "@/components/quote-form";
import { TrustBar } from "@/components/trust-bar";
import { site } from "@/lib/site";
import cityData from "@/content/deck-staining-cities.json";
import { contentFor } from "@/content/service-content";
import { galleryFor } from "@/lib/service-images";
import { READY_SEAL_LINK } from "@/content/sister-sites";

export const revalidate = 3600;

const cities = cityData.cities;
const HERO = "/images/wp-deck-stained-cedar.jpg";

type Params = { city: string };

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) return {};
  return {
    alternates: { canonical: `${site.url}/services/deck-staining/${city}` },
    title: `Deck Staining in ${c.name}, Ontario | Master Decker`,
    description: `Professional deck staining in ${c.name}, Ontario. Master Decker cleans, brightens & stains wood decks to last — free written quote. Serving ${c.name} & ${c.region}.`,
    openGraph: {
      title: `Deck Staining in ${c.name} | Master Decker`,
      description: `Premium deck staining in ${c.name}, Ontario. Free written quote, WSIB-covered, workmanship guaranteed.`,
      url: `${site.url}/services/deck-staining/${city}`,
      images: [HERO],
    },
  };
}

export default async function DeckStainingCityPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) notFound();

  const svc = contentFor("deck-staining-services");
  const benefits = svc?.benefits ?? [];
  const includes = svc?.includes ?? [];
  const faqs = (svc?.faqs ?? []).slice(0, 3);
  const gallery = galleryFor("deck-staining-services", "staining-sealing", 3);
  const nearby = c.nearby.map((s) => cities.find((x) => x.slug === s)).filter(Boolean) as typeof cities;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Deck Staining in ${c.name}, Ontario`,
    serviceType: "Deck Staining",
    description: `Professional deck staining and sealing in ${c.name}, Ontario by Master Decker.`,
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      telephone: site.phone,
      url: site.url,
      image: `${site.url}/images/logo.png`,
      address: { "@type": "PostalAddress", addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    },
    areaServed: { "@type": "City", name: c.name },
    url: `${site.url}/services/deck-staining/${city}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: "Deck Staining", item: `${site.url}/deck-staining-services` },
      { "@type": "ListItem", position: 4, name: c.name, item: `${site.url}/services/deck-staining/${city}` },
    ],
  };

  const faqJsonLd = faqs.length
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })) }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Header />
      <main>
        <Hero
          eyebrow={`Deck Staining · ${c.region}`}
          title={`Deck Staining in ${c.name}, Ontario`}
          subtitle={`Master Decker cleans, brightens, and stains wood decks across ${c.name} — built to survive Ontario winters. Free written quote within 1 business day.`}
          background={HERO}
          primaryCta={{ label: "Get a Free Quote", href: "#quote" }}
          showPhone
        />

        <TrustBar />

        {/* Breadcrumb */}
        <section className="bg-white border-b border-[var(--border)]">
          <div className="container py-3">
            <nav className="text-xs text-[var(--ink-soft)]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/deck-staining-services" className="hover:text-[var(--accent)]">Deck Staining</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--ink)] font-semibold">{c.name}</span>
            </nav>
          </div>
        </section>

        {/* INTRO + QUOTE FORM */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
              <div>
                <h2 className="h-display text-3xl md:text-4xl mb-5">Your local deck staining crew in {c.name}</h2>
                {c.intro.map((p, i) => (
                  <p key={i} className="text-[var(--ink-soft)] leading-relaxed mb-4">{p}</p>
                ))}
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-5 mb-6">
                  {includes.slice(0, 6).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--ink-soft)]">
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href="#quote" className="btn-primary">Get My Free Quote</a>
                  <a href={site.phoneHref} className="btn-outline">{site.phone}</a>
                </div>
              </div>

              <div id="quote" className="lg:sticky lg:top-28 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 shadow-sm scroll-mt-28">
                <QuoteForm compact service="Deck/Fence Staining" city={c.name} heading={`Free Deck Staining Quote — ${c.name}`} subheading="We reply within 1 business day." />
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        {benefits.length > 0 && (
          <section className="section-tight bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="container">
              <div className="grid gap-6 sm:grid-cols-3">
                {benefits.map((b) => (
                  <div key={b.title} className="bg-white p-6 border border-[var(--border)] rounded">
                    <div className="w-10 h-1 bg-[var(--accent)] mb-3" />
                    <h3 className="font-bold text-lg mb-1.5">{b.title}</h3>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GALLERY */}
        {gallery.length > 0 && (
          <section className="section-tight bg-white">
            <div className="container">
              <div className="grid gap-4 sm:grid-cols-3">
                {gallery.map((src, i) => (
                  <div key={i} className="gallery-item">
                    <Image src={src} alt={`Deck staining project in ${c.name} by Master Decker`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--ink-soft)] mt-6 text-center">
                <span className="font-semibold text-[var(--ink)]">The stain we trust:</span> we finish {c.name} decks with premium READY SEAL penetrating stain —{" "}
                <a href={READY_SEAL_LINK.href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] font-bold underline">Ready Seal Direct ↗</a>
              </p>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="section-tight bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="container max-w-4xl">
              <div className="text-center mb-8">
                <p className="eyebrow mb-3">Common Questions</p>
                <h2 className="h-display text-2xl md:text-3xl">Deck staining in {c.name} — FAQs</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((q) => (
                  <details key={q.q} className="group bg-white border border-[var(--border)] p-5 rounded">
                    <summary className="cursor-pointer flex justify-between items-start gap-4 font-bold list-none">
                      <span>{q.q}</span>
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">{q.a}</p>
                  </details>
                ))}
              </div>
              <p className="text-center text-sm text-[var(--ink-soft)] mt-6">
                See the full <Link href="/deck-staining-services" className="text-[var(--accent)] font-bold underline">deck staining service</Link> for our complete process and product options.
              </p>
            </div>
          </section>
        )}

        {/* NEARBY CITIES */}
        {nearby.length > 0 && (
          <section className="section-tight bg-white">
            <div className="container max-w-4xl text-center">
              <p className="eyebrow mb-3">Nearby</p>
              <h2 className="h-display text-2xl md:text-3xl mb-6">We also stain decks in</h2>
              <div className="flex flex-wrap justify-center gap-2.5">
                {nearby.map((n) => (
                  <Link key={n.slug} href={`/services/deck-staining/${n.slug}`} className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-full text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    Deck Staining {n.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Get your {c.name} deck staining quote</h2>
            <p className="text-white/85 mb-8 text-lg">Free, written, and back to you within 1 business day. No obligation.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#quote" className="btn-primary">Get My Free Quote</a>
              <a href={site.phoneHref} className="btn-ghost-light">{site.phone}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
