import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";

const STEPS: { n: string; title: string; body: string; photo: PhotoKey }[] = [
  {
    n: "01",
    title: "Pick your footage",
    body: "Measure the perimeter you want lit, then choose a kit from 50 to 200 linear feet. Prices are on the page — no quote form, no sales call.",
    photo: "home-daytime-hidden"
  },
  {
    n: "02",
    title: "Match your soffit",
    body: "Choose beige, black, brown or white aluminum track, or send us a paint sample and we will colour-match it so the channel disappears.",
    photo: "detail-track-mounting"
  },
  {
    n: "03",
    title: "Install it or hand it to a pro",
    body: "DIY-friendly with our install guide, or give the box to your installer. Every screw, connector and the drill bit are already in it.",
    photo: "home-header-wide"
  }
];

export function ProcessSteps() {
  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <div className="reveal max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">How it works</p>
          <h2 className="font-display h2-fluid mt-6">
            From order to install in three steps.
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-7">
          {STEPS.map((s) => (
            <li key={s.n} className="reveal-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
              <Photo name={s.photo} ratio="aspect-[3/2]" sizes="(max-width: 768px) 100vw, 380px" />
              <div className="p-8">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-[var(--color-gold-text)]">
                  {s.n}
                </span>
                <h3 className="font-display mt-3 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
