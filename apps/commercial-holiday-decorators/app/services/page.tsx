import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getImage, getServices } from "@/lib/content";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, Photo } from "@/components/ui";
import { PageHero, ClosingForm } from "@/components/sections";

export const revalidate = 3600;

const title = "Commercial Holiday Decorating Services in Ontario";
const description = "Interior lobby decor, lobby Christmas tree rental and setup, commercial Christmas light installation, wreaths and garland, turnkey leasing, maintenance, takedown and storage. One crew, one invoice.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: `${site.url}/services` },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/services` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: `${site.url}/services` }])]} />
      <PageHero image="installer-decorating-large-atrium-christmas-tree" eyebrow="Services" title="Design, install, maintain, remove, store. All of it." sub={description} align="narrow" crumbs={<Breadcrumbs items={[{ name: "Services" }]} />} />
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card card-lift overflow-hidden grid sm:grid-cols-[0.8fr_1.2fr] group">
              <Photo img={getImage(s.heroImage)} ratio="aspect-[4/3] sm:aspect-auto sm:min-h-full" className="!rounded-none" sizes="(max-width: 640px) 100vw, 30vw" />
              <div className="p-6 flex flex-col">
                <span className="pill mb-3 self-start">{s.eyebrow}</span>
                <h2 className="font-bold text-xl text-ink">{s.name}</h2>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed flex-1">{s.navDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Learn more <Icon.Arrow width={16} height={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ClosingForm />
    </>
  );
}
