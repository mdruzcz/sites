import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery — Concrete Driveways & Patios in London ON",
  description: `Browse recent concrete driveways, stamped patios, walkways, and pool decks poured across London, St. Thomas, Strathroy, Woodstock, and Southwestern Ontario.`,
};

export default function GalleryPage() {
  const projects = getProjects();

  return (
    <>
      <section className="bg-charcoal text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-[var(--accent)]">Our Work</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            Project Gallery
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            A look at recent driveways, patios, walkways, and pool decks poured across Southwestern Ontario. Every project labelled with city and finish type.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.slug} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="eyebrow !mb-1">{p.city}, Ontario</p>
                  <h3 className="font-bold text-[var(--charcoal)]">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-[var(--concrete)] mb-3">Want a project like one of these?</p>
            <a href={site.phoneHref} className="btn btn-primary">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
