import Link from "next/link";
import type { Metadata } from "next";
import { getGuides } from "@/lib/content";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Homeowner Guides: Hiring Contractors in Ontario" },
  description: "Plain-language guides for Ontario homeowners on vetting contractors, reading quotes, deposits and contracts, permits, red flags and hiring by trade.",
  alternates: { canonical: "/resources" },
};

const ORDER = ["Hiring", "Money", "Permits", "Trades"];

export default async function ResourcesPage() {
  const guides = getGuides();
  const supabase = await getServerSupabase();
  const { data } = await supabase.from("sea_categories").select("*").order("sort_order");
  const categories = (data ?? []) as Category[];
  const cats = ORDER.filter((c) => guides.some((g) => g.category === c));
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.h1, url: `/resources/${g.slug}` })) };

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-12">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">For homeowners</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-stone-900">Hire well. Guides for Ontario homeowners.</h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-600">
            What to check before you sign, how quotes and deposits should work, when you need a permit, and what good looks like trade by trade. Written by the editors who review our award winners.
          </p>
        </div>
      </section>

      {cats.map((cat) => (
        <section key={cat} className="border-b border-stone-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <h2 className="font-serif text-3xl tracking-tight">{cat === "Trades" ? "Hiring by trade" : cat === "Money" ? "Quotes, deposits and contracts" : cat === "Permits" ? "Permits and code" : "Vetting a contractor"}</h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {guides.filter((g) => g.category === cat).map((g) => (
                <li key={g.slug}>
                  <Link href={`/resources/${g.slug}`} className="group flex h-full flex-col rounded-lg border border-stone-200 p-6 transition hover:border-[var(--gold)]">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">{g.readMinutes} min read</p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight text-stone-900 group-hover:text-[var(--gold)]">{g.h1}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{g.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Buyer&apos;s guides by category</h2>
        <p className="mt-2 max-w-2xl text-stone-600">Each category page carries a short guide: what to look for, typical costs, questions to ask and red flags, alongside the winner for your city.</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}><Link href={`/winners?category=${c.slug}`} className="inline-block rounded-full border border-stone-200 px-3 py-1.5 text-sm text-stone-700 hover:border-[var(--gold)] hover:text-[var(--gold)]">{c.name}</Link></li>
          ))}
        </ul>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
