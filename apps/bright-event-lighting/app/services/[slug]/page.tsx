import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Pic } from "@/components/Pic";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServiceIcon } from "@/components/icons";
import { getServices, getServiceBySlug, getServiceAreas, getProjectsByService, getEventTypes, getAllPackages } from "@/lib/content";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = `${service.menuTitle} London, ON`.length <= 36 ? `${service.menuTitle} London, ON` : service.menuTitle;
  return {
    title,
    description: `${service.shortDescription} From $${service.startingAt}. Serving London, ON and Southwestern Ontario. Call ${site.phone}.`.slice(0, 160),
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Bright Event Lighting`,
      description: service.shortDescription,
      url: `${site.url}/services/${service.slug}`,
      images: [{ url: service.image, alt: `${service.title} by Bright Event Lighting` }],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();
  const photos = getProjectsByService(service.slug).slice(0, 6);
  const events = getEventTypes().filter((e) => (e.services as string[]).includes(service.slug));
  const packages = getAllPackages().filter((p) => p.includes.some((line) => line.toLowerCase().includes(service.menuTitle.split(" ")[0].toLowerCase()))).slice(0, 3);
  const others = getServices().filter((s) => s.slug !== service.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }} />
      {service.faq?.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faq)) }} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Pic src={service.image} fill className="object-cover" priority sizes="100vw" quality={78} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F10]/95 via-[#0F0F10]/70 to-[#0F0F10]/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]"><ServiceIcon name={service.icon} /></div>
            <p className="text-[var(--accent)] text-sm tracking-[0.2em] uppercase mb-3">From ${service.startingAt.toLocaleString("en-CA")} · {service.unit}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">{service.title} in London, ON & Southwestern Ontario</h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">{service.shortDescription}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="#quote" className="btn btn-primary min-h-[48px] px-8">Get a Quote</Link>
              <Link href="/packages" className="btn btn-ghost min-h-[48px] px-8">See Packages</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-8">
              <p className="text-[var(--muted)] text-lg leading-relaxed">{service.fullDescription}</p>

              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">What&apos;s Included</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[var(--muted)]"><Check className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Good For</h2>
                <div className="flex flex-wrap gap-2">
                  {service.goodFor.map((g) => <span key={g} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)]">{g}</span>)}
                </div>
                {events.length > 0 && (
                  <p className="mt-4 text-sm text-[var(--muted)]">
                    See how we use {service.menuTitle.toLowerCase()} for{" "}
                    {events.map((e, i) => (
                      <span key={e.slug}>
                        <Link href={`/events/${e.slug}`} className="text-[var(--accent)] hover:underline">{e.menuTitle.toLowerCase()}</Link>
                        {i < events.length - 1 ? (i === events.length - 2 ? " and " : ", ") : "."}
                      </span>
                    ))}
                  </p>
                )}
              </div>

              {photos.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Recent {service.menuTitle} Work</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {photos.map((p) => (
                      <div key={p.slug} className="relative aspect-[4/3] rounded-lg overflow-hidden card">
                        <Pic src={p.image} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                      </div>
                    ))}
                  </div>
                  <Link href="/gallery" className="mt-3 inline-block text-sm text-[var(--accent)] hover:underline">See the full gallery →</Link>
                </div>
              )}

              {service.faq?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">{service.menuTitle} Questions</h2>
                  <FaqAccordion faqs={service.faq} />
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">{service.menuTitle} Across Southwestern Ontario</h2>
                <div className="flex flex-wrap gap-2">
                  {areas.cities.map((c) => (
                    <Link key={c.slug} href={`/services/${service.slug}/${c.slug}`} className="min-h-[40px] inline-flex items-center rounded-full border border-[var(--border)] px-4 text-sm text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]">
                      {service.menuTitle} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 self-start">
              <div id="quote" className="card p-6 scroll-mt-24">
                <QuoteForm heading={`Quote ${service.menuTitle}`} showPromise compact defaultService={service.title} />
              </div>
              {packages.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-3">Packages that include {service.menuTitle.toLowerCase()}</h3>
                  <ul className="space-y-2 text-sm">
                    {packages.map((p) => (
                      <li key={p.slug} className="flex justify-between gap-3">
                        <Link href={`/packages#${p.slug}`} className="text-[var(--muted)] hover:text-[var(--accent)]">{p.name}</Link>
                        <span className="text-[var(--accent)] whitespace-nowrap">{p.priceLabel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="card p-6">
                <h3 className="font-bold text-[var(--foreground)] mb-3">Other services</h3>
                <ul className="space-y-1 text-sm">
                  {others.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-[var(--muted)] hover:text-[var(--accent)] inline-flex min-h-[32px] items-center">{s.menuTitle}</Link></li>)}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Ready?" headline={`Book ${service.menuTitle} for Your Event`} description={`Flat-rate quote within ${site.responseTime}. Travel included across our service area.`} />
          <div className="text-center"><Link href="/contact" className="btn btn-primary min-h-[48px] px-8">Get a Quote</Link></div>
        </div>
      </section>
    </>
  );
}
