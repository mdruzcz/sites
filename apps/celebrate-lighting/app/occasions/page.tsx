import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getOccasions } from "@/lib/content";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "Permanent Lights for Every Occasion: Holidays, Game Day & More";
const description = "One permanent lighting system, every occasion: Christmas, Halloween, Canada Day, Diwali, Pride, game day and more. Colour recipes and scene ideas for Southwestern Ontario homes.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/occasions" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/occasions`, images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-bungalow-side-angle.jpg", alt: "Rainbow permanent roofline lights" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function OccasionsPage() {
  const occasions = getOccasions();
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/occasions` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Occasions", url: `${site.url}/occasions` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Occasions" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">One system, every occasion</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">Lights for Every Holiday, Game and Party</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">Permanent lighting isn’t just for December. Here’s how Southwestern Ontario homeowners use the same roofline all year, with colour recipes you can copy into the app.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {occasions.map((o) => (
            <Link key={o.slug} href={`/occasions/${o.slug}`} className="card card-lift p-6 group flex flex-col">
              <div className="flex gap-1.5 mb-4">{o.colourRecipes[0]?.colours.map((c) => <span key={c} className="w-7 h-7 rounded-full border border-white/20" style={{ background: c, boxShadow: `0 0 14px ${c}66` }} aria-hidden="true" />)}</div>
              <span className="text-xs uppercase tracking-wide text-[var(--muted)]">{o.season}</span>
              <h2 className="font-bold text-xl text-white mt-1">{o.name}</h2>
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed line-clamp-3 flex-1">{o.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent)]">Scenes &amp; colours <Icon.Arrow width={16} height={16} /></span>
            </Link>
          ))}
        </div>
      </section>
      <BookCta />
    </>
  );
}
