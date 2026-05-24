export function CustomerReviews() {
  const reviews = [
    {
      quote:
        "Best price, easy setup. Had a question on Sunday and got a response right away — they shipped a new part the next morning.",
      who: "Skyler · Calgary, AB"
    },
    {
      quote:
        "1/10th the cost of the professional installer down the street, and honestly looks just as good. Very satisfying weekend project.",
      who: "David · London, ON"
    },
    {
      quote:
        "I installed our lights this weekend. Kids love them. Very happy with the result — the aluminum track totally hides the wires.",
      who: "James · Toronto, ON"
    },
    {
      quote:
        "Easy to install with basic DIY skills. The instructions were great. We use them year-round now for every holiday.",
      who: "Sara · Halifax, NS"
    }
  ];
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="eyebrow text-[var(--color-brand)]">From real DIYers</p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">
          <span aria-label="4.9 of 5 stars">★★★★★</span> &nbsp;4.9 from 247 verified Canadian customers
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <figure
              key={r.who}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6"
            >
              <p className="text-[var(--color-gold)] text-lg" aria-hidden>★★★★★</p>
              <blockquote className="mt-3 text-slate-700 leading-relaxed">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-slate-500">
                {r.who} · Verified buyer
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
