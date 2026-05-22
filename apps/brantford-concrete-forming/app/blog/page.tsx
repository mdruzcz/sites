import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Forming Blog — Tips & Advice for Brantford Homeowners",
  description:
    "Expert concrete tips, cost guides, and homeowner advice from Brantford Concrete Forming. Learn about driveways, patios, stamped concrete, and more.",
  openGraph: {
    title: "Concrete Blog | Brantford Concrete Forming",
    description: "Expert advice, cost guides, and tips for Brantford homeowners planning concrete projects.",
    images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: "Concrete forming blog for Brantford homeowners" }],
  },
  twitter: { card: "summary_large_image" },
};

const posts = [
  {
    slug: "how-long-does-concrete-take-to-cure",
    title: "How Long Does Concrete Take to Cure in Ontario?",
    excerpt: "Concrete curing is a science — and getting it right is critical for a long-lasting driveway or patio. Here's what Brantford homeowners need to know.",
    date: "2025-04-15",
    readTime: "5 min read",
    category: "Concrete Tips",
    image: "/images/man-working-on-smoothing-concrete-600nw-2413949341.png",
  },
  {
    slug: "concrete-vs-asphalt-driveway",
    title: "Concrete vs. Asphalt Driveways: Which is Better for Brantford?",
    excerpt: "Asphalt is cheaper upfront — but concrete lasts 2–3x longer and requires no yearly sealing. We break down the real cost comparison for Brantford homeowners.",
    date: "2025-03-22",
    readTime: "7 min read",
    category: "Buyer's Guide",
    image: "/images/Concrete-Driveway-Installation-1.png",
  },
  {
    slug: "stamped-concrete-cost-guide",
    title: "Stamped Concrete Cost Guide for Brantford Homeowners",
    excerpt: "How much does stamped concrete actually cost in Brantford? We break down pricing by finish type, size, and complexity — with real local numbers.",
    date: "2025-02-10",
    readTime: "6 min read",
    category: "Cost Guide",
    image: "/images/Stamped-Concrete-1.jpg",
  },
];

export default function BlogPage() {
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Blog", url: `${site.url}/blog` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Concrete Tips & Advice</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Expert insights, cost guides, and practical advice for Brantford homeowners planning concrete projects.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={`${post.title} — Brantford Concrete Forming blog`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#E8751A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</time>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-extrabold text-[#1a2332] text-lg mb-2 leading-tight group-hover:text-[#E8751A] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{post.excerpt}</p>
                  <span className="mt-4 text-[#E8751A] font-semibold text-sm flex items-center gap-1">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                  </span>
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
