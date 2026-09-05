import Link from "next/link";
import { cities } from "@/lib/cities";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { MapPinIcon } from "./icons";

export function ServiceAreas() {
  return (
    <section className="bg-[var(--navy-soft)]">
      <div className="shell section grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow-pill navy">Where we work</p>
          <h2 className="font-display h2-fluid mt-4">London, Woodstock, Brantford and everywhere between.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">Based in London and covering 20+ communities across Middlesex, Oxford, Brant, Elgin, Perth and Norfolk counties. Free site assessments, no travel charges.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--line-strong)] bg-white px-4 text-sm font-semibold transition hover:border-[var(--navy)] hover:text-[var(--navy)]">
                <MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />{c.name}
              </Link>
            ))}
          </div>
          <Link href="/service-areas" className="btn-navy mt-7">All service areas</Link>
        </div>
        <Photo name={PICKS.heroAreas} ratio="aspect-[4/3]" rounded="rounded-[var(--radius)]" sizes="(max-width: 1024px) 100vw, 600px" className="shadow-[var(--shadow-lg)]" />
      </div>
    </section>
  );
}
