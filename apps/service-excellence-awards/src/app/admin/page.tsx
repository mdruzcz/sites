import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/types";

export default async function AdminDashboard() {
  const supabase = await getServerSupabase();

  const [winners, currentYear, nominationsNew, citiesCount, categoriesCount] = await Promise.all([
    supabase.from("sea_winners").select("id", { count: "exact", head: true }),
    supabase.from("sea_winners").select("id", { count: "exact", head: true }).eq("year", CURRENT_YEAR),
    supabase.from("sea_nominations").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("sea_cities").select("id", { count: "exact", head: true }),
    supabase.from("sea_categories").select("id", { count: "exact", head: true }),
  ]);

  const { data: recent } = await supabase
    .from("sea_nominations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total winners", value: winners.count ?? 0, href: "/admin/winners" },
    { label: `${CURRENT_YEAR} winners`, value: currentYear.count ?? 0, href: `/admin/winners?year=${CURRENT_YEAR}` },
    { label: "New nominations", value: nominationsNew.count ?? 0, href: "/admin/nominations" },
    { label: "Cities", value: citiesCount.count ?? 0, href: "/admin/winners" },
    { label: "Categories", value: categoriesCount.count ?? 0, href: "/admin/winners" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Dashboard</p>
          <h1 className="mt-1 font-serif text-3xl tracking-tight">Overview</h1>
        </div>
        <Link
          href="/admin/winners/new"
          className="inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
        >
          + Add winner
        </Link>
      </div>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <li key={s.label} className="bg-white">
            <Link href={s.href} className="block p-5 transition-colors hover:bg-stone-50">
              <div className="text-xs uppercase tracking-[0.18em] text-stone-500">{s.label}</div>
              <div className="mt-2 font-serif text-3xl tracking-tight">{s.value}</div>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-xl tracking-tight">Recent nominations</h2>
          <Link href="/admin/nominations" className="text-sm text-stone-700 hover:text-stone-900">
            View all →
          </Link>
        </div>
        {recent && recent.length > 0 ? (
          <ul className="mt-4 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
            {recent.map((n) => (
              <li key={n.id} className="flex items-center justify-between p-4">
                <div>
                  <div className="font-medium">{n.business_name}</div>
                  <div className="text-xs text-stone-500">
                    {n.city_text ?? "—"} · {n.category_text ?? "—"} · {new Date(n.created_at).toLocaleDateString("en-CA")}
                  </div>
                </div>
                <span className="rounded-full border border-stone-300 px-2 py-0.5 text-[10px] uppercase tracking-wider text-stone-600">
                  {n.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-lg border border-stone-200 bg-white p-6 text-sm text-stone-600">
            No nominations yet.
          </p>
        )}
      </section>
    </div>
  );
}
