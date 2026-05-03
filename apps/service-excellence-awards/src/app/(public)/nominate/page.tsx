import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import { submitNomination } from "./actions";
import type { City, Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Request Consideration",
  description:
    "Submit a contractor for consideration in the Service Excellence Awards. No fee, no pay-to-win.",
  alternates: { canonical: "/nominate" },
};

export const revalidate = 600;

type SearchParams = Promise<{ ok?: string; error?: string }>;

export default async function NominatePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const supabase = await getServerSupabase();
  const [citiesRes, categoriesRes] = await Promise.all([
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
  ]);
  const cities = (citiesRes.data ?? []) as City[];
  const categories = (categoriesRes.data ?? []) as Category[];

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-16 pb-20">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Request Consideration</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">Submit a business for review.</h1>
      <p className="mt-4 text-lg text-stone-600">
        Submissions are reviewed on a rolling basis. There is no submission fee. You can nominate
        your own business or a contractor you've worked with.
      </p>

      {sp.ok && (
        <div className="mt-8 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          Thanks — your submission was received. Our editorial team reviews every nomination; we'll
          be in touch if we have follow-up questions.
        </div>
      )}
      {sp.error && (
        <div className="mt-8 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          We couldn't save that submission. {sp.error === "missing_business" ? "Please enter the business name." : sp.error}
        </div>
      )}

      <form action={submitNomination} className="mt-10 grid gap-6">
        <Field label="Business name" required>
          <input name="business_name" required className={inputCls} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="City">
            <select name="city" className={inputCls} defaultValue="">
              <option value="">Select a city…</option>
              {cities.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Category">
            <select name="category" className={inputCls} defaultValue="">
              <option value="">Select a category…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Website (optional)">
          <input name="website" type="url" placeholder="https://" className={inputCls} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name">
            <input name="contact_name" className={inputCls} />
          </Field>
          <Field label="Your email">
            <input name="contact_email" type="email" className={inputCls} />
          </Field>
        </div>
        <Field label="Your phone (optional)">
          <input name="contact_phone" type="tel" className={inputCls} />
        </Field>
        <Field label="Why does this contractor stand out?">
          <textarea name="message" rows={5} className={`${inputCls} h-auto py-3`} placeholder="Tell us about a recent project, what they did well, and why they deserve recognition." />
        </Field>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Submit for review
        </button>
        <p className="text-xs text-stone-500">
          Your information is reviewed by our editorial team only. Submission does not guarantee selection.
        </p>
      </form>
    </article>
  );
}

const inputCls =
  "h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm focus:border-[var(--gold)] focus:outline-none";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm text-stone-700">
        {label}{required && <span className="text-[var(--gold)]"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
