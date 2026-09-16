import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug, getServiceAreas } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, articleSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

// Map blog slugs to SEO-trimmed titles (<=60 chars including " | Bright Event Lighting")
const seoTitleOverrides: Record<string, string> = {
  "diy-vs-professional-wedding-lighting": "DIY vs Pro Wedding Lighting Guide",
  "best-wedding-venues-london-ontario-lighting": "Best Wedding Venues in London, ON",
  "cold-sparks-wedding-everything-you-need-to-know": "Cold Sparks Wedding Effects Guide",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const seoTitle = seoTitleOverrides[post.slug] ?? post.title;
  return {
    title: seoTitle,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${seoTitle} | Bright Event Lighting`,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image, alt: post.alt }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const cities = getServiceAreas().cities;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Blog", url: `${site.url}/blog` },
              { name: post.title, url: `${site.url}/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/blog"
              className="text-sm text-[var(--accent)] hover:underline mb-6 inline-block"
            >
              ← Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-[var(--muted)]/60 text-sm mb-8">{post.date}</p>

            <div className="space-y-4 text-[var(--muted)] leading-relaxed text-lg">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Related reading + resources (internal SEO equity + curated outbound) */}
            {"resources" in post && post.resources.length > 0 && (
              <div className="mt-12 border-t border-[var(--border)] pt-8">
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">
                  Related Reading & Resources
                </h2>
                <ul className="space-y-2">
                  {post.resources.map((r) => (
                    <li key={r.href} className="flex items-start gap-2 text-[var(--muted)]">
                      <span className="text-[var(--accent)] mt-0.5">→</span>
                      {r.external ? (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] hover:underline"
                        >
                          {r.label}
                        </a>
                      ) : (
                        <Link href={r.href} className="text-[var(--accent)] hover:underline">
                          {r.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Internal cross-links: wedding lighting by city */}
            <div className="mt-10">
              <h2 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">
                Wedding Lighting Near You
              </h2>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/service-areas/${c.slug}`}
                    className="text-sm px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors min-h-[36px] flex items-center"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12 card p-6 text-center">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                Ready to Light Your Event?
              </h3>
              <p className="text-[var(--muted)] text-sm mb-4">
                Get a firm quote in {site.responseTime} — no site visit needed.
              </p>
              <Link href="/contact" className="btn btn-primary min-h-[44px]">
                Check Your Date
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
