import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { site, type City } from "@/lib/site";

type Props = { city: City };

/**
 * Shared city-page layout. Each `/hot-tub-pad-installation-in-<slug>`
 * route renders this with its own City object. JSON-LD (Service +
 * BreadcrumbList) is emitted as raw <script> tags so non-JS crawlers
 * (GPTBot, ClaudeBot, Common Crawl, Bing) can parse it.
 */
export default function CityPage({ city }: Props) {
  const cityPath = `/${city.slug}`;
  const cityFullName = `${city.name}, ${city.region}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hot tub pad installation",
    name: `Hot Tub Pad Installation in ${city.name}, ${city.region}`,
    description: city.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    },
    areaServed: {
      "@type": "City",
      name: cityFullName,
    },
    url: `${site.url}${cityPath}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${site.url}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `${site.url}${cityPath}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.cityFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      {/* Structured Data — raw <script> tags so non-JS crawlers see the schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <NavBar />

      {/* ═══════════════ Hero ═══════════════ */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Hot Tub Pad Installation in {city.name}
          </h1>
          <p className="mb-8 text-lg text-white/70">
            Durable &amp; Level Hot Tub Pads for a Solid Foundation
          </p>
          <Link
            href="/contact-us"
            className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
          >
            Get A Quote
          </Link>
        </div>
      </section>

      {/* ═══════════════ Intro ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Helping You Enjoy
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Expert Hot Tub Pad Installation in {city.name}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-muted">
                {city.heroIntro}
              </p>
              <Link
                href="/contact-us"
                className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
              >
                Get A Quote
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hot-tub-pad-1.jpg"
                alt={`Professional hot tub pad installation in ${city.name}, Ontario`}
                width={720}
                height={480}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Local Context (city-specific) ═══════════════ */}
      <section className="bg-light-bg py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
            Hot Tub Pads Built for {city.name} Soils &amp; Weather
          </h2>
          <p className="text-lg leading-relaxed text-slate-muted">
            {city.localContext}
          </p>

          {/* Local facts grid */}
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {city.localFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-orange/10 bg-white p-5 shadow-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-widest text-orange">
                  {f.label}
                </dt>
                <dd className="mt-1 text-base font-bold text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══════════════ Why a Quality Pad Matters Here ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
            Why a Quality Hot Tub Pad in {city.name} Matters
          </h2>
          <p className="text-lg leading-relaxed text-slate-muted">
            {city.whyLocal}
          </p>
        </div>
      </section>

      {/* ═══════════════ Feature Icons ═══════════════ */}
      <section className="bg-light-bg py-12">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { label: "Custom Concrete Pads", icon: "M4 6h16M4 12h16M4 18h16" },
              { label: "Site Preparation", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "High-Quality Materials", icon: "M11.42 15.17l-5.58-3.4a1.006 1.006 0 010-1.72l5.58-3.4a1 1 0 011.16 0l5.58 3.4a1.006 1.006 0 010 1.72l-5.58 3.4a1 1 0 01-1.16 0z" },
              { label: "Precision Leveling", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-pale">
                  <svg
                    className="h-6 w-6 text-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-navy">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Why Choose Us ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-8 font-display text-3xl font-bold text-navy md:text-4xl">
                Why Choose Us for Your Hot Tub Pad in {city.name}?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Expert Installation",
                    desc: "Every hot tub pad we install is properly leveled and reinforced for long-term performance and safety.",
                  },
                  {
                    title: "Concrete or Gravel Options",
                    desc: "We help you choose the best material for your budget, hot tub size, and yard layout.",
                  },
                  {
                    title: "Built to Last",
                    desc: "Our pads are weather-resistant, durable, and virtually maintenance-free in Ontario’s climate.",
                  },
                  {
                    title: "Fast & Efficient Service",
                    desc: "Most installations are completed in just a day, so you can enjoy your spa sooner.",
                  },
                  {
                    title: `Serving ${city.name} & Beyond`,
                    desc: `We install hot tub pads throughout ${city.name} and the surrounding area, including ${city.neighbourhoods.join(", ")}.`,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-pale">
                      <svg
                        className="h-4 w-4 text-orange"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-display font-bold text-navy">
                        {item.title}
                      </h3>
                      <p className="text-slate-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/hot-tub-pad-sq.png"
                alt={`Finished hot tub concrete pad in ${city.name}, Ontario`}
                width={720}
                height={720}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Full-Width Image ═══════════════ */}
      <section className="bg-light-bg py-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/hot-tub-outdoor.avif"
              alt={`Hot tub installed on a professional concrete pad in ${city.name}`}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ Surrounding Areas ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
            Hot Tub Pad Installation in {city.name} &amp; Surrounding Areas
          </h2>
          <p className="mb-8 text-lg text-slate-muted">
            We proudly serve homeowners in {city.name} and nearby towns,
            including:
          </p>
          <ul className="mx-auto mb-8 inline-flex flex-wrap justify-center gap-3">
            {city.neighbourhoods.map((n) => (
              <li
                key={n}
                className="rounded-full border border-orange/20 bg-orange-pale px-5 py-2 text-sm font-medium text-navy"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ City FAQ ═══════════════ */}
      <section className="bg-light-bg py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-navy md:text-4xl">
            Hot Tub Pad FAQs for {city.name}
          </h2>
          <div className="space-y-4">
            {city.cityFaqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm open:shadow-md"
              >
                <summary className="cursor-pointer list-none font-display text-base font-bold text-navy">
                  <span className="flex items-center justify-between gap-4">
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="text-orange transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-slate-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Final CTA ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
            Get a Free Quote for Your Hot Tub Pad Installation
          </h2>
          <p className="mb-8 text-lg text-slate-muted">
            Ready to give your hot tub the solid foundation it deserves? Contact
            us today for a free, no-obligation quote on professional hot tub pad
            installation in {city.name} and the surrounding area.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
          >
            Get A Free Quote
          </Link>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
