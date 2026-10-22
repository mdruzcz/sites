import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getCities, getPhoto } from "@/lib/content";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, SectionHeading, FeatureGrid, StatRow, CityChips } from "@/components/ui";
import { Testimonials, BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "About Celebrate Lighting: Woodstock's Permanent Lighting Team";
const description = "Celebrate Lighting is a Woodstock, Ontario permanent LED and Christmas lighting installer serving Southwestern Ontario. Local crews, free on-site demos, lifetime warranty on every install.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/about`, images: [{ url: "/images/gallery/warm-white-permanent-roofline-lights-two-storey-home-covered-porch.jpg", alt: "About Celebrate Lighting" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function AboutPage() {
  const photo = getPhoto("warm-white-permanent-roofline-lights-two-storey-home-covered-porch");
  const detail = getPhoto("daytime-colour-matched-permanent-light-track-in-white-soffit");
  const cities = getCities();
  return (
    <>
      <JsonLd data={[localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "About", url: `${site.url}/about` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "About" }]} />
          <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="pill mb-4">Our story</span>
              <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">A Woodstock Lighting Company That Shows You First</h1>
              <p className="mt-5 text-lg text-body leading-relaxed">Celebrate Lighting installs permanent outdoor LED lighting and seasonal C9 Christmas lights across Southwestern Ontario from our base at {site.addressLine}. We started with one belief: you shouldn’t have to imagine what a lighting system looks like on your house. You should see it.</p>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border)]"><Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" /></div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <StatRow stats={site.proofPoints} />
          <div className="grid lg:grid-cols-2 gap-10 mt-14 items-center">
            <div className="prose-dark">
              <h2 className="!mt-0">Who we are</h2>
              <p>We’re a locally owned Oxford County business that does one thing well: exterior lighting that’s installed cleanly, built for Ontario weather and backed for life. Our crews live in the communities we serve, from London to Guelph and Stratford to Simcoe, so the person who measures your roofline is the same kind of neighbour who’ll answer the phone in February.</p>
              <p>The free on-site demo is the heart of how we work. We colour-match your soffit, mount a live sample section on your home and light it at night so the decision is made on your driveway, not from a brochure. The new free AI home preview takes that one step earlier: upload a photo, see the idea, then book the demo to see the real thing.</p>
              <h3>What we install</h3>
              <p>Permanent systems use colour-matched aluminum track with individually addressable RGBW LEDs, IP67 sealed and cold-rated to −40°C, fitted without roof penetration and controlled from an app. Seasonal work uses commercial-grade C9 LED on custom-cut wire, installed in the fall and removed in January. Both carry our name, and permanent installs carry a lifetime warranty on parts, hardware and workmanship.</p>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border)]"><Image src={detail.src} alt={detail.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" placeholder="blur" blurDataURL={detail.blurDataURL} className="object-cover" /></div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="What drives us" title="Our Values" />
          <FeatureGrid items={[
            { icon: <Icon.Eye />, title: "Show, don't tell", body: "Every permanent quote comes after a live demo on your house. No renders, no guesswork." },
            { icon: <Icon.Shield />, title: "Stand behind it", body: "Lifetime warranty in writing. If it fails, we fix it. That's the whole policy." },
            { icon: <Icon.Ruler />, title: "Precision", body: "Measured runs, colour-matched track, concealed cable. The day-time look matters as much as the night." },
            { icon: <Icon.Users />, title: "Local and reachable", body: "A Woodstock address, a phone that gets answered, and crews who know the area." },
          ]} />
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap"><SectionHeading eyebrow="Where we work" title="Proudly Serving Southwestern Ontario" align="left" /><CityChips cities={cities} basePath="/service-areas" /><Link href="/service-areas" className="btn btn-outline btn-sm mt-6">All service areas <Icon.Arrow width={14} height={14} /></Link></div>
      </section>
      <Testimonials />
      <BookCta />
    </>
  );
}
