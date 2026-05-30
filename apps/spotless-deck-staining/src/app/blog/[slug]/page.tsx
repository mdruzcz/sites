import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: { absolute: `${post.title} | Spotless Deck Staining` },
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: site.owner },
    publisher: {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/hero-deck.jpg` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />

        <article>
          {/* Header */}
          <header className="pt-32 lg:pt-40 pb-10 bg-[var(--greige)]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="mb-5 text-sm text-[var(--driftwood)]/65">
                <Link href="/" className="hover:text-[var(--terracotta-deep)]">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-[var(--terracotta-deep)]">Blog</Link>
              </nav>
              <p className="text-xs text-[var(--driftwood)]/55 mb-3">
                {post.dateDisplay} · {post.readMinutes} min read
              </p>
              <h1 className="font-display text-3xl lg:text-5xl font-extrabold leading-tight text-[var(--driftwood-dark)]">
                {post.title}
              </h1>
            </div>
          </header>

          {/* Hero image */}
          <div className="bg-[var(--greige)]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-warm">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes="(min-width:1024px) 56rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="py-14 lg:py-20 bg-[var(--greige-soft)]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-6 text-lg text-[var(--driftwood)]/85 leading-relaxed">
                {post.content.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Internal cross-links */}
              <div className="mt-12 p-7 rounded-2xl border border-[var(--line)] bg-[var(--cream)] shadow-warm">
                <h2 className="font-display text-xl font-bold mb-4 text-[var(--driftwood-dark)]">
                  Related services &amp; areas
                </h2>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {post.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="inline-flex items-center gap-2 text-[var(--terracotta-deep)] font-medium hover:underline"
                      >
                        <span className="text-[var(--terracotta)]">→</span>
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* More posts */}
              <div className="mt-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[var(--terracotta-deep)]">
                  More guides
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="px-4 py-2 rounded-full text-sm font-medium border border-[var(--line)] text-[var(--driftwood)]/85 hover:text-[var(--terracotta-deep)] hover:border-[var(--terracotta)]/40 transition"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <Contact />
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
