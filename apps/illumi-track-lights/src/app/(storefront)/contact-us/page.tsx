import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { photo } from "@/lib/photos";
import { BRAND, POSTAL_ADDRESS, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/contact-us`;
const TITLE = "Contact: Sizing, Orders & Warranty";
const DESCRIPTION =
  "Contact Illumi Track Lights in Woodstock, Ontario to size a track lighting kit, ask about an order or start a warranty claim. We reply within one business day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `Contact ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("install-track-mounting").src] },
  twitter: { card: "summary_large_image", title: `Contact ${BRAND.name}`, description: DESCRIPTION }
};

const QUICK_LINKS: [string, string][] = [
  ["How to measure, step by step", "/how-it-works#step-01"],
  ["Every question we get asked", "/faq"],
  ["Track an order", "/track-order"],
  ["Shipping, pickup and returns", "/shipping-returns"],
  ["Warranty terms", "/warranty"],
  ["How the brands compare", "/brands"]
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${BRAND.name}`,
    url: PAGE_URL,
    description: DESCRIPTION,
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
      email: BRAND.email,
      address: POSTAL_ADDRESS,
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: BRAND.email, areaServed: "CA", availableLanguage: "en" }
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="install-track-mounting"
        eyebrow="Contact"
        title="Tell us about the house and we will size the kit."
        intro="Send the lengths of the edges you want lit, or a photo, and your soffit colour. We reply within one business day."
        crumbs={[{ label: "Contact" }]}
      />

      <section>
        <div className="shell section grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <h2 className="font-display h2-fluid">Send us a message</h2>
            <p className="mt-3 max-w-xl text-[var(--color-text-soft)]">
              Sizing a kit, a question before you order, an order that has not turned up, a warranty claim. It all comes to the same inbox, and a person reads it.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="eyebrow text-[var(--color-gold-text)]">What helps us answer in one reply</h2>
              <ul className="mt-3 ml-5 list-disc space-y-1.5 text-[0.95rem] text-[var(--color-text-soft)] marker:text-[var(--color-gold)]">
                <li className="pl-1">The length of each edge you want lit, in feet. A rough sketch is fine.</li>
                <li className="pl-1">Your soffit colour, so we can suggest black, white, wicker or brown track.</li>
                <li className="pl-1">For an order or a warranty question, your order number.</li>
                <li className="pl-1">For a fault, what the lights are doing and a link to a photo or short video.</li>
              </ul>
            </div>

            <div>
              <h2 className="eyebrow text-[var(--color-gold-text)]">Quick answers</h2>
              <ul className="mt-2 border-t border-[var(--color-border)]">
                {QUICK_LINKS.map(([label, href]) => (
                  <li key={href} className="border-b border-[var(--color-border)]">
                    <Link href={href} className="flex min-h-[44px] items-center justify-between gap-3 py-2 text-[0.95rem] text-[var(--color-ink)] hover:underline">
                      {label}
                      <span aria-hidden className="text-[var(--color-muted)]">›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--color-border)] p-5 md:p-6">
              <h2 className="eyebrow text-[var(--color-gold-text)]">Where we are</h2>
              <address className="font-display mt-2 text-[1.25rem] not-italic leading-snug">
                {BRAND.street}
                <br />
                {BRAND.city}, {BRAND.regionCode} {BRAND.postal}
              </address>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">
                Pickups are by appointment. Choose pickup at checkout and wait for the &ldquo;ready for pickup&rdquo; email before you drive over. Orders are packed within one to two business days.
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-soft)]">
                Email: <a href={`mailto:${BRAND.email}`} className="text-link">{BRAND.email}</a>
              </p>
              <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-[44px] items-center">Open in Google Maps</a>
                <Link href="/shipping-returns#pickup" className="text-link inline-flex min-h-[44px] items-center">Pickup details</Link>
              </p>
            </div>

            <div>
              <h2 className="eyebrow text-[var(--color-gold-text)]">Want it installed, or install for a living?</h2>
              <p className="mt-2 text-[0.95rem] text-[var(--color-text-soft)]">
                Our crew installs across Southwestern Ontario. Crews and municipalities can apply for tier pricing and priority fulfilment.
              </p>
              <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <Link href="/installation" className="text-link inline-flex min-h-[44px] items-center">Installation areas</Link>
                <Link href="/professional-installer" className="text-link inline-flex min-h-[44px] items-center">Installer program</Link>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
