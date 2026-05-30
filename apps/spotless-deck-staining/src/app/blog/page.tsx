import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog";
import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck Staining Tips & Guides | Spotless Blog",
  description:
    "Expert deck and fence staining advice for Kitchener-Waterloo homeowners — how often to stain, stain vs. sealer vs. paint, prep tips and more from Spotless.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "Deck Staining Tips & Guides | Spotless Deck Staining",
    description:
      "Expert deck and fence staining advice for Kitchener-Waterloo homeowners from the Spotless Deck Staining team.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Spotless Deck Staining Blog",
  url: `${site.url}/blog`,
  publisher: { "@type": "LocalBusiness", "@id": `${site.url}/#business`, name: site.name },
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    url: `${site.url}/blog/${p.slug}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
  ],
};

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />

        <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 bg-[var(--greige)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
              Deck Care Guides
            </p>
            <h1 className="font-display text-4xl lg:text-6xl font-extrabold mb-5 leading-tight text-[var(--driftwood-dark)]">
              Deck Staining Tips &amp; Guides
            </h1>
            <p className="text-lg text-[var(--driftwood)]/80 leading-relaxed max-w-2xl mx-auto">
              Honest, practical advice on protecting and refinishing decks and
              fences in Kitchener, Waterloo, Cambridge and Guelph — from the
              Spotless Deck Staining crew.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-[var(--greige-soft)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--cream)] shadow-warm hover:shadow-warm-lg transition flex flex-col"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs text-[var(--driftwood)]/55 mb-2">
                      {post.dateDisplay} · {post.readMinutes} min read
                    </p>
                    <h2 className="font-display text-xl font-bold mb-3 leading-snug text-[var(--driftwood-dark)] group-hover:text-[var(--terracotta-deep)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[var(--driftwood)]/75 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--terracotta-deep)]">
                      Read the guide
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
