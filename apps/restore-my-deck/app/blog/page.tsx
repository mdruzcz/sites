import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Helpful Tips | Deck & Fence Restoration Advice",
  description: "Expert deck and fence restoration tips, guides and advice from the professionals at Restore My Deck in Kitchener-Waterloo. Learn how to protect and extend the life of your outdoor wood.",
  openGraph: { title: "Helpful Tips | Restore My Deck", url: `${site.url}/blog` },
};

const posts = [
  {
    title: "How to Save Money – Restore, Don't Replace!",
    slug: "/how-to-save-money-restore-dont-replace",
    excerpt: "Replacing a deck costs thousands of dollars. A professional restoration can bring your old deck back to life for a fraction of the price.",
    date: "January 2024",
  },
  {
    title: "How to Prepare Your Deck for Staining: A Step-by-Step Guide",
    slug: "/how-to-prepare-your-deck-for-staining",
    excerpt: "Proper preparation is the most important factor in a long-lasting deck stain. Learn the exact steps professionals use before applying any finish.",
    date: "February 2024",
  },
  {
    title: "Oil-Based vs. Water-Based Deck Stain: Which Is Right for Your Deck?",
    slug: "/oil-based-vs-water-based-deck-stain",
    excerpt: "The stain you choose matters as much as how you apply it. We break down the key differences and explain why we recommend oil-based stains for Ontario decks.",
    date: "March 2024",
  },
  {
    title: "How Often Should You Restain Your Deck? A Practical Guide",
    slug: "/how-often-should-you-restain-your-deck",
    excerpt: "Ontario's climate is tough on wood. Learn the warning signs that tell you it's time to restain — before the damage goes deeper.",
    date: "April 2024",
  },
  {
    title: "5 Warning Signs Your Deck Needs Professional Restoration",
    slug: "/5-signs-your-deck-needs-restoration",
    excerpt: "Graying wood, peeling stain and soft boards are your deck's way of asking for help. Catch these signs early and avoid a costly rebuild.",
    date: "May 2024",
  },
  {
    title: "Pressure Washing vs. Soft Washing Your Deck: What's the Difference?",
    slug: "/pressure-washing-vs-soft-washing-deck",
    excerpt: "High pressure can damage wood fibres if used incorrectly. Learn the difference between pressure washing and soft washing — and when to use each.",
    date: "June 2024",
  },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }])) }} />

      <PageHero
        title="Helpful Tips"
        subtitle="Expert deck and fence restoration advice from the team at Restore My Deck."
        center
      />

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
