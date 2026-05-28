import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/blog` },
  title: "Blog | Master Decker | Outdoor Living Tips",
  description:
    "Tips, guides, and articles on decks, fences, concrete, staining, and outdoor living from Master Decker — London Ontario's outdoor experts.",
};

const posts = [
  { slug: "how-to-seal-your-concrete-driveway", title: "How to Seal Your Concrete Driveway", excerpt: "A step-by-step guide to extending the life of your concrete driveway with the right sealer at the right time." },
  { slug: "why-concrete-driveways-are-a-popular-option", title: "Why Concrete Driveways are a Popular Option", excerpt: "Why homeowners across Southwestern Ontario keep choosing concrete over asphalt and pavers." },
  { slug: "comparing-oil-based-vs-water-based-deck-stains-which-one-should-you-select", title: "Oil-Based vs Water-Based Deck Stains", excerpt: "Pros and cons of each stain type and how to pick the right one for your deck and climate." },
  { slug: "pouring-a-concrete-shed-pad", title: "Pouring a Concrete Shed Pad", excerpt: "What goes into pouring a properly sized, properly reinforced concrete pad for a backyard shed." },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--accent-dark)] text-white">
          <div className="container section text-center">
            <p className="eyebrow text-[var(--accent-light)] mb-3">Resources</p>
            <h1 className="h-display text-4xl md:text-5xl mb-5">Master Decker Blog</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Practical advice on decks, fences, concrete, and everything in between — from the team that builds them.
            </p>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container max-w-4xl">
            <div className="space-y-6">
              {posts.map((p) => (
                <article key={p.slug} className="bg-[var(--surface)] border border-[var(--border)] rounded p-7 hover:border-[var(--accent)] hover:shadow-md transition-all">
                  <h2 className="font-bold text-2xl mb-3"><Link href={`/blog/${p.slug}`} className="hover:text-[var(--accent)]">{p.title}</Link></h2>
                  <p className="text-[var(--ink-soft)] leading-relaxed mb-3">{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}`} className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] hover:text-[var(--accent-dark)]">Read More →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
