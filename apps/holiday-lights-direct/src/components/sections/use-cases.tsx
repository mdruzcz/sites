import Link from "next/link";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";

const CASES: {
  photo: PhotoKey;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  tint: string;
}[] = [
  {
    photo: "home-christmas-warm-white",
    eyebrow: "Christmas in a tap",
    title: "Permanent holiday lighting",
    body: "Red and green for Christmas, pink for Valentine's, orange for Halloween, soft warm white the rest of the year. Change it from the app, with no ladders, no clips and no tangled wire.",
    href: "/permanent-lights",
    cta: "Pick a kit",
    tint: "var(--color-red)"
  },
  {
    photo: "track-security-white",
    eyebrow: "Year-round",
    title: "Accent and security lighting",
    body: "Warm-white roofline glow that frames the house every night, or bright daylight white when you want the property lit up. The same hardware does both, so you can schedule it, dim it or leave it on auto.",
    href: "/product-category/permanent-lights",
    cta: "See the components",
    tint: "var(--color-green)"
  }
];

/**
 * Light card treatment: the photo sits above the copy rather than behind it, so
 * the type is on white and the night shots stay bright and legible.
 */
export function UseCases() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="reveal max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where they go</p>
          <h2 className="font-display h2-fluid mt-6">One system, every occasion.</h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="reveal-sm group flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-lg)]"
            >
              <Photo
                name={c.photo}
                ratio="aspect-[16/10]"
                sizes="(max-width: 768px) 100vw, 560px"
                className="transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="flex flex-1 flex-col p-8 md:p-9">
                <p className="eyebrow inline-flex items-center gap-2" style={{ color: c.tint }}>
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: c.tint }} />
                  {c.eyebrow}
                </p>
                <h3 className="font-display mt-3 text-2xl text-[var(--color-text)] md:text-[1.85rem]">{c.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-text-soft)]">{c.body}</p>
                <Link
                  href={c.href}
                  className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-gold-text)] hover:underline"
                >
                  {c.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
