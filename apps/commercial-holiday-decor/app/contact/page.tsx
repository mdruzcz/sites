import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const TITLE = "Contact — Commercial Holiday Decor, Southwestern Ontario";
const DESCRIPTION =
  "Talk to our Southwestern Ontario team about commercial wreaths, mega trees, LED displays and installation. We reply within one business day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/contact` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/contact` }
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Commercial Holiday Decor",
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      telephone: site.phone,
      email: site.email
    }
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        photo="tree-lighting-row"
        photoAlt="Row of large illuminated commercial Christmas trees at night"
        eyebrow="Get in touch"
        title="Contact us"
        intro={`We answer our own phone and inbox. Most messages get a reply within ${site.responseTime}.`}
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="reveal">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Direct</p>
              <h2 className="font-display h2-fluid mt-6">Reach us</h2>

              <div className="mt-10 space-y-5">
                <a href={site.phoneHref} className="card flex items-center justify-between gap-4 p-6">
                  <span>
                    <span className="eyebrow block text-[var(--color-muted)]">Phone</span>
                    <span className="mt-1.5 block text-lg font-semibold">{site.phone}</span>
                  </span>
                  <span aria-hidden className="text-[var(--color-gold-text)]">→</span>
                </a>
                <a href={site.emailHref} className="card flex items-center justify-between gap-4 p-6">
                  <span>
                    <span className="eyebrow block text-[var(--color-muted)]">Email</span>
                    <span className="mt-1.5 block break-all text-lg font-semibold">{site.email}</span>
                  </span>
                  <span aria-hidden className="text-[var(--color-gold-text)]">→</span>
                </a>
                <div className="card p-6">
                  <span className="eyebrow block text-[var(--color-muted)]">Based in</span>
                  <span className="mt-1.5 block text-lg font-semibold">{site.addressLine}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--color-text-soft)]">
                    Serving commercial and municipal properties across Southwestern Ontario.
                  </span>
                </div>
                <div className="card p-6">
                  <span className="eyebrow block text-[var(--color-muted)]">Hours</span>
                  <span className="mt-1.5 block text-lg font-semibold">{site.hours}</span>
                </div>
              </div>

              <p className="mt-9 text-sm leading-relaxed text-[var(--color-text-soft)]">
                Looking for pricing?{" "}
                <Link href="/quote" className="font-semibold text-[var(--color-gold-text)] hover:underline">
                  Request a quote
                </Link>{" "}
                and we will book a site walk-through.
              </p>

              <Photo
                name="wreath-building-front"
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 420px"
                rounded="rounded-3xl"
                className="mt-10 hidden shadow-[var(--shadow-lg)] lg:block"
              />
            </div>

            <div className="reveal rounded-3xl border border-[var(--color-border)] bg-white p-7 md:p-10">
              <h2 className="font-display text-xl">Send us the details</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">
                The more you can tell us about the property, the faster we can come back with something
                useful.
              </p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
