import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { CtaBand } from "@/components/CtaBand";
import { getPostBySlug, posts } from "@/content/blog";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "en_CA",
      siteName: site.name,
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
    ],
  };

  const otherPosts = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Script
        id={`ld-article-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`ld-breadcrumb-${post.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />

        <article
          className="pt-32 pb-12 lg:pt-40"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(31,40,73,0.6) 0%, rgba(5,8,22,1) 70%)",
          }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm mb-6 text-white/55 hover:text-[var(--gold-bright)] transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All articles
            </Link>
            <div className="flex items-center gap-3 text-xs mb-4">
              <span
                className="px-2.5 py-1 rounded-full font-semibold"
                style={{
                  backgroundColor: "rgba(245,194,107,0.12)",
                  color: "var(--gold-bright)",
                }}
              >
                {post.category}
              </span>
              <span className="text-white/40">{post.readMinutes} min read</span>
              <span className="text-white/40">·</span>
              <time className="text-white/40">
                {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-white/70 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </article>

        <section
          className="pb-20 lg:pb-28"
          style={{ backgroundColor: "var(--night-deep)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose-content space-y-5 text-white/80 text-[17px] leading-[1.75]">
              {post.sections.map((s, i) => {
                if (s.type === "p")
                  return <p key={i}>{s.text}</p>;
                if (s.type === "h2")
                  return (
                    <h2
                      key={i}
                      className="font-display text-2xl lg:text-3xl font-extrabold text-white pt-6 leading-tight"
                    >
                      {s.text}
                    </h2>
                  );
                if (s.type === "h3")
                  return (
                    <h3
                      key={i}
                      className="font-display text-xl font-bold text-white pt-3"
                      style={{ color: "var(--gold-bright)" }}
                    >
                      {s.text}
                    </h3>
                  );
                if (s.type === "ul")
                  return (
                    <ul key={i} className="list-none space-y-2.5 pl-1">
                      {s.items.map((it, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "var(--gold-bright)" }}
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  );
                if (s.type === "callout")
                  return (
                    <aside
                      key={i}
                      className="my-7 p-5 rounded-xl border-l-4"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(245,194,107,0.08), rgba(232,163,61,0.03))",
                        borderColor: "var(--gold-bright)",
                      }}
                    >
                      <p className="text-white/90 font-medium leading-relaxed">{s.text}</p>
                    </aside>
                  );
                return null;
              })}
            </div>

            {otherPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p
                  className="text-xs font-bold uppercase tracking-[0.25em] mb-4"
                  style={{ color: "var(--gold-bright)" }}
                >
                  Keep Reading
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="block p-5 rounded-xl border hover:border-[var(--gold)]/40 transition"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.025)",
                        borderColor: "rgba(255,255,255,0.08)",
                      }}
                    >
                      <h3 className="font-display font-bold text-white mb-1 leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/55 line-clamp-2">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
