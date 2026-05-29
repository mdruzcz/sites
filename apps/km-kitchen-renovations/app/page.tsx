import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { SITE, SERVICES, TESTIMONIALS, FAQS, SERVICE_AREAS } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expert Kitchen Renovations in London, ON | K&M Kitchen Renovations",
  description:
    "London's trusted kitchen renovation contractor. Beautiful kitchens and bathrooms completed in as little as 2 weeks. Free quotes. Serving London, St. Thomas, Woodstock & surrounding areas.",
  openGraph: {
    title: "Expert Kitchen Renovations in London, ON | K&M Kitchen Renovations",
    description:
      "Transform your kitchen in as little as 2 weeks. Expert craftsmanship, free quotes, and flexible financing across Southwestern Ontario.",
    images: [{ url: "/images/kitchen-2.jpg" }],
  },
};

const galleryImages = [
  { src: "/images/kitchen-1.jpg", alt: "Modern white kitchen renovation with island by K&M Kitchen Renovations, London ON" },
  { src: "/images/kitchen-2.jpg", alt: "Custom shaker cabinet kitchen remodel by K&M Kitchen Renovations" },
  { src: "/images/kitchen-3.jpg", alt: "Open-concept kitchen renovation with quartz countertops" },
  { src: "/images/kitchen-4.jpg", alt: "Navy blue kitchen cabinets with brass hardware renovation" },
  { src: "/images/kitchen-5.jpg", alt: "White kitchen with marble backsplash – K&M renovation London ON" },
  { src: "/images/kitchen-9.jpg", alt: "Contemporary kitchen remodel with waterfall island countertop" },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: 42.9849, longitude: -81.2453 },
    areaServed: ["London ON", "St. Thomas ON", "Woodstock ON", "Hamilton ON", "Kitchener-Waterloo ON"],
    priceRange: "$$",
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    ],
    image: galleryImages.map((g) => `${SITE.url}${g.src}`),
    sameAs: [],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kitchen-2.jpg"
            alt="Beautiful custom kitchen renovation by K&M Kitchen Renovations, London Ontario"
            fill
            className="object-cover"
            priority
            quality={90}
            placeholder="blur"
            blurDataURL={blurDataURL(8, 5)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-900)]/95 via-[var(--navy-900)]/80 to-[var(--navy-900)]/30" />
        </div>

        <div className="relative container mx-auto px-4 max-w-6xl py-20">
          <div className="max-w-2xl">
            <div className="eyebrow mb-2">London&apos;s Kitchen Renovation Experts</div>
            <h1 className="h-display text-white text-5xl sm:text-6xl lg:text-7xl mb-6">
              Dream Kitchens,{" "}
              <span className="text-[var(--gold)]">Delivered Fast.</span>
            </h1>
            <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-xl">
              K&M Kitchen Renovations transforms outdated kitchens into stunning spaces — in as little as <strong className="text-white">2 weeks</strong>. Over a decade of craftsmanship serving London, St. Thomas, Woodstock &amp; beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
                Get Your Free Quote
              </Link>
              <a href={`tel:${SITE.phonePlain}`} className="btn btn-ghost text-base px-8 py-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                {SITE.phone}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: "⚡", label: "Projects in 2 Weeks" },
                { icon: "🏆", label: "10+ Years Experience" },
                { icon: "💬", label: "Free Quotes" },
                { icon: "💳", label: "Flexible Financing" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                  <span className="text-lg">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Banner ─── */}
      <section className="bg-[var(--gold)] py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "2 Wks", label: "Average Timeline" },
              { number: "100%", label: "Satisfaction Rate" },
              { number: "Free", label: "Quotes & Consults" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[var(--navy-900)]">{s.number}</div>
                <div className="text-sm font-semibold text-[var(--navy-800)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About / Trust Section ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">About K&M</div>
              <h2 className="h-display text-[var(--navy)] text-4xl lg:text-5xl mb-6">
                Built on a Passion for Beautiful Kitchens
              </h2>
              <p className="text-[var(--slate)] text-lg mb-5 leading-relaxed">
                K&M Kitchen Renovations was founded by Kyle and Matt — two renovation enthusiasts who discovered that the kitchen is the single room that transforms a home&apos;s value and livability more than any other.
              </p>
              <p className="text-[var(--slate)] mb-6 leading-relaxed">
                Over a decade later, we&apos;ve built a reputation for efficient timelines, exceptional quality, and a renovation process that&apos;s virtually stress-free. We handle 5–10 carefully-selected kitchen projects per year, ensuring every client receives our full attention.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { title: "Tailored Designs", desc: "Every kitchen reflects your unique style and lifestyle needs." },
                  { title: "Quality Materials", desc: "We use only high-grade cabinets, hardware, and finishes." },
                  { title: "On-Time Delivery", desc: "Most projects completed in as little as two weeks." },
                  { title: "Client-First Process", desc: "You&apos;re involved at every step. No surprises." },
                ].map((f) => (
                  <div key={f.title} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <div className="w-2 h-2 rounded-full bg-[var(--gold)] mb-2" />
                    <div className="font-bold text-[var(--navy)] text-sm mb-1">{f.title}</div>
                    <div className="text-[var(--slate-light)] text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: f.desc }} />
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn btn-navy">
                Meet the Team
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] img-overlay">
                  <Image src="/images/kitchen-3.jpg" alt="K&M kitchen renovation – custom cabinetry and quartz countertops" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square img-overlay">
                  <Image src="/images/kitchen-4.jpg" alt="Finished kitchen remodel with custom island in London Ontario" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-2xl overflow-hidden aspect-square img-overlay">
                  <Image src="/images/kitchen-5.jpg" alt="White shaker cabinet kitchen by K&M Kitchen Renovations" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] img-overlay">
                  <Image src="/images/kitchen-1.jpg" alt="Open-concept kitchen renovation completed by K&M in 2 weeks" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center">What We Do</div>
            <h2 className="h-display text-[var(--navy)] text-4xl lg:text-5xl mb-4">
              Complete Renovation Services
            </h2>
            <p className="text-[var(--slate)] text-lg max-w-2xl mx-auto">
              From a simple cabinet refresh to a full kitchen gut-and-rebuild, we handle every aspect of your renovation with the same attention to detail.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group hover:shadow-lg hover:border-[var(--gold)] transition-all duration-200 p-6 block">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-[var(--navy)] text-lg mb-2 group-hover:text-[var(--gold)] transition-colors">{s.shortTitle}</h3>
                <p className="text-[var(--slate-light)] text-sm leading-relaxed mb-4">{s.description}</p>
                <span className="text-[var(--gold)] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <span>→</span>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn btn-outline text-base">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Gallery / Portfolio ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center">Our Work</div>
            <h2 className="h-display text-[var(--navy)] text-4xl lg:text-5xl mb-4">
              Recent Kitchen Transformations
            </h2>
            <p className="text-[var(--slate)] text-lg max-w-xl mx-auto">
              Every project tells a story. Here&apos;s a look at some of the kitchens we&apos;ve brought to life across Southwestern Ontario.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden img-overlay group ${i === 0 ? "col-span-2 md:col-span-1 row-span-2 aspect-[3/4]" : "aspect-square"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataURL()}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact" className="btn btn-primary text-base">
              Start Your Transformation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center">How It Works</div>
            <h2 className="h-display text-white text-4xl lg:text-5xl mb-4">
              Simple Process,{" "}
              <span className="text-[var(--gold)]">Stunning Results</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              We&apos;ve refined our renovation process over a decade to make it as smooth as possible for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "Contact us online or call. We&apos;ll respond promptly to schedule a visit or review your photos.",
                icon: "📞",
              },
              {
                step: "02",
                title: "Site Assessment",
                desc: "We visit your home for a detailed assessment or work from the photos you&apos;ve shared with us.",
                icon: "📐",
              },
              {
                step: "03",
                title: "Plan & Installation",
                desc: "Our crew removes the old kitchen, installs new cabinets, countertops, and finishes everything to perfection.",
                icon: "🔨",
              },
              {
                step: "04",
                title: "Enjoy Your Kitchen",
                desc: "Most projects complete in 2 weeks. Walk in, cook, and love your transformed space.",
                icon: "🎉",
              },
            ].map((p) => (
              <div key={p.step} className="relative">
                <div className="text-6xl font-extrabold text-white/10 mb-2">{p.step}</div>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-white text-xl mb-3">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: p.desc }} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn btn-primary text-base px-10">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center">Happy Clients</div>
            <h2 className="h-display text-[var(--navy)] text-4xl lg:text-5xl mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--slate)] leading-relaxed mb-5 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--navy)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--navy)] text-sm">{t.name}</div>
                    <div className="text-[var(--slate-light)] text-xs">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cost Section ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow">Investment</div>
              <h2 className="h-display text-[var(--navy)] text-4xl lg:text-5xl mb-6">
                Kitchen Renovation Costs in Ontario
              </h2>
              <p className="text-[var(--slate)] text-lg mb-6 leading-relaxed">
                Kitchen renovations in Southwestern Ontario typically range from <strong>$100 to $250 per square foot</strong>, depending on materials, cabinet quality, and project complexity.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Basic Kitchen Refresh", range: "$8,000 – $15,000", note: "New cabinets & hardware" },
                  { label: "Mid-Range Full Renovation", range: "$15,000 – $35,000", note: "New cabinets, countertops, flooring" },
                  { label: "Premium Custom Kitchen", range: "$35,000+", note: "Custom cabinetry, premium finishes" },
                ].map((tier) => (
                  <div key={tier.label} className="flex items-start justify-between p-4 rounded-xl border border-[var(--border)] hover:border-[var(--gold)] transition-colors">
                    <div>
                      <div className="font-bold text-[var(--navy)] text-sm">{tier.label}</div>
                      <div className="text-[var(--slate-light)] text-xs mt-0.5">{tier.note}</div>
                    </div>
                    <div className="text-[var(--gold)] font-bold text-sm ml-4 flex-shrink-0">{tier.range}</div>
                  </div>
                ))}
              </div>
              <p className="text-[var(--slate-light)] text-sm mb-6">
                Every project is unique. Financing is available. Get an accurate, no-obligation quote for your specific kitchen.
              </p>
              <div className="flex gap-4">
                <Link href="/contact" className="btn btn-primary">Get Free Quote</Link>
                <Link href="/financing" className="btn btn-outline">View Financing</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden img-overlay">
              <Image
                src="/images/kitchen-9.jpg"
                alt="Premium kitchen renovation with waterfall island countertop by K&M"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataURL()}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Areas ─── */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center">Where We Work</div>
            <h2 className="h-display text-[var(--navy)] text-4xl lg:text-5xl mb-4">
              Serving Southwestern Ontario
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_AREAS.map((a) => (
              <Link key={a.slug} href={`/service-areas/${a.slug}`} className="card group p-6 hover:shadow-lg hover:border-[var(--gold)] transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[var(--navy)] text-lg group-hover:text-[var(--gold)] transition-colors">{a.city}</h3>
                    <div className="text-[var(--slate-light)] text-xs">{a.province}</div>
                  </div>
                  <svg className="w-5 h-5 text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
                <p className="text-[var(--slate)] text-sm leading-relaxed">{a.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <div className="eyebrow justify-center">FAQ</div>
            <h2 className="h-display text-[var(--navy)] text-4xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details key={i} className="card p-6 group">
                <summary className="cursor-pointer flex justify-between items-center gap-4 font-bold text-[var(--navy)] text-lg list-none">
                  {f.question}
                  <svg className="w-5 h-5 text-[var(--gold)] flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-[var(--slate)] leading-relaxed mt-4 text-sm">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Quote Form ─── */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="eyebrow">Ready to Start?</div>
              <h2 className="h-display text-white text-4xl lg:text-5xl mb-6">
                Get Your Free Kitchen Renovation Quote
              </h2>
              <p className="text-white/75 text-lg mb-8 leading-relaxed">
                Tell us about your project and we&apos;ll get back to you within 24 hours. No pressure, no commitment — just an honest conversation about your vision.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "⚡", title: "Fast 24-Hour Response", desc: "We respond to all quote requests within one business day." },
                  { icon: "🏆", title: "No Obligation", desc: "Our quotes are free, detailed, and come with zero pressure." },
                  { icon: "💳", title: "Financing Available", desc: "60-day financing at competitive rates. Ask us for details." },
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
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="font-bold text-[var(--navy)] text-xl mb-2">Request Your Free Quote</h3>
              <p className="text-[var(--slate-light)] text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
              <QuoteForm source="homepage" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
