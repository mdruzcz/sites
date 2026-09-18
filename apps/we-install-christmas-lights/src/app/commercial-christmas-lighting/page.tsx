import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { industries, services, site } from "@/lib/site";
import { pickPhotos, breadcrumbJsonLd } from "@/lib/content";
import { PhotoHero, TrustBar, CheckList, PhotoGrid, FaqSection, QuoteSection, CtaBand } from "@/components/PageBlocks";

export const revalidate = 3600;

const TITLE = "Commercial Christmas Light Installation Ontario";
const DESC = "Commercial Christmas lighting for plazas, offices, hotels, dealerships, malls and municipalities across London, Kitchener-Waterloo, Hamilton and the GTA. Insured crews, after-hours installs, one invoice.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: `${site.url}/commercial-christmas-lighting` },
  openGraph: { title: TITLE, description: DESC, url: `${site.url}/commercial-christmas-lighting`, type: "website" },
};

const FAQS = [
  { q: "How early do commercial projects need to be booked?", a: "Design and site visits start in late summer, and most commercial installs are scheduled between early October and mid-November so displays are lit for Black Friday and the shopping season. Multi-building programs and giant trees are booked first. We can install early and leave the display dark until your launch date." },
  { q: "Can you install after hours or overnight?", a: "Yes. Most storefront, mall and office work is done outside business hours so customers, tenants and parking are not disrupted. Our crews are insured and WSIB-compliant, use bucket trucks and aerial lifts, and follow the property's access and safety rules." },
  { q: "Do you supply the lights and décor, or can we use ours?", a: "We supply, install, maintain, remove and store everything so we can guarantee it. Commercial-grade LED strings, C9 bulbs, tree wraps, lit cone trees, giant trees, garland and wreaths are all part of our inventory. We do not install customer-supplied product because we cannot warranty it." },
  { q: "How is commercial lighting priced?", a: "Every commercial job is custom quoted from a site visit or plans and photos. Price depends on linear footage of roofline or building outline, tree count and height, lift requirements, indoor décor and whether the program runs for one season or several. Multi-year agreements lock pricing and priority scheduling." },
  { q: "What happens if a section goes out mid-season?", a: "Call or email and we schedule a maintenance visit, usually within a couple of days. Maintenance is included for the season on every commercial program, so there is no extra charge for bulbs, strands or timers that need attention." },
];

export default function CommercialHubPage() {
  const heroPhoto = pickPhotos("commercial-exterior", 1, "commercial-hub")[0] ?? null;
  const photos = pickPhotos(["commercial-exterior", "commercial-indoor", "commercial-mall", "install-action"], 9, "commercial-grid").filter((p) => p.file !== heroPhoto?.file).slice(0, 8);
  const commercialServices = services.filter((s) => s.category === "commercial");
  const tiles = industries.map((i) => ({ ...i, photo: pickPhotos(i.slug.includes("mall") || i.slug.includes("lobb") || i.slug.includes("hotel") ? ["commercial-indoor", "commercial-mall"] : ["commercial-exterior"], 1, "tile-" + i.slug)[0] }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/commercial-christmas-lighting#service`,
    name: "Commercial Christmas Light Installation",
    serviceType: "Commercial holiday lighting and decorating",
    provider: { "@id": `${site.url}/#business` },
    areaServed: ["London", "Kitchener-Waterloo", "Guelph", "Hamilton", "Burlington", "Oakville", "Mississauga", "Brampton", "Toronto"].map((n) => ({ "@type": "City", name: n })),
    description: DESC,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial holiday lighting services",
      itemListElement: commercialServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` } })),
    },
  };

  return (
    <>
      <script id="commercial-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script id="commercial-crumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: "Commercial Christmas Lighting" }])) }} />

      <PhotoHero
        eyebrow="Commercial · Property managers, owners and facilities teams"
        h1="Commercial Christmas Lighting, Handled Start to Finish"
        intro="Building outlines, tree wraps, lit cone trees, giant trees and lobby décor for plazas, offices, hotels, dealerships, malls and municipalities. Insured crews, after-hours installs, maintenance all season, one invoice."
        photo={heroPhoto}
        formType="Commercial"
        source="commercial-hub"
        ctaLabel="Request a Commercial Quote"
      />
      <TrustBar />

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="eyebrow">Why property teams hire us</p>
            <h2 className="heading-display mt-2 text-3xl sm:text-4xl">One contractor. Every building. Nobody on a ladder.</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-[color:var(--ink-soft)]">
              <p>Holiday lighting on a commercial property is a scheduling and liability problem before it is a design problem. Tenants and customers cannot be disrupted, staff cannot be on lifts, and whatever goes up in October has to still look right in January. Our program is built around that.</p>
              <p>We design the display from a site visit or plans, supply commercial-grade LED product, install after hours with our own bucket trucks and aerial lifts, and then keep it running: any strand, bulb or timer fault is fixed at no charge all season. In January we remove everything and store it so next year is a phone call, not a project.</p>
            </div>
            <div className="mt-8">
              <CheckList columns={2} items={["After-hours and overnight installs", "Fully insured, WSIB-compliant crews", "Bucket trucks and aerial lifts on every job", "Commercial-grade LED, supplied by us", "Maintenance included all season", "Takedown, storage and multi-year pricing", "One point of contact, one invoice", "Serving London to the GTA"]} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-start">
            {photos.slice(0, 4).map((p, i) => (
              <div key={p.file} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 480px, 100vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[color:var(--bg-cream)]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Commercial services</p>
          <h2 className="heading-display mt-2 text-3xl">What we do for businesses</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commercialServices.map((s) => (
              <li key={s.slug} className="card flex flex-col p-6">
                <h3 className="heading-display text-lg text-[color:var(--ink-strong)]">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-[color:var(--ink-soft)]">{s.description}</p>
                <Link href={`/services/${s.slug}`} className="mt-4 text-sm font-bold text-[color:var(--brand-red)] hover:underline">Learn more →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">By property type</p>
          <h2 className="heading-display mt-2 text-3xl">Who we decorate for</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {tiles.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="group relative block overflow-hidden rounded-xl bg-stone-900">
                  <div className="relative aspect-[4/3]">
                    {i.photo && <Image src={i.photo.src} alt={`${i.shortName}: ${i.photo.alt}`} fill sizes="(min-width: 1024px) 300px, 50vw" placeholder="blur" blurDataURL={i.photo.blurDataURL} className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <p className="absolute inset-x-0 bottom-0 p-4 font-bold text-white">{i.shortName}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PhotoGrid photos={photos.slice(4)} title="Commercial installs across Ontario" caption="Plazas, office buildings, hotels, dealerships, malls, churches and downtown displays." />

      <section className="section bg-[color:var(--ink-strong)] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">How a commercial program runs</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-4">
            {[
              ["Site visit", "We walk the property (or work from plans and photos), confirm power, access and lift needs, and capture what you want lit."],
              ["Design + firm quote", "A rendering or marked-up photo with a fixed price, timeline and an optional multi-year rate."],
              ["After-hours install", "Crews install on your schedule, test every circuit and set timers so the display runs itself."],
              ["Maintain, remove, store", "Any fault fixed at no charge. January takedown, labelled storage, and a priority date next season."],
            ].map(([h, t], i) => (
              <li key={h} className="rounded-2xl border border-white/15 p-5">
                <span className="heading-display text-3xl text-[color:var(--brand-red)]">{i + 1}</span>
                <h3 className="heading-display mt-2 text-lg text-white">{h}</h3>
                <p className="mt-2 text-sm text-white/80">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection faqs={FAQS} title="Commercial lighting questions" id="faq-commercial" />
      <QuoteSection type="Commercial" source="commercial-hub" title="Request a commercial site visit" />
      <CtaBand type="Commercial" />
    </>
  );
}
