import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getCaseStudies } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Case Studies — Music-Synced Light Show Projects in Ontario",
  description: `Featured projects from ${site.name}, including the Blenheim Rotary Club Christmas Parade music-synced light installation.`,
  alternates: { canonical: `${site.url}/case-studies` },
};

export default function CaseStudiesPage() {
  const studies = getCaseStudies();
  return (
    <>
      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Case Studies</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Real shows. Real <span className="gradient-text">numbers</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Selected projects from across Ontario. Each one a story about how a venue, event, or community turned a vision into a synchronized light show.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Featured Work" title="Selected projects." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="card card-glow overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={study.heroImage}
                    alt={study.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-2">
                    {study.location} · {study.year}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-strong text-sm leading-relaxed mb-5">
                    {study.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {study.stats.slice(0, 4).map((s) => (
                      <div key={s.label}>
                        <div className="text-lg font-extrabold gradient-text leading-none mb-1">
                          {s.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-muted">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
