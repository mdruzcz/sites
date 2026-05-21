import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { caseStudySchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
    alternates: { canonical: `${site.url}/case-studies/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.summary,
      url: `${site.url}/case-studies/${study.slug}`,
      images: [{ url: study.heroImage, width: 2400, height: 1350, alt: study.title }],
    },
  };
}

export default async function CaseStudyDetail({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema(study)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Case Studies", url: `${site.url}/case-studies` },
              { name: study.title, url: `${site.url}/case-studies/${study.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src={study.heroImage}
          alt={`${study.title} — case study cover`}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 text-center">
          <Link href="/case-studies" className="text-sm text-accent hover:underline mb-6 inline-block">
            ← All case studies
          </Link>
          <p className="eyebrow">{study.location} · {study.year}</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-7xl text-white mb-6">
            {study.title}
          </h1>
          <p className="text-xl sm:text-2xl text-accent font-semibold mb-8">{study.headline}</p>
          <p className="text-lg text-muted-strong leading-relaxed max-w-3xl mx-auto">
            {study.summary}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-midnight-700 border-y border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-3">Client</p>
              <p className="text-white font-semibold">{study.client}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-3">Location</p>
              <p className="text-white font-semibold">{study.location}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-3">Year</p>
              <p className="text-white font-semibold">{study.year}</p>
            </div>
          </div>
          <div className="section-divider my-10" />
          <div>
            <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-4">Scope</p>
            <div className="flex flex-wrap gap-2">
              {study.scope.map((item) => (
                <span key={item} className="spec-chip">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-16 sm:py-24 bg-midnight-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-ols">
          <h2>The challenge</h2>
          <p>{study.challenge}</p>
          <h2>Our approach</h2>
          <p>{study.approach}</p>
          <h2>The outcome</h2>
          <p>{study.outcome}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center">Gallery</p>
          <h2 className="h-display text-3xl sm:text-4xl text-white text-center mb-12">
            From the show floor.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {study.gallery.map((img, i) => (
              <div key={img} className="relative aspect-[3/2] rounded-2xl overflow-hidden card">
                <Image
                  src={img}
                  alt={`${study.title} — photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-muted text-sm mt-8">
            Drop final photos and videos in <code className="text-accent">public/images/uploads/</code> and we'll wire them in.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 sm:py-24 bg-midnight-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card card-glow p-10 sm:p-14 text-center">
            <svg className="w-12 h-12 text-accent mx-auto mb-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-6">
              &ldquo;{study.testimonialQuote}&rdquo;
            </p>
            <p className="text-accent font-semibold">— {study.testimonialAttribution}</p>
          </div>
        </div>
      </section>

      {/* CTA + form */}
      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center">Got a Project Like This?</p>
          <h2 className="h-display text-3xl sm:text-4xl text-white text-center mb-3">
            Let's design <span className="gradient-text">yours</span>.
          </h2>
          <p className="text-muted-strong text-center mb-10">
            Parade, gala, festival, drive-through, or year-round building install — tell us about it.
          </p>
          <QuoteForm />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
