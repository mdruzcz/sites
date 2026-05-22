import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us | Structural Specialists in Brantford",
  description: "About Brantford Retaining Walls — structural specialists serving Brantford, Paris, and Brant County with engineered retaining wall solutions for 10+ years.",
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "About", url: `${site.url}/about` },
          ])),
        }}
      />

      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow !text-[var(--accent)]">About Us</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Building Foundations That Last a Lifetime
          </h1>
          <p className="text-[var(--concrete-200)] max-w-2xl mx-auto leading-relaxed">
            We aren&apos;t just installers — we are structural specialists who understand the unique challenges of Southern Ontario terrain.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--concrete)] leading-relaxed text-lg mb-6">
            At Brantford Retaining Walls, we believe that a landscape should be as functional as it is beautiful. For years, we have served homeowners and businesses throughout Brantford, Paris, and Brant County, transforming sloped yards into usable, breathtaking outdoor living spaces.
          </p>
          <p className="text-[var(--concrete)] leading-relaxed mb-6">
            We understand the unique clay-heavy soil and freeze-thaw cycles of Southern Ontario, and we design every wall to withstand the test of time. Brantford&apos;s diverse terrain — from the rolling hills near the Grand River to the residential heights — requires more than just &ldquo;stacking stones.&rdquo; Improperly built walls fail, leading to costly erosion and property damage.
          </p>
          <p className="text-[var(--concrete)] leading-relaxed mb-10">
            Our mission is simple: to provide the Brantford community with engineered retaining solutions that offer peace of mind, prevent soil erosion, and significantly increase property value.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Pillars"
            title="The Pillars of Our Service"
            center
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "Structural Integrity", desc: "Every project is built with a focus on proper drainage, Geogrid reinforcement, and solid base compaction to prevent shifting and leaning." },
              { title: "Local Expertise", desc: "We know Brantford's building codes and municipal standards inside and out." },
              { title: "Custom Craftsmanship", desc: "Whether it's the rugged look of Armour Stone, clean lines of Interlocking Blocks, or natural warmth of Timber, we tailor designs to your home." },
              { title: "Clean Site Promise", desc: "We respect your property. Our crews maintain a tidy workspace and ensure thorough cleanup once the project is complete." },
            ].map((pillar) => (
              <div key={pillar.title} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--charcoal)] mb-2">{pillar.title}</h3>
                <p className="text-sm text-[var(--concrete)] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
