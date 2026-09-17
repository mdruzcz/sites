import Link from "next/link";
import type { Metadata } from "next";
import { CURRENT_YEAR } from "@/lib/types";
import { WinnerLogo, WinnerThumb, StarRating } from "@/components/winner-media";
import { WinnerSearch } from "@/components/winner-search";
import { getWinnerIndex, scoreWinner } from "@/lib/search-index";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Search 2026 Winners | Service Excellence Awards" },
  alternates: { canonical: "/winners" },
  description:
    "Look up award-winning home renovation and service contractors in Ontario by trade, town or business name. One recognised winner per category per city.",
};

type SearchParams = Promise<{ q?: string; city?: string; category?: string }>;

const chip = (active: boolean) =>
  `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
    active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 bg-white text-stone-700 hover:border-[var(--gold)] hover:text-[var(--gold)]"
  }`;

function hrefWith(base: { q?: string; city?: string; category?: string }, patch: Partial<{ q: string; city: string; category: string }>) {
  const p = new URLSearchParams();
  const merged = { ...base, ...patch };
  if (merged.q) p.set("q", merged.q);
  if (merged.city) p.set("city", merged.city);
  if (merged.category) p.set("category", merged.category);
  const s = p.toString();
  return s ? `/winners?${s}` : "/winners";
}

export default async function WinnersPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const index = await getWinnerIndex();
  const { cities, categories } = index;

  const cityRow = sp.city ? cities.find((c) => c.slug === sp.city) : undefined;
  const catRow = sp.category ? categories.find((c) => c.slug === sp.category) : undefined;

  const results = index.winners
    .filter((w) => (!cityRow || w.citySlug === cityRow.slug) && (!catRow || w.categorySlug === catRow.slug))
    .map((w) => ({ w, s: q ? scoreWinner(w, q) : 1 }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.w.name.localeCompare(b.w.name))
    .map((x) => x.w);

  // Facet counts respect the other active filters so chips never lead to an empty page.
  const base = index.winners.filter((w) => (q ? scoreWinner(w, q) > 0 : true));
  const catCounts = new Map<string, number>();
  const cityCounts = new Map<string, number>();
  for (const w of base) {
    if (!cityRow || w.citySlug === cityRow.slug) catCounts.set(w.categorySlug, (catCounts.get(w.categorySlug) ?? 0) + 1);
    if (!catRow || w.categorySlug === catRow.slug) cityCounts.set(w.citySlug, (cityCounts.get(w.citySlug) ?? 0) + 1);
  }
  const filtered = !!(q || cityRow || catRow);
  const current = { q: q || undefined, city: cityRow?.slug, category: catRow?.slug };

  const heading = catRow && cityRow
    ? `${catRow.name} in ${cityRow.name}`
    : catRow ? `${catRow.name} winners` : cityRow ? `${cityRow.name} winners` : q ? `Results for “${q}”` : `All ${CURRENT_YEAR} winners`;

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Recognition Program · {CURRENT_YEAR}</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-stone-900 sm:text-5xl">Find a recognised contractor</h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Type a trade, a town or a business name. Every listing was reviewed for service record, reputation and workmanship.
          </p>
          <WinnerSearch index={index} variant="hero" initialQuery={q} className="mt-7 max-w-3xl" />

          <div className="mt-7 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-stone-500">Trade</span>
              <Link href={hrefWith(current, { category: "" })} className={chip(!catRow)}>All</Link>
              {categories.filter((c) => (catCounts.get(c.slug) ?? 0) > 0 || c.slug === catRow?.slug).map((c) => (
                <Link key={c.slug} href={hrefWith(current, { category: c.slug === catRow?.slug ? "" : c.slug })} className={chip(c.slug === catRow?.slug)}>
                  {c.name}<span className="text-[11px] opacity-60">{catCounts.get(c.slug) ?? 0}</span>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-stone-500">City</span>
              <Link href={hrefWith(current, { city: "" })} className={chip(!cityRow)}>All</Link>
              {cities.filter((c) => (cityCounts.get(c.slug) ?? 0) > 0 || c.slug === cityRow?.slug).map((c) => (
                <Link key={c.slug} href={hrefWith(current, { city: c.slug === cityRow?.slug ? "" : c.slug })} className={chip(c.slug === cityRow?.slug)}>
                  {c.name}<span className="text-[11px] opacity-60">{cityCounts.get(c.slug) ?? 0}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-serif text-2xl tracking-tight">{heading}</h2>
          <p className="text-sm text-stone-600">
            {results.length} {results.length === 1 ? "winner" : "winners"}
            {filtered && <> · <Link href="/winners" className="text-stone-700 underline-offset-2 hover:text-[var(--gold)] hover:underline">Clear filters</Link></>}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50/50 p-10 text-center">
            <p className="font-serif text-2xl text-stone-800">No winners match that yet.</p>
            <p className="mt-2 text-sm text-stone-600">
              Try a broader trade or a nearby city. The {CURRENT_YEAR} program is judged on a rolling basis, so check back.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/winners" className="inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700">Browse all winners</Link>
              <Link href="/nominate" className="inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:border-[var(--gold)] hover:text-[var(--gold)]">Submit a business</Link>
            </div>
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((w) => (
              <li key={w.slug} className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-md">
                <Link href={w.href} className="flex h-full flex-col">
                  <div className="relative">
                    <WinnerThumb name={w.name} photoUrl={w.photo} categorySlug={w.categorySlug} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-stone-900/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--gold-soft)] backdrop-blur">
                      ★ {w.tier === "winner" ? `${w.year} Winner` : w.tier}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center gap-3">
                      <WinnerLogo name={w.name} logoUrl={w.logo} size="h-10 w-10" className="border border-stone-200 p-0.5" />
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg leading-tight tracking-tight text-stone-900">{w.name}</h3>
                        <p className="mt-0.5 text-xs text-stone-500">{w.category} · {w.city}, {w.province}</p>
                      </div>
                    </div>
                    {w.tagline && <p className="text-sm text-stone-700">{w.tagline}</p>}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      {w.reviews > 0 ? <StarRating rating={5} /> : <span />}
                      <span className="text-xs uppercase tracking-[0.18em] text-[var(--gold)]">View profile →</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
