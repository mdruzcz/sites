import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { getBlogPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Wedding Lighting Tips & Guides",
  description:
    "Expert tips on wedding lighting, venue selection, and how to make your event unforgettable. From the team at Bright Event Lighting, London, ON.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Bright Event Lighting",
    description: "Wedding lighting tips, venue guides, and expert advice.",
    url: `${site.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Blog", url: `${site.url}/blog` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            as="h1"
            eyebrow="Learning Center"
            headline="Wedding Lighting Tips & Guides"
            description="Expert advice to help you make the most of your event lighting."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card overflow-hidden group hover:border-[var(--accent)]/40 transition-colors"
              >
                <div className="aspect-[16/9] bg-[var(--surface)] shimmer relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--muted)]/60 text-xs px-4 text-center">
                    {post.alt}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-[var(--muted)]/60 mb-2">{post.date}</p>
                  <h2 className="font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
