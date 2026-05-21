import type { Metadata } from "next";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import TestimonialCard from "@/components/TestimonialCard";
import { TESTIMONIALS, COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Customer Testimonials & Reviews",
  description:
    "Read what our customers say about Deck Heroes. 5-star rated deck staining, sealing, and refinishing services across Southwestern Ontario.",
  openGraph: {
    title: "Customer Testimonials & Reviews | Deck Heroes",
    description:
      "See why homeowners across Ontario trust Deck Heroes for their deck staining and refinishing. Real reviews from real customers.",
    url: "https://deckheroes.ca/testimonials",
  },
};

const totalReviews = TESTIMONIALS.length;
const averageRating =
  Math.round(
    (TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / totalReviews) * 10
  ) / 10;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Deck Heroes",
  url: "https://deckheroes.ca",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: averageRating.toString(),
    bestRating: "5",
    worstRating: "1",
    ratingCount: totalReviews.toString(),
  },
};

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-7 w-7 ${i < Math.floor(rating) ? "text-terracotta" : "text-white/60"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — image-based */}
      <section className="relative min-h-[350px] lg:min-h-[400px] flex items-center">
        <Image src="/images/deck-furniture.jpeg" alt="Happy homeowners enjoying their professionally restored deck" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-forest-dark/85" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
            Testimonials
          </span>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here is what homeowners across
            Southwestern Ontario say about their experience with {COMPANY_NAME}.
          </p>
        </div>
      </section>

      {/* Aggregate Rating */}
      <section className="bg-bg py-12">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="rounded-2xl bg-white p-8 shadow-md shadow-forest-dark/5 border border-cream-dark/50">
            <p className="font-serif text-5xl font-bold text-wood-dark">
              {averageRating}
            </p>
            <div className="mt-3 flex justify-center">
              <StarDisplay rating={averageRating} />
            </div>
            <p className="mt-2 text-sm text-wood">
              Based on {totalReviews} verified customer reviews
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-bg pb-16 lg:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
