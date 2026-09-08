import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { Process, Testimonials, AreasBand } from "@/components/Sections";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;
const TITLE = "About London Retaining Walls | Owner-Led Since 2018";
const DESC = "Meet the owner-led crew behind London Retaining Walls: 8+ years building block, concrete, timber and stone retaining walls across Southwestern Ontario.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${site.url}/about-us` }, openGraph: { title: TITLE, description: DESC, url: `${site.url}/about-us`, images: [{ url: PICKS.about.image, alt: PICKS.about.alt }] }, twitter: { card: "summary_large_image", title: TITLE, description: DESC } };

export default function AboutPage() {
  const values = [
    ["We dig deeper than we have to", "A wall is only as good as what it sits on. Our bases go below the frost-affected zone and get compacted in lifts, not dumped and tamped once."],
    ["Water always has somewhere to go", "Clear stone, weeping tile to daylight and filter fabric are standard on every wall, including small garden walls. Hydrostatic pressure is what pushes walls over."],
    ["The right material, not the priciest one", "Timber is the right answer for plenty of yards. Concrete is the right answer for a driveway. We tell you which and why."],
    ["Permits are our problem, not yours", "Over 1 metre, or carrying a load, means a permit and often an engineer. We handle both and build to the stamped drawing."],
    ["One person owns the job", "Kyle quotes it, is on site building it, and answers the phone afterward. No hand-offs."],
    ["Repairs are welcome", "We assess and rebuild walls other contractors built. Many of the photos in our gallery started as someone else's failure."],
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About", href: "/about-us" }])} />
      <PageHero photo={PICKS.about} kicker="About us" title="A small crew that builds retaining walls and nothing else" intro="London Retaining Walls is owner-led by Kyle. Since 2018 we have built and rebuilt retaining walls across London and Southwestern Ontario, and only retaining walls." crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about-us" }]} />
      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="prose-lrw">
            <p className="kicker">How we got here</p>
            <h2 className="display mt-3 mb-5 text-3xl md:text-4xl">Started because too many walls were falling down</h2>
            <p>Kyle spent years in landscaping and construction across Southwestern Ontario before starting London Retaining Walls. The pattern was hard to miss: walls that leaned, bulged or collapsed within a few years, almost always because someone had set them on topsoil with nothing behind them but the dirt they dug out.</p>
            <p>The business was built around fixing that. Every wall we build starts with a proper site walk, a base that goes below the frost-affected zone, and drainage designed for the heavy clay that most of London, Middlesex and Elgin counties sit on. It costs a little more up front and it is why our walls are still straight a decade later.</p>
            <p>Today we build for homeowners and commercial properties from a two-course garden bed to engineered walls holding up driveways, and we are one of the few crews in the area that will take on <Link href="/retaining-wall-repair">repairing or rebuilding a wall someone else built</Link>.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/gallery" className="btn btn-ink">See the gallery</Link><Link href="/contact-us#quote" className="btn btn-outline">Book a site visit</Link></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[PICKS.tieback, PICKS.drainage, PICKS.blockBase, PICKS.curve].map((p, i) => (
              <div key={p.image} className={`relative overflow-hidden border border-[var(--line)] ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image src={p.image} alt={p.alt} fill sizes="(max-width:1024px) 100vw, 50vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-paper-2">
        <div className="container-x">
          <p className="kicker">What we stand for</p>
          <h2 className="display mt-3 text-3xl md:text-4xl">Six rules we do not bend</h2>
          <dl className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map(([t, d], i) => (
              <div key={t} className="border border-[var(--line)] bg-white p-6">
                <p className="font-display text-sm font-extrabold text-accent-2">{String(i + 1).padStart(2, "0")}</p>
                <dt className="mt-2 font-display text-lg font-extrabold uppercase tracking-tight">{t}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <Testimonials />
      <Process />
      <AreasBand />
      <CtaBand />
    </>
  );
}
