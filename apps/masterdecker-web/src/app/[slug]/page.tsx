import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { site } from "@/lib/site";
import services from "@/content/services.json";
import locations from "@/content/locations.json";

export const revalidate = 3600;

const allServices = services.categories.flatMap((c) => c.services.map((s) => ({ ...s, category: c.name, categoryId: c.id })));

const reservedSlugs = new Set([
  "about", "services", "contact", "faq", "service-locations", "project-examples", "blog",
  "api", "_next", "images", "sitemap.xml", "robots.txt",
]);

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
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (reservedSlugs.has(slug)) notFound();
  const svc = allServices.find((s) => s.slug === slug);
  if (!svc) notFound();

  const related = allServices.filter((s) => s.categoryId === svc.categoryId && s.slug !== svc.slug).slice(0, 3);

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
        <section className="bg-[var(--accent-dark)] text-white">
          <div className="container section">
            <nav className="text-sm mb-5 text-white/70" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-white">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{svc.title}</span>
            </nav>
            <p className="eyebrow text-[var(--accent-light)] mb-3">{svc.category}</p>
            <h1 className="h-display text-4xl md:text-5xl mb-5">{svc.title}</h1>
            <p className="text-lg text-white/85 max-w-3xl leading-relaxed mb-8">{svc.blurb}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Request a Quote</Link>
              <a href={site.phoneHref} className="btn-outline border-white text-white hover:bg-white hover:text-[var(--accent)]">{site.phone}</a>
            </div>
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
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/${r.slug}`} className="group bg-white rounded border border-[var(--border)] p-6 hover:border-[var(--accent)] hover:shadow-md transition-all flex flex-col">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent)]">{r.title}</h3>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">{r.blurb}</p>
                    <span className="mt-auto text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Learn More →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section bg-[var(--accent-dark)] text-white text-center">
          <div className="container max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Ready for your free estimate?</h2>
            <p className="text-white/80 mb-8 text-lg">
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
