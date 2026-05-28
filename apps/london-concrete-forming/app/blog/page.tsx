import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the London Concrete Forming blog for tips, guides, and insights on concrete driveways, patios, stamped concrete, and more in London, Ontario.",
  openGraph: { title: "Blog", description: "Concrete tips, guides, and insights from London Concrete Forming." },
};

const posts = [
  {
    href: "/blog/advantages-of-a-concrete-driveway",
    title: "Advantages of a Concrete Driveway",
    excerpt: "Discover why concrete driveways are a superior choice over asphalt or gravel for London homeowners. Learn about durability, maintenance costs, and curb appeal.",
    date: "March 1, 2025",
    readTime: "5 min read",
  },
  {
    href: "/blog/stamped-concrete-driveways-cost",
    title: "Stamped Concrete Driveways Cost Guide",
    excerpt: "How much does a stamped concrete driveway cost in London, Ontario? We break down pricing by size, pattern complexity, and colour options.",
    date: "April 1, 2025",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-[#1a2332] py-16">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Concrete Tips & Guides</h1>
          <p className="text-slate-300 text-lg">Expert insights from London Concrete Forming</p>
        </div>
      </section>

      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.href} href={post.href} className="card overflow-hidden hover:shadow-md transition-shadow group">
                <div className="p-6">
                  <div className="flex gap-3 text-xs text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#1a2332] mb-3 group-hover:text-[#F7931E] transition-colors">{post.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-[#F7931E] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Ready to start your concrete project?</p>
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
