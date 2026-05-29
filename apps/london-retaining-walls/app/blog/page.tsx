import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Helpful Tips | Retaining Wall Advice for Ontario Homeowners",
  description: "Expert retaining wall tips, guides and advice from Kyle at London Retaining Walls. Learn about wall types, costs, maintenance and building code requirements in Ontario.",
  openGraph: { title: "Helpful Tips | London Retaining Walls", url: `${site.url}/blog` },
};

const posts = [
  {
    title: "Tips on How to Stain Your Wooden Retaining Wall",
    slug: "/tips-on-how-to-stain-your-wooden-retaining-wall",
    excerpt: "A properly stained and sealed wood retaining wall can last significantly longer than an untreated one. Learn the step-by-step process for staining and protecting your wood wall.",
    date: "January 2024",
  },
  {
    title: "Concrete vs. Block vs. Wood: How to Choose the Right Retaining Wall Material",
    slug: "/how-to-choose-retaining-wall-material",
    excerpt: "Not sure which retaining wall material is right for your property? We break down the pros, cons, costs and best applications for each material type.",
    date: "February 2024",
  },
  {
    title: "Retaining Wall Cost Guide for Ontario Homeowners",
    slug: "/retaining-wall-cost-guide-ontario",
    excerpt: "What does a retaining wall cost in Ontario? We break down costs by wall type, height, and length — plus factors that affect the final price.",
    date: "March 2024",
  },
  {
    title: "How to Maintain Your Retaining Wall and Make It Last Longer",
    slug: "/retaining-wall-maintenance-tips",
    excerpt: "A well-maintained retaining wall lasts decades longer than a neglected one. Learn the simple maintenance steps that protect your investment.",
    date: "April 2024",
  },
  {
    title: "How Long Do Retaining Walls Last? (By Material)",
    slug: "/how-long-do-retaining-walls-last",
    excerpt: "Concrete, block and wood walls all have different expected lifespans. Learn what affects longevity and how to maximize the life of your retaining wall.",
    date: "May 2024",
  },
];

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }])) }} />

      <PageHero
        title="Helpful Tips"
        subtitle="Expert retaining wall advice from Kyle and the London Retaining Walls team."
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
