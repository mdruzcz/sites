import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { QuoteForm } from "@/components/QuoteForm";
import { getServices, getEventTypes } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Event Lighting & Holiday Decor Services",
  description:
    "Uplighting, Edison string lights, tent lighting, cold sparks, pinspots, tree wrapping, garlands and wreaths, and commercial and mall holiday decor in London, ON and Southwestern Ontario.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Event Lighting & Holiday Decor Services | Bright Event Lighting",
    description: "Nine lighting and decor services for weddings, corporate events and Christmas parties across Southwestern Ontario.",
    url: `${site.url}/services`,
    images: [{ url: "/images/og-default.jpg", alt: "Event lighting services by Bright Event Lighting" }],
  },
};

export const revalidate = 3600;

export default function ServicesPage() {
  const services = getServices();
  const events = getEventTypes();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: `${site.url}/services` }])) }} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader as="h1" eyebrow="Services" headline="Event Lighting & Holiday Decor Services" description="Everything we install, from a single run of Edison bulbs over a patio to a 30-foot mall atrium tree. Each service can be booked on its own or bundled into a package." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>

          <div className="mt-16 card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">Not sure which services you need?</h2>
            <p className="text-[var(--muted)] mb-5">Start from your event instead and we&apos;ll show you the combination that usually works.</p>
            <div className="flex flex-wrap gap-2">
              {events.map((e) => (
                <Link key={e.slug} href={`/events/${e.slug}`} className="min-h-[44px] inline-flex items-center rounded-full border border-[var(--border)] px-4 text-sm text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]">
                  {e.menuTitle}
                </Link>
              ))}
              <Link href="/packages" className="min-h-[44px] inline-flex items-center rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[#0F0F10]">Packages & Pricing</Link>
            </div>
          </div>

          <div className="mt-16 max-w-lg mx-auto">
            <QuoteForm heading="Get a Quote" showPromise />
          </div>
        </div>
      </section>
    </>
  );
}
