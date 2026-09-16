import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { PackageCard } from "@/components/PackageCard";
import { QuoteForm } from "@/components/QuoteForm";
import { getPackageGroups, getPackageNote, getAddOns } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, packageSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "Flat-rate event lighting packages for weddings, corporate events, Christmas parties and commercial holiday decor in London, ON. Uplighting from $395, string lights from $895.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages & Pricing | Bright Event Lighting",
    description: "Wedding, corporate, holiday party and commercial decor packages with starting prices.",
    url: `${site.url}/packages`,
    images: [{ url: "/images/og-default.jpg", alt: "Bright Event Lighting packages and pricing" }],
  },
};

export const revalidate = 3600;

export default function PackagesPage() {
  const groups = getPackageGroups();
  const addOns = getAddOns();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Packages", url: `${site.url}/packages` }])) }} />
      {groups.flatMap((g) => g.packages.map((p) => (
        <script key={p.slug} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema(p, g.title)) }} />
      )))}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader as="h1" eyebrow="Packages & Pricing" headline="Straightforward Packages. Flat-Rate Quotes." description={getPackageNote()} />
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {groups.map((g) => (
              <a key={g.slug} href={`#${g.slug}`} className="min-h-[44px] inline-flex items-center rounded-full border border-[var(--border)] px-4 text-sm text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]">{g.title}</a>
            ))}
            <a href="#add-ons" className="min-h-[44px] inline-flex items-center rounded-full border border-[var(--border)] px-4 text-sm text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]">Add-Ons</a>
          </div>

          <div className="space-y-20">
            {groups.map((g) => (
              <div key={g.slug} id={g.slug} className="scroll-mt-24">
                <div className="mb-8 max-w-3xl">
                  <h2 className="text-3xl font-bold text-[var(--foreground)] mb-3">{g.title}</h2>
                  <p className="text-[var(--muted)] leading-relaxed">{g.description}</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {g.packages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
                </div>
              </div>
            ))}

            <div id="add-ons" className="scroll-mt-24">
              <div className="mb-8 max-w-3xl">
                <h2 className="text-3xl font-bold text-[var(--foreground)] mb-3">À La Carte & Add-Ons</h2>
                <p className="text-[var(--muted)] leading-relaxed">Build your own or extend a package. Installed pricing; minimums apply for stand-alone rentals.</p>
              </div>
              <div className="card divide-y divide-[var(--border)]">
                {addOns.map((a) => (
                  <div key={a.name} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                    <span className="text-[var(--foreground)]">{a.name}</span>
                    <span className="text-[var(--accent)] font-semibold whitespace-nowrap">{a.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">How quoting works</h2>
              <ol className="space-y-3 text-[var(--muted)] list-decimal pl-5">
                <li>Tell us the date, venue or address, guest count and what you are picturing.</li>
                <li>We reply within {site.responseTime} with a package recommendation and a firm, all-inclusive price. Most events are quoted from photos and a floor plan, no site visit needed.</li>
                <li>A 25 percent deposit locks the date. The balance is due the week of the event. Commercial and seasonal contracts are invoiced on their own schedule.</li>
              </ol>
              <p className="mt-4 text-sm text-[var(--muted)]/70">Prices are starting points for our core service area and exclude HST. Large venues, multi-day events and locations outside our service area are quoted individually.</p>
              <Link href="/faq" className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline">Read the FAQ →</Link>
            </div>
            <div className="card p-6">
              <QuoteForm heading="Get a Package Quote" showPromise />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
