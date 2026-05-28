import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "How Long Do Retaining Walls Last? (By Material) | London Retaining Walls",
  description: "How long do concrete, block and wood retaining walls last? We break down expected lifespans by material and the factors that most affect longevity in Ontario's climate.",
  openGraph: { title: "How Long Do Retaining Walls Last?", url: `${site.url}/how-long-do-retaining-walls-last` },
};

export default function HowLongLastPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "How Long Do Retaining Walls Last?", href: "/how-long-do-retaining-walls-last" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="How Long Do Retaining Walls Last? (By Material)"
        subtitle="May 2024 · By London Retaining Walls"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>One of the most common questions we get from homeowners planning a retaining wall is: &quot;How long will it last?&quot; The answer varies significantly depending on the material, construction quality, drainage design, and site conditions. Here&apos;s what you can realistically expect from each wall type.</p>

          <h2>Concrete Retaining Wall Lifespan: 50–100 Years</h2>
          <p>A properly built concrete retaining wall — whether poured in place or precast — is the most durable option available. With proper drainage and good quality concrete, these walls routinely last 50–100 years with minimal maintenance. Many concrete retaining walls from the mid-20th century are still in service today.</p>
          <p>The main threats to concrete wall longevity are:</p>
          <ul>
            <li><strong>Inadequate drainage:</strong> Water pressure behind the wall is the primary cause of concrete wall failure. Proper weeping tile and drainage outlets are essential.</li>
            <li><strong>Insufficient reinforcement:</strong> Walls without adequate rebar for the load they&apos;re retaining can crack under pressure.</li>
            <li><strong>Poor concrete mix:</strong> Low-quality concrete with inadequate air entrainment will suffer spalling from freeze-thaw cycling in Ontario&apos;s climate.</li>
          </ul>

          <h2>Interlocking Block Retaining Wall Lifespan: 40–50 Years</h2>
          <p>Quality interlocking concrete block systems like Permacon and Allan Block are designed and tested for retaining wall applications. A properly installed block wall with good drainage and base preparation will typically last 40–50 years, and some well-maintained walls last longer.</p>
          <p>Factors that shorten block wall lifespan:</p>
          <ul>
            <li><strong>Inadequate base preparation:</strong> A poorly compacted base leads to settlement and block shifting. This is the most common installation shortcut that leads to premature failure.</li>
            <li><strong>Missing geogrid:</strong> Taller block walls require geogrid reinforcement to distribute load and prevent the face from rotating outward. Without it, tall block walls are prone to failure.</li>
            <li><strong>Blocked drainage:</strong> As with all wall types, poor drainage is the enemy of longevity.</li>
          </ul>

          <h2>Wood Retaining Wall Lifespan: 20–40 Years</h2>
          <p>Wood retaining walls have a significantly shorter lifespan than concrete or block, but &quot;20–40 years&quot; represents a wide range that reflects the importance of construction quality and maintenance.</p>
          <ul>
            <li><strong>Pressure-treated lumber (CA-B rated):</strong> 20–30 years with moderate maintenance</li>
            <li><strong>Hardwood timber (oak, black locust):</strong> 25–40 years in good conditions</li>
          </ul>
          <p>The factors that most affect wood wall longevity:</p>
          <ul>
            <li><strong>Drainage:</strong> As with all walls, water is the enemy. A wood wall with poor drainage may fail in 10–15 years rather than 30.</li>
            <li><strong>Maintenance:</strong> Regular staining and sealing every 2–4 years significantly extends wood wall life. A well-maintained wood wall consistently outlasts a neglected one by 10–15 years.</li>
            <li><strong>Wood grade:</strong> Using proper ground-contact rated pressure-treated lumber (CA-B or better) is essential — using lesser grades or untreated wood dramatically shortens lifespan.</li>
            <li><strong>Post depth:</strong> Wood posts must be buried deep enough to resist the lateral pressure of the retained soil. Insufficient post depth is a common installation shortcut that leads to rapid failure.</li>
          </ul>

          <h2>What Matters More Than Material: Construction Quality</h2>
          <p>Here&apos;s the honest truth: a poorly built concrete wall can fail in 10 years, while a well-built wood wall can last 40. Construction quality — particularly drainage design and base preparation — matters at least as much as material choice.</p>
          <p>The three most important construction factors affecting retaining wall lifespan are:</p>
          <ol>
            <li><strong>Drainage:</strong> Proper weeping tile, gravel backfill, and drainage outlets prevent hydrostatic pressure — the #1 cause of wall failure.</li>
            <li><strong>Base preparation:</strong> Adequate excavation depth, proper compaction, and correct base material prevent settlement and movement.</li>
            <li><strong>Correct sizing for the load:</strong> A wall that is undersized for the height of soil it&apos;s retaining, or the loads above it, will fail regardless of material quality.</li>
          </ol>

          <h2>Signs Your Retaining Wall Is Failing</h2>
          <p>Regardless of material or age, watch for these warning signs:</p>
          <ul>
            <li>Visible bowing or leaning outward</li>
            <li>Horizontal cracks (most serious — indicates lateral pressure exceeding wall capacity)</li>
            <li>Soil erosion behind or at the base of the wall</li>
            <li>Drainage outlets that were working and have stopped</li>
            <li>Multiple blocks or sections that have shifted</li>
          </ul>

          <p>If you&apos;re seeing these signs, don&apos;t wait. <Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact us for a free assessment</Link> — the sooner a wall problem is addressed, the less expensive the fix.</p>
        </div>
      </article>

      <CtaBand title="Questions About Your Retaining Wall?" />
    </>
  );
}
