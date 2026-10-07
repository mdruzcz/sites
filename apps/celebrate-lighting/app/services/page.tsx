import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getCities } from "@/lib/content";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { SectionHeading, Breadcrumbs, CityChips, IconTile, CheckList } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "Permanent Lighting Services: Install, Repair, Maintenance";
const description = "New permanent LED installs, repairs on any brand, annual maintenance, consultations and system upgrades across Southwestern Ontario. Free on-site demo on new installs.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/services`, images: [{ url: "/images/gallery/teal-permanent-soffit-lights-close-up-grey-siding.jpg", alt: "Close-up of permanent soffit lighting" }] },
  twitter: { card: "summary_large_image", title, description },
};

const ICONS: Record<string, React.ReactNode> = { zap: <Icon.Bolt />, tool: <Icon.Wrench />, clipboard: <Icon.Ruler />, settings: <Icon.Shield />, "refresh-cw": <Icon.Sparkle /> };

export default function ServicesPage() {
  const services = getServices();
  const cities = getCities();
  return (
    <>
      <JsonLd data={[localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: `${site.url}/services` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Services" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Everything we do</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">Permanent Lighting Services in Southwestern Ontario</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">New installations with a free on-site demo, repairs on any brand of permanent lighting, annual maintenance, and upgrades for older systems. Plus <Link href="/seasonal-lighting" className="text-[var(--gold)] underline underline-offset-2">seasonal C9 Christmas lights</Link> and <Link href="/commercial" className="text-[var(--accent)] underline underline-offset-2">commercial work</Link>.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid md:grid-cols-2 gap-5">
          {services.map((s) => (
            <div key={s.slug} className="card card-static p-6 md:p-8 flex flex-col">
              <IconTile className="mb-4">{ICONS[s.icon] ?? <Icon.Sparkle />}</IconTile>
              <h2 className="font-bold text-2xl text-white">{s.title}</h2>
              <p className="mt-2 text-[var(--muted)] leading-relaxed">{s.shortDescription}</p>
              <CheckList items={s.features.slice(0, 3)} className="mt-4 text-sm" />
              <Link href={`/services/${s.slug}`} className="btn btn-outline btn-sm mt-6 self-start">About {s.title.toLowerCase()} <Icon.Arrow width={14} height={14} /></Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap"><SectionHeading eyebrow="Where we work" title="Service by City" align="left" /><CityChips cities={cities} basePath="/service-areas" /></div>
      </section>
      <BookCta />
    </>
  );
}
