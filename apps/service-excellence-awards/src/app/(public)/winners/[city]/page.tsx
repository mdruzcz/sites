import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category, WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";

export const revalidate = 60;

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("sea_cities").select("*").eq("slug", city).maybeSingle();
  if (!data) return { title: "City not found" };
  const c = data as City;
  return {
    title: `${c.name} ${CURRENT_YEAR} Winners`,
    description: `${CURRENT_YEAR} Service Excellence Awards winners in ${c.name}, ${c.province}. Find the best home renovation and service contractors in ${c.name}.`,
    alternates: { canonical: `/winners/${c.slug}` },
  };
}

export default async function CityWinnersPage({ params }: { params: Params }) {
  const { city } = await params;
  const supabase = await getServerSupabase();
  const cityRes = await supabase.from("sea_cities").select("*").eq("slug", city).maybeSingle();
  if (!cityRes.data) notFound();
  const c = cityRes.data as City;

  const [winnersRes, categoriesRes] = await Promise.all([
    supabase
      .from("sea_winners")
      .select("*, city:sea_cities(*), category:sea_categories(*)")
      .eq("city_id", c.id)
      .eq("year", CURRENT_YEAR)
      .eq("is_published", true)
      .order("business_name"),
    supabase.from("sea_categories").select("*").order("sort_order"),
  ]);
  const winners = (winnersRes.data ?? []) as WinnerWithRefs[];
  const categories = (categoriesRes.data ?? []) as Category[];
  const filledIds = new Set(winners.map((w) => w.category_id));

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-stone-500">
            <Link href="/winners" className="hover:text-[var(--gold)]">Winners</Link>
            <span className="mx-2">/</span>
            <span>{c.name}, {c.province}</span>
          </nav>
          <h1 className="mt-4 font-serif text-5xl tracking-tight">
            {c.name} {CURRENT_YEAR} Winners
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            The home renovation and service contractors recognised in {c.name}, {c.province} this year.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Browse {c.name} by category</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const winner = winners.find((w) => w.category_id === cat.id);
            return (
              <li key={cat.id} className="bg-white">
                <Link
                  href={`/winners/${c.slug}/${cat.slug}`}
                  className="flex h-full flex-col gap-2 p-5 transition-colors hover:bg-stone-50"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-stone-500">{cat.name}</div>
                  {winner ? (
                    <>
                      <div className="font-serif text-lg leading-tight text-stone-900">{winner.business_name}</div>
                      <div className="mt-auto pt-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                        ★ {CURRENT_YEAR} Winner →
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-serif text-lg leading-tight text-stone-400">No winner yet</div>
                      <div className="mt-auto pt-2 text-xs text-stone-500">Reviewing nominations →</div>
                    </>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {winners.length === 0 && (
          <div className="mt-12 rounded-lg border border-stone-200 bg-stone-50/50 p-10 text-center">
            <p className="font-serif text-2xl">No {c.name} winners published yet.</p>
            <p className="mt-2 text-sm text-stone-600">Nominations for {CURRENT_YEAR} are still under review.</p>
            <Link
              href="/nominate"
              className="mt-6 inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Submit a {c.name} business
            </Link>
          </div>
        )}

        <p className="mt-8 text-xs text-stone-500">
          {filledIds.size} of {categories.length} categories filled for {c.name} in {CURRENT_YEAR}.
        </p>
      </section>
    </>
  );
}
