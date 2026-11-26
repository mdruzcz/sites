import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourtConfigurator } from "@/components/court-configurator";
import { FaqList } from "@/components/faq-list";
import { KitCard } from "@/components/kit-card";
import { GuideCards, QuoteBand, SectionHead } from "@/components/sections";
import { getKit, getSport, guidesFor, kitArea, kitLines, kitName, kitRate, kitSize, kitSummary, kits, kitsFor, kitTypeName, money, rate } from "@/lib/content";
import { JsonLd, breadcrumbLd, faqLd, kitLd } from "@/lib/jsonld";
import { fitTitle, pageMeta } from "@/lib/seo";
import { fill, site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return kits.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const kit = getKit((await params).slug);
  if (!kit) return {};
  const size = `${Math.max(kit.w, kit.d)}' x ${Math.min(kit.w, kit.d)}'`;
  return pageMeta({
    title: fitTitle(`${kitTypeName(kit)} ${size}`, `${kitTypeName(kit).replace(" Court Kit", " Kit")} ${size}`),
    description: fill(site.pages.kit.description, { size: kitSize(kit), type: kitTypeName(kit).toLowerCase(), area: kitArea(kit).toLocaleString("en-CA"), price: money(kit.price), bestFor: kit.bestFor }),
    path: `/court-kits/${kit.slug}`,
  });
}

export default async function KitPage({ params }: { params: Promise<{ slug: string }> }) {
  const kit = getKit((await params).slug);
  if (!kit) notFound();
  const sport = getSport(kit.sport)!;
  const name = kitName(kit);
  const long = Math.max(kit.w, kit.d);
  const short = Math.min(kit.w, kit.d);
  const siblings = kitsFor(kit.sport).filter((k) => k.slug !== kit.slug).slice(0, 4);
  const related = guidesFor(kit.sport).slice(0, 3);
  const quoteHref = `/contact?kit=${encodeURIComponent(`${name} (${kit.code})`)}#quote`;

  const specs = [
    { label: "Kit code", value: kit.code },
    { label: "Tile footprint", value: kitSize(kit) },
    { label: "Coverage", value: `${kitArea(kit).toLocaleString("en-CA")} sq ft` },
    { label: "Price per sq ft", value: `${rate(kitRate(kit))} CAD` },
    { label: "Game lines", value: kitLines(kit) },
    { label: "Base needed", value: `Flat concrete or asphalt, at least ${long} ft x ${short} ft` },
    { label: "Ships", value: "Palletized freight, anywhere in Canada" },
  ];
  const included = ["Interlocking sport tiles for the full footprint", "Edge pieces for the perimeter", `Game lines: ${kitLines(kit).toLowerCase()}`, "Your choice of court, accent and border colours", "A numbered layout plan"];
  const notIncluded = kit.sport === "basketball" || kit.sport === "multi-sport" ? "Hoop, nets, lighting, fencing and the base pad are not included." : "Nets, posts, equipment, lighting, fencing and the base pad are not included.";
  const faqs = [
    { q: `How much does the ${kitSize(kit)} ${kitTypeName(kit).toLowerCase()} cost?`, a: `The kit is ${money(kit.price)} CAD, which works out to ${rate(kitRate(kit))} per square foot for ${kitArea(kit).toLocaleString("en-CA")} square feet. Freight to your postal code and sales tax are added on your quote.` },
    { q: `How much space do I need for the ${kitSize(kit)} kit?`, a: `The tiles cover ${long} feet by ${short} feet. Plan a flat, hard base at least that size. We send exact pad dimensions, including a small expansion gap, with your layout plan.` },
    { q: "Can this kit be resized?", a: "Yes. Tiles are roughly a foot square, so the kit can grow or shrink in small steps to fit the pad you have. Tell us your dimensions when you request a quote." },
    ...sport.faqs.slice(0, 2),
  ];

  return (
    <>
      <div className="shell pb-16 pt-6 md:pb-24 md:pt-10">
        <nav aria-label="Breadcrumb" className="crumbs crumbs-dark mb-6">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/court-kits">Court kits</Link>
          <span aria-hidden>/</span>
          <Link href={`/sports/${sport.slug}`}>{sport.name}</Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{kitSize(kit)}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <CourtConfigurator layout={kit.layout} w={kit.w} d={kit.d} kitName={name} kitCode={kit.code} />

          <div>
            {kit.tag && <span className="pill pill-accent">{kit.tag}</span>}
            <h1 className="h2 mt-3 !text-[clamp(1.9rem,4vw,2.75rem)]">{name}</h1>
            <p className="mt-3 text-lg text-[var(--muted)]">{kitSummary(kit)}</p>

            <div className="card mt-6 p-5">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                <p>
                  <span className="block text-sm font-bold text-[var(--muted)]">Kit price</span>
                  <span className="block text-[2rem] font-black leading-tight tracking-[-0.03em]">
                    {money(kit.price)} <span className="text-base font-bold text-[var(--muted)]">CAD</span>
                  </span>
                </p>
                <p className="text-sm text-[var(--muted)]">
                  {rate(kitRate(kit))} per sq ft · {kitArea(kit).toLocaleString("en-CA")} sq ft
                </p>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">Plus freight to your postal code and sales tax. No payment now. We reply within {site.responseTime} with a delivered price and a layout drawing.</p>
              <Link href={quoteHref} className="btn btn-accent mt-4 w-full">
                Get my delivered price <span aria-hidden>→</span>
              </Link>
            </div>

            <h2 className="h3 mt-8">Specifications</h2>
            <dl className="card mt-3 divide-y divide-[var(--line)] px-5">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-3 text-sm">
                  <dt className="font-bold">{s.label}</dt>
                  <dd className="text-[var(--muted)]">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="h3 mt-8">What is in the kit</h2>
            <ul className="mt-3 space-y-2">
              {included.map((i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[0.65rem] font-black text-white">
                    ✓
                  </span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-[var(--muted)]">{notIncluded}</p>
          </div>
        </div>

        <section className="mt-16 md:mt-24">
          <SectionHead eyebrow="Questions" title={`About the ${kitSize(kit)} kit`} />
          <FaqList items={faqs} />
        </section>

        {siblings.length > 0 && (
          <section className="mt-16 md:mt-24">
            <SectionHead eyebrow={sport.name} title="Other sizes" action={{ label: `All ${sport.name.toLowerCase()} kits`, href: `/sports/${sport.slug}` }} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((k) => (
                <KitCard key={k.slug} kit={k} />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16 md:mt-24">
            <SectionHead eyebrow="Guides" title="Worth reading first" action={{ label: "All guides", href: "/guides" }} />
            <GuideCards list={related} />
          </section>
        )}
      </div>
      <QuoteBand title="Need a different size?" text="Every kit can be resized to fit your pad. Send us your dimensions and we will draw it." href="/custom-court" />

      {/* Sticky price bar on phones so the quote button is always one tap away */}
      <div className="buy-bar md:hidden">
        <p className="leading-tight">
          <span className="block text-lg font-black">{money(kit.price)}</span>
          <span className="block text-xs text-[var(--muted)]">{kitSize(kit)} kit</span>
        </p>
        <Link href={quoteHref} className="btn btn-accent">
          Get delivered price
        </Link>
      </div>

      <JsonLd data={kitLd(kit)} />
      <JsonLd data={faqLd(faqs)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Court kits", path: "/court-kits" },
          { name: sport.name, path: `/sports/${sport.slug}` },
          { name: name, path: `/court-kits/${kit.slug}` },
        ])}
      />
    </>
  );
}
