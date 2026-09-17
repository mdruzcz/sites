import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category, WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";
import { WinnerLogo, WinnerThumb } from "@/components/winner-media";
import { withMedia } from "@/lib/winner-media";

export const revalidate = 60;

type Params = Promise<{ city: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city } = await params;
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("sea_cities").select("*").eq("slug", city).maybeSingle();
  if (!data) return { title: "City not found" };
  const c = data as City;
  return {
    title: { absolute: `${c.name} ${CURRENT_YEAR} Winners | Service Excellence Awards` },
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
  const winners = ((winnersRes.data ?? []) as WinnerWithRefs[]).map(withMedia);
  const categories = (categoriesRes.data ?? []) as Category[];
  const filled = categories.filter((cat) => winners.some((w) => w.category_id === cat.id));
  const open = categories.filter((cat) => !winners.some((w) => w.category_id === cat.id));

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10">
          <nav className="text-xs uppercase tracking-[0.22em] text-stone-500">
            <Link href="/winners" className="hover:text-[var(--gold)]">Winners</Link>
            <span className="mx-2">/</span>
            <span>{c.name}, {c.province}</span>
          </nav>
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            {c.name} {CURRENT_YEAR} Winners
          </h1>
          <p className="mt-3 max-w-2xl text-stone-600">
            The home renovation and service contractors recognised in {c.name}, {c.province} this year: {winners.length} {winners.length === 1 ? "business" : "businesses"} across {filled.length} {filled.length === 1 ? "trade" : "trades"}.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        {winners.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filled.map((cat) => {
              const w = winners.find((x) => x.category_id === cat.id)!;
              return (
                <li key={cat.id} className="overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-md">
                  <Link href={`/winners/${c.slug}/${cat.slug}/${w.slug}`} className="flex h-full flex-col">
                    <div className="relative">
                      <WinnerThumb name={w.business_name} photoUrl={w.photo_url} categorySlug={cat.slug} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
                      <span className="absolute left-3 top-3 rounded-full bg-stone-900/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--gold-soft)] backdrop-blur">{cat.name}</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <div className="flex items-center gap-3">
                        <WinnerLogo name={w.business_name} logoUrl={w.logo_url} size="h-10 w-10" className="border border-stone-200 p-0.5" />
                        <h2 className="font-serif text-lg leading-tight text-stone-900">{w.business_name}</h2>
                      </div>
                      {w.tagline && <p className="text-sm text-stone-700">{w.tagline}</p>}
                      <span className="mt-auto pt-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">★ {CURRENT_YEAR} Winner →</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-10 text-center">
            <p className="font-serif text-2xl">No {c.name} winners published yet.</p>
            <p className="mt-2 text-sm text-stone-600">Nominations for {CURRENT_YEAR} are still under review.</p>
            <Link href="/nominate" className="mt-6 inline-flex h-10 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-medium text-stone-800 hover:border-[var(--gold)] hover:text-[var(--gold)]">
              Submit a {c.name} business
            </Link>
          </div>
        )}

        {open.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Still reviewing in {c.name}</h2>
            <p className="mt-2 text-sm text-stone-600">{open.length} of {categories.length} categories have no {c.name} winner yet. Know a contractor who deserves it?</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {open.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/winners/${c.slug}/${cat.slug}`} className="inline-flex rounded-full border border-dashed border-stone-300 px-3 py-1.5 text-sm text-stone-600 hover:border-[var(--gold)] hover:text-[var(--gold)]">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
