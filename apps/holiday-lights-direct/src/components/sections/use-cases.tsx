import Link from "next/link";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";

const CASES: { photo: PhotoKey; eyebrow: string; title: string; body: string; href: string; cta: string }[] = [
  {
    photo: "home-christmas-warm-white",
    eyebrow: "Christmas in a tap",
    title: "Permanent holiday lighting",
    body: "Red and green for Christmas, pink for Valentine's, orange for Halloween, soft warm white the rest of the year. Change it from the app — no ladders, no clips, no tangled wire.",
    href: "/permanent-lights",
    cta: "Pick a kit"
  },
  {
    photo: "track-security-white",
    eyebrow: "Year-round",
    title: "Accent and security lighting",
    body: "Warm-white roofline glow that frames the house every night, or bright daylight white when you want the property lit up. The same hardware does both — schedule it, dim it, or leave it on auto.",
    href: "/product-category/permanent-lights",
    cta: "See the components"
  }
];

export function UseCases() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">Where they go</p>
          <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">One system, every occasion.</h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="group relative isolate overflow-hidden rounded-3xl bg-[var(--color-ink-deep)]"
            >
              <Photo
                name={c.photo}
                ratio="aspect-[4/3]"
                sizes="(max-width: 768px) 100vw, 560px"
                scrim="strong"
                className="transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <p className="eyebrow text-[var(--color-gold-bright)]">{c.eyebrow}</p>
                <h3 className="font-display mt-3 text-2xl text-white md:text-[2rem]">{c.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">{c.body}</p>
                <Link
                  href={c.href}
                  className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-gold-bright)] hover:underline"
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
