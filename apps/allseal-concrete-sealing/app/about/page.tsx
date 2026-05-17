import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — ${site.yearsExperience}+ years of professional concrete sealing experience serving Southwestern Ontario.`,
};

export default function AboutPage() {
  const process = [
    { step: "1", title: "Inspection", description: "We assess your concrete surfaces, identify any damage, and recommend the best sealing approach." },
    { step: "2", title: "Preparation", description: "Thorough power washing, crack repair, and surface prep to ensure maximum sealer adhesion." },
    { step: "3", title: "Application", description: "Professional application of premium sealers using industry-best techniques for even coverage." },
    { step: "4", title: "Protection", description: "Your sealed surfaces are protected for 2–5 years against weather, stains, and wear." },
  ];

  return (
    <>
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            About {site.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {site.yearsExperience}+ years protecting concrete surfaces across Southwestern Ontario with
            advanced techniques and premium products.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="h-display text-2xl sm:text-3xl mb-6">Our Story</h2>
            <div className="prose prose-lg text-slate-600 space-y-4">
              <p>
                All-Seal Concrete Sealing was founded with a simple mission: protect and preserve the
                concrete surfaces that homeowners and businesses invest in. With over {site.yearsExperience} years
                of hands-on experience, we&apos;ve built a reputation for quality workmanship and transparent
                communication.
              </p>
              <p>
                We use only premium sealing products — from high-performance acrylics to industrial-grade
                polyurethanes — because we believe your concrete deserves the best protection available.
                Every job starts with a thorough inspection and honest assessment, so you know exactly
                what to expect.
              </p>
              <p>
                From a single driveway in Woodstock to commercial properties across Hamilton and
                Kitchener-Waterloo, we bring the same attention to detail and professional standards to
                every project. Our customers come back year after year because they trust us to keep
                their surfaces looking great and lasting longer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--surface)]">
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
                <p className="text-slate-600 text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Coverage"
            title="Service Areas"
            description="We proudly serve communities across Southwestern Ontario."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {site.serviceAreas.map((area) => (
              <div key={area} className="card p-4 text-center">
                <p className="font-semibold text-slate-900">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
