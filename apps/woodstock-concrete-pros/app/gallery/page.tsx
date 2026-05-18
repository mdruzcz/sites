import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { getFeaturedProjects, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Gallery | Concrete Projects in Woodstock, ON",
  description: `Browse our portfolio of completed concrete driveways, stamped patios, walkways, and repairs across Woodstock and Oxford County. See why homeowners trust ${site.name}.`,
};

export const revalidate = 3600;

export default function GalleryPage() {
  const projects = getFeaturedProjects();
  const testimonials = getFeaturedTestimonials();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Gallery", url: `${site.url}/gallery` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="relative overflow-hidden">
        <Image
          src="/images/concrete-driveway-front-view.jpg"
          alt="Professional concrete driveway installation with stamped borders by Woodstock Concrete Pros"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-[var(--charcoal)]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Work
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Real concrete projects by Woodstock Concrete Pros. Browse our portfolio of
            completed driveways, stamped patios, walkways, repairs, and more across Oxford County.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Recent Projects"
            description="Every project features premium materials, expert craftsmanship, and winter-resistant designs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.slug} className="card overflow-hidden group">
                <div className="aspect-[4/3] bg-slate-200 relative">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.description} by Woodstock Concrete Pros`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What Our Customers Say"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[var(--accent)] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-sm text-slate-900">
                  {t.author} <span className="font-normal text-slate-500">— {t.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
