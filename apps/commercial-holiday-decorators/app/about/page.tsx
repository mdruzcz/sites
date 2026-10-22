import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getAbout, getImage } from "@/lib/content";
import { JsonLd, breadcrumbSchema, localBusinessSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, SectionHeading, StatRow, IconTile, CheckList, Photo } from "@/components/ui";
import { PageHero, ClosingForm, VideoStrip } from "@/components/sections";

export const revalidate = 3600;

const title = "About Commercial Holiday Decorators: Insured Ontario Holiday Decor Crews Since 2016";
const description = "The commercial division of We Install Christmas Lights. Insured, WSIB-compliant crews decorating hotels, lobbies, plazas, offices and municipalities across Ontario since 2016, with our own inventory and a six-step process.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: `${site.url}/about` },
};

export default function AboutPage() {
  const about = getAbout();
  return (
    <>
      <JsonLd data={[localBusinessSchema(), webPageSchema({ name: title, description, url: `${site.url}/about` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "About", url: `${site.url}/about` }])]} />
      <PageHero image="installer-decorating-lit-christmas-trees-commercial-lobby" eyebrow={`Since ${site.since} · London, Ontario`} title="Insured commercial holiday decorators, from design to storage" sub={about.story[0]} align="narrow" crumbs={<Breadcrumbs items={[{ name: "About" }]} />} />

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="pill mb-4">Our story</span>
            <h2 className="font-display text-3xl md:text-[2.4rem] leading-[1.1] text-ink">From one truck in London to crews across the province</h2>
            {about.story.slice(1).map((p, i) => <p key={i} className="mt-4 text-[var(--muted)] leading-relaxed">{p}</p>)}
            <p className="mt-4 text-sm text-[var(--muted)]">Residential work continues under <a href={site.sisterBrand.url} className="text-[var(--accent-ink)] underline underline-offset-2">{site.sisterBrand.name}</a>.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Photo img={getImage("worker-decorating-commercial-christmas-tree-indoors")} ratio="aspect-[3/4]" />
            <Photo img={getImage("aerial-lift-commercial-christmas-tree-lighting-install")} ratio="aspect-[3/4]" className="mt-8" />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <StatRow stats={about.stats} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div key={v.title} className="card card-static p-6">
                <IconTile className="mb-4">{[<Icon.Star key="a" />, <Icon.Shield key="b" />, <Icon.Users key="c" />, <Icon.Check key="d" />][i % 4]}</IconTile>
                <h3 className="font-bold text-ink text-lg mb-1.5">{v.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Our process" title="Six steps from the first call to next year’s booking" sub="The same sequence on a single storefront or a forty-building portfolio." />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {about.process.map((p, i) => (
              <li key={p.title} className="card card-static p-6">
                <span className="timeline-dot !w-9 !h-9 text-sm mb-4 !shadow-none">{i + 1}</span>
                <h3 className="font-bold text-ink text-lg mb-1.5">{p.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">{p.body}</p>
                <CheckList items={p.detail} className="text-sm" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <VideoStrip keys={["christmas-display-installation-shopping-mall-crew", "gold-poinsettia-garland-staircase-holiday-decor-detail", "commercial-entryway-lit-christmas-trees-gold-ribbon"]} eyebrow="Crew footage" title="What a workday looks like" />

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap grid lg:grid-cols-2 gap-10">
          <div>
            <span className="pill mb-4">Guarantees</span>
            <h2 className="font-display text-3xl text-ink mb-6">What we put in writing</h2>
            <div className="space-y-4">
              {about.guarantees.map((g) => (
                <div key={g.title} className="card card-static p-5 flex gap-4"><IconTile className="shrink-0"><Icon.Shield /></IconTile><div><p className="font-bold text-ink">{g.title}</p><p className="text-sm text-[var(--muted)] leading-relaxed">{g.body}</p></div></div>
              ))}
            </div>
          </div>
          <div>
            <span className="pill mb-4">Where we work</span>
            <h2 className="font-display text-3xl text-ink mb-4">Service area</h2>
            <p className="text-[var(--muted)] leading-relaxed">{about.serviceAreaBlurb}</p>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">Base: {site.addressLine}. Hours {site.hours}.</p>
            <Link href="/service-areas" className="btn btn-outline mt-6">All service areas <Icon.Arrow width={16} height={16} /></Link>
          </div>
        </div>
      </section>

      <ClosingForm />
    </>
  );
}
