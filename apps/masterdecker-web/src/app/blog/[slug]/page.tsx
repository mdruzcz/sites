import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import posts from "@/content/blog-posts.json";
import services from "@/content/services.json";

export const revalidate = 3600;

type Post = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readMins: number;
  hero: string;
  related?: string;
  sections: { h: string; paras: string[] }[];
  takeaways: string[];
};

const allPosts = posts as Record<string, Post>;
const allServices = services.categories.flatMap((c) => c.services);

type Params = { slug: string };

export async function generateStaticParams() {
  return Object.keys(allPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts[slug];
  if (!post) return {};
  return {
    alternates: { canonical: `${site.url}/blog/${slug}` },
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url: `${site.url}/blog/${slug}`,
      images: [post.hero],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = allPosts[slug];
  if (!post) notFound();

  const relatedSvc = post.related ? allServices.find((s) => s.slug === post.related) : undefined;
  const otherPosts = Object.entries(allPosts).filter(([s]) => s !== slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${site.url}${post.hero}`,
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main>
        <Hero
          eyebrow={`${post.readMins} min read`}
          title={post.title}
          subtitle={post.excerpt}
          background={post.hero}
          align="center"
        />

        {/* Breadcrumb */}
        <section className="bg-[var(--surface)] border-b border-[var(--border)]">
          <div className="container py-3">
            <nav className="text-xs text-[var(--ink-soft)]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-[var(--accent)]">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-[var(--ink)] font-semibold">{post.title}</span>
            </nav>
          </div>
        </section>

        <article className="section bg-white">
          <div className="container max-w-3xl">
            <div className="prose-md">
              {post.sections.map((sec) => (
                <div key={sec.h}>
                  <h2>{sec.h}</h2>
                  {sec.paras.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Key takeaways */}
            <div className="mt-10 bg-[var(--surface)] border-l-4 border-[var(--accent)] p-6">
              <h2 className="font-bold text-xl mb-4">Key Takeaways</h2>
              <ul className="space-y-2.5">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-[var(--ink-soft)]">
                    <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related service CTA */}
            {relatedSvc && (
              <div className="mt-8 bg-[var(--ink)] text-white p-7 rounded">
                <p className="text-sm text-white/70 mb-1 uppercase tracking-widest font-bold">Need this done professionally?</p>
                <h2 className="font-bold text-2xl mb-3">Master Decker offers {relatedSvc.title}</h2>
                <p className="text-white/85 text-sm mb-5">{relatedSvc.blurb} Free written estimates across London and Southwestern Ontario.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/${relatedSvc.slug}`} className="btn-primary">View {relatedSvc.title}</Link>
                  <Link href="/contact" className="btn-ghost-light">Request Quote</Link>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* More articles */}
        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container max-w-4xl">
            <h2 className="h-display text-2xl md:text-3xl mb-8 text-center">More from the blog</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {otherPosts.map(([s, p]) => (
                <Link key={s} href={`/blog/${s}`} className="block bg-white border border-[var(--border)] p-5 hover:border-[var(--accent)] hover:shadow-md transition-all">
                  <h3 className="font-bold text-lg mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] line-clamp-3">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
