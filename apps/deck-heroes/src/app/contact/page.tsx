import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ContactCTA from "@/components/ContactCTA";
import { PHONE, PHONE_HREF, EMAIL, CITIES, COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get Your Free Deck Staining Quote",
  description:
    "Request a free, no-obligation quote for deck staining, sealing, or refinishing. Serving London, Hamilton, Brantford, Woodstock, and Southwestern Ontario.",
  openGraph: {
    title: "Get Your Free Deck Staining Quote | Deck Heroes",
    description:
      "Request a free quote for professional deck staining and refinishing in Southwestern Ontario. Fast response within 24 hours.",
    url: "https://deckheroes.ca/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Deck Heroes",
  url: "https://deckheroes.ca",
  telephone: "+15198786735",
  email: "service@deckheroes.ca",
  areaServed: {
    "@type": "State",
    name: "Ontario",
    containedInPlace: { "@type": "Country", name: "Canada" },
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

const HOURS = [
  { days: "Monday - Friday", hours: "7:00 AM - 7:00 PM" },
  { days: "Saturday", hours: "8:00 AM - 5:00 PM" },
  { days: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-forest-dark py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Get Your Free Deck Staining Quote
          </h1>
          <p className="mt-4 text-lg text-cream-dark max-w-2xl mx-auto">
            Fill out the form below and we will get back to you within 24 hours
            with a detailed, no-obligation estimate for your project.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-bg py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-6 shadow-md shadow-forest-dark/5 border border-cream-dark/50 sm:p-8">
                <h2 className="font-serif text-xl font-bold text-wood-dark mb-6">
                  Request a Quote
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Phone & Email */}
              <div className="rounded-2xl bg-white p-6 shadow-md shadow-forest-dark/5 border border-cream-dark/50">
                <h3 className="font-serif text-lg font-bold text-wood-dark mb-4">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 text-wood hover:text-terracotta transition-colors"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-terracotta"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="font-medium">{PHONE}</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 text-wood hover:text-terracotta transition-colors"
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-terracotta"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{EMAIL}</span>
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl bg-white p-6 shadow-md shadow-forest-dark/5 border border-cream-dark/50">
                <h3 className="font-serif text-lg font-bold text-wood-dark mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {HOURS.map((h) => (
                    <div
                      key={h.days}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-wood-dark">
                        {h.days}
                      </span>
                      <span
                        className={
                          h.hours === "Closed"
                            ? "text-terracotta font-medium"
                            : "text-wood"
                        }
                      >
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="rounded-2xl bg-white p-6 shadow-md shadow-forest-dark/5 border border-cream-dark/50">
                <h3 className="font-serif text-lg font-bold text-wood-dark mb-4">
                  Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => (
                    <span
                      key={city.slug}
                      className="inline-block rounded-full bg-bg px-3 py-1 text-xs font-semibold text-wood-dark"
                    >
                      {city.name}
                    </span>
                  ))}
                  <span className="inline-block rounded-full bg-bg px-3 py-1 text-xs font-semibold text-wood-dark">
                    &amp; surrounding areas
                  </span>
                </div>
              </div>

              {/* Deck Photo */}
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/images/deck-outdoor-living.jpg"
                  alt="Beautiful outdoor deck space in Ontario"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Response time promise */}
              <div className="rounded-2xl bg-terracotta/10 border border-terracotta/20 p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-6 w-6 shrink-0 text-terracotta mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-wood-dark text-sm">
                      Fast Response Guaranteed
                    </p>
                    <p className="mt-1 text-sm text-wood">
                      We respond to all quote requests within 24 hours. Most
                      homeowners hear back from us the same business day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
