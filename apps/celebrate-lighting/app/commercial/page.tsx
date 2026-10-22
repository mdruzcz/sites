import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCities, getPhoto, getServiceLines } from "@/lib/content";
import { JsonLd, breadcrumbSchema, lineServiceSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { SectionHeading, Breadcrumbs, FeatureGrid, CityChips, FaqList } from "@/components/ui";
import { ClosingForm } from "@/components/sections";

export const revalidate = 3600;

const title = "Commercial Lighting for Businesses & Municipalities";
const description = "Permanent LED and seasonal Christmas lighting for storefronts, plazas, churches, dealerships and municipal buildings across Southwestern Ontario. Insured, WSIB, tender-ready.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/commercial" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/commercial`, images: [{ url: "/images/gallery/purple-and-teal-permanent-roofline-lights-commercial-building.jpg", alt: "Commercial building with permanent roofline lighting" }] },
  twitter: { card: "summary_large_image", title, description },
};

const faqs = [
  { question: "Which option is right for a business: permanent or seasonal?", answer: "If you want the building lit more than a few weeks a year, permanent wins: brand colours year-round, civic colours on demand, and no annual install bill. If you only need a traditional holiday display with a hard opening date, seasonal C9 and tree wrapping is the simpler buy. Many properties do both." },
  { question: "Do you provide insurance and WSIB documentation?", answer: "Yes. Certificates of insurance and WSIB clearance are provided up front for your procurement file, along with an itemized scope and product specifications suitable for tender or council submission." },
  { question: "Can you install outside business hours?", answer: "Yes. Commercial installs are scheduled around your trading hours and staged so entrances, drive lanes and parking stay usable throughout." },
  { question: "Do you work with churches and non-profits on fixed budgets?", answer: "Yes, often. Tell us the budget and the date you need to be lit and we design the most visible display that fits, prioritising the areas that matter most. Many groups build the display up over several seasons." },
];

export default function CommercialPage() {
  const lines = getServiceLines();
  const cities = getCities();
  const hero = getPhoto("purple-and-teal-permanent-roofline-lights-commercial-building");
  const cards = [
    { line: lines[0], photo: getPhoto("rainbow-permanent-roofline-lights-commercial-brick-building"), href: "/permanent-lighting/commercial", title: "Permanent commercial lighting", body: "One installed system for every season, promotion and civic event. Brand colours by default, anything else on demand, controlled from one app." },
    { line: lines[1], photo: getPhoto("red-green-white-permanent-roofline-lights-stone-home-steep-gables"), href: "/seasonal-lighting/commercial", title: "Seasonal & event lighting", body: "Tree wrapping, streetscapes, parks, drive-through shows and holiday frontages. Installed to a hard opening date and struck on your schedule." },
  ];
  return (
    <>
      <JsonLd data={[lineServiceSchema({ name: "Commercial lighting", description, url: `${site.url}/commercial`, serviceType: "Commercial exterior lighting" }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Commercial", url: `${site.url}/commercial` }]), faqSchema(faqs)]} />
      <section className="relative overflow-hidden on-photo" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0"><Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" /><div className="absolute inset-0 night-veil" /></div>
        <div className="wrap relative py-14 md:py-20 lg:py-24">
          <Breadcrumbs items={[{ name: "Commercial" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Commercial · Municipal · Non-profit</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.05] text-ink text-balance">Exterior Lighting for Businesses Across <span className="text-[var(--accent-ink)]">Southwestern Ontario</span></h1>
            <p className="mt-5 text-lg text-body leading-relaxed">Storefronts, plazas, dealerships, churches, town halls and parks. Permanent LED when you want the building lit all year, seasonal displays when you need a hard opening date. Insured crews, off-hours installs, paperwork ready for procurement.</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact?service=commercial" className="btn btn-primary btn-lg">Request a commercial quote <Icon.Arrow width={18} height={18} /></Link>
              <Link href="/ai-preview" className="btn btn-ghost-white btn-lg"><Icon.Sparkle width={18} height={18} /> Free AI Preview</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Two ways to light a property" title="Permanent or Seasonal. Often Both." sub="Choose the service that matches how many weeks a year you want to be lit." />
          <div className="grid md:grid-cols-2 gap-5">
            {cards.map((c) => (
              <Link key={c.href} href={c.href} className="card card-lift overflow-hidden group">
                <div className="relative aspect-[16/9]"><Image src={c.photo.src} alt={c.photo.alt} fill sizes="(max-width: 768px) 100vw, 50vw" placeholder="blur" blurDataURL={c.photo.blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="p-6"><h2 className="font-bold text-xl text-ink">{c.title}</h2><p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{c.body}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-ink)]">Learn more <Icon.Arrow width={16} height={16} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Who we work with" title="Property Types We Light" />
          <FeatureGrid cols={4} items={[
            { icon: <Icon.Building />, title: "Retail plazas & storefronts", body: "Define the frontage after dark and change colours for every promotion without a new install." },
            { icon: <Icon.Home />, title: "Car dealerships", body: "Brand colours on the showroom, white light where customers walk, a lot that reads as open." },
            { icon: <Icon.Users />, title: "Churches & community", body: "Warm white on Sundays, seasonal colour at Advent and Easter, run from one phone." },
            { icon: <Icon.Pin />, title: "Municipal & civic", body: "Town halls, arenas, libraries. Civic colours for awareness days without booking a contractor." },
            { icon: <Icon.Lamp />, title: "Restaurants & hospitality", body: "Patio and frontage lighting that shifts with the season and the booking." },
            { icon: <Icon.Calendar />, title: "Parks & events", body: "Tree wrapping, pathways, light shows and festivals built to a hard opening night." },
            { icon: <Icon.Sparkle />, title: "Multi-site & franchise", body: "One specification rolled out so the brand looks identical in every town." },
            { icon: <Icon.Shield />, title: "Office & industrial", body: "Clean architectural wash on the building line, better security in the lot." },
          ]} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div><span className="pill mb-4">Commercial FAQ</span><h2 className="font-display text-3xl text-ink leading-tight">Questions property managers ask first</h2></div>
          <FaqList items={faqs} name="commercial-hub-faq" />
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap"><SectionHeading eyebrow="Where we work" title="Commercial Lighting by City" align="left" /><CityChips cities={cities} basePath="/permanent-lighting" /></div>
      </section>

      <ClosingForm eyebrow="Commercial & municipal" title="Tell Us About the Property and the Deadline." body="A site walk, a written scope and proof of insurance, all before you commit to anything." photoNeedle="rainbow-permanent-roofline-lights-commercial-brick-building" formProps={{ serviceValue: "Commercial Lighting", submitLabel: "Request a commercial quote", reassurance: "We respond within 24 hours with next steps and insurance documents on request.", successTitle: "Commercial request received", successBody: <>We’ll be in touch within <strong>24 hours</strong> to arrange a site walk.</> }} />
    </>
  );
}
