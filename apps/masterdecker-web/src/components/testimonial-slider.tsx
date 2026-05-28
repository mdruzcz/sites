"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = { name: string; location: string; quote: string; image: string };

export function TestimonialSlider({ items, background }: { items: Testimonial[]; background: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;
  const t = items[index];

  return (
    <section className="relative section bg-[var(--ink)] text-white overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="eyebrow mb-3">Reviews</p>
          <h2 className="h-display text-3xl md:text-4xl mb-3 text-white">Testimonials</h2>
          <p className="text-white/85">See what our customers are saying about working with us.</p>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[var(--accent)] flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[var(--accent)]">
            <Image src={t.image} alt={`${t.name} - Master Decker customer in ${t.location}`} width={96} height={96} className="w-full h-full object-cover" />
          </div>
          <blockquote className="text-xl md:text-2xl italic leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</blockquote>
          <div className="font-bold">{t.name}</div>
          <div className="text-sm text-[var(--accent)]">{t.location}</div>

          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "bg-[var(--accent)] w-8" : "bg-white/30 w-2"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
