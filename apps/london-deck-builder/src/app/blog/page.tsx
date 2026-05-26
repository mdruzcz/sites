import type { Metadata } from "next";
import Link from "next/link";
import { NavBar, Footer } from "../_components/sections";
import { POSTS } from "../../content/posts";

export const metadata: Metadata = {
  title: "Deck Building Guides & Resources",
  description:
    "Honest deck-building guides for Ontario homeowners — material comparisons, permit help, maintenance, design ideas and real cost data from 500+ builds.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "London Deck Builder Blog",
    description: "Practical deck building guides for Southwestern Ontario homeowners.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "London Deck Builder blog — deck-building guides for Ontario homeowners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export const revalidate = 3600;

export default function BlogIndex() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <main>
      <NavBar homeHref="/" />

      <section className="pt-32 pb-12" style={{ backgroundColor: "var(--wood-dark)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
            Guides &amp; Resources
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Deck-Building Guides for Ontario Homeowners
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Material comparisons, permit help, real cost data, maintenance schedules and small-yard design ideas — straight from 500+ builds across Southwestern Ontario.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block group rounded-2xl bg-white border overflow-hidden hover:shadow-lg transition-all"
                style={{ borderColor: "var(--cream-dark)" }}
              >
                <div
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.heroImage}')` }}
                  role="img"
                  aria-label={p.heroAlt}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--cream-dark)", color: "var(--terracotta)" }}>
                      {p.category}
                    </span>
                    <span className="text-xs" style={{ color: "var(--wood-light)" }}>
                      {p.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold mb-2 group-hover:underline" style={{ color: "var(--wood-dark)" }}
                    dangerouslySetInnerHTML={{ __html: p.title }} />
                  <p className="text-sm leading-relaxed" style={{ color: "var(--wood)" }}>
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
