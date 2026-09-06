import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteDock } from "@/components/QuoteDock";
import { getGuides, guidePhoto } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Sealing Guides: Finishes, Lifespan, Garage, Pool",
  description: "Guides from All-Seal: which sheen to pick, how long sealer lasts in Ontario, sealing garage floors and pool decks, acrylic vs polyurethane, sealing over old sealer, anti-slip additives and fall prep.",
  alternates: { canonical: `${site.url}/resources` },
};

const ORDER = ["Finishes", "Costs", "Planning", "Sealers", "Process", "Surfaces"];

export default function ResourcesPage() {
  const guides = getGuides();
  const groups = ORDER.map((category) => ({ category, items: guides.filter((g) => g.category === category) })).filter((g) => g.items.length);
  const ld = { "@context": "https://schema.org", "@type": "ItemList", name: "All-Seal guides", itemListElement: guides.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${site.url}/resources/${a.slug}` })) };
  return (
    <>
      <Script id="guides-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero photo={PICKS.resources} kicker="Guides" title={<>Concrete sealing, <span className="text-[var(--orange)]">explained straight.</span></>} intro="Which sheen, which sealer, how long it lasts, and what to do about garage floors, pool decks and old peeling coats. Written for Southwestern Ontario slabs." crumbs={[{ label: "Guides" }]} />
      <section className="bg-white">
        <div className="shell section space-y-14">
          {groups.map((g) => (
            <div key={g.category}>
              <p className="kicker">{g.category}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((a) => <Link key={a.slug} href={`/resources/${a.slug}`} className="card card-lift group flex flex-col overflow-hidden"><Photo name={guidePhoto(a.slug)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, 380px" /><div className="flex flex-1 flex-col p-5"><p className="text-xs uppercase tracking-wider text-[var(--muted)]">{a.readMinutes} min read</p><h2 className="font-display mt-2 text-2xl leading-tight group-hover:text-[var(--orange-deep)]">{a.title}</h2><p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{a.excerpt}</p><span className="font-display mt-4 text-sm font-bold uppercase tracking-wider text-[var(--orange-deep)]">Read →</span></div></Link>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <QuoteDock />
    </>
  );
}
