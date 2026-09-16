import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Pic } from "@/components/Pic";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { getServices, getServiceBySlug, getServiceAreas, getCityBySlug, getProjectsByService } from "@/lib/content";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const areas = getServiceAreas();
  return services.flatMap((service) => areas.cities.map((city) => ({ slug: service.slug, city: city.slug })));
}

const shortCity = (name: string) => (name === "Kitchener-Waterloo" ? "KW" : name);

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  const base = `${service.menuTitle} in ${shortCity(city.name)}, ON`;
  const title = base.length <= 36 ? base : `${service.menuTitle} ${shortCity(city.name)}`;
  return {
    title,
    description: `${service.menuTitle} for weddings, corporate events and holiday parties in ${city.name}, Ontario. From $${service.startingAt}, installed by our crew. Call ${site.phone}.`.slice(0, 160),
    alternates: { canonical: `/services/${service.slug}/${city.slug}` },
    openGraph: {
      title: `${service.title} in ${city.name} | Bright Event Lighting`,
      description: `${service.shortDescription} Now serving ${city.name}, ON.`,
      url: `${site.url}/services/${service.slug}/${city.slug}`,
      images: [{ url: service.image, alt: `${service.title} in ${city.name}, Ontario` }],
    },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const otherCities = getServiceAreas().cities.filter((c) => c.slug !== citySlug);
  const otherServices = getServices().filter((s) => s.slug !== slug);
  const photos = getProjectsByService(service.slug).slice(0, 3);
  const isHoliday = ["indoor-garlands-wreaths", "mall-holiday-decor", "commercial-holiday-lighting"].includes(service.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service, city.name)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
            { name: city.name, url: `${site.url}/services/${service.slug}/${city.slug}` },
          ])),
        }}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Pic src={service.image} alt={`${service.title} in ${city.name}, Ontario`} fill className="object-cover" priority sizes="100vw" quality={78} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F10]/95 via-[#0F0F10]/70 to-[#0F0F10]/30" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-[var(--accent)] text-sm tracking-[0.2em] uppercase mb-3">{city.name}, Ontario · From ${service.startingAt.toLocaleString("en-CA")}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">{service.title} in {city.name}, ON</h1>
            <p className="mt-5 text-lg text-[var(--muted)] leading-relaxed">
              {service.shortDescription} Installed by our crew at {city.name} venues, businesses and homes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="#quote" className="btn btn-primary min-h-[48px] px-8">Get a {city.name} Quote</Link>
              <Link href={`/services/${service.slug}`} className="btn btn-ghost min-h-[48px] px-8">About {service.menuTitle}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-6 text-[var(--muted)] leading-relaxed">
              <p>{city.description}</p>
              <p>{service.fullDescription}</p>

              <h2 className="text-2xl font-bold text-[var(--foreground)] pt-2">Why {city.name} Books {service.menuTitle} With Us</h2>
              <p>
                {isHoliday
                  ? `Holiday installs in ${city.name} start in late October and our calendar fills by mid-November, so we schedule ${city.name} businesses, venues and homes early and install overnight or off-hours where the property needs it. Every display gets a mid-season check and comes down in January.`
                  : `When you book ${service.menuTitle.toLowerCase()} for a ${city.name} wedding, corporate event or party, you get a designed lighting plan and a crew that installs it, not a box of lights and a tripod. We arrive well before guests, place and program every fixture, and, where a technician is included, run the lighting live through the evening.`}
              </p>
              <p>
                {city.focus}. That local knowledge matters: every venue has its own ceiling heights, power access and rigging rules, and we plan around them before we load the van. Travel to {city.name} is included in every quote.
              </p>

              {city.venues && city.venues.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-[var(--foreground)] font-bold mb-3">Venues and Properties We Know in {city.name}</h3>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {city.venues.map((venue) => (
                      <li key={venue} className="flex items-center gap-2 text-sm"><span className="text-[var(--accent)]">✦</span>{venue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <h2 className="text-2xl font-bold text-[var(--foreground)] pt-2">What&apos;s Included With Every {city.name} Booking</h2>
              <ul className="space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3"><Check className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />{f}</li>
                ))}
              </ul>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {photos.map((p) => (
                    <div key={p.slug} className="relative aspect-[4/3] rounded-lg overflow-hidden card">
                      <Pic src={p.image} alt={`${service.title} by Bright Event Lighting, serving ${city.name}`} fill className="object-cover" sizes="33vw" />
                    </div>
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-bold text-[var(--foreground)] pt-2">Book {service.menuTitle} in {city.name}</h2>
              <p>
                Tell us your date, the venue or address in {city.name}, and what you are picturing. We reply with a firm, flat-rate quote within {site.responseTime}.
                {isHoliday ? " Book by early October to secure a November install date." : " Saturday dates from May to October book months ahead, so the earlier you reach out, the better."}
              </p>

              <div className="pt-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">{service.menuTitle} Also Available In</h3>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map((c) => (
                    <Link key={c.slug} href={`/services/${service.slug}/${c.slug}`} className="text-sm px-3 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 min-h-[36px] inline-flex items-center">{c.name}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">Other Services in {city.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {otherServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}/${citySlug}`} className="text-sm px-3 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 min-h-[36px] inline-flex items-center">{s.menuTitle}</Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 self-start">
              <div id="quote" className="card p-6 scroll-mt-24">
                <QuoteForm heading={`Quote for ${city.name}`} showPromise compact defaultService={service.title} />
              </div>
              <div className="card p-6 mt-6">
                <h3 className="font-bold text-[var(--foreground)] mb-2">Prefer to talk?</h3>
                <a href={site.phoneHref} className="text-[var(--accent)] text-lg font-semibold">{site.phone}</a>
                <p className="text-xs text-[var(--muted)] mt-2">{site.hours}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
