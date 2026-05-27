import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Blog | Deck & Fence Restoration Tips",
  description: "Deck and fence restoration tips, guides and advice from the experts at Restore My Deck in Kitchener-Waterloo.",
  openGraph: { title: "Blog | Restore My Deck", url: `${site.url}/blog` },
};

const posts = [
  { title: "How to Save Money – Restore, Don't Replace!", slug: "/how-to-save-money-restore-dont-replace", excerpt: "Replacing a deck costs thousands of dollars. A professional restoration can bring your old deck back to life for a fraction of the price.", date: "January 2024" },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Blog</h1>
          <p className="mt-4 text-gray-400">Tips and insights from our deck and fence restoration experts.</p>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={post.slug} className="card p-6 flex flex-col sm:flex-row gap-4 group">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                  <h2 className="text-xl font-bold text-[var(--dark)] group-hover:text-[var(--accent)] transition-colors mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center text-[var(--accent)] text-sm font-semibold gap-1">Read more →</span>
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
