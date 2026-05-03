import { getServerSupabase } from "@/lib/supabase/server";
import type { Nomination } from "@/lib/types";
import { updateNominationStatus, deleteNomination } from "./actions";

const STATUSES = ["new", "reviewed", "contacted", "awarded", "declined"] as const;
type Status = typeof STATUSES[number];

type SearchParams = Promise<{ status?: string }>;

export default async function NominationsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const supabase = await getServerSupabase();

  let q = supabase
    .from("sea_nominations")
    .select("*, city:sea_cities(name, slug, province), category:sea_categories(name, slug)")
    .order("created_at", { ascending: false });
  if (sp.status && (STATUSES as readonly string[]).includes(sp.status)) {
    q = q.eq("status", sp.status);
  }
  const { data } = await q;
  const noms = (data ?? []) as (Nomination & {
    city: { name: string } | null;
    category: { name: string } | null;
  })[];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Nominations</p>
      <h1 className="mt-1 font-serif text-3xl tracking-tight">Submissions</h1>

      <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-wider">
        {(["all", ...STATUSES] as const).map((s) => {
          const href = s === "all" ? "/admin/nominations" : `/admin/nominations?status=${s}`;
          const active = (sp.status ?? "all") === s;
          return (
            <a
              key={s}
              href={href}
              className={`rounded-full border px-3 py-1.5 ${active ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 text-stone-600 hover:border-stone-900"}`}
            >
              {s}
            </a>
          );
        })}
      </div>

      {noms.length === 0 ? (
        <p className="mt-10 rounded-lg border border-stone-200 bg-white p-10 text-center text-sm text-stone-600">
          No submissions in this view.
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {noms.map((n) => (
            <NominationCard key={n.id} n={n} />
          ))}
        </ul>
      )}
    </div>
  );
}

function NominationCard({
  n,
}: {
  n: Nomination & { city: { name: string } | null; category: { name: string } | null };
}) {
  async function setStatus(formData: FormData) {
    "use server";
    const status = String(formData.get("status") ?? "new");
    await updateNominationStatus(n.id, status);
  }
  async function remove() {
    "use server";
    await deleteNomination(n.id);
  }

  return (
    <li className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-serif text-lg">{n.business_name}</span>
            <span className="rounded-full border border-stone-300 px-2 py-0.5 text-[10px] uppercase tracking-wider text-stone-600">
              {n.status}
            </span>
          </div>
          <div className="mt-1 text-xs text-stone-500">
            {n.city?.name ?? n.city_text ?? "—"} · {n.category?.name ?? n.category_text ?? "—"} ·{" "}
            {new Date(n.created_at).toLocaleDateString("en-CA")}
          </div>
          {n.message && <p className="mt-3 text-sm text-stone-700">{n.message}</p>}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone-600">
            {n.contact_name && <span>By: {n.contact_name}</span>}
            {n.contact_email && (
              <a href={`mailto:${n.contact_email}`} className="hover:text-[var(--gold)]">
                {n.contact_email}
              </a>
            )}
            {n.contact_phone && <span>{n.contact_phone}</span>}
            {n.website && (
              <a href={n.website} target="_blank" rel="noopener" className="hover:text-[var(--gold)]">
                {n.website}
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <form action={setStatus} className="flex items-center gap-2">
            <select
              name="status"
              defaultValue={n.status}
              className="h-9 rounded-md border border-stone-300 bg-white px-2 text-xs"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button className="rounded-md bg-stone-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-stone-700">
              Update
            </button>
          </form>
          <form action={remove}>
            <button className="rounded-md border border-red-200 bg-white px-2 py-1 text-[11px] text-red-700 hover:bg-red-50">
              Delete
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}
