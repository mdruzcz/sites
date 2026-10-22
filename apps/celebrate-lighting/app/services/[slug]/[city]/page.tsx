import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getCities, getCityBySlug, getNearbyCities, getPhoto, getServiceLine } from "@/lib/content";
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, CityChips, CheckList, FaqList, SectionHeading } from "@/components/ui";
import { ClosingForm } from "@/components/sections";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  const cities = getCities();
  return services.flatMap((s) => cities.map((c) => ({ slug: s.slug, city: c.slug })));
}

const VERB: Record<string, string> = { "new-installation": "Permanent Lighting Installation", "repair-service": "Permanent Lighting Repair", consultation: "Free Lighting Consultation", maintenance: "Permanent Lighting Maintenance", "replace-existing-lights": "Permanent Lighting Upgrades" };

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};
  const title = `${VERB[slug] ?? service.title} in ${city.name}, ON`;
  const description = `${VERB[slug] ?? service.title} for ${city.name} homes in ${city.county}. ${service.shortDescription.split(". ")[0]}. Free on-site demo, lifetime warranty.`.slice(0, 160);
  return {
    title: { absolute: `${title} | ${site.name}` },
    description,
    alternates: { canonical: `/services/${slug}/${citySlug}` },
    openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/services/${slug}/${citySlug}`, images: [{ url: "/images/gallery/warm-white-permanent-roofline-lights-dark-siding-bungalow.jpg", alt: `${service.title} in ${city.name}` }] },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();
  const nearby = getNearbyCities(city.slug, 10);
  const line = getServiceLine("permanent-lighting")!;
  const photo = getPhoto("warm-white-permanent-roofline-lights-dark-siding-bungalow");
  const faqs = [...city.faqs, line.faqs[1]];
  const url = `${site.url}/services/${slug}/${citySlug}`;
  return (
    <>
      <JsonLd data={[serviceSchema(service, city.name), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: `${site.url}/services` }, { name: service.title, url: `${site.url}/services/${slug}` }, { name: city.name, url }]), faqSchema(faqs)]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: service.title, href: `/services/${slug}` }, { name: city.name }]} />
          <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="pill mb-4">{service.title} · {city.name}</span>
              <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">{VERB[slug] ?? service.title} in <span className="text-[var(--accent-ink)]">{city.name}</span></h1>
              <p className="mt-5 text-lg text-body leading-relaxed">{service.shortDescription} Serving {city.name} and {city.county}, {city.driveFromWoodstock} from our Woodstock base.</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href={`/contact?service=${slug}`} className="btn btn-primary btn-lg">{slug === "repair-service" ? "Book a repair visit" : site.demo.ctaLong} <Icon.Arrow width={18} height={18} /></Link>
                <Link href="/ai-preview" className="btn btn-outline btn-lg"><Icon.Sparkle width={18} height={18} /> Free AI Preview</Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border)]"><Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" /></div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="prose-dark">
            <h2 className="!mt-0">{service.title} for {city.name} homes</h2>
            <p>{service.fullDescription}</p>
            <p>{city.intro}</p>
            <p>{city.permanentCopy[0]}</p>
            <h3>{city.name} neighbourhoods we serve</h3>
            <p>{city.neighbourhoods.join(", ")} and the surrounding area. {city.housingStock} {city.climateNote}</p>
          </div>
          <aside className="space-y-4">
            <div className="card card-static p-6"><h3 className="font-bold text-ink mb-3">What’s included</h3><CheckList items={service.features} className="text-sm" /></div>
            <div className="card card-static p-6"><h3 className="font-bold text-ink mb-2">More in {city.name}</h3><ul className="text-sm space-y-1.5"><li><Link href={`/permanent-lighting/${city.slug}`} className="text-[var(--accent-ink)] underline underline-offset-2">Permanent lighting in {city.name}</Link></li><li><Link href={`/seasonal-lighting/${city.slug}`} className="text-[var(--gold-ink)] underline underline-offset-2">Christmas light installation in {city.name}</Link></li><li><Link href={`/service-areas/${city.slug}`} className="text-[var(--accent-ink)] underline underline-offset-2">{city.name} service area page</Link></li></ul></div>
          </aside>
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10"><div><span className="pill mb-4">{city.name} FAQ</span><h2 className="font-display text-3xl text-ink leading-tight">Questions from {city.name} homeowners</h2></div><FaqList items={faqs} name="svc-city-faq" /></div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap"><SectionHeading eyebrow="Nearby" title={`${service.title} near ${city.name}`} align="left" /><CityChips cities={nearby} basePath={`/services/${slug}`} /></div>
      </section>
      <ClosingForm formProps={{ serviceValue: `${service.title} - ${city.name}` }} title={`See it lit up on your ${city.name} home. Then decide.`} />
    </>
  );
}
