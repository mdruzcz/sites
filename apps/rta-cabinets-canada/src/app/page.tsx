import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getGroups, getCabinets, getCabinetsByGroup, groupLabel, groupPriceRange, getPackages } from "@/lib/catalog";
import { getFaqs, getCities, getGuides } from "@/lib/content";
import { getInventoryMap, stockKey } from "@/lib/inventory";
import { KITCHEN_SALE, pricingFor } from "@/lib/sale";
import CabinetCard from "@/components/CabinetCard";
import PackageCard from "@/components/PackageCard";
import TrustStrip from "@/components/TrustStrip";
import { SaleBadge } from "@/components/SaleBadge";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "White Shaker RTA Kitchen Cabinets, Shipped Canada-Wide",
  description:
    "Premium White Shaker ready-to-assemble kitchen cabinets from London, Ontario: plywood boxes, soft-close, 8% off complete kitchens, free delivery within 300 km and shipping across Canada.",
  alternates: { canonical: "/" },
};

const STEPS = [
  { t: "Measure", d: "Map your kitchen with our quick measuring guide — or skip straight to the 3D planner." },
  { t: "Design", d: "Drop cabinets onto your walls in the free planner, or start from a 10×10 package." },
  { t: "Request a Quote", d: "Send your list. We confirm stock, free delivery and taxes within one business day." },
  { t: "Assemble or relax", d: `Flat-packed cabinets arrive ready to assemble — or add expert assembly for $${site.assemblyPerCabinet} each.` },
];

const TRUST = [
  { t: "Solid Wood + Plywood Box", d: "Hardwood doors and face frames on grade-A ¾″ plywood boxes — no particleboard." },
  { t: "Soft-Close Everywhere", d: "Concealed soft-close hinges and full-extension undermount drawer glides, standard." },
  { t: "Stocked in London, Ontario", d: "Real stock counts on every cabinet page. In-stock orders ship in about a week." },
  { t: "Limited Lifetime Warranty", d: "Covered for as long as you own your home. Transit damage replaced free." },
];

const GALLERY = [
  { src: "/images/gallery/white-shaker-kitchen-1.webp", alt: "White Shaker kitchen with island - RTA cabinets by RTA Cabinets Canada" },
  { src: "/images/gallery/white-shaker-kitchen-3.webp", alt: "White Shaker galley kitchen with stainless range - RTA Cabinets Canada" },
  { src: "/images/gallery/white-shaker-kitchen-5.webp", alt: "White Shaker cabinets with black hardware - RTA Cabinets Canada" },
  { src: "/images/gallery/white-shaker-kitchen-6.webp", alt: "White Shaker island with seating - RTA Cabinets Canada" },
  { src: "/images/gallery/white-shaker-kitchen-9.webp", alt: "White Shaker drawer bases and lazy susan corner - RTA Cabinets Canada" },
  { src: "/images/gallery/white-shaker-kitchen-10.webp", alt: "White Shaker glass-door wall cabinets - RTA Cabinets Canada" },
];

export default async function Home() {
  const groups = getGroups();
  const packages = getPackages().slice(0, 3);
  const faqs = getFaqs().slice(0, 5);
  const cities = getCities();
  const guides = getGuides().slice(0, 3);
  const stock = await getInventoryMap();
  const deals = getCabinets()
    .map((c) => ({ c, p: pricingFor(c.sku, c.price_cad, { comingSoon: c.coming_soon }) }))
    .filter((x) => x.p?.onSale && x.c.group !== "accessories")
    .sort((a, b) => b.p!.pct - a.p!.pct || b.p!.list - a.p!.list)
    .slice(0, 4);

  function groupImage(slug: string): string {
    const first = getCabinetsByGroup(slug).find((c) => c.images[0]);
    return first?.images[0] ?? "/images/placeholder.svg";
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-sand border-b border-border">
        <div className="container py-14 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">Premium White Shaker · London, Ontario · Shipped Canada-Wide</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">High Quality Ready-to-Assemble Kitchen Cabinets</h1>
            <p className="text-lg text-ink-soft mb-4 max-w-xl">
              Solid hardwood White Shaker doors on plywood boxes with soft-close hardware — the timeless kitchen, priced in Canadian dollars with <strong>free delivery within {site.freeDeliveryKm} km</strong> of London, Ontario.
            </p>
            <p className="flex flex-wrap items-center gap-2 mb-8 text-sm">
              <SaleBadge text={`Kitchen sale −${KITCHEN_SALE.pct}%`} />
              <span className="text-ink-soft">{KITCHEN_SALE.blurb}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
                Design Your Kitchen Free
              </Link>
              <Link href="/shop" className="border border-accent text-accent px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream">
                Shop Cabinets
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm bg-white">
            <Image src="/images/gallery/white-shaker-kitchen-1.webp" alt="Complete White Shaker RTA kitchen with island by RTA Cabinets Canada" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-3 py-1.5 text-xs font-medium shadow">Free delivery: London · Kitchener-Waterloo · Hamilton · Woodstock · St. Thomas</div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <TrustStrip />
      </section>

      {/* Shop by type */}
      <section className="container pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Shop by Cabinet Type</h2>
            <p className="text-ink-soft mt-2">Browse the full White Shaker collection — filter by type, width, stock and sale.</p>
          </div>
          <Link href="/shop" className="hidden sm:inline text-accent font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {groups.map((g) => (
            <Link key={g} href={`/shop/${g}`} className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-sand overflow-hidden">
                <Image src={groupImage(g)} alt={`${groupLabel(g)} - White Shaker RTA cabinets`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm group-hover:text-accent">{groupLabel(g)}</h3>
                <p className="text-xs text-ink-soft mt-1">{groupPriceRange(g)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Overstock deals */}
      {deals.length > 0 && (
        <section className="bg-red-50 border-y border-red-100">
          <div className="container py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-1">Overstock sale</p>
                <h2 className="text-3xl font-bold">Cabinets we have too many of</h2>
                <p className="text-ink-soft mt-2">10–15% off, in stock now, ships right away. Counted monthly from our London warehouse.</p>
              </div>
              <Link href="/sale" className="hidden sm:inline text-red-700 font-medium hover:underline">
                All sale cabinets →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {deals.map(({ c }) => (
                <CabinetCard key={c.slug} cabinet={c} stock={stock[stockKey(c.sku)]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Planner promo */}
      <section className="container py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-sand order-last lg:order-first">
          <Image src="/images/gallery/white-shaker-kitchen-6.webp" alt="White Shaker kitchen island designed with the RTA Cabinets Canada 3D kitchen planner" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">Free 3D Kitchen Planner</p>
          <h2 className="text-3xl font-bold mb-4">Design it yourself. We check it, price it and deliver it.</h2>
          <p className="text-ink-soft mb-4">
            Draw your room, drop in cabinets and your own appliances, and walk through it in 3D — on your phone or laptop. The planner flags problems (a door that won&rsquo;t open, a fridge with no panel), builds the parts list, and applies the {KITCHEN_SALE.pct}% kitchen sale live.
          </p>
          <ul className="space-y-2 text-sm text-ink-soft mb-6">
            <li>• Two walls + island, floor, wall and 3D views</li>
            <li>• Live stock and sale prices on every cabinet</li>
            <li>• Print your plans, share a link, or send it with your quote</li>
          </ul>
          <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
            Open the planner
          </Link>
        </div>
      </section>

      {/* Featured packages */}
      <section className="bg-sand border-y border-border">
        <div className="container py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Complete Kitchen Packages</h2>
              <p className="text-ink-soft mt-2">Fixed cabinet lists for 10×10, 10×12 and 12×12 kitchens — {KITCHEN_SALE.pct}% kitchen sale already applied.</p>
            </div>
            <Link href="/kitchen-packages" className="hidden sm:inline text-accent font-medium hover:underline">
              All packages →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <PackageCard key={p.slug} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">White Shaker, in real kitchens</h2>
            <p className="text-ink-soft mt-2">Islands, pantries, glass doors — the same cabinets, a dozen different looks.</p>
          </div>
          <Link href="/gallery" className="hidden sm:inline text-accent font-medium hover:underline">
            Full gallery →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY.map((g) => (
            <Link key={g.src} href="/gallery" className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-sand block group">
              <Image src={g.src} alt={g.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 33vw" />
            </Link>
          ))}
        </div>
      </section>

      {/* Why RTA trust strip */}
      <section className="bg-sand border-y border-border">
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-10">Why RTA Cabinets Canada</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map((v) => (
              <div key={v.t} className="bg-white border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{v.t}</h3>
                <p className="text-sm text-ink-soft">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free delivery cities */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">Free delivery within {site.freeDeliveryKm} km</p>
            <h2 className="text-3xl font-bold mb-4">Kitchen cabinets delivered free across Southwestern Ontario</h2>
            <p className="text-ink-soft mb-4">
              We&rsquo;re based in London, Ontario, and deliver free to any address within {site.freeDeliveryKm} km — that&rsquo;s most of Southwestern Ontario, the Golden Horseshoe and the west GTA. Beyond that we ship to every province.
            </p>
            <Link href="/shipping-and-delivery" className="text-accent font-medium hover:underline">
              See the free delivery zone →
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/kitchen-cabinets/${c.slug}`} className="block rounded-lg border border-border bg-white p-4 hover:shadow-md transition-shadow">
                  <p className="font-semibold">Kitchen Cabinets {c.city}</p>
                  <p className="text-xs text-ink-soft mt-1">{c.distanceNote}</p>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shipping-and-delivery" className="block rounded-lg border border-dashed border-accent/50 bg-sand p-4 text-sm text-accent font-medium hover:bg-cream">
                + Cambridge, Guelph, Brantford, Stratford, Sarnia, Windsor and more
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand border-y border-border">
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <li key={s.t} className="bg-white border border-border rounded-lg p-6">
                <span className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-semibold mb-3">{i + 1}</span>
                <h3 className="font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/how-to-measure" className="border border-accent text-accent px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream">
              Read the Measuring Guide
            </Link>
            <Link href="/assembly-service" className="border border-border text-ink px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream">
              Expert assembly ${site.assemblyPerCabinet}/cabinet
            </Link>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Guides &amp; Resources</h2>
            <p className="text-ink-soft mt-2">Measure, assemble, install and care for your cabinets — written by the people who sell them.</p>
          </div>
          <Link href="/resources" className="hidden sm:inline text-accent font-medium hover:underline">
            All guides →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {guides.map((g) => (
            <Link key={g.slug} href={`/resources/${g.slug}`} className="block rounded-lg border border-border bg-white p-5 hover:shadow-md transition-shadow">
              <p className="text-xs text-accent font-medium mb-1">
                {g.category} · {g.readMinutes} min
              </p>
              <h3 className="font-semibold leading-snug">{g.title}</h3>
              <p className="text-sm text-ink-soft mt-2 line-clamp-2">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="container pb-16 max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="bg-white border border-border rounded-lg p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                {f.q}
                <span className="text-accent group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-ink-soft mt-3 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-accent font-medium hover:underline">
            See all FAQs →
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-ink text-white">
        <div className="container py-16 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to build your kitchen?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Design it in the planner or add the cabinets you need, then request a free written quote — we&apos;ll confirm stock, free delivery and taxes within one business day.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/request" className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
              Request a Quote
            </Link>
            <a href={site.phoneHref} className="border border-white/30 text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-white/10">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
