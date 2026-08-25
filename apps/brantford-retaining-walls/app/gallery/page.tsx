import type { Metadata } from "next";
import Image from "next/image";
import { getProjects, getFeaturedTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import gallery from "@/content/gallery.json";

export const metadata: Metadata = {
  title: "Project Gallery | Brantford Retaining Wall Photos",
  description:
    "Browse our Brantford retaining wall gallery — 48 photos of completed armour stone, segmental block, timber, and natural stone projects across Brant County.",
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: {
    title: `Project Gallery | ${site.name}`,
    description:
      "See our retaining wall gallery — completed armour stone, segmental block, timber, and natural stone walls across Brantford and Brant County.",
    url: `${site.url}/gallery`,
    images: [gallery[0].image],
  },
};

export const revalidate = 3600;

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `Retaining Wall Project Gallery | ${site.name}`,
  description:
    "Photo gallery of completed retaining wall projects built by Brantford Retaining Walls across Brantford and Brant County.",
  url: `${site.url}/gallery`,
  associatedMedia: gallery.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    name: g.alt,
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow !text-[var(--accent)]">Our Work</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Project Gallery
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl mx-auto leading-relaxed">
            Real projects. Real results. Browse our completed retaining wall installations across Brantford and the surrounding area.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Featured Projects"
            title="Signature Retaining Wall Builds"
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {projects.map((project) => (
              <div key={project.id} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.location}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)]">{project.title}</h3>
                  <p className="text-xs text-[var(--concrete)] mt-1">{project.location}</p>
                  <p className="text-sm text-[var(--concrete)] leading-relaxed mt-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What Clients Say" title="Testimonials" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[var(--concrete)] leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold text-xs uppercase tracking-wider text-[var(--charcoal)]">{t.name}</p>
                <p className="text-xs text-[var(--concrete)]">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="More of Our Work"
            title="Retaining Wall Photo Gallery"
            subtitle="A closer look at the materials and finishes we build across Brantford and Brant County — from armour stone and segmental block to timber and natural stone."
            center
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-10">
            {gallery.map((g) => (
              <figure key={g.image} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    placeholder="blur"
                    blurDataURL={g.blurDataURL}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-white text-xs leading-snug line-clamp-2">{g.alt}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
