import Image from "next/image";
import Link from "next/link";
import { FindByWidth } from "@/components/find-by-width";
import { OurKitchensGallery } from "@/components/our-kitchens-gallery";
import { getAllCabinets, TYPE_BLURB, TYPE_PATH, type CabinetType } from "@/lib/catalog";
import { formatCad, SITE, SERVICE_CITIES } from "@/lib/utils";

export const revalidate = 3600;

const CATEGORIES: Array<{ type: CabinetType; title: string }> = [
  { type: "base", title: "Base Cabinets" },
  { type: "drawer", title: "Drawer Cabinets" },
  { type: "wall", title: "Wall Cabinets" },
  { type: "accessory", title: "Accessories & Trim" },
];

export default function HomePage() {
  const cabinets = getAllCabinets();
  const counts: Record<CabinetType, number> = {
    base: 0,
    drawer: 0,
    wall: 0,
    accessory: 0,
  };
  cabinets.forEach((c) => (counts[c.type] += 1));
  const popular = cabinets
    .filter((c) => ["base", "drawer", "wall"].includes(c.type) && c.width_in)
    .filter((c) => [24, 30, 36].includes(c.width_in!))
    .slice(0, 4);

  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE.url}#org`,
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
        telephone: SITE.phone,
        description: SITE.tagline,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        areaServed: SERVICE_CITIES.map((city) => ({
          "@type": "City",
          name: city,
          containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}#site`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/cabinets?q={query}`,
          "query-input": "required name=query",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <section className="relative isolate overflow-hidden border-b border-[var(--color-line)]">
        <Image
          src="/images/hero/kitchen-hero.jpg"
          alt="A premium White Shaker kitchen with 36-inch tall wall cabinets, marble waterfall island, brass hardware, and modern lighting — the look you get with Forever Cabinets."
          width={1536}
          height={1229}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--color-navy)]/85 via-[var(--color-navy)]/55 to-[var(--color-navy)]/15" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="text-white">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">
              White Shaker · Southern Ontario · Plywood Boxes
            </p>
            <h1 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              The cabinet you&apos;re missing,<br />
              <span className="font-medium">delivered in Southern Ontario.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
              Plywood boxes, painted birch &amp; MDF doors, painted white interiors, and <strong className="text-[var(--color-brass)] font-medium">36″ tall wall cabinets</strong> as standard. Affordable local freight to London, Hamilton, KW, Burlington, Oakville and across SW Ontario.
            </p>
            <div className="mt-8 rounded-sm bg-[var(--color-cream)] p-4">
              <FindByWidth />
            </div>
            <p className="mt-4 text-xs text-white/75">
              {SITE.leadTime} lead time · {SITE.shippingNote} · No payment until your order is confirmed
            </p>
          </div>

          <div className="relative lg:mt-8">
            <div className="border border-[var(--color-brass)] bg-[var(--color-cream)] p-6 lg:p-8">
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                Not sure it&apos;ll match?
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight text-[var(--color-navy)]">
                Order a White Shaker sample door for {formatCad(SITE.sampleDoorPrice)}.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                See the finish, weight, and panel detail in your own kitchen before you commit. Fully refundable on your first cabinet order.
              </p>
              <Link href="/cabinets/sample-door" className="btn-secondary mt-5">
                Order a sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Box", value: "Plywood", sub: "Not particleboard" },
            { label: "Doors", value: "Painted birch + MDF", sub: "Not melamine / thermofoil" },
            { label: "Interior", value: "Painted white", sub: "Not natural" },
            { label: "Wall height", value: "36″ standard", sub: "Premium look" },
          ].map((s) => (
            <div key={s.label} className="border-l-2 border-[var(--color-brass)] pl-4">
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">{s.label}</p>
              <p className="mt-1 font-display text-2xl text-[var(--color-navy)]">{s.value}</p>
              <p className="text-xs text-[var(--color-ink-soft)]">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
              Catalog
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)] sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link href="/cabinets" className="hidden text-sm uppercase tracking-widest text-[var(--color-navy)] underline underline-offset-4 decoration-[var(--color-brass)] sm:inline">
            View all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.type}
              href={TYPE_PATH[c.type]}
              className="group flex flex-col border border-[var(--color-line)] bg-white p-6 transition-shadow hover:shadow-[0_4px_24px_rgba(13,27,42,0.08)]"
            >
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                {counts[c.type]} {counts[c.type] === 1 ? "item" : "items"}
              </p>
              <h3 className="mt-2 font-display text-2xl text-[var(--color-navy)]">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                {TYPE_BLURB[c.type]}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm uppercase tracking-widest text-[var(--color-navy)]">
                Browse <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[var(--color-navy)] text-[var(--color-sandstone)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">01</p>
              <h3 className="mt-3 font-display text-2xl text-white">Browse &amp; build your list</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Find the cabinets you need. Add to your Request List — no payment, no commitment.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">02</p>
              <h3 className="mt-3 font-display text-2xl text-white">We confirm by email</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                We check stock, quote shipping to your postal code, and confirm the total — usually within one business day.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass)]">03</p>
              <h3 className="mt-3 font-display text-2xl text-white">Pay &amp; ship</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Approve the quote, pay your invoice, and we ship within {SITE.leadTime}. Easy.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/how-it-works" className="text-sm uppercase tracking-widest text-[var(--color-brass)] underline underline-offset-4">
              Read the full process →
            </Link>
          </div>
        </div>
      </section>

      <SpecialtyShowcase />

      <OurKitchensGallery />

      {popular.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
            Common widths
          </p>
          <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)] sm:text-4xl">
            Popular sizes
          </h2>
          <p className="mt-3 max-w-xl text-[var(--color-ink-soft)]">
            The widths people order most often when filling a kitchen gap.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((c) => (
              <Link
                key={c.sku}
                href={`/cabinets/${c.slug}`}
                className="block border border-[var(--color-line)] bg-white p-5 transition-shadow hover:shadow-[0_4px_24px_rgba(13,27,42,0.08)]"
              >
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                  {c.sku}
                </p>
                <h3 className="mt-1 font-medium text-[var(--color-navy)]">{c.name}</h3>
                <p className="mt-3 font-display text-xl text-[var(--color-navy)]">
                  {formatCad(c.price_cad)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SpecialtyShowcase() {
  const specials = [
    {
      slug: "lazy-susan-33",
      title: "Lazy Susan corner",
      blurb: "Reach every inch of corner storage. No more dead-zone cabinets.",
    },
    {
      slug: "wdcg243612",
      title: "Angled corner",
      blurb: "Diagonal corner cabinet with glass doors. A statement at every elevation.",
    },
    {
      slug: "wmc2736",
      title: "Microwave cabinet",
      blurb: "Hide the microwave above the counter — clean, integrated, premium.",
    },
    {
      slug: "wp249024",
      title: "Tall pantry",
      blurb: "90″ floor-to-ceiling pantry — the storage upgrade most kitchens are missing.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
        Specialty cabinets
      </p>
      <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)] sm:text-4xl">
        Where kitchens go from nice to <em>premium</em>.
      </h2>
      <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">
        Lazy Susans, microwave cabinets, angled corners, and tall pantries take a White Shaker kitchen to another level — and they&rsquo;re the parts most suppliers don&rsquo;t even carry.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {specials.map((s) => (
          <Link
            key={s.slug}
            href={`/cabinets/${s.slug}`}
            className="group block border border-[var(--color-line)] bg-white p-5 transition-shadow hover:shadow-[0_4px_24px_rgba(13,27,42,0.08)]"
          >
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
              {s.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
              {s.blurb}
            </p>
            <span className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[var(--color-navy)]">
              See it <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
