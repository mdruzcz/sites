import Link from "next/link";
import { KitHomeDiagram, kitHomeInfo } from "@/components/kit-home-diagram";

/**
 * One kit's example home, drawn with every lit run measured, and the same
 * numbers as a list underneath (the on-drawing labels are hidden on phones).
 */
export function KitCoverage({ footage, className = "" }: { footage: number; className?: string }) {
  const info = kitHomeInfo(footage);
  if (!info) return null;
  return (
    <figure className={`border border-[var(--color-border)] ${className}`}>
      <div className="bg-[var(--color-ink-deep)]">
        <KitHomeDiagram footage={footage} className="aspect-[16/9]" />
      </div>
      <figcaption className="p-5">
        <p className="eyebrow text-[var(--color-gold-text)]">Example layout</p>
        <p className="font-display mt-1 text-[1.2rem]">{footage} ft covers a {info.title.toLowerCase()}</p>
        <p className="mt-1 text-sm text-[var(--color-text-soft)]">{info.blurb}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {info.runs.map((r) => (
            <li key={r.name} className="text-[var(--color-text-soft)]">
              {r.name} <strong className="text-[var(--color-text)]">{r.feet} ft</strong>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[0.8rem] leading-relaxed text-[var(--color-muted)]">
          A guide to scale, not a measurement of your house. On a smaller home the same footage also runs down the sides.{" "}
          <Link href="/contact-us" className="underline underline-offset-2 hover:text-[var(--color-accent)]">Send us your measurements</Link> and we will check the size for you.
        </p>
      </figcaption>
    </figure>
  );
}
