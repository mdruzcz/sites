import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../_components/sections";
import { NavBar } from "../_components/sections-interactive";

export const metadata: Metadata = {
  title: "Contact London Deck Builder",
  description:
    "Call London Deck Builder at (519) 914-1663 or request a free quote online. Serving London, St. Thomas, Woodstock, Strathroy and Southwestern Ontario.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Contact London Deck Builder",
    description:
      "Call (519) 914-1663 or request a free quote online — London, Ontario deck builder.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Contact London Deck Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export const revalidate = 3600;

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://londondeckbuilder.ca/#business",
  name: "London Deck Builder",
  url: "https://londondeckbuilder.ca",
  telephone: "+1-519-914-1663",
  email: "service@masterdecker.com",
  image: "https://londondeckbuilder.ca/og-default.png",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "50432 Yorke Line",
    addressLocality: "Belmont",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  geo: { "@type": "GeoCoordinates", latitude: 42.882, longitude: -81.083 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    "London, ON",
    "St. Thomas, ON",
    "Woodstock, ON",
    "Strathroy, ON",
    "Ingersoll, ON",
    "Dorchester, ON",
    "Tillsonburg, ON",
    "Aylmer, ON",
    "Lambeth, ON",
    "Komoka, ON",
    "Mount Brydges, ON",
    "Belmont, ON",
  ],
};

const cities = [
  { name: "London", slug: null },
  { name: "St. Thomas", slug: "st-thomas" },
  { name: "Woodstock", slug: "woodstock" },
  { name: "Strathroy", slug: "strathroy" },
  { name: "Ingersoll", slug: "ingersoll" },
  { name: "Dorchester", slug: "dorchester" },
  { name: "Tillsonburg", slug: "tillsonburg" },
  { name: "Aylmer", slug: "aylmer" },
  { name: "Lambeth", slug: "lambeth" },
  { name: "Komoka & Kilworth", slug: "komoka" },
  { name: "Mount Brydges", slug: "mt-brydges" },
  { name: "Belmont", slug: "belmont" },
];

export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <NavBar homeHref="/" />

      <section className="pt-32 pb-12" style={{ backgroundColor: "var(--wood-dark)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
            Get In Touch
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact London Deck Builder
          </h1>
          <p className="text-lg text-white/70">
            Call or text us during business hours, or send a free quote request online. We respond to every inquiry within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Phone card */}
            <a
              href="tel:5199141663"
              className="block rounded-2xl bg-white p-7 border hover:shadow-lg transition"
              style={{ borderColor: "var(--cream-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
                Phone
              </p>
              <p className="font-serif text-3xl font-bold mb-2" style={{ color: "var(--wood-dark)" }}>
                (519) 914-1663
              </p>
              <p className="text-sm" style={{ color: "var(--wood)" }}>
                Tap to call. We answer during business hours and return all voicemail within one business day.
              </p>
            </a>

            {/* Email card */}
            <a
              href="mailto:service@masterdecker.com"
              className="block rounded-2xl bg-white p-7 border hover:shadow-lg transition"
              style={{ borderColor: "var(--cream-dark)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
                Email
              </p>
              <p className="font-serif text-2xl font-bold mb-2 break-all" style={{ color: "var(--wood-dark)" }}>
                service@masterdecker.com
              </p>
              <p className="text-sm" style={{ color: "var(--wood)" }}>
                Send photos, plans or detailed project notes. We reply within 24 hours.
              </p>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Office card */}
            <div className="rounded-2xl bg-white p-7 border" style={{ borderColor: "var(--cream-dark)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
                Office
              </p>
              <p className="font-semibold text-lg mb-1" style={{ color: "var(--wood-dark)" }}>
                50432 Yorke Line
              </p>
              <p className="text-sm mb-3" style={{ color: "var(--wood)" }}>
                Belmont, Ontario
              </p>
              <p className="text-xs" style={{ color: "var(--wood-light)" }}>
                Visits by appointment only — please call ahead.
              </p>
            </div>

            {/* Hours card */}
            <div className="rounded-2xl bg-white p-7 border" style={{ borderColor: "var(--cream-dark)" }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
                Hours
              </p>
              <ul className="space-y-1.5 text-sm" style={{ color: "var(--wood)" }}>
                <li><span className="font-semibold" style={{ color: "var(--wood-dark)" }}>Mon&ndash;Fri:</span> 8:00 AM &ndash; 5:00 PM</li>
                <li><span className="font-semibold" style={{ color: "var(--wood-dark)" }}>Saturday:</span> Closed</li>
                <li><span className="font-semibold" style={{ color: "var(--wood-dark)" }}>Sunday:</span> Closed</li>
              </ul>
              <p className="text-xs mt-3" style={{ color: "var(--wood-light)" }}>
                Quote requests submitted after hours are answered the next business morning.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-8 lg:p-10 text-center" style={{ backgroundColor: "var(--wood-dark)" }}>
            <h2 className="font-serif text-3xl font-bold text-white mb-3">Request a Free Quote</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              The fastest way to get a written estimate is the quote form on our homepage. Tell us about your project and we&rsquo;ll be in touch within 24 hours.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "var(--terracotta)" }}
            >
              Go to quote form
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16" style={{ backgroundColor: "var(--cream-dark)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-3 text-center" style={{ color: "var(--wood-dark)" }}>
            Service Area
          </h2>
          <p className="text-center mb-8 max-w-2xl mx-auto" style={{ color: "var(--wood)" }}>
            We build decks across London, Ontario and the surrounding region. Click any city below for service details.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {cities.map((c) =>
              c.slug ? (
                <Link
                  key={c.name}
                  href={`/services/${c.slug}`}
                  className="block rounded-xl bg-white p-4 border text-center hover:shadow-md transition"
                  style={{ borderColor: "var(--cream)", color: "var(--wood-dark)" }}
                >
                  <span className="font-semibold">{c.name}</span>
                </Link>
              ) : (
                <div
                  key={c.name}
                  className="rounded-xl p-4 border text-center"
                  style={{
                    backgroundColor: "rgba(196,98,58,0.08)",
                    borderColor: "var(--terracotta)",
                    color: "var(--wood-dark)",
                  }}
                >
                  <span className="font-semibold">{c.name}</span>
                  <span className="block text-xs mt-1" style={{ color: "var(--terracotta)" }}>(home base)</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
