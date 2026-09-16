import type { Metadata } from "next";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { getTestimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, reviewsSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Reviews from Real Couples",
  description:
    "Read reviews from real couples who chose Bright Event Lighting for their wedding. 5-star rated across London, ON and Southwestern Ontario.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Reviews | Bright Event Lighting",
    description: "5-star reviews from real couples across Southwestern Ontario.",
    url: `${site.url}/reviews`,
  },
};

export default function ReviewsPage() {
  const testimonials = getTestimonials();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema(testimonials)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Reviews", url: `${site.url}/reviews` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            as="h1"
            eyebrow="Testimonials"
            headline="What Couples Say"
            description={`${site.googleRating}/5 stars on Google with ${site.googleReviewCount}+ reviews.`}
          />

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
                  ))}
                </div>
                <p className="text-[var(--muted)] leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-sm">
                  <span className="text-[var(--foreground)] font-medium">{t.author}</span>
                  <p className="text-[var(--muted)]/60 text-xs mt-0.5">{t.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
