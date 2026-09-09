import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category, WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";
import { WinnerThumb, WinnerLogo } from "@/components/winner-media";
import { getCategoryGuide, getGuide } from "@/lib/content";
import { Bullets, linkify } from "@/components/editorial";

export const revalidate = 60;

type Params = Promise<{ city: string; category: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, category } = await params;
  const supabase = await getServerSupabase();
  const [cityRes, catRes] = await Promise.all([
    supabase.from("sea_cities").select("*").eq("slug", city).maybeSingle(),
    supabase.from("sea_categories").select("*").eq("slug", category).maybeSingle(),
  ]);
  if (!cityRes.data || !catRes.data) return { title: "Not found" };
  const c = cityRes.data as City;
  const cat = catRes.data as Category;
  const g = getCategoryGuide(cat.slug);
  const description = (g?.metaDescription ?? `${CURRENT_YEAR} Service Excellence Award winner for ${cat.name} in ${c.name}, ${c.province}. ${cat.description ?? ""}`).slice(0, 158);
  const { count } = await supabase.from("sea_winners").select("id", { count: "exact", head: true }).eq("city_id", c.id).eq("category_id", cat.id).eq("is_published", true);
  const hasWinner = (count ?? 0) > 0;
  const title = `Best ${cat.name} in ${c.name} ${CURRENT_YEAR}`;
  return {
    title: { absolute: title.length <= 40 ? `${title} | SEA Canada` : title },
    description,
    alternates: { canonical: `/winners/${c.slug}/${cat.slug}` },
    // Combos without a named winner are placeholders; keep them out of the index.
    robots: hasWinner ? undefined : { index: false, follow: true },
  };
}

export default async function CityCategoryPage({ params }: { params: Params }) {
  const { city, category } = await params;
  const supabase = await getServerSupabase();
  const [cityRes, catRes] = await Promise.all([
    supabase.from("sea_cities").select("*").eq("slug", city).maybeSingle(),
    supabase.from("sea_categories").select("*").eq("slug", category).maybeSingle(),
  ]);
  if (!cityRes.data || !catRes.data) notFound();
  const c = cityRes.data as City;
  const cat = catRes.data as Category;

  const winnersRes = await supabase
    .from("sea_winners")
    .select("*, city:sea_cities(*), category:sea_categories(*)")
    .eq("city_id", c.id)
    .eq("category_id", cat.id)
    .eq("is_published", true)
    .order("year", { ascending: false });
  const winners = (winnersRes.data ?? []) as WinnerWithRefs[];
  const current = winners.find((w) => w.year === CURRENT_YEAR && w.award_tier === "winner");
  const guide = getCategoryGuide(cat.slug);
  const guides = (guide?.relatedGuides ?? []).map(getGuide).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-12">
          <nav className="text-xs uppercase tracking-[0.22em] text-stone-500">
            <Link href="/winners" className="hover:text-[var(--gold)]">Winners</Link>
            <span className="mx-2">/</span>
            <Link href={`/winners/${c.slug}`} className="hover:text-[var(--gold)]">{c.name}</Link>
            <span className="mx-2">/</span>
            <span>{cat.name}</span>
          </nav>
          <h1 className="mt-4 font-serif text-5xl tracking-tight">
            Best {cat.name} in {c.name} <span className="text-stone-500">({CURRENT_YEAR})</span>
          </h1>
          {cat.description && <p className="mt-3 max-w-2xl text-stone-600">{cat.description}</p>}
        </div>
      </section>

      {current ? (
        <section className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
            <WinnerThumb name={current.business_name} photoUrl={current.photo_url} categorySlug={cat.slug} aspect="aspect-[16/7]" />
            <div className="p-8">
            <div className="flex items-center gap-3">
              <WinnerLogo name={current.business_name} logoUrl={current.logo_url} size="h-12 w-12" className="border border-stone-200 p-1" />
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
                <span>★ {CURRENT_YEAR} Winner</span>
              </div>
            </div>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-stone-900">{current.business_name}</h2>
            {current.tagline && <p className="mt-2 text-lg text-stone-700">{current.tagline}</p>}
            {current.description && <p className="mt-6 text-stone-700">{current.description}</p>}
            <div className="mt-8">
              <Link
                href={`/winners/${c.slug}/${cat.slug}/${current.slug}`}
                className="inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
              >
                View full profile →
              </Link>
            </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="rounded-lg border border-stone-200 bg-stone-50/50 p-10 text-center">
            <p className="font-serif text-3xl">No {CURRENT_YEAR} winner yet.</p>
            <p className="mt-2 text-stone-600">
              We're still evaluating {cat.name.toLowerCase()} contractors in {c.name}.
            </p>
            <Link
              href="/nominate"
              className="mt-6 inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
            >
              Submit a {cat.name.toLowerCase()} contractor in {c.name}
            </Link>
          </div>
        </section>
      )}

      {guide && (
        <section className="mx-auto w-full max-w-4xl px-6 py-12" aria-labelledby="buyers-guide">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Homeowner buyer&apos;s guide</p>
          <h2 id="buyers-guide" className="mt-3 font-serif text-4xl tracking-tight">Hiring a {cat.name.toLowerCase()} contractor in {c.name}</h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">{linkify(guide.intro)}</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-stone-200 p-6">
              <h3 className="text-xs uppercase tracking-[0.22em] text-stone-500">What to look for</h3>
              <Bullets items={guide.whatToLookFor} />
            </div>
            <div className="rounded-lg border border-stone-200 p-6">
              <h3 className="text-xs uppercase tracking-[0.22em] text-stone-500">Questions to ask</h3>
              <Bullets items={guide.questionsToAsk} />
            </div>
            <div className="rounded-lg border border-stone-200 bg-stone-50/60 p-6">
              <h3 className="text-xs uppercase tracking-[0.22em] text-stone-500">What it tends to cost</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-700">{guide.typicalCostNotes}</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-6">
              <h3 className="text-xs uppercase tracking-[0.22em] text-amber-800">Red flags</h3>
              <Bullets items={guide.redFlags} tone="minus" />
            </div>
          </div>
          {guides.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-[0.22em] text-stone-500">Go deeper</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {guides.map((g) => (
                  <li key={g.slug}><Link href={`/resources/${g.slug}`} className="block rounded-lg border border-stone-200 p-4 hover:border-[var(--gold)]"><p className="font-serif text-lg leading-snug">{g.h1}</p><p className="mt-1 text-xs text-stone-500">{g.readMinutes} min read</p></Link></li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {winners.filter((w) => w.year !== CURRENT_YEAR).length > 0 && (
        <section className="mx-auto w-full max-w-4xl px-6 py-8">
          <h3 className="text-xs uppercase tracking-[0.22em] text-stone-500">Past winners</h3>
          <ul className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
            {winners
              .filter((w) => w.year !== CURRENT_YEAR)
              .map((w) => (
                <li key={w.id}>
                  <Link
                    href={`/winners/${c.slug}/${cat.slug}/${w.slug}`}
                    className="flex items-center justify-between py-4 hover:text-[var(--gold)]"
                  >
                    <span className="font-serif text-lg">{w.business_name}</span>
                    <span className="text-sm text-stone-500">{w.year}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}
    </>
  );
}
