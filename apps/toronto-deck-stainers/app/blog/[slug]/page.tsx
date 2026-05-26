import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getPostBySlug, getPosts } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Toronto Deck Stainers`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${slug}`,
      images: [{ url: post.image, alt: post.imageAlt }],
      type: "article",
    },
  };
}

export const revalidate = 3600;

function renderBody(body: string) {
  const paragraphs = body.split("\n\n");
  return paragraphs.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.slice(3)}</h2>;
    }
    if (block.startsWith("### ")) {
      return <h3 key={i}>{block.slice(4)}</h3>;
    }
    // Bold inline: **text**
    const parts = block.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <p key={i}>{rendered}</p>;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const otherPosts = getPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="bg-[var(--charcoal)] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 text-xs text-white/50">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-12 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <article className="prose-cd">{renderBody(post.body)}</article>

            <aside className="space-y-6">
              <div className="card p-6 bg-[var(--accent)] text-white">
                <h3 className="font-bold text-lg mb-2">Get a Free Estimate</h3>
                <p className="text-white/80 text-sm mb-4">
                  Professional deck staining across Toronto and all GTA communities. We reply within {site.responseTime}.
                </p>
                <Link href="/contact" className="block text-center bg-white text-[var(--accent)] font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-white/90 transition-colors">
                  Request Free Quote
                </Link>
                <a href={site.phoneHref} className="block text-center mt-2 text-white/80 text-sm font-semibold hover:text-white transition-colors py-2">
                  {site.phone}
                </a>
              </div>

              {otherPosts.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold text-[var(--charcoal)] text-sm uppercase tracking-widest mb-4">More Articles</h3>
                  <div className="space-y-4">
                    {otherPosts.map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2">
                          <Image
                            src={p.image}
                            alt={p.imageAlt}
                            fill
                            sizes="280px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="text-sm font-semibold text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                          {p.title}
                        </p>
                        <p className="text-xs text-[var(--concrete)] mt-1">{p.readTime}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
