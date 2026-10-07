import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getCities, getCityBySlug, getNearbyCities, getPhoto, getServices, getOccasions } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, lineServiceSchema, localBusinessSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, CityChips, FaqList, SectionHeading, IconTile } from "@/components/ui";
import { AiPreviewButton } from "@/components/AiPreviewProvider";
import { ClosingForm, Testimonials } from "@/components/sections";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const title = `Outdoor Lighting Installer in ${city.name}, ON`;
  return {
    title: { absolute: `${title} | ${site.name}` },
    description: city.meta.area,
    alternates: { canonical: `/service-areas/${slug}` },
    openGraph: { title: `${title} | ${site.name}`, description: city.meta.area, url: `${site.url}/service-areas/${slug}`, images: [{ url: "/images/gallery/cool-white-permanent-roofline-lights-stone-home-wraparound-porch.jpg", alt: `Permanent lighting installer serving ${city.name}, Ontario` }] },
    twitter: { card: "summary_large_image", title, description: city.meta.area },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  const nearby = getNearbyCities(city.slug, 10);
  const services = getServices();
  const occasions = getOccasions().slice(0, 8);
  const hero = getPhoto("cool-white-permanent-roofline-lights-stone-home-wraparound-porch");
  const url = `${site.url}/service-areas/${slug}`;
  const cards = [
    { href: `/permanent-lighting/${city.slug}`, title: `Permanent lighting in ${city.name}`, body: city.permanentCopy[0], photo: getPhoto("warm-white-permanent-roofline-lights-brick-home-garage-gable"), cta: site.demo.cta },
    { href: `/seasonal-lighting/${city.slug}`, title: `Christmas lights in ${city.name}`, body: city.seasonalCopy[0], photo: getPhoto("red-white-green-permanent-christmas-roofline-lights-blue-two-storey"), cta: site.seasonal.cta, gold: true },
  ];
  return (
    <>
      <JsonLd data={[
        localBusinessSchema(),
        lineServiceSchema({ name: `Outdoor lighting installation in ${city.name}`, description: city.meta.area, url, serviceType: "Permanent and seasonal outdoor lighting installation", city: city.name }),
        breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: `${site.url}/service-areas` }, { name: city.name, url }]),
        faqSchema(city.faqs),
      ]} />
      <section className="relative overflow-hidden" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0"><Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" /><div className="absolute inset-0 night-veil" /></div>
        <div className="wrap relative py-14 md:py-20">
          <Breadcrumbs items={[{ name: "Service Areas", href: "/service-areas" }, { name: city.name }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4"><Icon.Pin width={14} height={14} /> {city.county} · {city.driveFromWoodstock} from Woodstock</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.05] text-white text-balance">Permanent &amp; Christmas Lighting in <span className="text-[var(--accent)]">{city.name}, Ontario</span></h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">{city.intro}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">{site.demo.ctaLong} <Icon.Arrow width={18} height={18} /></Link>
              <AiPreviewButton className="btn btn-ghost-white btn-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card card-lift overflow-hidden group">
              <div className="relative aspect-[16/9]"><Image src={c.photo.src} alt={c.photo.alt} fill sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL={c.photo.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-6"><h2 className="font-bold text-xl text-white">{c.title}</h2><p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-4">{c.body}</p><span className={`mt-4 inline-flex items-center gap-1 text-sm font-bold ${c.gold ? "text-[var(--gold)]" : "text-[var(--accent)]"}`}>{c.cta} <Icon.Arrow width={16} height={16} /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="prose-dark">
            <h2 className="!mt-0">About lighting homes in {city.name}</h2>
            <p>{city.permanentCopy[1]}</p>
            <p>{city.permanentCopy[2]}</p>
            <h3>Neighbourhoods we serve in {city.name}</h3>
            <p>{city.neighbourhoods.join(", ")}. {city.housingStock}</p>
            <h3>Built for {city.name} winters</h3>
            <p>{city.climateNote} Every permanent system we install is IP67 sealed, UV-rated and cold-rated to −40°C, with a lifetime warranty on parts, hardware and workmanship.</p>
            <h3>Commercial lighting in {city.name}</h3>
            <p>{city.commercialNote} <Link href="/commercial">See our commercial services.</Link></p>
          </div>
          <aside className="space-y-4">
            <div className="card card-static p-6">
              <h3 className="font-bold text-white mb-3">{city.name} quick facts</h3>
              <dl className="text-sm space-y-2">
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">County</dt><dd className="text-white font-semibold text-right">{city.county}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">Population</dt><dd className="text-white font-semibold text-right">{city.population}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[var(--muted)]">From our base</dt><dd className="text-white font-semibold text-right">{city.driveFromWoodstock}</dd></div>
              </dl>
              <p className="mt-4 text-xs text-[var(--muted)]">Landmarks: {city.landmarks.join(" · ")}</p>
            </div>
            <div className="card card-static p-6">
              <h3 className="font-bold text-white mb-3">All services in {city.name}</h3>
              <ul className="text-sm space-y-2">
                {services.map((s) => (<li key={s.slug}><Link href={`/services/${s.slug}/${city.slug}`} className="text-[#d6deea] hover:text-[var(--accent)] inline-flex items-center gap-2 min-h-[32px]"><Icon.Check width={14} height={14} className="text-[var(--accent)]" /> {s.title} in {city.name}</Link></li>))}
              </ul>
            </div>
            <div className="card card-static p-6">
              <IconTile className="mb-3"><Icon.Sparkle /></IconTile>
              <h3 className="font-bold text-white">Free AI preview, {city.name}</h3>
              <p className="text-sm text-[var(--muted)] mt-1 mb-4">Upload one photo of your house and see it lit before anyone comes out.</p>
              <AiPreviewButton className="btn btn-outline btn-sm w-full" />
            </div>
          </aside>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10"><div><span className="pill mb-4">{city.name} FAQ</span><h2 className="font-display text-3xl text-white leading-tight">Questions from {city.name} homeowners</h2><p className="mt-3 text-[var(--muted)]">More answers on the <Link href="/faq" className="text-[var(--accent)] underline underline-offset-2">full FAQ page</Link>.</p></div><FaqList items={city.faqs} name="city-faq" /></div>
      </section>

      <Testimonials />

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Every occasion" title={`Scenes ${city.name} homeowners run all year`} align="left" />
          <div className="flex flex-wrap gap-2">{occasions.map((o) => <Link key={o.slug} href={`/occasions/${o.slug}`} className="chip">{o.name}</Link>)}</div>
          <div className="hairline my-10" />
          <SectionHeading eyebrow="Nearby" title={`Communities near ${city.name}`} align="left" />
          <CityChips cities={nearby} basePath="/service-areas" />
        </div>
      </section>

      <ClosingForm formProps={{ serviceValue: `Free On-Site Demo - ${city.name}` }} title={`See it lit up on your ${city.name} home. Then decide.`} />
    </>
  );
}
