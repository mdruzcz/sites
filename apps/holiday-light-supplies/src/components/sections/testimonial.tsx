import { Icon } from "@/components/icons";

const QUOTES = [
  {
    quote: "We lit 28 poles on the main street and the 3D reindeer at the square from one order. Line-item quote in a day, invoiced net-30, everything arrived before our install window.",
    who: "Downtown BIA coordinator",
    where: "Southwestern Ontario"
  },
  {
    quote: "The C9s and socket spools are the same gear we were sourcing from the States, without the exchange, duty and three-week wait.",
    who: "Christmas light installation company",
    where: "Greater Toronto Area"
  },
  {
    quote: "Our atrium tree, the photo-op archway and the lobby garland came pre-decorated and ready to set. Guests were taking photos the first night.",
    who: "Property manager, shopping centre",
    where: "Ontario"
  }
];

export function Testimonial() {
  return (
    <section className="bg-[var(--color-night)] text-white">
      <div className="shell section">
        <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">What buyers say</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.who} className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex gap-0.5 text-[var(--color-gold-bright)]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon.star key={i} size={16} />
                ))}
              </div>
              <blockquote className="font-display mt-4 flex-1 text-[1.15rem] leading-snug text-white/95">&ldquo;{q.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-[var(--color-gold-bright)]">{q.who}</span>
                <span className="text-white/55"> · {q.where}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
