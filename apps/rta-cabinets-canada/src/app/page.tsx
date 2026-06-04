import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  GROUPS,
  getGroups,
  getCabinetsByGroup,
  groupLabel,
  groupPriceRange,
  getPackages,
} from "@/lib/catalog";
import { getFaqs } from "@/lib/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "White Shaker RTA Kitchen Cabinets, Shipped Canada-Wide",
  description:
    "Shop premium White Shaker ready-to-assemble kitchen cabinets — solid wood, soft-close, and priced to save. Build your list, request a free quote, shipped across Canada.",
  alternates: { canonical: "/" },
};

const STEPS = [
  { t: "Measure", d: "Map your kitchen with our quick measuring guide." },
  { t: "Choose", d: "Pick cabinets or a complete kitchen package." },
  { t: "Request a Quote", d: "Send your list — we confirm price & shipping." },
  { t: "Assemble", d: "Flat-packed cabinets arrive ready to assemble." },
];

const TRUST = [
  { t: "Solid Wood + Plywood Box", d: "Hardwood doors and face frames on grade-A plywood boxes." },
  { t: "Soft-Close Everywhere", d: "Concealed soft-close hinges and full-extension drawer glides." },
  { t: "Ships Canada-Wide", d: "Delivered flat-packed to every province." },
  { t: "Easy Assembly", d: "Cam-lock hardware — most cabinets assemble in minutes." },
];

export default function Home() {
  const groups = getGroups();
  const packages = getPackages().slice(0, 3);
  const faqs = getFaqs().slice(0, 4);

  function groupImage(slug: string): string {
    const first = getCabinetsByGroup(slug).find((c) => c.images[0]);
    return first?.images[0] ?? "/images/placeholder.svg";
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-sand border-b border-border">
        <div className="container py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">
              Premium White Shaker · Shipped Canada-Wide
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Beautiful Ready-to-Assemble Kitchen Cabinets
            </h1>
            <p className="text-lg text-ink-soft mb-8 max-w-xl">
              Solid hardwood White Shaker cabinets with soft-close hardware — the
              timeless look, without the premium price or the long lead times.
              Build your kitchen and request a free written quote.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/kitchen-packages"
                className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center"
              >
                Build Your Kitchen
              </Link>
              <Link
                href="/shop"
                className="border border-accent text-accent px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream"
              >
                Shop Cabinets
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm bg-white">
            <Image
              src={packages[0]?.hero_image ?? "/images/placeholder.svg"}
              alt="Complete White Shaker RTA kitchen by RTA Cabinets Canada"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Shop by type */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Shop by Cabinet Type</h2>
            <p className="text-ink-soft mt-2">Browse the full White Shaker collection.</p>
          </div>
          <Link href="/shop" className="hidden sm:inline text-accent font-medium hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {groups.map((g) => (
            <Link
              key={g}
              href={`/shop/${g}`}
              className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-sand overflow-hidden">
                <Image
                  src={groupImage(g)}
                  alt={`${groupLabel(g)} - White Shaker RTA cabinets`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-semibold text-sm group-hover:text-accent">{groupLabel(g)}</h3>
                <p className="text-xs text-ink-soft mt-1">{groupPriceRange(g)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured packages */}
      <section className="bg-sand border-y border-border">
        <div className="container py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Complete Kitchen Packages</h2>
              <p className="text-ink-soft mt-2">Preset layouts, priced as a package.</p>
            </div>
            <Link href="/kitchen-packages" className="hidden sm:inline text-accent font-medium hover:underline">
              All packages →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((p) => (
              <Link
                key={p.slug}
                href={`/kitchen-packages/${p.slug}`}
                className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-sand overflow-hidden">
                  <Image
                    src={p.hero_image || "/images/placeholder.svg"}
                    alt={`${p.name} - complete White Shaker RTA kitchen`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-accent">{p.name}</h3>
                  <p className="text-sm text-ink-soft mb-3 line-clamp-2">{p.tagline}</p>
                  <p className="font-bold text-accent">
                    {p.from_price ? "from " : ""}$
                    {p.subtotal_cad.toLocaleString("en-CA", { minimumFractionDigits: 2 })} CAD
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why RTA trust strip */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Why RTA Cabinets Canada</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST.map((v) => (
            <div key={v.t} className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">{v.t}</h3>
              <p className="text-sm text-ink-soft">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand border-y border-border">
        <div className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <li key={s.t} className="bg-white border border-border rounded-lg p-6">
                <span className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-semibold mb-3">
                  {i + 1}
                </span>
                <h3 className="font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-10">
            <Link
              href="/how-to-measure"
              className="border border-accent text-accent px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream"
            >
              Read the Measuring Guide
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="container py-16 max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="bg-white border border-border rounded-lg p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
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
            Add the cabinets you need and request a free written quote — we&apos;ll
            confirm pricing and Canada-wide shipping within one business day.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/request"
              className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center"
            >
              Request a Quote
            </Link>
            <a
              href={site.phoneHref}
              className="border border-white/30 text-white px-7 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-white/10"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
