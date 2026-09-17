import type { Metadata } from "next";
import Link from "next/link";
import { CURRENT_YEAR } from "@/lib/types";
import { WinnerThumb, WinnerLogo } from "@/components/winner-media";
import { WinnerSearch } from "@/components/winner-search";
import { getGuides } from "@/lib/content";
import { getWinnerIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: "Look up Ontario's recognised home-service contractors by trade or town. One winner per category per city, with photos, strengths, considerations and homeowner hiring guides.",
};

export const revalidate = 60;

export default async function HomePage() {
  const index = await getWinnerIndex();
  const { winners, cities, categories } = index;
  const guides = getGuides().slice(0, 6);

  const catCount = new Map<string, number>();
  const catPhoto = new Map<string, string>();
  const cityCount = new Map<string, number>();
  for (const w of winners) {
    catCount.set(w.categorySlug, (catCount.get(w.categorySlug) ?? 0) + 1);
    if (w.photo && !catPhoto.has(w.categorySlug)) catPhoto.set(w.categorySlug, w.photo);
    cityCount.set(w.citySlug, (cityCount.get(w.citySlug) ?? 0) + 1);
  }
  const liveCategories = categories.filter((c) => (catCount.get(c.slug) ?? 0) > 0);
  const liveCities = cities.filter((c) => (cityCount.get(c.slug) ?? 0) > 0).sort((a, b) => (cityCount.get(b.slug) ?? 0) - (cityCount.get(a.slug) ?? 0));
  const withPhotos = winners.filter((w) => w.photo);
  const mosaic = withPhotos.slice(0, 5);
  const recent = withPhotos.slice(0, 6);
  const logoWinners = winners.filter((w) => w.logo).slice(0, 18);
  const popular = liveCategories.slice(0, 6);

  return (
    <>
      {/* Hero: search-first */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(ellipse_at_top_left,_var(--gold-soft)_0%,_transparent_55%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pt-16 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20 lg:pb-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1 text-[11px] uppercase tracking-[0.22em] text-stone-600">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              {CURRENT_YEAR} Recognition Program
            </span>
            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.02] tracking-tight text-stone-900 sm:text-6xl">
              Find a home-service contractor <span className="italic text-[var(--gold)]">worth hiring.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-stone-600 sm:text-lg">
              One recognised business per trade, per city, across Ontario, selected on service record, reputation and workmanship.
              Look up a trade or a town and see who earned it.
            </p>
            <WinnerSearch index={index} variant="hero" className="mt-8 max-w-2xl" />
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-xs uppercase tracking-[0.18em] text-stone-500">Popular</span>
              {popular.map((c) => (
                <Link key={c.slug} href={`/winners?category=${c.slug}`} className="rounded-full border border-stone-200 bg-white px-3 py-1 text-stone-700 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]">
                  {c.name}
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-stone-500">
              <span><strong className="font-serif text-2xl normal-case tracking-tight text-stone-900">{winners.length}</strong> winners</span>
              <span><strong className="font-serif text-2xl normal-case tracking-tight text-stone-900">{liveCities.length}</strong> Ontario cities</span>
              <span><strong className="font-serif text-2xl normal-case tracking-tight text-stone-900">{liveCategories.length}</strong> trades</span>
            </div>
          </div>

          {mosaic.length >= 3 && (
            <div className="relative hidden lg:block" aria-hidden>
              <div className="grid grid-cols-6 grid-rows-6 gap-3" style={{ height: 520 }}>
                <Link href={mosaic[0].href} className="col-span-4 row-span-4 overflow-hidden rounded-xl">
                  <WinnerThumb name={mosaic[0].name} photoUrl={mosaic[0].photo} categorySlug={mosaic[0].categorySlug} aspect="h-full" sizes="420px" priority />
                </Link>
                <Link href={mosaic[1].href} className="col-span-2 row-span-2 overflow-hidden rounded-xl">
                  <WinnerThumb name={mosaic[1].name} photoUrl={mosaic[1].photo} categorySlug={mosaic[1].categorySlug} aspect="h-full" sizes="200px" />
                </Link>
                <Link href={mosaic[2].href} className="col-span-2 row-span-2 overflow-hidden rounded-xl">
                  <WinnerThumb name={mosaic[2].name} photoUrl={mosaic[2].photo} categorySlug={mosaic[2].categorySlug} aspect="h-full" sizes="200px" />
                </Link>
                {mosaic[3] && (
                  <Link href={mosaic[3].href} className="col-span-3 row-span-2 overflow-hidden rounded-xl">
                    <WinnerThumb name={mosaic[3].name} photoUrl={mosaic[3].photo} categorySlug={mosaic[3].categorySlug} aspect="h-full" sizes="300px" />
                  </Link>
                )}
                {mosaic[4] && (
                  <Link href={mosaic[4].href} className="col-span-3 row-span-2 overflow-hidden rounded-xl">
                    <WinnerThumb name={mosaic[4].name} photoUrl={mosaic[4].photo} categorySlug={mosaic[4].categorySlug} aspect="h-full" sizes="300px" />
                  </Link>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-full border border-stone-200 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-stone-600 shadow-sm">
                Real work by {CURRENT_YEAR} winners
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Browse by category: photo tiles */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Browse by trade</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">What do you need done?</h2>
          </div>
          <Link href="/winners" className="text-sm font-medium text-stone-700 hover:text-[var(--gold)]">All winners →</Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {liveCategories.map((c) => {
            const n = catCount.get(c.slug) ?? 0;
            const photo = catPhoto.get(c.slug) ?? null;
            return (
              <li key={c.slug}>
                <Link href={`/winners?category=${c.slug}`} className="group relative block overflow-hidden rounded-xl border border-stone-200 bg-stone-900">
                  <WinnerThumb name={c.name} photoUrl={photo} categorySlug={c.slug} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 280px, 50vw" className="opacity-90 transition-transform duration-500 group-hover:scale-[1.04]" alt={`${c.name} work by a ${CURRENT_YEAR} Service Excellence Award winner`} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-serif text-lg leading-tight text-white">{c.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--gold-soft)]">{n} {n === 1 ? "winner" : "winners"}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Browse by city */}
      <section className="border-y border-stone-200 bg-stone-50/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Browse by city</p>
              <h2 className="mt-2 font-serif text-2xl tracking-tight">Recognised businesses near you</h2>
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {liveCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/winners/${c.slug}`} className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-800 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]">
                  {c.name}
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-600">{cityCount.get(c.slug)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent winners */}
      {recent.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Recently honoured</p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">{CURRENT_YEAR} Winners</h2>
            </div>
            <Link href="/winners" className="text-sm font-medium text-stone-700 hover:text-[var(--gold)]">View all →</Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((w) => (
              <li key={w.slug} className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-md">
                <Link href={w.href} className="flex h-full flex-col">
                  <div className="relative">
                    <WinnerThumb name={w.name} photoUrl={w.photo} categorySlug={w.categorySlug} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-stone-900/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--gold-soft)] backdrop-blur">
                      ★ {w.year} Winner
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center gap-3">
                      <WinnerLogo name={w.name} logoUrl={w.logo} size="h-9 w-9" className="border border-stone-200" />
                      <h3 className="font-serif text-lg leading-tight tracking-tight text-stone-900">{w.name}</h3>
                    </div>
                    <p className="text-sm text-stone-600">{w.category} · {w.city}, {w.province}</p>
                    {w.tagline && <p className="mt-auto pt-2 text-sm text-stone-700">{w.tagline}</p>}
                    <span className="pt-2 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">View profile →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Winner logo strip */}
      {logoWinners.length > 0 && (
        <section className="border-y border-stone-200 bg-stone-50/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <p className="text-center text-[11px] uppercase tracking-[0.22em] text-stone-500">
              Among the {winners.length} businesses recognised in {CURRENT_YEAR}
            </p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {logoWinners.map((w) => (
                <li key={w.slug}>
                  <Link href={w.href} title={w.name} className="flex items-center gap-2 rounded-full border border-stone-200 bg-white py-1.5 pl-1.5 pr-4 transition-colors hover:border-[var(--gold)]">
                    <WinnerLogo name={w.name} logoUrl={w.logo} size="h-8 w-8" />
                    <span className="text-xs text-stone-700">{w.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why awards matter */}
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">For homeowners</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">Why our recognition matters.</h2>
          <Link href="/why-awards-matter" className="mt-5 inline-block text-sm font-medium text-[var(--gold)] hover:underline">How winners are chosen →</Link>
        </div>
        <div className="grid gap-8 md:col-span-7 md:grid-cols-2">
          {[
            { t: "Reputation-led selection", d: "Recognition is based on service record, customer reputation and workmanship reviewed across the region, not on advertising spend." },
            { t: "One per category", d: "Only one Service Excellence Award is highlighted per category, per city, per year, so it is a meaningful signal, not a participation badge." },
            { t: "Strengths and considerations", d: "Every profile says what the business does best and where to ask questions, so you go into the estimate informed." },
            { t: "Verified contact info", d: "Winner profiles carry verified phone, website and Google Maps links, plus real photos of their work." },
          ].map((p) => (
            <div key={p.t}>
              <div className="font-serif text-lg">{p.t}</div>
              <p className="mt-2 text-sm text-stone-600">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {guides.length > 0 && (
        <section className="border-y border-stone-200 bg-stone-50/40">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Homeowner guides</p>
                <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">Know what good looks like before you sign.</h2>
              </div>
              <Link href="/resources" className="text-sm font-medium text-stone-700 hover:text-[var(--gold)]">All guides →</Link>
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/resources/${g.slug}`} className="group flex h-full flex-col rounded-xl border border-stone-200 bg-white p-6 transition hover:border-[var(--gold)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">{g.category} · {g.readMinutes} min</p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight group-hover:text-[var(--gold)]">{g.h1}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{g.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-stone-900 text-stone-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400">For contractors</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">Think you should be a {CURRENT_YEAR} winner?</h2>
            <p className="mt-3 max-w-xl text-stone-300">
              Submit your business to be considered for recognition. There is no fee to be reviewed or listed.
            </p>
          </div>
          <Link href="/nominate" className="inline-flex h-12 items-center rounded-full bg-[var(--gold)] px-7 text-sm font-medium text-stone-900 transition-colors hover:bg-amber-500">
            Request Consideration →
          </Link>
        </div>
      </section>
    </>
  );
}
