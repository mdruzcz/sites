import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { QuoteForm } from "@/components/QuoteForm";
import { products, getProduct, serviceAreas } from "@/lib/content";
import { productPhoto } from "@/lib/product-photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not found" };
  const description = `${p.summary} Installed and serviced across Southwestern Ontario by ${site.name}.`;
  return {
    title: `${p.name} — Commercial Grade, Installed`,
    description,
    alternates: { canonical: `${site.url}/products/${p.slug}` },
    openGraph: {
      title: `${p.name} — Commercial Grade, Installed`,
      description,
      url: `${site.url}/products/${p.slug}`
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const others = products.filter((x) => x.slug !== p.slug);
  const main = productPhoto(p.photo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: p.name,
    name: `${p.name} — commercial supply & installation`,
    description: p.summary,
    provider: { "@type": "LocalBusiness", "@id": `${site.url}/#business`, name: site.name, telephone: site.phone, url: site.url },
    areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    image: main ? `${site.url}${main.src}` : undefined,
    category: "Commercial holiday decor"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        photo={p.scenePhoto}
        eyebrow={p.eyebrow}
        title={p.headline}
        intro={p.summary}
        crumbs={[{ name: "Products", href: "/products" }, { name: p.name, href: `/products/${p.slug}` }]}
      />

      {/* Intro + specs */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="reveal">
              <p className="lead leading-relaxed text-[var(--color-text-soft)]">{p.intro}</p>

              <h2 className="font-display mt-12 text-2xl">Specifications</h2>
              <dl className="mt-6 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                {p.specs.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,150px)_1fr] sm:gap-6">
                    <dt className="text-sm font-semibold">{k}</dt>
                    <dd className="text-sm text-[var(--color-text-soft)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-gold-soft)] p-6">
                <p className="text-sm font-semibold">Why there is no price here</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">
                  Frontage length, mounting height, power access and lift time move the number more than the
                  product does. We measure the property and quote it line by line.
                </p>
                <Link href="/quote" className="btn-ember group mt-5">
                  {site.quote.cta}
                  <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {main && (
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="reveal overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)]">
                  <Image
                    src={main.src}
                    alt={main.alt}
                    width={main.width}
                    height={main.height}
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="aspect-square w-full object-contain p-6"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Range */}
      <section className="bg-[var(--color-surface)]">
        <div className="shell section">
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">The range</p>
            <h2 className="font-display h2-fluid mt-6">What we carry</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-7">
            {p.items.map((it) => {
              const ip = productPhoto(it.photo);
              return (
                <div key={it.name} className="reveal-sm card flex gap-5 overflow-hidden p-5">
                  {ip && (
                    <div className="size-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-warm)]">
                      <Image
                        src={ip.src}
                        alt={ip.alt}
                        width={ip.width}
                        height={ip.height}
                        sizes="96px"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-lg">{it.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{it.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other lines */}
      <section className="bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <h2 className="reveal font-display h2-fluid">Also in the catalogue</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-7">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="reveal-sm group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition hover:border-[var(--color-gold)]">
                <Photo name={o.scenePhoto} ratio="aspect-[3/2]" sizes="(max-width: 768px) 100vw, 360px" className="transition duration-500 group-hover:scale-[1.05]" />
                <div className="p-6">
                  <h3 className="font-display text-lg">{o.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-soft)]">{o.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow text-[var(--color-gold-bright)]">{site.quote.promise}</p>
              <h2 className="font-display h2-fluid mt-5 text-white">
                Quote {p.name.toLowerCase()} for your property.
              </h2>
              <p className="lead mt-6 max-w-md leading-relaxed text-white/70">{site.quote.detail}</p>
              <p className="mt-8 text-sm text-white/60">
                We cover{" "}
                {serviceAreas.slice(0, 6).map((a) => a.name).join(", ")} and the rest of Southwestern Ontario.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-7 md:p-10">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
