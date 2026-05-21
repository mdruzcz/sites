const testimonials = [
  {
    quote:
      "Deck Medic transformed our weathered cedar deck into a beautiful outdoor oasis. Their preparation process is intense — they spent more time sanding and cleaning than staining, and you can see the difference in the result. Our backyard is now the go-to spot for summer BBQs!",
    name: "Elena G.",
    location: "St. Catharines, ON",
  },
  {
    quote:
      "Professional, punctual, and very clean. They protected our landscaping and pool area while they worked and left the yard spotless. If you need deck restoration, don't look anywhere else.",
    name: "David L.",
    location: "Woodstock, ON",
  },
  {
    quote:
      "Our deck takes a beating with the humidity and snow. Deck Medic didn't just 'paint' it — they sanded it down to bare wood and applied a stain that looks better than the day the deck was built. Highly recommend for anyone looking for real quality.",
    name: "James R.",
    location: "London, ON",
  },
  {
    quote:
      "We had a lot of rot starting on our backyard stairs. The team replaced the boards seamlessly and matched the stain perfectly. It's rare to find a company that cares about structural safety as much as the look.",
    name: "Sarah M.",
    location: "Kitchener, ON",
  },
  {
    quote:
      "After years of trying to DIY my deck staining and having it peel every spring, I finally called the pros. Deck Medic explained exactly why my previous coats failed and fixed the issue. It's been two seasons now and the finish still looks brand new.",
    name: "Robert P.",
    location: "Hamilton, ON",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--off-white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--blue)" }}
          >
            Happy Homeowners
          </p>
          <h2
            className="font-display text-4xl lg:text-5xl font-extrabold leading-tight"
            style={{ color: "var(--slate)" }}
          >
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 border transition-shadow hover:shadow-lg"
              style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5" style={{ color: "#F59E0B" }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-base leading-relaxed mb-5 italic" style={{ color: "var(--slate-light)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: "var(--blue)" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--slate)" }}>
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--slate-muted)" }}>
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Remaining as a horizontal scroll on mobile */}
        <div className="flex gap-6 overflow-x-auto pb-4 mt-6 lg:grid lg:grid-cols-2 lg:overflow-visible">
          {testimonials.slice(3).map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 border flex-shrink-0 w-[300px] lg:w-auto"
              style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4" style={{ color: "#F59E0B" }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "var(--slate-light)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-semibold text-sm" style={{ color: "var(--slate)" }}>
                {t.name} <span style={{ color: "var(--slate-muted)", fontWeight: 400 }}>— {t.location}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
