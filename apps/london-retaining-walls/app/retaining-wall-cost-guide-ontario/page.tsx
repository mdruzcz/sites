import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Retaining Wall Cost Guide for Ontario Homeowners | 2024 Prices",
  description: "What does a retaining wall cost in Ontario? We break down retaining wall costs by material, height and length for London and Southwestern Ontario homeowners.",
  openGraph: { title: "Retaining Wall Cost Guide for Ontario Homeowners", url: `${site.url}/retaining-wall-cost-guide-ontario` },
};

export default function CostGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "Retaining Wall Cost Guide", href: "/retaining-wall-cost-guide-ontario" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="Retaining Wall Cost Guide for Ontario Homeowners"
        subtitle="March 2024 · By London Retaining Walls"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>One of the first questions homeowners ask us is: &quot;How much does a retaining wall cost?&quot; It&apos;s a fair question — and an honest answer requires looking at the factors that drive the price. This guide gives you realistic pricing ranges for Ontario in 2024 so you can budget with confidence.</p>

          <h2>Retaining Wall Cost by Material (Per Linear Foot)</h2>
          <p>The biggest cost driver is the wall material. Here are typical installed costs per linear foot for a standard residential wall in Ontario:</p>
          <ul>
            <li><strong>Pressure-treated wood:</strong> $100–$200 per linear foot (for a 3–4 foot tall wall)</li>
            <li><strong>Interlocking block (Permacon, Allan Block):</strong> $200–$350 per linear foot (for a 3–4 foot tall wall)</li>
            <li><strong>Poured concrete:</strong> $300–$500+ per linear foot (for a 4–5 foot wall)</li>
          </ul>
          <p>These prices include excavation, base preparation, drainage, materials, and installation. They do not include permits, engineering, or significant site remediation.</p>

          <h2>How Wall Height Affects Cost</h2>
          <p>Wall height is a major cost multiplier. A wall that is taller requires:</p>
          <ul>
            <li>More material (obviously)</li>
            <li>Deeper excavation and larger base</li>
            <li>Geogrid reinforcement (for block walls over 4 feet)</li>
            <li>Engineered drawings and permits (typically required over 1 metre / 3.3 feet)</li>
            <li>More drainage infrastructure</li>
          </ul>
          <p>As a rough guide, doubling the wall height roughly triples the cost — not doubles — because of the engineering requirements and base work involved.</p>

          <h2>Other Factors That Affect Cost</h2>
          <ul>
            <li><strong>Site access:</strong> Walls in difficult-to-access locations (steep slopes, tight side yards, remote areas) cost more due to the extra labour involved.</li>
            <li><strong>Soil conditions:</strong> Rocky soil requires more excavation work. Very soft or wet soil may require additional base preparation.</li>
            <li><strong>Drainage requirements:</strong> Some sites require more extensive drainage systems, which adds cost but is essential for wall longevity.</li>
            <li><strong>Permits:</strong> Building permits for walls over 1 metre typically cost $100–$500+ depending on the municipality.</li>
            <li><strong>Engineering:</strong> Walls requiring an engineer&apos;s stamp add $1,000–$3,000+ to the project cost.</li>
            <li><strong>Demolition of old wall:</strong> If replacing an existing wall, demolition and removal adds cost.</li>
          </ul>

          <h2>Typical Total Project Costs</h2>
          <ul>
            <li><strong>Small garden wall (10 metres, 3 feet tall, wood):</strong> $3,000–$6,000</li>
            <li><strong>Standard residential block wall (15 metres, 4 feet tall):</strong> $9,000–$18,000</li>
            <li><strong>Larger residential block wall (20 metres, 5 feet tall):</strong> $18,000–$35,000</li>
            <li><strong>Concrete wall (15 metres, 5–6 feet tall):</strong> $25,000–$50,000+</li>
          </ul>

          <h2>Is Cheaper Always Worse?</h2>
          <p>Not necessarily — but be wary of quotes that are significantly lower than the ranges above. A wall built without proper base preparation, inadequate drainage, or below-code construction will fail in 5–10 years, and the cost to remove and replace it will far exceed what you saved upfront.</p>
          <p>The best retaining wall is one built correctly the first time with proper drainage engineering. We always provide a detailed written quote so you know exactly what you&apos;re getting.</p>

          <p><Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact us for a free no-obligation quote</Link> on your retaining wall project. We serve London and all of Southwestern Ontario.</p>
        </div>
      </article>

      <CtaBand title="Get an Accurate Quote for Your Wall" />
    </>
  );
}
