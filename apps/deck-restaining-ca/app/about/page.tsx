import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us | Professional Deck Staining Experts",
  description: `Learn about ${site.name} — ${site.yearsExperience}+ years of professional deck and fence staining in the Halton Region. Oil-based stains, proper prep, lasting results.`,
};

export default function AboutPage() {
  const process = [
    { step: "1", title: "Free Quote", description: "We visit your property, assess the wood condition, and provide a transparent quote — no hidden fees." },
    { step: "2", title: "Strip & Clean", description: "Chemical stripping removes old finishes. Power washing removes dirt, mildew, and greying from the wood." },
    { step: "3", title: "Sand & Prep", description: "Professional sanding smooths the surface, removes splinters, and opens wood pores for maximum stain absorption." },
    { step: "4", title: "Stain & Protect", description: "Premium oil-based stain is applied by hand, penetrating deep into the grain for 3–5 years of protection." },
  ];

  return (
    <>
      <section className="bg-[var(--wood-dark)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            About {site.name}
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            {site.yearsExperience}+ years restoring decks and fences across the Halton Region with
            premium oil-based stains and professional technique.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="h-display text-2xl sm:text-3xl mb-6">Our Story</h2>
              <div className="prose prose-lg text-stone-600 space-y-4">
                <p>
                  Deck Restaining was founded with one clear mission: provide homeowners with deck staining
                  that actually lasts. After seeing too many decks ruined by cheap water-based stains and
                  improper prep work, we set out to do things differently.
                </p>
                <p>
                  We use exclusively oil-based stains because they penetrate the wood rather than sitting
                  on top. We strip and sand properly because shortcuts lead to early failure. And we stand
                  behind every project because our reputation depends on results you can see years later.
                </p>
                <p>
                  Over {site.yearsExperience} years and 200+ projects later, we&apos;ve built a reputation
                  across Oakville, Burlington, and the surrounding area for quality workmanship and
                  honest communication. Our customers come back because their decks still look great
                  3–5 years after we stained them.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/deck10.jpeg"
                alt="Deck Restaining team performing professional deck staining in Oakville, Ontario"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--stone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold text-[var(--accent)]">200+</p>
              <p className="text-stone-600 text-sm mt-1">Projects Completed</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[var(--accent)]">5+</p>
              <p className="text-stone-600 text-sm mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[var(--accent)]">98%</p>
              <p className="text-stone-600 text-sm mt-1">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[var(--accent)]">100%</p>
              <p className="text-stone-600 text-sm mt-1">Oil-Based Only</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Our Process"
            description="A proven 4-step approach that delivers consistent, long-lasting results every time."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <div key={p.step} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-stone-600 text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--stone)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Coverage"
            title="Service Areas"
            description="We proudly serve communities across the Halton Region and Greater Toronto Area."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {site.serviceAreas.map((area) => (
              <div key={area} className="card p-4 text-center">
                <p className="font-semibold text-stone-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
