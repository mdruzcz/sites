import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import satellites from "@/content/satellites.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/our-network` },
  title: "Our Network of Home Service Brands | Master Decker",
  description: "Browse our network of specialized home service brands across Ontario — decks, concrete, fencing, lighting, HVAC, cabinets, and more.",
  openGraph: {
    title: "Our Network | Master Decker",
    description: "Specialized home service brands across Ontario.",
    url: `${site.url}/our-network`,
  },
};

const categories = [...new Set(satellites.map((s) => s.category))];

const categoryDescriptions: Record<string, string> = {
  "Decks & Outdoor Living": "Deck builders, staining pros, and fence specialists serving communities across Ontario.",
  "Concrete": "Concrete contractors specializing in driveways, patios, foundations, and sealing across Southwestern Ontario.",
  "Lighting": "Outdoor LED lighting specialists — from permanent holiday lighting to architectural installations.",
  "Specialty Services": "Specialized contractors serving niche needs: HVAC, hot tub pads, and accessibility ramps.",
  "Home Products": "Quality kitchen and cabinet suppliers with fast delivery across Southern Ontario.",
  "Recognition": "Programs that recognize and connect homeowners with Ontario's best service contractors.",
};

export default function OurNetworkPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--surface)] section">
          <div className="container">
            <p className="eyebrow mb-2">Our Network</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">A Network of Specialists</h1>
            <p className="text-lg text-[var(--ink)]/70 max-w-2xl">
              Master Decker is the founding brand in a growing network of specialized home service companies across Ontario. Each brand is focused on a specific trade, region, or service — delivering expert results where generalists fall short.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a key={cat} href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="text-xs font-semibold bg-white border border-[var(--border)] text-[var(--accent)] rounded-full px-3 py-1.5 hover:bg-[var(--accent)] hover:text-white transition-colors">
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container space-y-16">
            {categories.map((cat) => (
              <div key={cat} id={cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{cat}</h2>
                  <p className="text-[var(--ink)]/60 text-sm">{categoryDescriptions[cat]}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {satellites.filter((s) => s.category === cat).map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] hover:shadow-md transition-all flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors leading-tight">{s.name}</h3>
                        <svg className="w-4 h-4 text-[var(--border)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-sm text-[var(--ink)]/65 leading-relaxed flex-1">{s.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--border)]">
                        <span className="text-xs text-[var(--ink)]/40">{s.region}</span>
                        <span className="text-xs text-[var(--accent)] font-medium">{s.domain}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
