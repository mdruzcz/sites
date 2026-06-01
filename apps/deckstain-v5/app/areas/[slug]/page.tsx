import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AREAS, SERVICES, getArea } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { QuoteForm } from "@/components/QuoteForm";
import { Jsonld, serviceSchema, breadcrumb } from "@/lib/schema";
import { Check, BLUR } from "@/components/ui";

export const revalidate = 3600;

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return {};
  return {
    title: `Deck Staining in ${a.name}, Ontario`,
    description: `Professional deck & fence staining in ${a.name}, ON. READY Seal® oil-based stains, free photo quotes in 2 business days. Serving ${a.name} and all of ${a.county}.`,
    openGraph: { title: `Deck Staining in ${a.name}, ON · DeckStain.ca`, description: `Professional deck staining in ${a.name}. Free photo quotes in 2 business days.`, images: ["/images/after-staining.jpg"] },
  };
}

export default async function AreaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();
  const url = `${SITE.url}/areas/${a.slug}`;
  const nearby = AREAS.filter((x) => x.slug !== slug).slice(0, 6);

  return (
    <>
      <Jsonld data={serviceSchema("Deck & Fence Staining", `Professional deck and fence staining in ${a.name}, Ontario.`, url, a.name)} />
      <Jsonld data={breadcrumb([{ name: "Home", url: "/" }, { name: "Areas", url: "/areas" }, { name: a.name, url: `/areas/${a.slug}` }])} />
      <PageHead eyebrow={a.county} title={`Deck & Fence Staining in ${a.name}, Ontario`} intro={a.blurb}
        image="/images/hero-areas.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }, { name: a.name, href: `/areas/${a.slug}` }]} />

      <section className="sec bg-white">
        <div className="wrap grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <div className="relative aspect-[16/9] rounded-[var(--r-lg)] overflow-hidden mb-7 shadow-[var(--shadow-md)]">
              <Image src="/images/after-staining.jpg" alt={`Professional deck staining in ${a.name}, Ontario by DeckStain.ca`} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} priority sizes="(max-width:1024px) 100vw, 66vw" />
            </div>
            <h2 className="h text-2xl text-[var(--ink)] mb-3">Trusted deck staining for {a.name} homeowners</h2>
            <p className="muted leading-relaxed text-[1.05rem] mb-4">DeckStain.ca brings premium {SITE.stainBrand} oil-based staining to {a.name} and the wider {a.county}. Unlike water-based stains that sit on the surface and peel within a season, our oil-based formula penetrates deep for protection that lasts 2–3 years — even through Ontario&apos;s freeze-thaw cycles.</p>
            <p className="muted leading-relaxed text-[1.05rem] mb-7">Getting a quote in {a.name} couldn&apos;t be simpler: send us a few photos of your deck or fence and we&apos;ll reply with a detailed quote within {SITE.responseTime} — no in-person visit needed.</p>

            <div className="rounded-[var(--r-lg)] bg-[var(--bg-alt)] border border-[var(--hair)] p-6 mb-8">
              <h3 className="h text-lg text-[var(--ink)] mb-3.5">Services available in {a.name}</h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-2.5 rounded-lg bg-white border border-[var(--hair)] px-3.5 py-2.5 hover:border-[var(--green)] group transition-colors">
                    <Check className="w-4 h-4" /><span className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--green)] transition-colors" style={{ fontFamily: "var(--font-head)" }}>{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <h3 className="h text-lg text-[var(--ink)] mb-3">Also serving nearby</h3>
            <div className="flex flex-wrap gap-2">
              {nearby.map((n) => <Link key={n.slug} href={`/areas/${n.slug}`} className="chip bg-white hover:border-[var(--green)] hover:text-[var(--green)] transition-colors">{n.name}</Link>)}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="card p-6 shadow-[var(--shadow-md)]">
              <h2 className="h text-lg text-[var(--ink)] mb-0.5">Get a quote in {a.name}</h2>
              <p className="text-sm text-[var(--ink-3)] mb-4">Reply within 2 business days · No obligation.</p>
              <QuoteForm compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
