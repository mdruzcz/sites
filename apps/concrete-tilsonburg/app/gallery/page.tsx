import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getProjects, getTestimonials } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeader } from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery — Concrete Work in Tillsonburg, ON",
  description:
    "Browse completed concrete driveways, stamped patios, garage floors, and repair projects by Concrete Tilsonburg across Oxford County and Southwestern Ontario.",
  openGraph: {
    title: "Project Gallery — Concrete Work in Tillsonburg, ON",
    description:
      "Browse completed concrete driveways, stamped patios, garage floors, and repair projects across Oxford County.",
    url: `${site.url}/gallery`,
  },
};

export default function GalleryPage() {
  const projects = getProjects();
  const testimonials = getTestimonials();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Gallery", url: `${site.url}/gallery` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="bg-charcoal text-white relative py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--concrete-200)] mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <p className="eyebrow !text-[var(--accent)] !mb-3">Our Work</p>
          <h1 className="h-display text-4xl sm:text-5xl mb-4 max-w-3xl">
            Concrete Projects Across Oxford County
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-2xl leading-relaxed">
            Real driveways, stamped patios, garage floors, and repair projects completed across Tillsonburg, Woodstock, Delhi, and surrounding communities.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Recent Projects"
            title="See the Quality of Our Work"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.slug} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/70 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                      {p.city}, ON
                    </span>
                    <h2 className="font-bold text-xl leading-tight">{p.title}</h2>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <Link
                    href={`/services/${p.service}`}
                    className="text-sm font-semibold text-[var(--accent)] hover:underline"
                  >
                    View this service →
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-primary text-sm py-2"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Our Customers Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6 flex flex-col">
                <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--charcoal)] leading-relaxed mb-4 flex-1 text-sm">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-[var(--charcoal)]">
                  {t.author} <span className="font-normal text-[var(--concrete)]">— {t.city}, ON</span>
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn btn-primary text-base">
              Start Your Project — Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
