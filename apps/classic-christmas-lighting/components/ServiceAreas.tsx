import Link from "next/link";
import { cities } from "@/lib/cities";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { MapPinIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section className="bg-[var(--mint)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow-pill pine">Where we work</p>
          <h2 className="font-display h2-fluid mt-4">Kitchener-Waterloo, Cambridge, Guelph and beyond.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">Based in Kitchener with no travel charges across Waterloo Region, Guelph, Hamilton, Woodstock and Stratford. Every city page has local details and its own quote form.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-4 text-sm font-semibold transition hover:border-[var(--pine)] hover:text-[var(--pine-deep)]">
                <MapPinIcon className="w-3.5 h-3.5 text-[var(--candy)]" />{c.name}
              </Link>
            ))}
          </div>
          <Link href="/service-areas" className="btn-pine mt-7">All service areas</Link>
        </div>
        <Photo name={PICKS.heroAreas} ratio="aspect-[4/3]" rounded="rounded-[var(--radius)]" sizes="(max-width: 1024px) 100vw, 600px" className="shadow-[var(--shadow-lg)]" />
      </div>
    </section>
  );
}
