import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "About Us | 8+ Years of Retaining Wall Experience in London, ON",
  description: "Learn about London Retaining Walls — founded by Kyle with 8+ years building concrete, block and wood retaining walls across London and Southwestern Ontario. Ontario Building Code compliant.",
  openGraph: { title: "About Us | London Retaining Walls", description: "8+ years of retaining wall expertise in London and Southwestern Ontario. All wall types, Ontario Building Code compliant.", url: `${site.url}/about-us` },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About Us", href: "/about-us" }])) }} />

      <PageHero
        eyebrow="Our Story"
        title="About London Retaining Walls"
        subtitle="8+ years of building retaining walls that last — concrete, block and wood, across London and Southwestern Ontario."
        center
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200">
            <Image src="/images/about-kyle.jpg" alt="Kyle, owner of London Retaining Walls, on a job site in London, Ontario" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--dark)] font-[family-name:var(--font-poppins)]">Built on Experience and Doing It Right</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Kyle started London Retaining Walls after years of hands-on experience in landscaping and construction across Southwestern Ontario. He saw too many retaining walls fail prematurely — bowing, cracking, or completely collapsing — because contractors cut corners on drainage, footings, or material selection.</p>
            <p className="mt-4 text-gray-600 leading-relaxed">That experience gave Kyle a clear mission: build retaining walls the right way, every time. Every project starts with a proper site assessment, the right material recommendation for your soil and load conditions, and drainage engineered to last for decades — not just a few seasons.</p>
            <p className="mt-4 text-gray-600 leading-relaxed">Today, London Retaining Walls serves homeowners and commercial clients across London, Woodstock, Brantford, St. Thomas and all surrounding communities, building everything from small garden terrace walls to large-scale commercial retaining systems.</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { stat: "8+", label: "Years Experience" },
                { stat: "3", label: "Wall Types" },
                { stat: "100%", label: "Code Compliant" },
                { stat: "Free", label: "No-Obligation Quotes" },
              ].map((s) => (
                <div key={s.label} className="bg-amber-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-[var(--accent)]">{s.stat}</div>
                  <div className="text-sm text-gray-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <Link href="/contact-us" className="btn btn-accent mt-8">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-[var(--dark)] font-[family-name:var(--font-poppins)] mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🏗️", title: "Expert Construction", desc: "Every wall is built with proper footings, compacted base material, and drainage solutions that prevent the most common causes of retaining wall failure." },
              { icon: "✅", title: "Code Compliance", desc: "We know Ontario Building Code inside and out. We handle permit requirements and ensure every wall is built to meet or exceed code requirements." },
              { icon: "🤝", title: "Honest Pricing", desc: "No hidden fees, no surprises. You get a detailed written quote before any work begins. What we quote is what you pay." },
            ].map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-bold text-[var(--dark)] mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Ready to Build Your Retaining Wall?" />
    </>
  );
}
