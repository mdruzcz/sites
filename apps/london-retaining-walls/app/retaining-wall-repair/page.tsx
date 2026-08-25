import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import gallery from "@/content/gallery.json";

const projectPhotos = gallery.filter((p) => p.material === "poured-concrete").slice(3, 6);

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Retaining Wall Repair in London, Ontario | Bowing, Cracking & Drainage",
  description: "Professional retaining wall repair in London and Southwestern Ontario. Bowing walls, drainage failures, cracking, settlement. Free assessment. Permanent fixes from Kyle's team.",
  openGraph: { title: "Retaining Wall Repair | London Retaining Walls", url: `${site.url}/retaining-wall-repair` },
};

const faqs = [
  { q: "How do I know if my retaining wall needs repair?", a: "Warning signs include: visible bowing or leaning outward, cracks running horizontally (most serious) or at 45-degree angles, water pooling behind or at the base of the wall, soil erosion at the wall base, blocks or sections that have shifted or separated, and drainage outlets that are blocked or missing." },
  { q: "Can a leaning retaining wall be fixed without full replacement?", a: "Sometimes, yes. A slightly leaning wall may be repairable with drainage improvements and limited reconstruction. However, a significantly bowed wall — especially a concrete or block wall that has moved more than 2 inches out of plumb — often requires partial or full reconstruction to be safe." },
  { q: "What causes retaining walls to bow or lean?", a: "The most common cause is hydrostatic pressure — water building up in the soil behind the wall with nowhere to drain. Other causes include wall height that exceeds the design capacity, inadequate base preparation, surcharge loads (like vehicles or heavy structures above the wall), and frost heave." },
  { q: "How much does retaining wall repair cost?", a: "Repair costs vary widely depending on the problem, wall type, and extent of damage. Minor drainage fixes may cost $500–$2,000. Partial reconstruction or major repairs can range from $3,000–$15,000+. We provide free assessments and detailed written quotes before any work begins." },
];

export default function RetainingWallRepairPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Retaining Wall Repair", "Professional retaining wall repair in London and Southwestern Ontario. Bowing, cracking, drainage failures and settlement.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Retaining Wall Repair", href: "/retaining-wall-repair" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />

      <PageHero
        eyebrow="Our Services"
        title="Retaining Wall Repair"
        subtitle="Bowing walls, drainage failures, cracking, and settlement — we diagnose the root cause and provide a permanent fix. Serving London and all of Southwestern Ontario."
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Assessment</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-xl overflow-hidden h-72 w-full">
              <Image src="/images/service-repair-wall.jpg" alt="Retaining wall repair and restoration service in London, Ontario" fill className="object-cover" sizes="(max-width:1024px) 100vw, 66vw" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Warning Signs Your Retaining Wall Needs Repair</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { sign: "Bowing or Leaning", severity: "High", desc: "Wall is noticeably moving outward from plumb — act immediately." },
                  { sign: "Horizontal Cracks", severity: "High", desc: "Horizontal cracks indicate lateral pressure exceeding wall capacity." },
                  { sign: "Drainage Failure", severity: "High", desc: "Water pooling behind wall or drains blocked — root cause of most failures." },
                  { sign: "Diagonal Cracks", severity: "Medium", desc: "Settlement or differential movement — needs assessment." },
                  { sign: "Block Separation", severity: "Medium", desc: "Blocks or sections pulling apart or shifting out of alignment." },
                  { sign: "Soil Erosion", severity: "Medium", desc: "Soil washing out from behind or below the wall base." },
                  { sign: "Efflorescence", severity: "Low", desc: "White mineral deposits on concrete/block — water infiltration present." },
                  { sign: "Vertical Cracks", severity: "Low", desc: "Usually due to settling — monitor for growth." },
                ].map((item) => (
                  <div key={item.sign} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[var(--dark)] text-sm">{item.sign}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.severity === "High" ? "bg-red-100 text-red-600" : item.severity === "Medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-4">Our Repair Process</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Free Site Assessment", desc: "Kyle visits your property to assess the wall, identify the root cause of the problem, and determine whether repair or replacement is the right course of action. We never recommend replacement when repair will do the job." },
                  { step: "2", title: "Written Quote", desc: "We provide a detailed written quote covering the scope of work, materials, and cost. No surprise charges." },
                  { step: "3", title: "Address Root Cause", desc: "Before repairing any visible damage, we fix the underlying problem — usually drainage. A wall repaired without fixing the drainage will fail again." },
                  { step: "4", title: "Structural Repair", desc: "Depending on the damage, this may include partial dismantling and rebuilding, installing tiebacks, adding geogrid reinforcement, or replacing damaged blocks, timbers, or concrete sections." },
                  { step: "5", title: "Drainage Upgrade", desc: "We install or improve weeping tile, gravel backfill, and drainage outlets to prevent future water pressure buildup." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold flex-shrink-0">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-[var(--dark)] mb-1">{s.title}</h3>
                      <p className="text-gray-600 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--dark)] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[var(--dark)] mb-2">{f.q}</h3>
                    <p className="text-gray-600 text-sm">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="bg-[var(--accent)] -mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-6">
                <h3 className="text-lg font-bold text-white text-center">Free Repair Assessment</h3>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--dark)] uppercase tracking-wide text-center mb-3 font-[family-name:var(--font-poppins)]">
            Recent Retaining Wall Repair Projects
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            Rebuilt and re-drained concrete retaining walls we&apos;ve restored across London and Southwestern Ontario.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projectPhotos.map((p) => (
              <div key={p.image} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-100">
                <Image
                  src={p.image}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  placeholder="blur"
                  blurDataURL={p.blurDataURL}
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      <CtaBand title="Get Your Retaining Wall Assessed — Free" />
    </>
  );
}
