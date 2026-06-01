import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SERVICES, AREAS, getService } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { QuoteForm } from "@/components/QuoteForm";
import { Jsonld, serviceSchema, breadcrumb } from "@/lib/schema";
import { Check, BLUR } from "@/components/ui";

export const revalidate = 3600;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Ontario`,
    description: `${s.blurb} Free photo quotes in 2 business days across Southwestern Ontario.`,
    openGraph: { title: `${s.name} in Ontario · DeckStain.ca`, description: s.blurb, images: [s.image] },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== slug).slice(0, 3);
  const url = `${SITE.url}/services/${s.slug}`;

  return (
    <>
      <Jsonld data={serviceSchema(s.name, s.blurb, url)} />
      <Jsonld data={breadcrumb([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: s.name, url: `/services/${s.slug}` }])} />
      <PageHead eyebrow={s.tagline} title={s.name} intro={s.blurb}
        image={s.image}
        crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.name, href: `/services/${s.slug}` }]} />

      <section className="sec bg-white">
        <div className="wrap grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div>
            <div className="relative aspect-[16/9] rounded-[var(--r-lg)] overflow-hidden mb-7 shadow-[var(--shadow-md)]">
              <Image src={s.image} alt={`${s.name} by DeckStain.ca in Ontario`} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} priority sizes="(max-width:1024px) 100vw, 66vw" />
            </div>
            {s.body.map((p, i) => <p key={i} className="muted leading-relaxed text-[1.05rem] mb-4">{p}</p>)}

            <div className="rounded-[var(--r-lg)] bg-[var(--bg-alt)] border border-[var(--hair)] p-6 mt-7">
              <h2 className="h text-xl text-[var(--ink)] mb-4">What&apos;s included</h2>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {s.includes.map((f) => <li key={f} className="flex items-start gap-2.5 muted text-sm"><Check className="w-4 h-4 mt-0.5" /> {f}</li>)}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="h text-xl text-[var(--ink)] mb-3">{s.name} near you</h2>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((a) => <Link key={a.slug} href={`/areas/${a.slug}`} className="chip bg-white hover:border-[var(--green)] hover:text-[var(--green)] transition-colors">{a.name}</Link>)}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="card p-6 shadow-[var(--shadow-md)]">
              <h2 className="h text-lg text-[var(--ink)] mb-0.5">Get a free quote</h2>
              <p className="text-sm text-[var(--ink-3)] mb-4">For {s.name.toLowerCase()} — reply in 2 business days.</p>
              <QuoteForm compact />
            </div>
          </aside>
        </div>
      </section>

      <section className="sec bg-[var(--bg-alt)]">
        <div className="wrap">
          <h2 className="h text-2xl text-[var(--ink)] mb-7 text-center">You might also need</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="card card-hover overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={o.image} alt={`${o.name} by DeckStain.ca`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="p-5"><h3 className="h text-lg text-[var(--ink)] group-hover:text-[var(--green)] transition-colors">{o.name}</h3><p className="text-sm muted mt-1">{o.blurb}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
