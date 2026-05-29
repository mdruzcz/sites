import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Services | Retaining Wall Installation, Repair & All Wall Types",
  description: "Explore all London Retaining Walls services — retaining wall installation, concrete walls, block walls, wood and timber walls, and retaining wall repair in London and Southwestern Ontario.",
  openGraph: { title: "Services | London Retaining Walls", url: `${site.url}/services` },
};

const services = [
  {
    name: "Retaining Wall Installation",
    href: "/retaining-wall-installation",
    icon: "🏗️",
    desc: "Complete retaining wall installation from site assessment and design through to construction and drainage. We handle all wall types and project sizes.",
  },
  {
    name: "Concrete Retaining Walls",
    href: "/concrete-retaining-walls",
    icon: "🧱",
    desc: "Poured concrete and precast concrete panel walls. The most durable retaining wall option — ideal for taller walls, heavy loads, and commercial applications.",
  },
  {
    name: "Block Retaining Walls",
    href: "/block-retaining-walls",
    icon: "⬛",
    desc: "Permacon, Allan Block and similar interlocking block systems. Versatile, attractive, and Ontario Building Code compliant for residential and commercial use.",
  },
  {
    name: "Wood & Timber Retaining Walls",
    href: "/wood-and-timber-retaining-walls",
    icon: "🪵",
    desc: "Pressure-treated lumber and hardwood timber retaining walls. Natural look that blends beautifully with landscaping — perfect for garden terraces and sloped yards.",
  },
  {
    name: "Retaining Wall Repair",
    href: "/retaining-wall-repair",
    icon: "🔧",
    desc: "Bowing walls, drainage failures, cracking and settlement. We diagnose the root cause and provide a permanent fix — not just a temporary patch.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }])) }} />

      <PageHero
        title="Our Services"
        subtitle="From a simple garden terrace to a large commercial retaining system — we offer a complete range of professional retaining wall services across London and Southwestern Ontario."
        center
      />

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="card p-8 group hover:border-[var(--accent)] border-2 border-transparent transition-colors flex gap-5 items-start">
                <div className="text-4xl flex-shrink-0">{s.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-2">{s.name}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center text-[var(--accent)] text-sm font-semibold gap-1">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm text-center border-2 border-[var(--accent)]">
            <h2 className="text-2xl font-bold text-[var(--dark)] mb-3">Not Sure Which Wall Type You Need?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">Every site is different. The right wall depends on your soil conditions, the height of the grade change, drainage requirements and aesthetic goals. Contact us for a free site assessment and recommendation.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact-us" className="btn btn-accent">Get a Free Assessment</Link>
              <a href={site.phoneHref} className="btn btn-dark">Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
