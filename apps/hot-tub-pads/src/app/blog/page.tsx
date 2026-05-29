import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { blogPosts, site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hot Tub Pad Blog",
  description:
    "Expert advice on hot tub pad installation, maintenance, and planning. Concrete vs. gravel comparisons, common mistakes to avoid, and homeowner checklists from HotTubPads.ca.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Hot Tub Pad Blog — Ideas, Tips & How-Tos",
    description:
      "Expert advice on hot tub pad installation, maintenance, and planning from Ontario's trusted pad installers.",
    url: `${site.url}/blog`,
    images: [
      {
        url: "/images/concrete-pad.webp",
        width: 1200,
        height: 630,
        alt: "Hot Tub Pads blog — installation tips and expert advice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Tub Pad Blog — Ideas, Tips & How-Tos",
    description:
      "Expert advice on hot tub pad installation from Ontario's trusted pad installers.",
    images: ["/images/concrete-pad.webp"],
  },
};

/* ─── Page Component ─── */

export default function BlogPage() {
  return (
    <>
      <NavBar />

      {/* ═══════════════ Page Hero ═══════════════ */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <h1 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Blog
          </h1>
          <p className="text-lg text-white/70">
            Ideas, Tips &amp; How-Tos for Hot Tub Pad Owners
          </p>
        </div>
      </section>

      {/* ═══════════════ Blog Grid ═══════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Thumbnail */}
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-navy">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-orange"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-4 line-clamp-3 text-slate-muted">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange transition-colors hover:text-orange/80"
                  >
                    Read More
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
