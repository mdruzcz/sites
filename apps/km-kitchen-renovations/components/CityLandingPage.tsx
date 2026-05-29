import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { SITE, SERVICES, TESTIMONIALS } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

interface CityPageProps {
  city: string;
  province: string;
  slug: string;
  heroImage: string;
  secondaryImage: string;
  population: string;
  neighbourhoods: readonly string[];
  description: string;
  intro: string;
  whyUs: { title: string; desc: string }[];
  localContext: string;
  faqs: { question: string; answer: string }[];
}

export default function CityLandingPage({
  city, province, slug, heroImage, secondaryImage, population, neighbourhoods,
  description, intro, whyUs, localContext, faqs,
}: CityPageProps) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Kitchen Renovations in ${city}, ${province}`,
    serviceType: "Kitchen Renovation",
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
    },
    areaServed: {
      "@type": "City",
      name: city,
      addressRegion: province,
      addressCountry: "CA",
    },
    description,
    offers: {
      "@type": "Offer",
      priceRange: "$8,000 – $80,000+",
      priceCurrency: "CAD",
    },
    url: `${SITE.url}/service-areas/${slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.url}/service-areas` },
      { "@type": "ListItem", position: 3, name: `${city} Kitchen Renovations`, item: `${SITE.url}/service-areas/${slug}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={`Kitchen renovation in ${city}, ${province} by K&M Kitchen Renovations`}
            fill
            className="object-cover"
            priority
            quality={90}
            placeholder="blur"
            blurDataURL={blurDataURL(8, 5)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-900)]/95 via-[var(--navy-900)]/80 to-[var(--navy-900)]/20" />
        </div>

        <div className="relative container mx-auto px-4 max-w-6xl py-20">
          {/* Breadcrumb */}
          <nav className="text-white/60 text-sm mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-white">{city}</span>
          </nav>

          <div className="max-w-2xl">
            <div className="eyebrow mb-2">{city}, {province}</div>
            <h1 className="h-display text-white text-5xl sm:text-6xl mb-6">
              Kitchen Renovations{" "}
              <span className="text-[var(--gold)]">in {city}</span>
            </h1>
            <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="#quote" className="btn btn-primary text-base px-8 py-4">
                Get My Free Quote
              </Link>
              <a href={`tel:${SITE.phonePlain}`} className="btn btn-ghost text-base px-8 py-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {SITE.phone}
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: "⚡", label: "Ready in 2 Weeks" },
                { icon: "🏠", label: `Serving ${city} & Area` },
                { icon: "💬", label: "Free Consultation" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust bar ─── */}
      <div className="bg-[var(--gold)] py-5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { n: "10+", l: "Years Experience" },
              { n: "2 Wks", l: "Average Timeline" },
              { n: "Free", l: "Quote & Consult" },
              { n: "100%", l: "Satisfaction" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-[var(--navy-900)]">{s.n}</div>
                <div className="text-xs font-semibold text-[var(--navy-800)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Why K&M in this city ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">Local Expertise</div>
              <h2 className="h-display text-[var(--navy)] text-4xl mb-6">
                Your Trusted Kitchen Contractor in {city}
              </h2>
              <p className="text-[var(--slate)] text-lg mb-6 leading-relaxed">{intro}</p>
              <p className="text-[var(--slate)] leading-relaxed mb-8">{localContext}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {neighbourhoods.map((n) => (
                  <span key={n} className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-xs font-semibold text-[var(--navy)]">
                    📍 {n}
                  </span>
                ))}
              </div>
              <Link href="#quote" className="btn btn-primary">
                Get a Free {city} Quote
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden img-overlay">
              <Image
                src={secondaryImage}
                alt={`Beautiful kitchen renovation completed by K&M in ${city}, Ontario`}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services in this city ─── */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">What We Offer in {city}</div>
            <h2 className="h-display text-[var(--navy)] text-4xl mb-4">
              Full Kitchen &amp; Bathroom Renovation Services
            </h2>
            <p className="text-[var(--slate)] text-lg max-w-2xl mx-auto">
              Every service we offer in London is available to {city} homeowners with the same quality and turnaround.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group hover:shadow-lg hover:border-[var(--gold)] transition-all duration-200 p-5 block">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-[var(--navy)] mb-2 text-base group-hover:text-[var(--gold)] transition-colors">{s.shortTitle}</h3>
                <p className="text-[var(--slate-light)] text-xs leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="h-display text-white text-4xl mb-4">
              Why {city} Homeowners Choose K&M
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[var(--gold)]" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{w.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">How It Works</div>
            <h2 className="h-display text-[var(--navy)] text-4xl mb-4">
              Your {city} Kitchen Renovation, Step by Step
            </h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-[var(--border)]" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                { n: "1", title: "Free Consultation", desc: `Contact us online or call. We respond quickly and often visit ${city} homes the same week.` },
                { n: "2", title: "Site Visit & Quote", desc: "We assess your kitchen and provide a detailed, itemized quote with no hidden fees." },
                { n: "3", title: "Demolition & Build", desc: "We remove the old kitchen and install your new cabinets, countertops, and finishes." },
                { n: "4", title: "Final Reveal", desc: `Walk into your transformed ${city} kitchen — most projects done in just 2 weeks.` },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--gold)] text-[var(--navy-900)] font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                    {step.n}
                  </div>
                  <h3 className="font-bold text-[var(--navy)] mb-2">{step.title}</h3>
                  <p className="text-[var(--slate)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">Client Reviews</div>
            <h2 className="h-display text-[var(--navy)] text-4xl mb-4">
              Real Results, Happy Clients
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[var(--gold)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-[var(--slate)] text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--navy)] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-[var(--navy)] text-xs">{t.name}</div>
                    <div className="text-[var(--slate-light)] text-xs">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">Questions</div>
            <h2 className="h-display text-[var(--navy)] text-4xl mb-4">
              Kitchen Renovation FAQ — {city}
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="card p-6 group">
                <summary className="cursor-pointer flex justify-between items-center gap-4 font-bold text-[var(--navy)] list-none">
                  {f.question}
                  <svg className="w-5 h-5 text-[var(--gold)] flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-[var(--slate)] leading-relaxed mt-4 text-sm">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quote CTA ─── */}
      <section id="quote" className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="eyebrow">Free Quote</div>
              <h2 className="h-display text-white text-4xl lg:text-5xl mb-6">
                Start Your {city} Kitchen Renovation Today
              </h2>
              <p className="text-white/75 text-lg mb-8 leading-relaxed">
                We serve {city} homeowners with the same quality and care we bring to every project. Get your free, no-obligation quote and let&apos;s talk about your dream kitchen.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { icon: "⚡", title: "24-Hour Response", desc: "We respond to all quote requests within one business day — often same day." },
                  { icon: "🏆", title: "Projects Done in 2 Weeks", desc: "Minimal disruption to your home and family." },
                  { icon: "💳", title: "Flexible Financing", desc: "60-day financing at competitive rates. Start now, pay later." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="text-2xl flex-shrink-0">{f.icon}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{f.title}</div>
                      <div className="text-white/65 text-sm mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                <svg className="w-10 h-10 text-[var(--gold)] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <div>
                  <div className="text-white/70 text-xs">Prefer to call?</div>
                  <a href={`tel:${SITE.phonePlain}`} className="text-[var(--gold)] font-bold text-xl hover:text-yellow-300 transition-colors">{SITE.phone}</a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="font-bold text-[var(--navy)] text-xl mb-2">
                Free Quote for {city} Homeowners
              </h3>
              <p className="text-[var(--slate-light)] text-sm mb-6">
                Fill out the form and we&apos;ll be in touch within 24 hours.
              </p>
              <QuoteForm source={`city-${city.toLowerCase().replace(" ", "-")}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Nearby Areas ─── */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p className="text-[var(--slate)] text-sm mb-4">Also serving nearby communities:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { slug: "london", city: "London" },
              { slug: "st-thomas", city: "St. Thomas" },
              { slug: "woodstock", city: "Woodstock" },
              { slug: "hamilton", city: "Hamilton" },
              { slug: "kitchener-waterloo", city: "Kitchener-Waterloo" },
              { slug: "stratford", city: "Stratford" },
            ].filter((a) => a.slug !== slug).map((a) => (
              <Link key={a.slug} href={`/service-areas/${a.slug}`} className="px-4 py-2 rounded-full border border-[var(--border)] bg-white text-sm font-semibold text-[var(--navy)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
                {a.city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
