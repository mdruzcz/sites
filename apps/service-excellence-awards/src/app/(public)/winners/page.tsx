import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category, WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Search Winners",
  description:
    "Find award-winning home renovation and service contractors in Ontario. Browse by city, category and year.",
};

type SearchParams = Promise<{ q?: string; city?: string; category?: string; year?: string }>;

export default async function WinnersPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const supabase = await getServerSupabase();

  const [citiesRes, categoriesRes] = await Promise.all([
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
  ]);
  const cities = (citiesRes.data ?? []) as City[];
  const categories = (categoriesRes.data ?? []) as Category[];
  const yearNum = sp.year ? parseInt(sp.year, 10) : CURRENT_YEAR;
  if (Number.isNaN(yearNum)) notFound();

  let query = supabase
    .from("sea_winners")
    .select("*, city:sea_cities(*), category:sea_categories(*)")
    .eq("year", yearNum)
    .eq("is_published", true)
    .order("business_name", { ascending: true });

  if (sp.city) {
    const cityRow = cities.find((c) => c.slug === sp.city);
    if (cityRow) query = query.eq("city_id", cityRow.id);
  }
  if (sp.category) {
    const catRow = categories.find((c) => c.slug === sp.category);
    if (catRow) query = query.eq("category_id", catRow.id);
  }
  if (sp.q && sp.q.trim().length > 0) {
    query = query.ilike("business_name", `%${sp.q.trim()}%`);
  }

  const { data } = await query;
  const winners = (data ?? []) as WinnerWithRefs[];

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Recognition Program · {yearNum}</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Search Winners</h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            Filter by city, category, or business name. Every winner has been reviewed for service record,
            reputation and workmanship.
          </p>
          <form className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <input
              type="search"
              name="q"
              defaultValue={sp.q ?? ""}
              placeholder="Search by business name…"
              className="h-11 rounded-md border border-stone-300 bg-white px-4 text-sm focus:border-[var(--gold)] focus:outline-none"
            />
            <select
              name="city"
              defaultValue={sp.city ?? ""}
              className="h-11 rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none"
            >
              <option value="">All cities</option>
              {cities.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <select
              name="category"
              defaultValue={sp.category ?? ""}
              className="h-11 rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-md bg-stone-900 px-6 text-sm font-medium text-white hover:bg-stone-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-stone-600">{winners.length} {winners.length === 1 ? "winner" : "winners"} found</p>
          {(sp.q || sp.city || sp.category) && (
            <Link href="/winners" className="text-sm text-stone-600 hover:text-[var(--gold)]">Clear filters</Link>
          )}
        </div>

        {winners.length === 0 ? (
          <div className="mt-10 rounded-lg border border-stone-200 bg-stone-50/50 p-10 text-center">
            <p className="font-serif text-2xl text-stone-800">No winners match those filters yet.</p>
            <p className="mt-2 text-sm text-stone-600">
              The {yearNum} program is being judged on a rolling basis. Know a contractor who deserves to be here?
            </p>
            <Link
              href="/nominate"
              className="mt-6 inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Submit a business
            </Link>
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {winners.map((w) => (
              <li key={w.id}>
                <Link
                  href={`/winners/${w.city.slug}/${w.category.slug}/${w.slug}`}
                  className="grid grid-cols-1 gap-2 py-6 transition-colors hover:bg-stone-50/60 md:grid-cols-[1fr_auto] md:items-center md:gap-8"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
                      <span>★ {w.award_tier === "winner" ? "Winner" : w.award_tier}</span>
                      <span className="text-stone-400">{w.year}</span>
                    </div>
                    <p className="mt-1 font-serif text-2xl tracking-tight text-stone-900">{w.business_name}</p>
                    {w.tagline && <p className="mt-1 text-sm text-stone-600">{w.tagline}</p>}
                  </div>
                  <div className="text-sm text-stone-600 md:text-right">
                    <div>{w.category.name}</div>
                    <div className="text-stone-500">{w.city.name}, {w.city.province}</div>
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
