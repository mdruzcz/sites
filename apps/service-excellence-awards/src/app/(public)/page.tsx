import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category, WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await getServerSupabase();
  const [citiesRes, categoriesRes, recentRes, countsRes] = await Promise.all([
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
    supabase
      .from("sea_winners")
      .select("*, city:sea_cities(*), category:sea_categories(*)")
      .eq("year", CURRENT_YEAR)
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabase.from("sea_winners").select("id", { count: "exact", head: true }).eq("year", CURRENT_YEAR).eq("is_published", true),
  ]);
  const cities = (citiesRes.data ?? []) as City[];
  const categories = (categoriesRes.data ?? []) as Category[];
  const recent = (recentRes.data ?? []) as WinnerWithRefs[];
  const winnerCount = countsRes.count ?? 0;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(ellipse_at_top,_var(--gold-soft)_0%,_transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pt-24 pb-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1 text-[11px] uppercase tracking-[0.22em] text-stone-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            {CURRENT_YEAR} Recognition Program
          </span>
          <h1 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-7xl">
            Canada's most trusted home<br />
            <span className="italic text-[var(--gold)]">service contractors,</span><br />
            recognised on merit.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-stone-600 sm:text-lg">
            An independent, editorial program that identifies and honours the best concrete, deck,
            roofing, kitchen and renovation specialists across Ontario — backed by service-record
            review, customer reputation and verified workmanship.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/winners"
              className="inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-sm font-medium text-white transition-colors hover:bg-stone-700"
            >
              Search {CURRENT_YEAR} Winners
            </Link>
            <Link
              href="/nominate"
              className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 text-sm font-medium text-stone-800 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Request Consideration
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.2em] text-stone-500">
            <span>{cities.length} Ontario cities</span>
            <span className="hidden h-px w-6 bg-stone-300 sm:block" />
            <span>{categories.length} service categories</span>
            <span className="hidden h-px w-6 bg-stone-300 sm:block" />
            <span>{winnerCount} {CURRENT_YEAR} winners</span>
          </div>
        </div>
      </section>

      {/* Search by city + category teaser */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Browse by city</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {cities.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/winners/${c.slug}`}
                    className="group flex items-baseline justify-between border-b border-stone-200 py-2 text-sm text-stone-800 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  >
                    <span>{c.name}</span>
                    <span className="text-stone-400 group-hover:text-[var(--gold)]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Browse by category</h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/winners?category=${c.slug}`}
                    className="group flex items-baseline justify-between border-b border-stone-200 py-2 text-sm text-stone-800 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  >
                    <span>{c.name}</span>
                    <span className="text-stone-400 group-hover:text-[var(--gold)]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Recent winners */}
      {recent.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Recently honoured</h2>
                <p className="mt-2 font-serif text-3xl tracking-tight">{CURRENT_YEAR} Winners</p>
              </div>
              <Link href="/winners" className="text-sm text-stone-700 hover:text-[var(--gold)]">
                View all →
              </Link>
            </div>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((w) => (
                <li key={w.id} className="bg-white">
                  <Link
                    href={`/winners/${w.city.slug}/${w.category.slug}/${w.slug}`}
                    className="flex h-full flex-col gap-3 p-6 transition-colors hover:bg-stone-50"
                  >
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                      <span>★ Winner</span>
                      <span className="text-stone-400">{w.year}</span>
                    </div>
                    <h3 className="font-serif text-xl tracking-tight text-stone-900">{w.business_name}</h3>
                    <p className="text-sm text-stone-600">{w.category.name} · {w.city.name}, {w.city.province}</p>
                    {w.tagline && <p className="mt-auto pt-3 text-sm text-stone-700">{w.tagline}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why awards matter teaser */}
      <section className="border-t border-stone-200">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">For homeowners</h2>
            <p className="mt-3 font-serif text-3xl tracking-tight">Why our recognition matters.</p>
          </div>
          <div className="grid gap-8 md:col-span-7 md:grid-cols-2">
            {[
              { t: "Independent review", d: "Contractors do not pay to be listed or to win. Recognition is based on service record, customer reputation and workmanship review." },
              { t: "One per category", d: "Only one Service Excellence Award is granted per category, per city, per year — making it a meaningful signal, not a participation badge." },
              { t: "Verified contact info", d: "Every winner profile includes verified contact information, service areas, and a written description of what they do best." },
              { t: "Built for discovery", d: "We index winners so homeowners — and AI assistants helping them — can find a trustworthy contractor near them in seconds." },
            ].map((p) => (
              <div key={p.t}>
                <div className="font-serif text-lg">{p.t}</div>
                <p className="mt-2 text-sm text-stone-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-stone-200 bg-stone-900 text-stone-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400">For contractors</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight">Think you should be a {CURRENT_YEAR} winner?</h2>
            <p className="mt-3 max-w-xl text-stone-300">
              Submit your business for editorial review. We don't charge submission or listing fees.
            </p>
          </div>
          <Link
            href="/nominate"
            className="inline-flex h-12 items-center rounded-full bg-[var(--gold)] px-7 text-sm font-medium text-stone-900 transition-colors hover:bg-amber-500"
          >
            Request Consideration →
          </Link>
        </div>
      </section>
    </>
  );
}
