import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog | Permanent Lighting Tips & Advice — Celebrate Lighting",
  description:
    "Expert tips, seasonal inspiration, and the latest trends in permanent outdoor LED lighting for Ontario homeowners. Learn from Celebrate Lighting's team.",
  openGraph: {
    title: "Blog | Permanent Lighting Tips & Advice — Celebrate Lighting",
    description: "Expert tips on permanent outdoor LED lighting for Ontario homes.",
    url: "https://celebratelighting.ca/blog",
  },
};

const posts = [
  {
    slug: "7-helpful-tips-choosing-permanent-outdoor-lighting",
    title: "7 Helpful Tips for Choosing the Best Permanent Outdoor Lighting for Your Home in Ontario",
    excerpt: "When it comes to transforming your home's exterior, few upgrades make as much of an impact as permanent outdoor lighting. Whether you live in Kitchener, Cambridge, or Woodstock, choosing the right LED lighting system ensures your home looks stunning year-round.",
    image: "/images/project-brantford.jpg",
    date: "2025-09-15",
    category: "Helpful Tips",
  },
  {
    slug: "recommended-lighting-supplier-ontario",
    title: "Recommended Lighting Supplier in Ontario",
    excerpt: "When it comes to permanent outdoor lighting in Ontario, homeowners want products that are durable, energy-efficient, and stylish enough to enhance their home all year long. The truth is, the quality of your lighting system is just as important as the installation itself.",
    image: "/images/blog-supplier.jpg",
    date: "2025-09-20",
    category: "Recommendations",
  },
  {
    slug: "how-to-use-permanent-lighting-year-round",
    title: "How to Use Your Permanent Lighting System Year-Round in Ontario",
    excerpt: "One of the biggest advantages of a permanent LED lighting system is the ability to customize it for every season and occasion. Here's how Ontario homeowners get the most from their systems throughout the year.",
    image: "/images/gallery-1.jpg",
    date: "2025-10-01",
    category: "Helpful Tips",
  },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Blog", url: `${site.url}/blog` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </nav>

          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Lighting Knowledge</p>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">Expert Lighting Tips & Advice</h1>
            <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
              Discover seasonal inspiration, product recommendations, and expert tips for permanent outdoor LED lighting in Ontario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={`${post.title} — Celebrate Lighting blog`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{post.category}</span>
                    <span className="text-xs text-[var(--muted)]">{new Date(post.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h2 className="font-bold text-[var(--foreground)] mb-3 leading-snug group-hover:text-[var(--accent)] transition-colors">{post.title}</h2>
                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
