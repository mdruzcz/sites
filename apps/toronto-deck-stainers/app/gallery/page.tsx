import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Deck Staining Gallery | Before & After Photos | Toronto GTA",
  description: "See real deck staining and restoration results across Toronto and the GTA. Before and after photos from our 1,500+ completed projects.",
  openGraph: { title: "Deck Staining Gallery — Toronto Deck Stainers", description: "Real before and after deck staining results across Toronto, Richmond Hill, Vaughan, Markham, and the GTA.", url: `${site.url}/gallery` },
};

export const revalidate = 3600;

export default function GalleryPage() {
  const projects = getProjects();

  return (
    <>
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Our Work</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining &amp; Restoration Gallery
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Real results from real GTA homeowners — before and after deck staining,
            sealing, refinishing, and full restoration projects across Toronto and the GTA.
          </p>
        </div>
      </section>

      {/* Before & After section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-10 text-center">
            Before &amp; After
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                before: { src: "/images/before-1.jpg", alt: "Weathered, grey deck before professional cleaning and staining in Toronto" },
                after: { src: "/images/after-1.jpg", alt: "Beautiful restored deck after professional staining by Toronto Deck Stainers" },
                label: "Deck Restoration",
              },
              {
                before: { src: "/images/before-2.jpg", alt: "Deck before professional power washing and staining — worn boards in GTA" },
                after: { src: "/images/after-2.jpg", alt: "Deck after complete staining and sealing — rich amber finish by Toronto Deck Stainers" },
                label: "Full Refinishing",
              },
            ].map((set, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="p-4 border-b border-[var(--border)]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">{set.label}</span>
                </div>
                <div className="grid grid-cols-2">
                  {[set.before, set.after].map((img, j) => (
                    <div key={j} className="relative aspect-[4/3]">
                      <Image src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover" />
                      <div className="absolute bottom-2 left-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${j === 0 ? "bg-black/60 text-white" : "bg-[var(--accent)] text-white"}`}>
                          {j === 0 ? "Before" : "After"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Full project grid */}
          <h2 className="h-display text-2xl sm:text-3xl text-[var(--charcoal)] mb-8 text-center">
            Recent Projects
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p) => (
              <div key={p.slug} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-900)]/85 via-[var(--charcoal-900)]/20 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs uppercase tracking-wider text-[var(--accent)] font-bold">{p.city}, ON</p>
                  <p className="font-semibold text-sm leading-tight">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[var(--background)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="h-display text-3xl sm:text-4xl text-[var(--charcoal)] mb-4">
            Ready for Your Own Transformation?
          </h2>
          <p className="text-[var(--concrete)] mb-8">
            Free on-site estimates across Toronto and all GTA communities. We reply within {site.responseTime}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary px-8 py-4">Get a Free Estimate</Link>
            <a href={site.phoneHref} className="btn btn-outline px-8 py-4">{site.phone}</a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
