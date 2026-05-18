import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — ${site.yearsExperience}+ years of basement renovation and legal apartment experience serving London, Ontario and surrounding areas.`,
};

export default function AboutPage() {
  const process = [
    { step: "1", title: "Consultation", description: "Free on-site assessment of your basement's potential, including ceiling height measurement, moisture evaluation, and feasibility review for your project goals." },
    { step: "2", title: "Design & Permits", description: "Professional architectural drawings, 3D renderings, structural engineering reports, and complete permit submission to your municipality." },
    { step: "3", title: "Construction", description: "Project-managed construction with a dedicated site supervisor, regular progress updates, clean worksite, and adherence to your timeline and budget." },
    { step: "4", title: "Inspection & Handover", description: "Coordination of all municipal inspections, occupancy certification, detailed walkthrough, and handover of your completed, code-compliant basement." },
  ];

  return (
    <>
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            About {site.name}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {site.yearsExperience}+ years transforming basements across London, Ontario into
            legal, livable, income-generating spaces.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="h-display text-2xl sm:text-3xl mb-6">Our Story</h2>
            <div className="prose prose-lg text-slate-600 space-y-4">
              <p>
                {site.name} was founded to solve a specific problem: homeowners in London and
                Southwestern Ontario want to create legal basement apartments but don&apos;t know
                where to start. The permit process is complex, Ontario Building Code requirements
                are strict, and finding a contractor who truly understands second suite construction
                can be difficult.
              </p>
              <p>
                With over {site.yearsExperience} years of hands-on construction experience
                and deep knowledge of Ontario&apos;s building code requirements for secondary suites,
                we&apos;ve helped homeowners across London, St. Thomas, Woodstock, and surrounding
                communities transform their basements into legal, income-generating apartments.
              </p>
              <p>
                We&apos;re not a general renovation company that happens to do basements. Basements
                are all we do — and that specialization shows in every project. From underpinning
                older foundations to meet ceiling height requirements, to designing efficient suite
                layouts that maximize rental value, to navigating the municipal permit process,
                we bring focused expertise that generalist contractors simply can&apos;t match.
              </p>
              <p>
                Every project starts with a free, no-pressure consultation where we assess your
                basement&apos;s potential and give you an honest evaluation of what&apos;s possible, what
                it will cost, and how long it will take. No surprises — just straight answers
                from people who do this work every day.
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
            description="A proven 4-step approach from initial consultation to final inspection and occupancy."
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
            description="We proudly serve communities across London and Southwestern Ontario."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
