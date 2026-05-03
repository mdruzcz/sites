import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category, Winner } from "@/lib/types";
import { updateWinner, deleteWinner } from "./actions";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ error?: string }>;

export default async function EditWinnerPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const supabase = await getServerSupabase();

  const [winRes, citiesRes, categoriesRes] = await Promise.all([
    supabase.from("sea_winners").select("*").eq("id", id).maybeSingle(),
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
  ]);

  if (!winRes.data) notFound();
  const w = winRes.data as Winner;
  const cities = (citiesRes.data ?? []) as City[];
  const categories = (categoriesRes.data ?? []) as Category[];

  const update = updateWinner.bind(null, id);
  const remove = deleteWinner.bind(null, id);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Winners</p>
      <h1 className="mt-1 font-serif text-3xl tracking-tight">Edit: {w.business_name}</h1>

      {sp.error && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
          {decodeURIComponent(sp.error)}
        </div>
      )}

      <form action={update} className="mt-8 space-y-6">
        <fieldset className="rounded-lg border border-stone-200 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.18em] text-stone-500">Award</legend>
          <div className="grid gap-5 sm:grid-cols-3">
            <L label="Year"><input name="year" type="number" defaultValue={w.year} className={inp} /></L>
            <L label="Tier">
              <select name="award_tier" defaultValue={w.award_tier} className={inp}>
                <option value="winner">Winner</option>
                <option value="finalist">Finalist</option>
                <option value="honourable">Honourable</option>
              </select>
            </L>
            <L label="Published">
              <label className="mt-2 flex h-11 items-center gap-2 rounded-md border border-stone-300 bg-white px-3 text-sm">
                <input type="checkbox" name="is_published" defaultChecked={w.is_published} /> Published
              </label>
            </L>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <L label="City">
              <select name="city_id" required className={inp} defaultValue={w.city_id}>
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}, {c.province}</option>)}
              </select>
            </L>
            <L label="Category">
              <select name="category_id" required className={inp} defaultValue={w.category_id}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </L>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-stone-200 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.18em] text-stone-500">Business</legend>
          <L label="Business name"><input name="business_name" defaultValue={w.business_name} required className={inp} /></L>
          <div className="mt-5"><L label="Tagline"><input name="tagline" defaultValue={w.tagline ?? ""} className={inp} /></L></div>
          <div className="mt-5"><L label="Description"><textarea name="description" rows={6} defaultValue={w.description ?? ""} className={`${inp} h-auto py-2`} /></L></div>
        </fieldset>

        <fieldset className="rounded-lg border border-stone-200 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.18em] text-stone-500">Contact &amp; web</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <L label="Phone"><input name="phone" defaultValue={w.phone ?? ""} className={inp} /></L>
            <L label="Email"><input name="email" defaultValue={w.email ?? ""} className={inp} /></L>
            <L label="Website"><input name="website" defaultValue={w.website ?? ""} className={inp} /></L>
            <L label="Address"><input name="address" defaultValue={w.address ?? ""} className={inp} /></L>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-stone-200 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.18em] text-stone-500">Visuals</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <L label="Photo URL"><input name="photo_url" defaultValue={w.photo_url ?? ""} className={inp} /></L>
            <L label="Logo URL"><input name="logo_url" defaultValue={w.logo_url ?? ""} className={inp} /></L>
          </div>
        </fieldset>

        <fieldset className="rounded-lg border border-stone-200 bg-white p-6">
          <legend className="px-2 text-xs uppercase tracking-[0.18em] text-stone-500">Detail</legend>
          <L label="Services (comma-separated)"><input name="services" defaultValue={w.services.join(", ")} className={inp} /></L>
          <div className="mt-5"><L label="Service areas (comma-separated)"><input name="service_areas" defaultValue={w.service_areas.join(", ")} className={inp} /></L></div>
          <div className="mt-5"><L label="Established year"><input name="established_year" type="number" defaultValue={w.established_year ?? ""} className={inp} /></L></div>
        </fieldset>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="inline-flex h-11 items-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white hover:bg-stone-700">
            Save changes
          </button>
        </div>
      </form>

      <form action={remove} className="mt-12 border-t border-stone-200 pt-8">
        <p className="text-xs uppercase tracking-[0.18em] text-red-700">Danger zone</p>
        <button type="submit" className="mt-3 rounded-md border border-red-300 bg-white px-4 py-2 text-sm text-red-700 hover:bg-red-50">
          Delete winner
        </button>
      </form>
    </div>
  );
}

const inp = "h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none";

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-sm text-stone-700">{label}</span><div className="mt-1.5">{children}</div></label>;
}
