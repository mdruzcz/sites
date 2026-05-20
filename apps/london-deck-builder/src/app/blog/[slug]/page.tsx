import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NavBar, Footer, RelatedTrades, Contact } from "../../_components/sections";
import { POSTS, POST_SLUGS, getPost, type PostBlock } from "../../../content/posts";

type Params = { slug: string };

export const revalidate = 3600;

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  const url = `/blog/${post.slug}`;
  return {
    title: `${post.title.replace(/&amp;/g, "&")} | London Deck Builder`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      type: "article",
      title: post.title,
      description: post.description,
      images: [{ url: post.heroImage, alt: post.heroAlt }],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderBlock(block: PostBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="font-serif text-2xl lg:text-3xl font-bold mt-10 mb-4" style={{ color: "var(--wood-dark)" }}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="font-serif text-xl font-bold mt-8 mb-3" style={{ color: "var(--wood-dark)" }}>
          {block.text}
        </h3>
      );
    case "p":
      return <p key={i} className="text-base lg:text-lg leading-relaxed mb-5" style={{ color: "var(--wood)" }} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "ul":
      return (
        <ul key={i} className="list-disc pl-6 mb-6 space-y-2">
          {block.items.map((it, j) => (
            <li key={j} className="text-base lg:text-lg leading-relaxed" style={{ color: "var(--wood)" }} dangerouslySetInnerHTML={{ __html: it }} />
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside
          key={i}
          className="my-8 rounded-2xl p-6 border-l-4"
          style={{ backgroundColor: "var(--cream-dark)", borderColor: "var(--terracotta)" }}
        >
          <h4 className="font-serif text-lg font-bold mb-2" style={{ color: "var(--wood-dark)" }}>
            {block.title}
          </h4>
          <p className="text-base leading-relaxed mb-3" style={{ color: "var(--wood)" }}>
            {block.body}
          </p>
          {block.href && (
            <a
              href={block.href}
              target="_blank"
              rel="noopener"
              className="inline-block text-sm font-semibold underline"
              style={{ color: "var(--terracotta)" }}
            >
              {block.cta || "Learn more"} →
            </a>
          )}
        </aside>
      );
    case "image":
      return (
        <figure key={i} className="my-8">
          <img src={block.src} alt={block.alt} className="rounded-2xl w-full h-auto" />
          {block.caption && (
            <figcaption className="text-sm text-center mt-2" style={{ color: "var(--wood-light)" }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.heroImage,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "London Deck Builder" },
    publisher: {
      "@type": "Organization",
      name: "London Deck Builder",
      logo: { "@type": "ImageObject", url: "https://londondeckbuilder.ca/apple-icon.svg" },
    },
    mainEntityOfPage: `https://londondeckbuilder.ca/blog/${post.slug}`,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://londondeckbuilder.ca/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://londondeckbuilder.ca/blog" },
      { "@type": "ListItem", position: 3, name: post.title.replace(/&amp;/g, "&"), item: `https://londondeckbuilder.ca/blog/${post.slug}` },
    ],
  };

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <Script id={`ld-article-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`ld-bc-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <NavBar homeHref="/" />

      <article>
        <header className="pt-32 pb-8" style={{ backgroundColor: "var(--wood-dark)" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="text-sm" style={{ color: "var(--sand)" }}>
              ← All guides
            </Link>
            <div className="flex items-center gap-3 mt-4 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(196,98,58,0.25)", color: "var(--sand-light)" }}>
                {post.category}
              </span>
              <span className="text-xs text-white/60">{post.readingMinutes} min read</span>
            </div>
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-3"
              dangerouslySetInnerHTML={{ __html: post.title }} />
            <p className="text-lg text-white/70">{post.description}</p>
          </div>
        </header>

        <div
          className="bg-cover bg-center aspect-[21/9] max-h-[480px]"
          style={{ backgroundImage: `url('${post.heroImage}')` }}
          role="img"
          aria-label={post.heroAlt}
        />

        <div className="py-12 lg:py-16" style={{ backgroundColor: "var(--cream)" }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {post.body.map((b, i) => renderBlock(b, i))}
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "var(--cream-dark)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-8 text-center" style={{ color: "var(--wood-dark)" }}>
            Keep reading
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition" style={{ borderColor: "var(--cream)" }}>
                <div className="aspect-[16/10] bg-cover bg-center" style={{ backgroundImage: `url('${p.heroImage}')` }} role="img" aria-label={p.heroAlt} />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--terracotta)" }}>
                    {p.category}
                  </p>
                  <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: "var(--wood-dark)" }} dangerouslySetInnerHTML={{ __html: p.title }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedTrades />
      <Contact />
      <Footer />
    </main>
  );
}
