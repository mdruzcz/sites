import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getTestimonials } from "@/lib/content";
import { breadcrumbSchema, reviewsSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read what Celebrate Lighting customers across Southwestern Ontario say about their permanent outdoor LED lighting installations. Real reviews from real homeowners.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Customer Reviews | Celebrate Lighting",
    description: "Real customer reviews for Celebrate Lighting's permanent outdoor LED lighting installations across Ontario.",
    url: "https://celebratelighting.ca/reviews",
    images: [{ url: "/images/hero-main.jpg", alt: "Customer reviews for Celebrate Lighting permanent LED lighting" }],
  },
};

export default function ReviewsPage() {
  const testimonials = getTestimonials();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema(testimonials)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Reviews", url: `${site.url}/reviews` },
      ])) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Reviews</span>
          </nav>
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Social Proof</p>
            <h1 className="text-4xl font-extrabold text-[var(--foreground)] tracking-tight mb-4">Customer Reviews</h1>
            <p className="text-[var(--muted)] max-w-xl mx-auto">Don&apos;t take our word for it — hear from homeowners across Southwestern Ontario who&apos;ve transformed their properties with permanent outdoor LED lighting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5" style={{ color: "var(--gold)" }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--muted)] italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="font-semibold text-sm text-[var(--foreground)]">{t.author}</div>
                <div className="text-xs text-[var(--muted)]">{t.location}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-[var(--muted)] mb-6">Ready to join our happy customers?</p>
            <Link href="/contact" className="btn btn-primary px-8">Get Your Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
