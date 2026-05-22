import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us | Hot Tub Pads Ontario",
  description:
    "Get in touch with Hot Tub Pads for a free quote on concrete pad installation for hot tubs, swim spas, and outdoor structures in Ontario. Fast response within 24 hours.",
  openGraph: {
    title: "Contact Us | Hot Tub Pads Ontario",
    description:
      "Request a free quote for professional hot tub pad installation in Ontario. Expert concrete and gravel foundations. We respond within 24 hours.",
    url: `${site.url}/contact-us`,
    images: [
      {
        url: "/images/contact-hero.avif",
        width: 1200,
        height: 630,
        alt: "Contact Hot Tub Pads for a free concrete pad installation quote in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Hot Tub Pads Ontario",
    description:
      "Request a free quote for professional hot tub pad installation in Ontario. We respond within 24 hours.",
    images: ["/images/contact-hero.avif"],
  },
};

/* --- JSON-LD Structured Data --- */

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Hot Tub Pads",
  description:
    "Get in touch for a free quote on concrete pad installation for hot tubs and swim spas in Ontario.",
  url: `${site.url}/contact-us`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: site.name,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: site.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: `${site.url}/contact-us`,
    },
  ],
};

/* --- Page Component --- */

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="ld-contact-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <NavBar />

      {/* Page Hero */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="text-lg text-white/70">
            Expert installation of long-lasting concrete pads for your spa.
          </p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* --- Left Column: Contact Info --- */}
            <div>
              <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-orange">
                Reach Out
              </span>
              <h2 className="mb-6 font-display text-3xl font-bold text-navy md:text-4xl">
                Get in Touch for Expert Hot Tub Pad Installation
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-muted">
                Have questions about installing a hot tub, swim spa, or custom
                concrete pad? We&apos;re here to help! Send us your dimensions
                and a photo for a free, no-obligation quote.
              </p>

              {/* Business Hours */}
              <div className="mb-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-pale">
                    <svg
                      className="h-5 w-5 text-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6l4 2"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-base font-semibold text-navy">
                      Business Hours
                    </h3>
                    <p className="text-slate-muted">Mon &ndash; Fri: 8:00 AM &ndash; 6:00 PM</p>
                    <p className="text-slate-muted">Saturday: 9:00 AM &ndash; 3:00 PM</p>
                    <p className="text-slate-muted">Sunday: Closed</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-pale">
                    <svg
                      className="h-5 w-5 text-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-base font-semibold text-navy">
                      Location
                    </h3>
                    <p className="text-slate-muted">
                      775 Osgoode Drive, Unit 12
                      <br />
                      London, ON
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-pale">
                    <svg
                      className="h-5 w-5 text-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-base font-semibold text-navy">
                      Email
                    </h3>
                    <a
                      href="mailto:sales@hottubpads.ca"
                      className="text-orange transition-colors hover:text-orange-dark"
                    >
                      sales@hottubpads.ca
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/contact-hero.avif"
                  alt="Hot tub pad installation consultation with customer in Ontario"
                  width={720}
                  height={480}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* --- Right Column: Contact Form --- */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <QuoteFab />
    </>
  );
}
