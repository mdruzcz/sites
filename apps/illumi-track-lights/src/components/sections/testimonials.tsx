export function Testimonials() {
  const reviews = [
    { quote: "I love the lights and the ability to change them from my phone. I never have to go on a ladder &mdash; they're always up!", who: "Craig G.", location: "London, ON" },
    { quote: "Best price, easy setup. Had a question on Sunday and got a response right away. The team shipped a new part the next morning.", who: "Skyler R.", location: "Calgary, AB" },
    { quote: "1/10th the cost of the professional installer down the street, and honestly looks just as good. Very satisfying weekend project.", who: "David A.", location: "Toronto, ON" },
    { quote: "Installation was on time and exactly what we ordered. Customer service is top notch and responsive. We light our home beyond holidays &mdash; just for fun.", who: "Kathy H.", location: "Vancouver, BC" },
    { quote: "Permanent lighting was one of the best ideas ever. Looking forward to changing sequences for every event throughout the year.", who: "John J.", location: "Ottawa, ON" },
    { quote: "Sleek install, clean track that matches our trim, and we're already getting compliments from neighbours stopping out front.", who: "Nancy F.", location: "Halifax, NS" }
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <p className="eyebrow text-[var(--color-brand)]">From real customers</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            <span className="text-[var(--color-peach)]">★★★★★</span> &nbsp; What our customers say
          </h2>
          <p className="mt-2 text-sm text-slate-500">4.9 average from verified Canadian buyers</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
              <p className="text-[var(--color-peach)] text-lg" aria-hidden>★★★★★</p>
              <blockquote className="font-display mt-3 text-lg leading-snug text-slate-800">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <p className="font-semibold">{r.who}</p>
                <p className="text-xs text-slate-500">{r.location} · Verified buyer</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
