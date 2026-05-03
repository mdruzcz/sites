import { getServerSupabase } from "@/lib/supabase/server";
import type { City, Category } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";
import { createWinner } from "./actions";

type SearchParams = Promise<{ ok?: string; error?: string }>;

export default async function NewWinnerPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const supabase = await getServerSupabase();
  const [citiesRes, categoriesRes] = await Promise.all([
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
  ]);
  const cities = (citiesRes.data ?? []) as City[];
  const categories = (categoriesRes.data ?? []) as Category[];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Winners</p>
      <h1 className="mt-1 font-serif text-3xl tracking-tight">Add a new winner</h1>
      <p className="mt-2 text-sm text-stone-600">
        Tip: hit <kbd className="rounded border border-stone-300 bg-white px-1 text-xs">Save &amp; add another</kbd> to bulk-add winners quickly.
      </p>

      {sp.ok && (
        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
          Saved. Add another below.
        </div>
      )}
      {sp.error && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-900">
          {decodeURIComponent(sp.error)}
        </div>
      )}

      <form action={createWinner} className="mt-8 space-y-6">
        <Section title="Award">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Year">
              <input name="year" type="number" defaultValue={CURRENT_YEAR} className={inp} />
            </Field>
            <Field label="Tier">
              <select name="award_tier" defaultValue="winner" className={inp}>
                <option value="winner">Winner</option>
                <option value="finalist">Finalist</option>
                <option value="honourable">Honourable mention</option>
              </select>
            </Field>
            <Field label="Status">
              <label className="mt-2 flex h-11 items-center gap-2 rounded-md border border-stone-300 bg-white px-3 text-sm">
                <input type="checkbox" name="is_published" defaultChecked /> Publish immediately
              </label>
            </Field>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="City *">
              <select name="city_id" required className={inp} defaultValue="">
                <option value="" disabled>Select…</option>
                {cities.map((c) => <option key={c.id} value={c.id}>{c.name}, {c.province}</option>)}
              </select>
            </Field>
            <Field label="Category *">
              <select name="category_id" required className={inp} defaultValue="">
                <option value="" disabled>Select…</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
          </div>
        </Section>

        <Section title="Business">
          <div className="grid gap-5">
            <Field label="Business name *">
              <input name="business_name" required className={inp} />
            </Field>
            <Field label="Tagline">
              <input name="tagline" placeholder="One-line description shown under the headline." className={inp} />
            </Field>
            <Field label="Description">
              <textarea name="description" rows={5} className={`${inp} h-auto py-2`} placeholder="2–4 paragraphs about the business — services, what they're known for, anything notable about how they work." />
            </Field>
          </div>
        </Section>

        <Section title="Contact &amp; web">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone"><input name="phone" type="tel" className={inp} /></Field>
            <Field label="Email"><input name="email" type="email" className={inp} /></Field>
            <Field label="Website"><input name="website" type="url" placeholder="https://" className={inp} /></Field>
            <Field label="Address"><input name="address" className={inp} /></Field>
          </div>
        </Section>

        <Section title="Visuals">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Photo URL"><input name="photo_url" type="url" placeholder="https://" className={inp} /></Field>
            <Field label="Logo URL"><input name="logo_url" type="url" placeholder="https://" className={inp} /></Field>
          </div>
        </Section>

        <Section title="Detail (for SEO + AI extraction)">
          <Field label="Services (comma-separated)">
            <input name="services" placeholder="Stamped concrete, Foundation pours, Driveway replacement" className={inp} />
          </Field>
          <Field label="Service areas (comma-separated)">
            <input name="service_areas" placeholder="London, St. Thomas, Strathroy, Ingersoll" className={inp} />
          </Field>
          <Field label="Established year">
            <input name="established_year" type="number" placeholder="e.g. 2008" className={inp} />
          </Field>
        </Section>

        <div className="flex flex-wrap items-center gap-3 pt-4">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white hover:bg-stone-700"
          >
            Save winner
          </button>
          <button
            type="submit"
            name="_action"
            value="save_and_add_another"
            className="inline-flex h-11 items-center rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-800 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            Save &amp; add another
          </button>
        </div>
      </form>
    </div>
  );
}

const inp = "h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-stone-700">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-lg border border-stone-200 bg-white p-6">
      <legend className="px-2 text-xs uppercase tracking-[0.18em] text-stone-500">{title}</legend>
      {children}
    </fieldset>
  );
}
