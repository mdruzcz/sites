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
import services from "@/content/services.json";
import { imageFor, galleryFor } from "@/lib/service-images";
import { contentFor } from "@/content/service-content";
import { sisterLinksFor, supplierFor } from "@/content/sister-sites";
import cityData from "@/content/deck-staining-cities.json";

export const revalidate = 3600;

const allServices = services.categories.flatMap((c) => c.services.map((s) => ({ ...s, category: c.name, categoryId: c.id })));

const reservedSlugs = new Set([
  "about", "services", "contact", "faq", "service-locations", "project-examples", "blog",
  "api", "_next", "images", "sitemap.xml", "robots.txt",
]);

type Params = { slug: string };

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = allServices.find((s) => s.slug === slug);
  if (!svc) return {};
  const c = contentFor(slug);
  const title = c?.metaTitle ?? `${svc.title} | Master Decker | London Ontario`;
  const description = c?.metaDescription ?? `${svc.blurb} Master Decker serves London Ontario and Southwestern Ontario — free estimates, written quotes, no surprises.`;
  return {
    alternates: { canonical: `${site.url}/${slug}` },
    title,
    description,
    openGraph: {
      title: `${svc.title} | Master Decker`,
      description,
      url: `${site.url}/${slug}`,
      images: [imageFor(svc.slug, svc.categoryId)],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (reservedSlugs.has(slug)) notFound();
  const svc = allServices.find((s) => s.slug === slug);
  if (!svc) notFound();

  const c = contentFor(slug);
  const related = allServices.filter((s) => s.categoryId === svc.categoryId && s.slug !== svc.slug).slice(0, 3);
  const sisters = sisterLinksFor(slug);
  const supplier = supplierFor(slug);
  const bg = imageFor(svc.slug, svc.categoryId);
  const gallery = galleryFor(svc.slug, svc.categoryId, 3);

  const lead = c?.lead ?? svc.blurb;
  const intro = c?.intro ?? [
    `Master Decker has been delivering professional ${svc.title.toLowerCase()} services across London Ontario and Southwestern Ontario since ${site.foundedYear}. Every project starts with a free, on-site consultation and a detailed, written quote — no surprises.`,
  ];
  const sections = c?.sections ?? [];
  const includes = c?.includes ?? [
    "Free on-site consultation and detailed written estimate",
    "Premium materials sourced from trusted Ontario suppliers",
    "Experienced crews — clear timelines, clean job sites",
    "WSIB-covered, fully insured, satisfaction guaranteed",
  ];
  const benefits = c?.benefits ?? [];
  const faqs = c?.faqs ?? [];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    serviceType: svc.title,
    description: c?.metaDescription ?? svc.blurb,
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      telephone: site.phone,
      url: site.url,
      image: `${site.url}/images/logo.png`,
      address: { "@type": "PostalAddress", addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    },
    areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
    url: `${site.url}/${slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: svc.title, item: `${site.url}/${slug}` },
    ],
  };

  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
      <Header />
      <main>
        <Hero
          eyebrow={svc.category}
          title={svc.title}
          subtitle={lead}
          background={bg}
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
              <Link href="/services" className="hover:text-[var(--accent)]">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--ink)] font-semibold">{svc.title}</span>
            </nav>
          </div>
        </section>

        {/* INTRO + EMBEDDED QUOTE FORM (above the fold conversion zone) */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
              <div>
                <h2 className="h-display text-3xl md:text-4xl mb-5">{svc.title} in London &amp; Southwestern Ontario</h2>
                <p className="text-lg text-[var(--ink-soft)] leading-relaxed mb-6">{intro[0]}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
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
                <QuoteForm
                  compact
                  service={svc.title}
                  heading="Get Your Free Quote"
                  subheading={`Tell us about your ${svc.title.toLowerCase()} project — we reply within 1 business day.`}
                />
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

        {/* PHOTO GALLERY */}
        {gallery.length > 0 && (
          <section className="section-tight bg-white">
            <div className="container">
              <div className="grid gap-4 sm:grid-cols-3">
                {gallery.map((src, i) => (
                  <div key={i} className="gallery-item">
                    <Image src={src} alt={`${svc.title} project ${i + 1} by Master Decker in Southwestern Ontario`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DETAIL — collapsed by default to keep the page light, open for detail + SEO */}
        {(sections.length > 0 || intro.length > 1) && (
          <section className="section-tight bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="container max-w-4xl">
              <div className="text-center mb-8">
                <p className="eyebrow mb-3">The Detail</p>
                <h2 className="h-display text-2xl md:text-3xl">How we approach your {svc.title.toLowerCase()}</h2>
                <p className="text-sm text-[var(--ink-soft)] mt-2">Tap any section to read more about our process and materials.</p>
              </div>
              <div className="space-y-3">
                {intro.length > 1 && (
                  <details className="group bg-white border border-[var(--border)] rounded p-5">
                    <summary className="cursor-pointer flex justify-between items-center font-bold list-none">
                      <span>Why {svc.title.toLowerCase()} matters in Ontario&apos;s climate</span>
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="prose-md mt-3">
                      {intro.slice(1).map((p, i) => (<p key={i}>{p}</p>))}
                    </div>
                  </details>
                )}
                {sections.map((sec) => (
                  <details key={sec.h} className="group bg-white border border-[var(--border)] rounded p-5">
                    <summary className="cursor-pointer flex justify-between items-center font-bold list-none">
                      <span>{sec.h}</span>
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <div className="prose-md mt-3">
                      {sec.body.map((p, i) => (<p key={i}>{p}</p>))}
                    </div>
                  </details>
                ))}
              </div>

              {/* Materials we use (supplier cross-link) */}
              {supplier && (
                <p className="text-sm text-[var(--ink-soft)] mt-6 text-center">
                  <span className="font-semibold text-[var(--ink)]">Materials we use:</span>{" "}
                  {supplier.blurb.replace(supplier.label, "").trim()}{" "}
                  <a href={supplier.href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] font-bold underline">{supplier.label} ↗</a>
                </p>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="section-tight bg-white">
            <div className="container max-w-4xl">
              <div className="text-center mb-8">
                <p className="eyebrow mb-3">Common Questions</p>
                <h2 className="h-display text-2xl md:text-3xl">{svc.title} FAQs</h2>
              </div>
              <div className="space-y-3">
                {faqs.map((q) => (
                  <details key={q.q} className="group bg-[var(--surface)] border border-[var(--border)] p-5 rounded">
                    <summary className="cursor-pointer flex justify-between items-start gap-4 font-bold list-none">
                      <span>{q.q}</span>
                      <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="mt-3 text-sm text-[var(--ink-soft)] leading-relaxed">{q.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SISTER SITES (compact) */}
        {sisters.length > 0 && (
          <section className="section-tight bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="container max-w-4xl text-center">
              <p className="eyebrow mb-3">In Our Network</p>
              <p className="text-[var(--ink-soft)] text-sm mb-5 max-w-2xl mx-auto">Looking for a dedicated single-trade specialist? These partner sites in our network may be the right fit.</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {sisters.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-[var(--border)] px-4 py-2 rounded-full text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    {s.label}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DECK STAINING BY CITY (core local-SEO landing pages) */}
        {slug === "deck-staining-services" && (
          <section className="section-tight bg-white">
            <div className="container max-w-4xl text-center">
              <p className="eyebrow mb-3">Deck Staining Near You</p>
              <h2 className="h-display text-2xl md:text-3xl mb-3">Deck staining across Southwestern Ontario</h2>
              <p className="text-[var(--ink-soft)] text-sm mb-6 max-w-2xl mx-auto">We&apos;re local to your city. Pick yours for area-specific details — or just request a quote above.</p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {cityData.cities.map((ct) => (
                  <Link key={ct.slug} href={`/services/deck-staining/${ct.slug}`} className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] px-4 py-2 rounded-full text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    Deck Staining {ct.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RELATED SERVICES */}
        {related.length > 0 && (
          <section className="section-tight bg-white">
            <div className="container">
              <div className="text-center mb-10">
                <p className="eyebrow mb-3">Related Services</p>
                <h2 className="h-display text-2xl md:text-3xl">More from {svc.category}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="svc-card" aria-label={r.title}>
                    <div className="svc-card-bg" style={{ backgroundImage: `url(${imageFor(r.slug, r.categoryId)})` }} role="img" aria-label={r.title} />
                    <div className="svc-card-overlay" />
                    <div className="svc-card-content">
                      <div className="svc-card-title">{r.title}</div>
                      <p className="svc-card-desc">{r.blurb}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Ready for your free estimate?</h2>
            <p className="text-white/85 mb-8 text-lg">
              Tell us about your {svc.title.toLowerCase()} project — we&apos;ll respond within 1 business day with a detailed, written quote.
            </p>
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
