import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Photo } from "@/components/photo";
import { QuoteForm } from "@/components/quote-form";
import { ProductCard } from "@/components/product-card";
import { breadcrumbLd, FaqList, faqLd, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CATEGORY_META } from "@/components/sections/category-tiles";
import { SEGMENTS, getSegment } from "@/lib/commercial-content";
import { getCategories, listAllProducts, productCategorySlugs } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

interface Props {
  params: Promise<{ segment: string }>;
}

export async function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) return { title: "Not found" };
  const url = `${SITE_URL}/commercial/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: `${s.metaTitle} | Holiday Light Supplies`, description: s.metaDescription, url },
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription }
  };
}

export default async function SegmentPage({ params }: Props) {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) notFound();

  const [all, categories] = await Promise.all([listAllProducts(), getCategories()]);
  const products = all.filter((p) => productCategorySlugs(p, categories).some((c) => s.categories.includes(c)));
  const featuredFirst = [...products].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 8);
  const url = `${SITE_URL}/commercial/${s.slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    serviceType: "Commercial Christmas lighting and décor supply",
    provider: { "@type": "Organization", name: "Holiday Light Supplies", url: SITE_URL },
    areaServed: { "@type": "Country", name: "Canada" },
    audience: { "@type": "BusinessAudience", name: s.name },
    url,
    description: s.metaDescription
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ href: "/commercial", label: "Commercial" }, { label: s.name }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(s.faq)) }} />

      <PageHero photo={s.photo} eyebrow={s.name} title={s.h1} intro={s.intro} crumbs={[{ href: "/commercial", label: "Commercial" }, { label: s.name }]} cta={{ href: "#quote", label: "Request a quote" }} secondary={{ href: "/shop", label: "Browse the catalog" }} />
      <TrustStrip compact />

      {/* Pain points */}
      <section className="bg-white">
        <div className="shell section">
          <SectionHeading eyebrow="What we solve" title={`What ${s.name.toLowerCase()} actually need in December.`} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {s.painPoints.map((p, i) => (
              <div key={p.title} className="card p-7">
                <span className="font-display text-3xl text-[var(--color-gold)]">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Picks */}
      <section className="bg-warm">
        <div className="shell section">
          <SectionHeading eyebrow="Our picks" title={`Where ${s.name.toLowerCase()} usually start.`} sub="Proven pieces at each price point. Everything else is in the catalog." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.picks.map((p) => (
              <Link key={p.href} href={p.href} className="card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                <h3 className="font-display text-lg leading-tight group-hover:text-[var(--color-brand)]">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{p.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                  View <Icon.arrow size={14} />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {s.categories.map((c) => (
              <Link key={c} href={`/product-category/${c}`} className="chip min-h-[38px] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
                {CATEGORY_META[c]?.title ?? c} <Icon.arrow size={12} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products from those categories */}
      {featuredFirst.length > 0 && (
        <section className="bg-white">
          <div className="shell section">
            <SectionHeading eyebrow="From the catalog" title="Popular with this segment" action={{ href: "/shop", label: "All products" }} />
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {featuredFirst.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery + process */}
      <section className="bg-[var(--color-night)] text-white">
        <div className="shell section grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            {s.gallery.map((k) => (
              <Photo key={k} name={k} ratio="aspect-[4/5]" sizes="300px" rounded="rounded-2xl" />
            ))}
          </div>
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">How it works</p>
            <h2 className="font-display h2-fluid mt-4">Three steps from first email to installed.</h2>
            <ol className="mt-8 space-y-5">
              {s.process.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-gold)] font-bold text-[var(--color-text)]">{i + 1}</span>
                  <p className="pt-1.5 leading-relaxed text-white/85">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              {s.guides.map((g) => (
                <Link key={g.href} href={g.href} className="btn-ghost-light">
                  {g.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote + FAQ */}
      <section id="quote" className="scroll-mt-24 bg-white">
        <div className="shell section grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Request a quote</p>
            <h2 className="font-display h2-fluid mt-4">Send us the site. We&rsquo;ll send back a plan and a price.</h2>
            <p className="mt-4 text-[var(--color-muted)]">A real person replies within one business day with line-item pricing, freight and lead times.</p>
            <div className="mt-8">
              <FaqList items={s.faq} />
            </div>
          </div>
          <QuoteForm source={`/commercial/${s.slug}`} defaultOrgType={s.orgType} defaultInterests={s.interests} />
        </div>
      </section>
    </>
  );
}
