import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: `Custom deck and fence projects by ${site.name} in Woodstock, Ingersoll, Tillsonburg, and Oxford County. Cedar, composite, vinyl, steel, and chain-link.`,
  openGraph: {
    title: `Project Gallery | ${site.name}`,
    description: "Deck and fence projects across Woodstock and Oxford County.",
  },
};

export const revalidate = 3600;

export default function GalleryPage() {
  const projects = getProjects();

  return (
    <>
      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Project Gallery</p>
            <h1 className="h-display text-4xl sm:text-5xl text-[var(--charcoal)] mb-4">
              See the Work
            </h1>
            <p className="text-lg text-[var(--concrete)] max-w-2xl mx-auto normal-case font-normal">
              Custom decks and fences built across Woodstock, Ingersoll, Tillsonburg, and Oxford County.
              Real project photos coming as new builds wrap up this season.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["All", "Decks", "Fences", "Cedar", "Composite", "Vinyl"].map((f) => (
              <span
                key={f}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-[var(--border)] rounded-full text-[var(--concrete)] bg-white cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div key={p.slug} className="relative aspect-square bg-[var(--border)] rounded-xl overflow-hidden group">
                {/* Placeholder shimmer until images added */}
                <div className="absolute inset-0 shimmer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON · {p.finish}</p>
                  <p className="font-bold text-sm leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--concrete)] mt-6 normal-case">
            More photos coming soon. Real project images will replace placeholders above.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
