import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pic } from "@/components/Pic";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { getServiceAreas, getCityBySlug, getServices, getEventTypes } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServiceAreas().cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const shortCity = city.name === "Kitchener-Waterloo" ? "KW" : city.name;
  return {
    title: `Event Lighting in ${shortCity}, ON`,
    description: `Wedding, corporate event and Christmas party lighting plus holiday decor in ${city.name}, Ontario. Uplighting, string lights, tent lighting, garlands and commercial displays. Call ${site.phone}.`.slice(0, 160),
    alternates: { canonical: `/service-areas/${city.slug}` },
    openGraph: {
      title: `Event Lighting in ${city.name} | Bright Event Lighting`,
      description: city.focus,
      url: `${site.url}/service-areas/${city.slug}`,
      images: [{ url: "/images/og-default.jpg", alt: `Event lighting and holiday decor in ${city.name}, Ontario` }],
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const services = getServices();
  const events = getEventTypes();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: `${site.url}/service-areas` }, { name: city.name, url: `${site.url}/service-areas/${city.slug}` }])) }} />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Pic src="/images/tent-string-light-canopy-wedding-reception.jpg" alt={`Event lighting in ${city.name}, Ontario`} fill className="object-cover" priority sizes="100vw" quality={78} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F10]/95 via-[#0F0F10]/75 to-[#0F0F10]/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28 max-w-3xl">
          <p className="text-[var(--accent)] text-sm tracking-[0.2em] uppercase mb-3">{city.name}, Ontario</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">Event Lighting & Holiday Decor in {city.name}</h1>
          <p className="mt-5 text-lg text-[var(--muted)]">{city.focus}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            <div className="space-y-6 text-[var(--muted)] leading-relaxed text-lg">
              <p>{city.description}</p>
              <p>
                Bright Event Lighting brings uplighting, Edison string light canopies, tent lighting, cold sparks and pinspotting to weddings, corporate events and private parties across {city.name}. From October through January the same crew installs holiday decor: lit garlands, wreaths and decorated trees for offices, restaurants and homes, plus roofline lighting and large-format displays for plazas, malls and commercial properties. Travel to {city.name} is included in every quote.
              </p>
              <p>
                Everything we place is wireless or professionally rigged, DMX-controlled where it matters, and installed and removed by our own team. We coordinate with your {city.name} venue, planner, DJ or property manager so the lighting is one less thing to manage.
              </p>

              {city.venues && city.venues.length > 0 && (
                <div className="card p-6 text-base">
                  <h3 className="text-[var(--foreground)] font-bold mb-3">Venues and Properties We Know in {city.name}</h3>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {city.venues.map((venue) => <li key={venue} className="flex items-center gap-2 text-sm"><span className="text-[var(--accent)]">✦</span>{venue}</li>)}
                  </ul>
                </div>
              )}

              <div className="text-base">
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">What Are We Lighting in {city.name}?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {events.map((e) => (
                    <Link key={e.slug} href={`/events/${e.slug}`} className="card p-4 hover:border-[var(--accent)]/40 transition-colors">
                      <p className="font-semibold text-[var(--foreground)]">{e.menuTitle}</p>
                      <p className="text-xs text-[var(--muted)] mt-1 line-clamp-2">{e.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <aside className="card p-6 lg:sticky lg:top-24">
              <QuoteForm heading={`Get a Quote for ${city.name}`} showPromise />
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Services" headline={`Lighting & Decor Services in ${city.name}`} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <ServiceCard key={s.slug} service={s} city={{ slug: city.slug, name: city.name }} />)}
          </div>
        </div>
      </section>
    </>
  );
}
