import Link from "next/link";
import { FINISHES } from "@/lib/finishes";
import { Photo } from "./Photo";
import { ArrowRightIcon } from "./icons";

export function FinishesSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-white">
      <div className="shell section">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow-pill">Three finishes</p>
            <h2 className="font-display h2-fluid mt-4">Matte, semi-gloss or gloss. Same protection, your look.</h2>
          </div>
          <p className="lead text-[var(--ink-soft)]">Every job uses a high-quality solvent-based sealer that penetrates deeper, enhances colour more and recoats seamlessly. The only decision is how much sheen you want.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FINISHES.map((f) => (
            <Link key={f.slug} href={`/finishes/${f.slug}`} className="card card-lift group overflow-hidden">
              <div className="relative">
                <Photo name={f.photo} ratio="aspect-[4/3]" sizes="(max-width: 768px) 100vw, 380px" />
                {f.slug === "gloss" && <div className="sheen" aria-hidden />}
                <span className={`swatch ${f.swatch} absolute bottom-3 left-3 size-12 border-2 border-white shadow-md`} aria-hidden />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{f.sheen}</p>
                <h3 className="font-display mt-1 text-2xl group-hover:text-[var(--accent-deep)]">{f.name}</h3>
                <p className="mt-1 font-semibold text-[var(--ink)]">{f.tagline}</p>
                {!compact && <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{f.description}</p>}
                <p className="mt-3 text-xs text-[var(--muted)]">Best for: {f.bestFor.slice(0, 2).join(" · ")}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-deep)]">See the {f.name.toLowerCase()} finish <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--navy-soft)] bg-[var(--navy-soft)] px-6 py-5">
          <p className="text-sm text-[var(--ink)]"><strong>Not sure?</strong> Semi-gloss is our most popular finish for stamped concrete, matte for broom finish and exposed aggregate. We bring samples to the site assessment.</p>
          <Link href="/finishes" className="btn-navy btn-sm">Compare all three</Link>
        </div>
      </div>
    </section>
  );
}
