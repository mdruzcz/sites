import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ARTICLES, getByCategory, heroPhotoFor } from "@/lib/resources";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Track Lighting Guides: Brands, Install, Cost, Power",
  description:
    "Plain-spoken guides to permanent track lighting in Canada: how the big brands compare, how to install on any soffit, what it costs, power injection, wiring and winter.",
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: { title: "Track Lighting Guides & How-To | Illumi Track Lights", description: "Brand comparisons, how-tos, costs and parts explained for permanent LED track lighting.", url: `${SITE_URL}/resources`, images: ["/images/photos/home-night-lit.webp"] },
  twitter: { card: "summary_large_image", title: "Track Lighting Guides & How-To", description: "Brand comparisons, how-tos, costs and parts explained for permanent LED track lighting." }
};

const GROUP_NOTES: Record<string, string> = {
  "Brand comparisons": "Gemstone, Govee, Trimlight and the rest, from what each maker publishes.",
  Guides: "Start here if permanent lighting is new to you.",
  "How-to": "On the ladder, step by step.",
  Costs: "What it costs, and what you get back.",
  Comparisons: "Kit or installer, permanent or seasonal.",
  "Parts & specs": "Power, wiring and the parts that make a long run work."
};

export default function ResourcesPage() {
  const groups = getByCategory();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Illumi Track Lights guides",
    itemListElement: ARTICLES.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: `${SITE_URL}/resources/${a.slug}` }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero compact photo="home-night-lit" eyebrow="Guides & how-to" title="Read before you measure." intro="The questions we answer most, written down: which brand, which kit, how it goes up, what it costs and what a Canadian winter does to it." crumbs={[{ label: "Guides" }]} />
      <section>
        <div className="shell section space-y-14">
          {groups.map((group) => (
            <div key={group.category}>
              <h2 className="font-display h3-fluid track-title">{group.category}</h2>
              {GROUP_NOTES[group.category] && <p className="mt-2 text-center text-sm text-[var(--color-muted)]">{GROUP_NOTES[group.category]}</p>}
              <ul className="mt-7 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                {group.articles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/resources/${a.slug}`} className="group block">
                      <Photo name={heroPhotoFor(a.slug)} alt={a.heroAlt} ratio="aspect-[16/9]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px" />
                      <h3 className="font-display mt-3 text-[1.15rem] leading-snug group-hover:underline">{a.title}</h3>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{a.excerpt}</p>
                      <p className="mt-2 text-[0.8rem] text-[var(--color-muted)]">{a.readMinutes} minute read</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section text-center">
          <h2 className="font-display h2-fluid">Still not sure which kit fits?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-soft)]">Send us the lengths of the edges you want lit, or a photo of the house. We will tell you which kit fits and whether you need anything else.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us" className="btn-primary">Ask us a question</Link>
            <Link href="/diy-kits" className="btn-secondary">Shop the kits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
