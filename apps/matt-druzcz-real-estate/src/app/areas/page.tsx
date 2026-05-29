import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas — London, Aylmer, St. Thomas & Woodstock, Ontario",
  description:
    "Matt Druzcz serves buyers, sellers, and investors across London, Aylmer, St. Thomas, Woodstock, and Belmont, Ontario. Local market expertise you can count on.",
  openGraph: {
    title: "Service Areas — Matt Druzcz, Realtor",
    description:
      "Serving SW Ontario: London, Aylmer, St. Thomas, Woodstock & Belmont. Local real estate expertise in every community.",
  },
};

const areas = [
  {
    city: "London, ON",
    slug: "london-ontario",
    nickname: "The Forest City",
    description:
      "Ontario's seventh-largest city offers diverse neighbourhoods from established Old South to developing east end — with a deep rental market driven by university and hospital workers.",
    highlights: ["Strong resale values", "Deep rental demand", "Top-rated schools", "Growing tech sector"],
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=70",
  },
  {
    city: "Aylmer, ON",
    slug: "aylmer-ontario",
    nickname: "Elgin County's Gem",
    description:
      "A charming small town with deep community roots, Aylmer is attracting buyers priced out of larger cities while retaining the character that keeps families here for generations.",
    highlights: ["Affordable entry points", "Strong community ties", "Growing demand", "Family-friendly streets"],
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=70",
  },
  {
    city: "St. Thomas, ON",
    slug: "st-thomas-ontario",
    nickname: "The Railway City",
    description:
      "With the Volkswagen EV plant incoming and home prices still accessible, St. Thomas is one of Southwestern Ontario's most exciting markets right now.",
    highlights: ["Volkswagen EV plant incoming", "Rapid appreciation", "Highway 401 access", "Affordable vs. London"],
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop&q=70",
  },
  {
    city: "Woodstock, ON",
    slug: "woodstock-ontario",
    nickname: "The Friendly City",
    description:
      "Oxford County's commercial hub — solid value, strong rental demand, and great highway access make Woodstock a smart choice for both families and investors.",
    highlights: ["Strong rental demand", "Highway 401 access", "Growing population", "Good cap rates"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=70",
  },
  {
    city: "Belmont, ON",
    slug: "belmont-ontario",
    nickname: "Elgin County Village",
    description:
      "Home to Matt and his family, Belmont offers the slower pace, space, and community feel that many buyers from larger cities are actively seeking.",
    highlights: ["Where Matt lives", "Slower pace & more space", "Strong sense of community", "Elgin County charm"],
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&auto=format&fit=crop&q=70",
  },
];

export default function AreasPage() {
  return (
    <>
      <section className="pt-36 pb-20 relative" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 50% 50%, var(--gold) 0%, transparent 60%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--gold)" }}>Service Areas</p>
          <h1 className="font-serif text-5xl font-bold leading-tight mb-6" style={{ color: "var(--cream)" }}>
            Local Knowledge.{" "}
            <span style={{ color: "var(--gold)" }}>Real Results.</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--cream-muted)" }}>
            Matt serves buyers, sellers, and investors across Southwestern Ontario — from London&apos;s established
            neighbourhoods to the growing communities surrounding it.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--navy-mid)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map(a => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="rounded-2xl overflow-hidden transition-all hover:scale-[1.02] block"
                style={{ border: "1px solid var(--navy-border)" }}
              >
                <div
                  className="h-44 relative"
                  style={{
                    background: `linear-gradient(to bottom, rgba(10,15,30,0.3) 0%, rgba(10,15,30,0.7) 100%), url('${a.img}') center/cover`,
                  }}
                >
                  <div className="absolute bottom-4 left-4">
                    <div className="font-serif text-xl font-bold" style={{ color: "var(--cream)" }}>{a.city}</div>
                    <div className="text-xs" style={{ color: "var(--gold-light)" }}>{a.nickname}</div>
                  </div>
                </div>
                <div className="p-6" style={{ background: "var(--navy-card)" }}>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--cream-muted)" }}>{a.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {a.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs" style={{ color: "var(--cream-muted)" }}>
                        <span style={{ color: "var(--gold)" }}>✦</span> {h}
                      </li>
                    ))}
                  </ul>
                  <span className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
                    View {a.city} market →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--navy)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4" style={{ color: "var(--cream)" }}>
            Serving another area?
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--cream-muted)" }}>
            Matt works across Southwestern Ontario. If your community isn&apos;t listed, reach out — he likely
            covers it or can connect you with the right professional.
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gold)", color: "#0A0F1E" }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
