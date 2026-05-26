import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Deck Staining Blog | Tips, Guides & Ontario Advice",
  description: "Expert advice on deck staining, sealing, and restoration in Toronto and Ontario — timing, products, cost comparisons, and maintenance guides.",
  openGraph: { title: "Deck Staining Blog — Toronto Deck Stainers", description: "Tips and guides on deck staining and restoration for Toronto and Ontario homeowners.", url: `${site.url}/blog` },
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Resources</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-5 max-w-3xl">
            Deck Staining Tips &amp; Guides
          </h1>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            Expert advice from our team — Ontario-specific tips on deck staining, sealing,
            product selection, and protecting your outdoor wood investment.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card group overflow-hidden hover:-translate-y-1 transition-transform">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-[var(--concrete)]">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-[var(--charcoal)] text-lg leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--concrete)] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-[var(--accent)] text-sm font-bold">Read more →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
