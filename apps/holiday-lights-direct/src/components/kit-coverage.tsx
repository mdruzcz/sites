import Link from "next/link";
import { KitHomeDiagram, kitHomeInfo } from "@/components/kit-home-diagram";
import { formatCad } from "@/lib/utils";

const MEASURE_GUIDE = "/resources/how-to-measure-your-roofline-for-lights";

/**
 * One kit's example home, drawn large with every lit run measured, plus the
 * same numbers as a readable list (the on-drawing labels are hidden on phones).
 */
export function KitCoverage({ footage, className = "" }: { footage: number; className?: string }) {
  const info = kitHomeInfo(footage);
  if (!info) return null;

  return (
    <figure className={`overflow-hidden rounded-[14px] bg-[#0d1320] text-white ${className}`}>
      <KitHomeDiagram footage={footage} className="aspect-[16/9]" />
      <figcaption className="border-t border-white/10 p-5 md:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-lg font-bold tracking-[-0.02em]">
            {footage} ft covers a {info.title.toLowerCase()}
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Example layout</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-white/75">{info.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {info.runs.map((r) => (
            <li
              key={r.name}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/90"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-[#ffd24a]" />
              {r.name}
              <span className="text-[#ffd24a]">{r.feet} ft</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-white/60">
          Drawn as one continuous front. On a smaller home the same footage also runs down the sides. A
          guide to scale, not a measurement of your home.{" "}
          <Link href={MEASURE_GUIDE} className="font-semibold text-[#ffd24a] underline underline-offset-2">
            Measure your own roofline
          </Link>{" "}
          before you order.
        </p>
      </figcaption>
    </figure>
  );
}

export interface KitSize {
  footage: number;
  slug: string;
  priceFrom: number | null;
}

/**
 * Every kit side by side, each drawn as a larger home than the last.
 */
export function KitSizeGrid({ kits }: { kits: KitSize[] }) {
  const known = kits.filter((k) => kitHomeInfo(k.footage));
  if (!known.length) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {known.map((k) => {
        const info = kitHomeInfo(k.footage)!;
        return (
          <li key={k.slug}>
            <Link href={`/product/${k.slug}`} className="tile group flex h-full flex-col">
              <div className="relative overflow-hidden bg-[#0d1320]">
                <KitHomeDiagram
                  footage={k.footage}
                  scale="shared"
                  labels={false}
                  className="aspect-[2/1] transition duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[rgba(9,12,19,0.78)] px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                  {k.footage} ft
                </span>
              </div>
              <div className="flex flex-1 flex-col border-t border-[var(--color-border)] p-4">
                <h3 className="text-base font-bold leading-snug tracking-[-0.01em] text-[var(--color-text)]">{info.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{info.blurb}</p>
                <p className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.9375rem] font-bold text-[var(--color-text)]">
                  {k.priceFrom ? `From ${formatCad(k.priceFrom)}` : `${k.footage} ft kit`}
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-[10px] bg-[var(--color-gold)] text-[#17130a] transition group-hover:bg-[var(--color-gold-bright)]"
                  >
                    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
