import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pic } from "@/components/Pic";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServiceCard } from "@/components/ServiceCard";
import { PackageCard } from "@/components/PackageCard";
import { getEventTypes, getEventTypeBySlug, getServiceBySlug, getPackageBySlug, getProjectsByCategory, getTestimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { eventTypeSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { Star } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getEventTypes().map((e) => ({ slug: e.slug }));
}

const titles: Record<string, string> = {
  weddings: "Wedding Lighting London, ON",
  "corporate-events": "Corporate Event Lighting",
  "holiday-parties": "Christmas Party Lighting",
  "private-parties": "Backyard Party Lighting",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEventTypeBySlug(slug);
  if (!e) return {};
  return {
    title: titles[slug] ?? e.title,
    description: `${e.shortDescription} London, ON and Southwestern Ontario. Flat-rate quotes within ${site.responseTime}.`.slice(0, 160),
    alternates: { canonical: `/events/${e.slug}` },
    openGraph: { title: `${e.title} | Bright Event Lighting`, description: e.shortDescription, url: `${site.url}/events/${e.slug}`, images: [{ url: e.image, alt: e.title }] },
  };
}

export default async function EventTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventTypeBySlug(slug);
  if (!event) notFound();

  const services = event.services.map((s) => getServiceBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof getServiceBySlug>>[];
  const packages = event.packages.map((p) => getPackageBySlug(p)).filter(Boolean) as NonNullable<ReturnType<typeof getPackageBySlug>>[];
  const photos = getProjectsByCategory(event.slug).slice(0, 6);
  const testimonials = getTestimonials().filter((t) => t.service === event.slug).slice(0, 3);
  const others = getEventTypes().filter((e) => e.slug !== event.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventTypeSchema(event)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(event.faq)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: event.title, url: `${site.url}/events/${event.slug}` }])) }} />

      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Pic src={event.image} alt={`${event.title} by Bright Event Lighting`} fill className="object-cover" priority sizes="100vw" quality={80} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/60 to-[#0F0F10]/10" />
        <div className="container mx-auto px-4 relative z-10 pb-16 pt-32">
          <p className="text-[var(--accent)] text-sm tracking-[0.3em] uppercase mb-4">{event.eyebrow}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] leading-[1.05] max-w-3xl">{event.headline}</h1>
          <p className="mt-5 text-lg md:text-xl text-[var(--muted)] max-w-2xl">{event.shortDescription}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="#quote" className="btn btn-primary min-h-[48px] px-8">Check My Date</Link>
            <Link href="#packages" className="btn btn-ghost min-h-[48px] px-8">See Packages</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <div>
              <p className="text-[var(--muted)] text-lg leading-relaxed">{event.intro}</p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {event.highlights.map((h) => (
                  <div key={h.title} className="card p-5">
                    <h3 className="font-bold text-[var(--foreground)] mb-1">{h.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{h.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="quote" className="card p-6 lg:sticky lg:top-24 scroll-mt-24">
              <QuoteForm heading="Check Your Date" showPromise defaultService={event.menuTitle} />
            </div>
          </div>
        </div>
      </section>

      {packages.length > 0 && (
        <section id="packages" className="py-16 md:py-24 bg-[var(--surface)] border-y border-[var(--border)] scroll-mt-16">
          <div className="container mx-auto px-4">
            <SectionHeader eyebrow="Packages" headline={`${event.menuTitle} Packages`} description="Flat-rate bundles that cover most events. Add or swap services to fit your venue." />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
            </div>
            <div className="mt-8 text-center"><Link href="/packages" className="btn btn-ghost min-h-[44px]">All Packages & Add-Ons</Link></div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Services" headline={`Lighting & Decor Services for ${event.menuTitle}`} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="py-16 md:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container mx-auto px-4">
            <SectionHeader eyebrow="Our Work" headline={`Recent ${event.menuTitle}`} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((p) => (
                <div key={p.slug} className="card overflow-hidden">
                  <div className="relative aspect-[4/3]"><Pic src={p.image} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" /></div>
                  <div className="p-3"><p className="text-sm font-medium text-[var(--foreground)]">{p.title}</p><p className="text-xs text-[var(--accent)]">{p.city}, ON</p></div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center"><Link href={`/gallery?c=${event.slug}`} className="btn btn-ghost min-h-[44px]">More in the Gallery</Link></div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeader eyebrow="Kind Words" headline="From Clients Like You" />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <div key={i} className="card p-6">
                  <div className="flex mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />)}</div>
                  <p className="text-[var(--muted)] text-sm italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs text-[var(--muted)]/60"><span className="text-[var(--foreground)] font-medium">{t.author}</span> · {t.venue}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4 max-w-2xl">
          <SectionHeader eyebrow="Questions" headline={`${event.menuTitle} FAQ`} />
          <FaqAccordion faqs={event.faq} />
          <div className="mt-10 text-center">
            <p className="text-sm text-[var(--muted)] mb-3">Planning something else?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {others.map((e) => <Link key={e.slug} href={`/events/${e.slug}`} className="min-h-[40px] inline-flex items-center rounded-full border border-[var(--border)] px-4 text-sm text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]">{e.menuTitle}</Link>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
