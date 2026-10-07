import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import posts from "@/content/blog-posts.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/blog` },
  title: "Blog | Master Decker | Outdoor Living Tips for Ontario",
  description:
    "Practical guides on decks, fences, concrete, staining, and outdoor living from Master Decker — London Ontario's outdoor experts. Real advice from the crew that builds it.",
};

type Post = { title: string; excerpt: string; readMins: number; hero: string };
const entries = Object.entries(posts as Record<string, Post>);

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="Resources"
          title="Master Decker Blog"
          subtitle="Practical advice on decks, fences, concrete, and everything in between — from the team that builds them."
          background="/images/wp-stamped-concrete-2.jpg"
          align="center"
        />

        <section className="section bg-white">
          <div className="container max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[var(--ink-soft)] leading-relaxed">
                We&apos;ve spent more than a decade building, staining, and pouring across Southwestern Ontario, and we put what we&apos;ve learned into plain-language guides homeowners can actually use. No fluff — just the practical detail that helps you make a smart decision about your deck, fence, driveway, or patio in our climate.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {entries.map(([slug, p]) => (
                <article key={slug} className="group bg-white border border-[var(--border)] overflow-hidden hover:border-[var(--accent)] hover:shadow-md transition-all">
                  <Link href={`/blog/${slug}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={p.hero} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-2">{p.readMins} min read</p>
                      <h2 className="font-bold text-xl mb-2 leading-snug group-hover:text-[var(--accent)] transition-colors">{p.title}</h2>
                      <p className="text-[var(--ink-soft)] text-sm leading-relaxed mb-3">{p.excerpt}</p>
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Read More →</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/wp-backyard-deck.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Have a project in mind?</h2>
            <p className="text-white/85 mb-8 text-lg">Reading is great — but a free written quote is better. Tell us what you&apos;re planning.</p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
