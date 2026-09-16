import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { getPackageBySlug } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact Us - Get a Lighting Quote",
  description:
    "Request a quote for wedding, corporate event or Christmas party lighting and holiday decor from Bright Event Lighting. We respond within 4 business hours. London, ON and area.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Bright Event Lighting",
    description: "Get a flat-rate lighting quote within 4 business hours. No site visit needed.",
    url: `${site.url}/contact`,
  },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ package?: string }> }) {
  const { package: pkgSlug } = await searchParams;
  const pkg = pkgSlug ? getPackageBySlug(pkgSlug) : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Contact", url: `${site.url}/contact` }])) }} />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader as="h1" eyebrow="Get Started" headline="Check Your Date" description={`Tell us about your event and we'll send a firm, flat-rate quote within ${site.responseTime}. No site visit needed for most events.`} />

          <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
            <div className="card p-6">
              {pkg && (
                <p className="mb-4 rounded-md border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2 text-sm text-[var(--foreground)]">
                  Asking about <strong>{pkg.name}</strong> ({pkg.priceLabel}). Add your date and we&apos;ll confirm availability.
                </p>
              )}
              <QuoteForm showPromise defaultService={pkg ? `${pkg.name} package` : ""} />
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[var(--muted)]">
                    <Phone className="h-5 w-5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <a href={site.phoneHref} className="hover:text-[var(--foreground)] transition-colors min-h-[44px] inline-flex items-center">{site.phone}</a>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--muted)]">
                    <MapPin className="h-5 w-5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <span>{site.addressLine} · serving Southwestern Ontario</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--muted)]">
                    <Clock className="h-5 w-5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                    <span>{site.hours}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-3">What Happens Next?</h3>
                <ol className="space-y-3 text-sm text-[var(--muted)]">
                  {[
                    `We confirm your date is available (within ${site.responseTime}).`,
                    "We send a proposal with a package recommendation and a flat, all-inclusive price.",
                    "You approve, a deposit locks the date, and we handle everything from there.",
                  ].map((t, i) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-3">Areas We Serve</h3>
                <p className="text-sm text-[var(--muted)]">London · Kitchener-Waterloo · Guelph · Stratford · St. Thomas · Woodstock</p>
                <p className="text-xs text-[var(--muted)]/60 mt-2">Travel is included in all packages within our service area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
