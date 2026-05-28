import { whyChoose } from "@/lib/site";
import { CheckIcon } from "./icons";

export function WhyChoose() {
  return (
    <section id="why" className="py-20 lg:py-28 bg-[var(--greige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            Why Spotless
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Why homeowners across Kitchener-Waterloo
            <br className="hidden sm:block" />
            trust their decks to us
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            Same crew start-to-finish, premium stains only, proper prep every
            time. We treat every deck like our own.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--cream)] rounded-2xl p-7 border border-[var(--line)] shadow-warm hover:shadow-warm-lg transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--terracotta)]/15 text-[var(--terracotta-deep)] flex items-center justify-center mb-4">
                <CheckIcon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--driftwood)]/75 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
