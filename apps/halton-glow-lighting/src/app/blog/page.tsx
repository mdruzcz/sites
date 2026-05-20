import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { CtaBand } from "@/components/CtaBand";
import { posts } from "@/content/blog";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Permanent Outdoor Lighting Blog | Halton Glow Lighting",
  description:
    "Buying guides, comparisons and tips for permanent outdoor LED lighting in Burlington and Oakville. From Govee comparisons to seasonal Christmas-light math.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndex() {
  return (
    <main>
      <NavBar />
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(31,40,73,0.6) 0%, rgba(5,8,22,1) 70%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Halton Glow Blog
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Permanent Outdoor Lighting,{" "}
            <span className="text-gradient-gold">Explained</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Buying guides, comparisons and honest answers from the team that
            installs permanent LED lighting across the Halton Region.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group block p-7 rounded-2xl border transition-all hover:translate-y-[-2px] hover:border-[var(--gold)]/40"
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3 text-xs mb-3">
                <span
                  className="px-2.5 py-1 rounded-full font-semibold"
                  style={{
                    backgroundColor: "rgba(245,194,107,0.12)",
                    color: "var(--gold-bright)",
                  }}
                >
                  {p.category}
                </span>
                <span className="text-white/40">{p.readMinutes} min read</span>
                <span className="text-white/40">·</span>
                <time className="text-white/40">
                  {new Date(p.publishedAt).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-[var(--gold-bright)] transition">
                {p.title}
              </h2>
              <p className="text-white/65 leading-relaxed">{p.excerpt}</p>
              <p className="mt-4 text-sm font-semibold" style={{ color: "var(--gold-bright)" }}>
                Read article →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
      <Footer />
      <CallNowFab />
    </main>
  );
}
