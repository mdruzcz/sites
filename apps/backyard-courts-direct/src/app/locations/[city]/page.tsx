import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { KitCard } from "@/components/kit-card";
import { PageHero } from "@/components/page-hero";
import { QuoteBand, SectionHead, Steps } from "@/components/sections";
import { cities, getCity, kits } from "@/lib/content";
import { JsonLd } from "@/lib/jsonld";
import { ogBase, twitterImages } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const c = getCity((await params).city);
  if (!c) return {};
  const title = `Backyard Court Kits in ${c.name}, ${c.provinceCode}`;
  const description = `Backyard basketball, pickleball and multi-sport court kits delivered to ${c.name}, ${c.province}. Modular tiles, your colours, freight to your driveway.`.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/locations/${c.slug}` },
    openGraph: { ...ogBase, title: `${title} | ${site.name}`, description, url: `/locations/${c.slug}` },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const c = getCity((await params).city);
  if (!c) notFound();
  const popular = kits.filter((k) => k.popular).slice(0, 4);

  return (
    <>
      <PageHero
        photo={site.photos.locations}
        photoAlt={`Outdoor sport court surrounded by trees, backyard court kits delivered to ${c.name}, ${c.province}`}
        eyebrow={`Shipping to ${c.name}`}
        title={`Backyard court kits in ${c.name}`}
        intro={c.intro}
        crumb={c.name}
        trail={[{ label: "Court kits", href: "/court-kits" }]}
        path={`/locations/${c.slug}`}
      >
        <Link href="/contact#quote" className="btn btn-cta mt-6">
          Get a price delivered to {c.name} <span aria-hidden>→</span>
        </Link>
      </PageHero>

      <section className="shell section grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-block">
          <h2 className="h2 !mt-0">Building a backyard court in {c.name}</h2>
          {c.local.map((p) => (
            <p key={p.slice(0, 24)} className="text-[1.0625rem] text-[var(--ink)]/85">
              {p}
            </p>
          ))}
        </div>
        <aside className="card h-fit p-6">
          <h2 className="h3">Also delivering near {c.name}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.nearby.map((n) => (
              <li key={n} className="pill pill-accent">
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">Kits ship on pallets by freight carrier. Include your postal code and we will quote the kit and delivery together.</p>
        </aside>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="Court kits" title={`Court kits delivered to ${c.name}`} action={{ label: "All court kits", href: "/court-kits" }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((k) => (
            <KitCard key={k.slug} kit={k} />
          ))}
        </div>
      </section>

      <section className="shell pb-16 md:pb-24">
        <SectionHead eyebrow="How it works" title="From quote to game on" />
        <Steps steps={site.home.steps} />
      </section>

      <QuoteBand title={`Planning a court in ${c.name}?`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Backyard court kits in ${c.name}`,
          serviceType: "Modular sport court kit supply and delivery",
          provider: { "@id": `${site.url}/#organization` },
          areaServed: [{ "@type": "City", name: c.name, containedInPlace: { "@type": "AdministrativeArea", name: c.province } }, ...c.nearby.map((n) => ({ "@type": "City", name: n }))],
          url: `${site.url}/locations/${c.slug}`,
        }}
      />
    </>
  );
}
