import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import type { WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";

type SearchParams = Promise<{ year?: string; q?: string }>;

export default async function WinnersAdminList({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const yearNum = sp.year ? parseInt(sp.year, 10) : null;
  const supabase = await getServerSupabase();

  let q = supabase
    .from("sea_winners")
    .select("*, city:sea_cities(*), category:sea_categories(*)")
    .order("year", { ascending: false })
    .order("business_name");

  if (yearNum && !Number.isNaN(yearNum)) q = q.eq("year", yearNum);
  if (sp.q) q = q.ilike("business_name", `%${sp.q.trim()}%`);

  const { data } = await q;
  const winners = (data ?? []) as WinnerWithRefs[];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Winners</p>
          <h1 className="mt-1 font-serif text-3xl tracking-tight">Manage winners</h1>
        </div>
        <Link
          href="/admin/winners/new"
          className="inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
        >
          + Add winner
        </Link>
      </div>

      <form className="mt-6 flex gap-3">
        <input
          type="search"
          name="q"
          defaultValue={sp.q ?? ""}
          placeholder="Search by business name…"
          className="h-10 flex-1 rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none"
        />
        <select name="year" defaultValue={sp.year ?? ""} className="h-10 rounded-md border border-stone-300 bg-white px-3 text-sm">
          <option value="">All years</option>
          <option value={CURRENT_YEAR}>{CURRENT_YEAR}</option>
          <option value={CURRENT_YEAR - 1}>{CURRENT_YEAR - 1}</option>
        </select>
        <button className="h-10 rounded-md bg-stone-900 px-4 text-sm font-medium text-white hover:bg-stone-700">Filter</button>
      </form>

      {winners.length === 0 ? (
        <div className="mt-10 rounded-lg border border-stone-200 bg-white p-10 text-center">
          <p className="font-serif text-2xl">No winners yet.</p>
          <p className="mt-2 text-sm text-stone-600">Add your first winner to populate the public site.</p>
          <Link
            href="/admin/winners/new"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
          >
            + Add the first winner
          </Link>
        </div>
      ) : (
        <table className="mt-8 w-full overflow-hidden rounded-lg border border-stone-200 bg-white text-sm">
          <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {winners.map((w) => (
              <tr key={w.id}>
                <td className="px-4 py-3 text-stone-600">{w.year}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-stone-900">{w.business_name}</div>
                  <div className="text-xs text-stone-500">{w.tagline}</div>
                </td>
                <td className="px-4 py-3 text-stone-600">{w.category.name}</td>
                <td className="px-4 py-3 text-stone-600">{w.city.name}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${w.is_published ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"}`}>
                    {w.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/winners/${w.id}/edit`} className="text-stone-700 hover:text-[var(--gold)]">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
