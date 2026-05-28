import type { Metadata } from "next";
import Image from "next/image";
import { getTestimonials } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import StepProcess from "@/components/StepProcess";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | DeckStain.ca Ontario",
  description:
    "See what Ontario homeowners say about DeckStain.ca's professional deck staining, sealing, and restoration services. 5-star reviews across Southwestern Ontario.",
  openGraph: {
    title: "Customer Reviews | DeckStain.ca Ontario",
    description: "5-star reviews from Ontario homeowners. Professional deck staining you can trust.",
    images: ["/images/five-stars.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | DeckStain.ca Ontario",
    description: "5-star reviews from Ontario homeowners for professional deck staining services.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function TestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center bg-[var(--charcoal)]">
        <div className="container relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/five-stars.png"
              alt="5-star rating for DeckStain.ca deck staining services"
              width={200}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
          <p className="eyebrow text-[var(--accent)] mb-3">5-Star Reviews</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">
            What Our Customers Say
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed normal-case font-normal">
            Real reviews from Ontario homeowners who trusted us with their decks and fences.
          </p>
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="bg-[var(--surface)] py-8 border-b border-[var(--border)]">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "Satisfaction Rate", value: "100%" },
              { label: "Projects Completed", value: "500+" },
              { label: "Years in Business", value: "8+" },
              { label: "Cities Served", value: "40+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-[var(--accent)] font-bold text-2xl font-[var(--font-montserrat)]">{item.value}</p>
                <p className="text-[var(--concrete)] text-sm normal-case font-normal">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section bg-white">
        <div className="container max-w-4xl">
          <SectionHeader
            eyebrow="Customer Reviews"
            title="Trusted Across Ontario"
          />
          <div className="space-y-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-8 border-l-4 border-[var(--accent)]">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[var(--charcoal)] text-lg leading-relaxed mb-6 italic normal-case font-normal">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[var(--charcoal)]">{t.author}</p>
                    <p className="text-[var(--concrete)] text-sm">{t.city}, Ontario</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS REMINDER ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader
            eyebrow="How It Works"
            title="Why Customers Love Our Process"
            description="Our photo quote system means no waiting around for someone to show up. Just send photos and get a real quote."
          />
          <StepProcess />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
