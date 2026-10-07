import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getCities, getPhoto } from "@/lib/content";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, SectionHeading, StatRow } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "Service Area: Permanent Lighting Across Southwestern Ontario";
const description = "Celebrate Lighting installs permanent LED and seasonal Christmas lighting in 16 communities within 90 minutes of Woodstock: London, Kitchener-Waterloo, Cambridge, Guelph, Brantford, Stratford and more.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/service-areas" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/service-areas`, images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home.jpg", alt: "Permanent roofline lighting in Southwestern Ontario" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function ServiceAreasPage() {
  const cities = getCities();
  const counties = Array.from(new Set(cities.map((c) => c.county)));
  const photos = ["warm-white-permanent-roofline-lights-two-storey-home-covered-porch", "rainbow-gradient-permanent-roofline-lights-dark-siding-bungalow", "cool-white-permanent-roofline-lights-brick-home-garage-gable", "red-green-white-permanent-roofline-lights-stone-home-steep-gables"].map(getPhoto);
  return (
    <>
      <JsonLd data={[localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Service Areas", url: `${site.url}/service-areas` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Service Areas" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Serving Southwestern Ontario</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">Where We Install Permanent &amp; Seasonal Lighting</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">Based at {site.addressLine}, we cover Oxford County and the cities around it, roughly a 90-minute radius. Every community below has its own page with neighbourhood detail, local FAQs and the free on-site demo offer.</p>
          </div>
          <div className="mt-10"><StatRow stats={[{ stat: String(cities.length), label: "Communities with local pages" }, { stat: "90 min", label: "Typical service radius from Woodstock" }, { stat: "24 hrs", label: "Response on every request" }, { stat: "Free", label: "On-site demo and AI preview" }]} /></div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          {counties.map((county) => (
            <div key={county} className="mb-12 last:mb-0">
              <h2 className="font-bold text-2xl text-white mb-5 flex items-center gap-3"><Icon.Pin className="text-[var(--accent)]" /> {county}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.filter((c) => c.county === county).map((c) => (
                  <Link key={c.slug} href={`/service-areas/${c.slug}`} className="card card-lift p-6 group">
                    <div className="flex items-start justify-between gap-3">
                      <div><h3 className="font-bold text-xl text-white">{c.name}</h3><p className="text-xs text-[var(--muted)] mt-0.5">{c.driveFromWoodstock} · pop. {c.population}</p></div>
                      <span className="icon-tile !w-9 !h-9 shrink-0 group-hover:bg-[var(--accent)] group-hover:text-[#04121a] transition-colors"><Icon.Arrow width={16} height={16} /></span>
                    </div>
                    <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed line-clamp-3">{c.intro}</p>
                    <p className="mt-3 text-xs text-[#c3cddc]">{c.neighbourhoods.slice(0, 4).join(" · ")}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Recent work" title="Homes Across the Region" sub="Every photo in our gallery is a real permanent installation." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {photos.map((p) => (<Link key={p.src} href="/gallery" className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)]"><Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" /></Link>))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">Not on the list? We regularly travel further for larger projects. <Link href="/contact" className="text-[var(--accent)] underline underline-offset-2">Ask us</Link>.</p>
        </div>
      </section>
      <BookCta />
    </>
  );
}
