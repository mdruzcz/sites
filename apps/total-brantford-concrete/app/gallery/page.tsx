import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { getProjects, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery | Concrete Driveways, Patios & More in Brantford",
  description: "Browse our portfolio of concrete driveways, stamped patios, walkways, and repair projects completed across Brantford and Brant County, ON.",
  openGraph: {
    title: "Project Gallery | Total Brantford Concrete",
    description: "See our completed concrete projects across Brantford — driveways, patios, walkways, and more.",
    url: `${site.url}/gallery`,
  },
};

export default function GalleryPage() {
  const projects = getProjects();
  const testimonials = getFeaturedTestimonials();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Gallery", url: `${site.url}/gallery` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow">Project Showcase</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl">
            Our Concrete <span className="text-[var(--accent)]">Portfolio</span>
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-2xl mx-auto normal-case font-normal">
            Real projects. Real results. Explore the craftsmanship and care we put into every driveway, patio, and concrete repair across Brantford.
          </p>
        </div>
      </section>

      {/* Before/After Highlight */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Transformations" title="Before & After" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="grid grid-cols-2 gap-3 col-span-1 md:col-span-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/Before-1-1-scaled.png" alt="Concrete surface before restoration in Brantford ON" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Before</div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image src="/images/After-1-1-scaled.png" alt="Concrete driveway after professional restoration by Total Brantford Concrete" fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
                <div className="absolute top-2 left-2 bg-[var(--accent)]/90 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">After</div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden aspect-[4/3] md:aspect-auto">
              <Image src="/images/before-and-after-3-scaled.png" alt="Complete concrete transformation project by Total Brantford Concrete" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute top-2 left-2 bg-[var(--accent)]/90 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">Transformation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Project Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="All Projects" title="Our Complete Portfolio" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {projects.map((project) => (
              <div key={project.id} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-1">{project.title}</h3>
                  <p className="text-xs text-[var(--concrete)] leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Client Reviews" title="What Brantford Homeowners Say" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[var(--concrete)] leading-relaxed mb-4 italic normal-case">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-[var(--charcoal)]">{t.name}</p>
                  <p className="text-xs text-[var(--concrete)]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
