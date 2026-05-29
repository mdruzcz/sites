import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { SITE, SERVICES } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

interface ServicePageProps {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  description: string;
  intro: string;
  benefits: { title: string; desc: string; icon: string }[];
  included: string[];
  faqs: { question: string; answer: string }[];
  galleryImages?: { src: string; alt: string }[];
}

export default function ServicePage({
  slug, title, tagline, heroImage, description, intro, benefits, included, faqs, galleryImages = [],
}: ServicePageProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: title,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
    },
    areaServed: ["London ON", "St. Thomas ON", "Woodstock ON"],
    description,
    url: `${SITE.url}/services/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={`${title} by K&M Kitchen Renovations`} fill className="object-cover" priority quality={90} placeholder="blur" blurDataURL={blurDataURL(8, 5)} />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-900)]/95 to-[var(--navy-900)]/40" />
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl py-20">
          <nav className="text-white/60 text-sm mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </nav>
          <div className="max-w-2xl">
            <div className="eyebrow mb-2">K&M Service</div>
            <h1 className="h-display text-white text-5xl sm:text-6xl mb-4">{title}</h1>
            <p className="text-white/80 text-xl mb-8 leading-relaxed">{tagline}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#quote" className="btn btn-primary text-base">Get a Free Quote</Link>
              <a href={`tel:${SITE.phonePlain}`} className="btn btn-ghost text-base">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">What We Do</div>
              <h2 className="h-display text-[var(--navy)] text-4xl mb-6">{title} in Southwestern Ontario</h2>
              <p className="text-[var(--slate)] text-lg leading-relaxed mb-6">{intro}</p>
              <div className="mb-8">
                <h3 className="font-bold text-[var(--navy)] mb-4">What&apos;s Included</h3>
                <ul className="space-y-2">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[var(--slate)] text-sm">
                      <svg className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="#quote" className="btn btn-primary">Get a Free Quote</Link>
            </div>
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.slice(0, 4).map((img, i) => (
                  <div key={i} className={`relative rounded-xl overflow-hidden img-overlay ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
                    <Image src={img.src} alt={img.alt} fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden img-overlay">
                <Image src={heroImage} alt={`${title} example project by K&M`} fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="h-display text-white text-4xl mb-4">Why Choose K&M for {title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{b.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-[var(--surface)]">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="h-display text-[var(--navy)] text-4xl mb-4">Common Questions</h2>
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
      )}

      {/* Other services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center font-bold text-[var(--navy)] text-2xl mb-8">Other Services We Offer</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group p-4 text-center hover:border-[var(--gold)] transition-all">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-semibold text-[var(--navy)] text-xs group-hover:text-[var(--gold)] transition-colors">{s.shortTitle}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section id="quote" className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="eyebrow">Free Quote</div>
              <h2 className="h-display text-white text-4xl mb-6">Ready for Your {title}?</h2>
              <p className="text-white/75 text-lg mb-6 leading-relaxed">
                Get a free, detailed quote from our team. We respond within 24 hours and can begin your project in as little as 1–2 weeks.
              </p>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                <svg className="w-10 h-10 text-[var(--gold)] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <div>
                  <div className="text-white/70 text-xs">Call us directly</div>
                  <a href={`tel:${SITE.phonePlain}`} className="text-[var(--gold)] font-bold text-xl hover:text-yellow-300 transition-colors">{SITE.phone}</a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="font-bold text-[var(--navy)] text-xl mb-2">Get Your Free Quote</h3>
              <p className="text-[var(--slate-light)] text-sm mb-6">24-hour response guaranteed.</p>
              <QuoteForm source={`service-${slug}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
