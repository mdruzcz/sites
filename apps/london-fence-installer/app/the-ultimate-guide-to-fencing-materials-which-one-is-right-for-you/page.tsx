import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema, articleSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fencing Materials Comparison Guide | London Fence Installer" },
  description: "Compare wood, vinyl, metal, and chainlink fencing. Learn about durability, maintenance, cost, and which material is best for your London, Ontario property.",
  alternates: { canonical: "https://londonfenceinstaller.ca/the-ultimate-guide-to-fencing-materials-which-one-is-right-for-you" },
  openGraph: {
    title: "Fencing Materials Comparison Guide | London Fence Installer",
    description: "Compare all fence materials — wood, vinyl, metal, and chainlink — to find the right fit for your property.",
    url: `${site.url}/the-ultimate-guide-to-fencing-materials-which-one-is-right-for-you`,
    images: [{ url: "/images/hero-fence.jpg", width: 1200, height: 630, alt: "Fencing materials comparison guide" }],
  },
};

export default function BlogMaterialsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Ultimate Guide to Fencing Materials", url: `${site.url}/the-ultimate-guide-to-fencing-materials-which-one-is-right-for-you` },
  ]);
  const article = articleSchema({
    headline: "The Ultimate Guide to Fencing Materials: Which One Is Right for You?",
    description: "Compare wood, vinyl, metal, and chainlink fencing materials for your London, Ontario property.",
    url: "/the-ultimate-guide-to-fencing-materials-which-one-is-right-for-you",
    datePublished: "2025-12-01",
  });

  const materials = [
    {
      name: "Wood",
      cost: "$$",
      lifespan: "10–30 years",
      maintenance: "Medium",
      bestFor: "Privacy, aesthetics, traditional homes",
      pros: ["Natural appearance", "Versatile styles", "Easy to customize", "Cost-effective"],
      cons: ["Requires regular maintenance", "Susceptible to rot and insects without treatment", "May warp or crack over time"],
    },
    {
      name: "Vinyl",
      cost: "$$$",
      lifespan: "25–40 years",
      maintenance: "Low",
      bestFor: "Low-maintenance privacy, modern homes",
      pros: ["Virtually maintenance-free", "Won't rot, rust, or splinter", "Comes in many styles and colours", "Long lifespan"],
      cons: ["Higher upfront cost", "Can crack in extreme cold", "Limited repair options"],
    },
    {
      name: "Chain-Link",
      cost: "$",
      lifespan: "20–30 years",
      maintenance: "Very Low",
      bestFor: "Budget-friendly security, pets, commercial",
      pros: ["Most affordable option", "Very durable", "Low maintenance", "Allows visibility"],
      cons: ["Not private", "Less aesthetically pleasing", "Can rust over time without coating"],
    },
    {
      name: "Metal/Aluminum",
      cost: "$$$",
      lifespan: "30–50 years",
      maintenance: "Low",
      bestFor: "Pool fencing, decorative, high-end residential",
      pros: ["Extremely durable", "Elegant appearance", "Very low maintenance", "Powder-coated finish resists rust"],
      cons: ["Higher cost", "Limited privacy", "Can dent if impacted"],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />

      <section className="bg-green py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">The Ultimate Guide to Fencing Materials: Which One Is Right for You?</h1>
          <p className="text-gray-300 text-sm">By London Fence Installer | Expert Fencing Advice</p>
        </div>
      </section>

      <article className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--muted)] mb-8 leading-relaxed text-lg">
            Selecting the right fencing material is one of the most important decisions in your fence project. Each material has unique strengths, weaknesses, and cost profiles. This guide will help you make an informed decision for your London, Ontario property.
          </p>

          <div className="space-y-6 mb-10">
            {materials.map((m) => (
              <div key={m.name} className="card p-6">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <h2 className="text-2xl font-extrabold text-[var(--green)]">{m.name} Fencing</h2>
                  <div className="flex gap-3 text-sm">
                    <span className="bg-[var(--surface)] px-3 py-1 rounded-full font-semibold">Cost: {m.cost}</span>
                    <span className="bg-[var(--surface)] px-3 py-1 rounded-full font-semibold">Life: {m.lifespan}</span>
                    <span className="bg-[var(--surface)] px-3 py-1 rounded-full font-semibold">Maintenance: {m.maintenance}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--accent)] font-semibold mb-3">Best for: {m.bestFor}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-[var(--green)] mb-2">Pros</p>
                    <ul className="space-y-1">
                      {m.pros.map((p) => <li key={p} className="text-sm text-[var(--muted)] flex gap-2"><span className="text-[var(--green)]">✓</span>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-red-500 mb-2">Cons</p>
                    <ul className="space-y-1">
                      {m.cons.map((c) => <li key={c} className="text-sm text-[var(--muted)] flex gap-2"><span className="text-red-400">✗</span>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <CtaBand heading="Not Sure Which Material to Choose?" sub="Get expert advice from London Fence Installer" />
    </>
  );
}
