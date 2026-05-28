import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import services from "@/content/services.json";

export const revalidate = 3600;

const allServices = services.categories.flatMap((c) => c.services.map((s) => ({ ...s, category: c.name, categoryId: c.id })));

const reservedSlugs = new Set([
  "about", "services", "contact", "faq", "service-locations", "project-examples", "blog",
  "api", "_next", "images", "sitemap.xml", "robots.txt",
]);

const categoryBg: Record<string, string> = {
  "staining-sealing": "/images/deck-bg.jpg",
  "woodwork": "/images/pergola-bg.jpg",
  "concrete": "/images/concrete-bg.jpg",
  "landscaping": "/images/outdoor-deck.jpg",
};

type Params = { slug: string };

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = allServices.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    alternates: { canonical: `${site.url}/${slug}` },
    title: `${svc.title} | Master Decker | London Ontario`,
    description: `${svc.blurb} Master Decker serves London Ontario and Southwestern Ontario — free estimates, written quotes, no surprises.`,
    openGraph: {
      title: `${svc.title} | Master Decker`,
      description: svc.blurb,
      url: `${site.url}/${slug}`,
      images: [categoryBg[svc.categoryId] || "/images/pergola-bg.jpg"],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (reservedSlugs.has(slug)) notFound();
  const svc = allServices.find((s) => s.slug === slug);
  if (!svc) notFound();

  const related = allServices.filter((s) => s.categoryId === svc.categoryId && s.slug !== svc.slug).slice(0, 3);
  const bg = categoryBg[svc.categoryId] || "/images/pergola-bg.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.blurb,
    provider: {
      "@type": "LocalBusiness",
      name: site.legalName,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <Hero
          eyebrow={svc.category}
          title={svc.title}
          subtitle={svc.blurb}
          background={bg}
          primaryCta={{ label: "Request a Quote", href: "/contact" }}
          showPhone
        />

        {/* Breadcrumb */}
        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="container py-3">
            <nav className="text-xs text-[var(--ink-soft)]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-[var(--accent)]">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--ink)] font-semibold">{svc.title}</span>
            </nav>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-4xl">
            <div className="prose-md">
              <h2>About our {svc.title.toLowerCase()} service</h2>
              <p>
                Master Decker has been delivering professional {svc.title.toLowerCase()} services across London Ontario and Southwestern Ontario since {site.foundedYear}. Every project starts with a free, on-site consultation so we can understand your space, your goals, and any constraints — then we send you a detailed, written quote.
              </p>
              <p>
                We work with premium materials, maintain WSIB and full liability insurance, and stand behind every job with a workmanship guarantee. From small one-day jobs to multi-week builds, you&apos;ll know what to expect, when to expect it, and what it costs — no surprises.
              </p>

              <h3>What&apos;s included</h3>
              <ul>
                <li>Free on-site consultation and detailed written estimate</li>
                <li>Premium materials sourced from trusted Ontario suppliers</li>
                <li>Experienced crews — clear timelines, clean job sites</li>
                <li>WSIB-covered, fully insured, satisfaction guaranteed</li>
                <li>Service across {site.serviceAreas.slice(0, 5).join(", ")}, and beyond</li>
              </ul>

              <h3>Our process</h3>
              <ol className="list-decimal pl-6 space-y-2 mb-4 text-[var(--ink-soft)]">
                <li><strong className="text-[var(--ink)]">Request a quote</strong> — fill out our short form or call us at {site.phone}.</li>
                <li><strong className="text-[var(--ink)]">Free consultation</strong> — we visit your property, review the scope, and answer questions.</li>
                <li><strong className="text-[var(--ink)]">Written estimate</strong> — you get a detailed, line-itemed quote so there are no surprises.</li>
                <li><strong className="text-[var(--ink)]">Schedule the work</strong> — once approved, we book a start date that works for you.</li>
                <li><strong className="text-[var(--ink)]">Project delivery</strong> — clean, professional crews complete the job on schedule.</li>
              </ol>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
            <div className="container">
              <div className="text-center mb-12">
                <p className="eyebrow mb-3">Related Services</p>
                <h2 className="h-display text-3xl md:text-4xl">More from {svc.category}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="svc-card" aria-label={r.title}>
                    <div className="svc-card-bg" style={{ backgroundImage: `url(${categoryBg[r.categoryId]})` }} role="img" aria-label={r.title} />
                    <div className="svc-card-overlay" />
                    <div className="svc-card-content">
                      <div className="svc-card-title">{r.title}</div>
                      <p className="svc-card-desc">{r.blurb}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Ready for your free estimate?</h2>
            <p className="text-white/85 mb-8 text-lg">
              Tell us about your {svc.title.toLowerCase()} project — we&apos;ll respond within 1 business day.
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
