import { getServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { ApplicationActions } from "@/components/application-actions";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status ?? "pending";
  const supabase = await getServerSupabase();
  let q = supabase
    .from("ecom_b2b_applications")
    .select("id, company_name, contact_name, email, phone, business_type, annual_volume, requested_tier_id, status, created_at, ecom_pricing_tiers(name)")
    .order("created_at", { ascending: false });
  if (status !== "all") q = q.eq("status", status);

  const { data: apps } = await q;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">B2B Applications</h1>
        <p className="text-sm text-slate-500">
          Installers and municipalities apply for tier-locked pricing. Approve here.
        </p>
      </div>

      <div className="flex gap-2 text-sm">
        {["pending", "approved", "rejected", "all"].map((s) => (
          <a
            key={s}
            href={`?status=${s}`}
            className={`rounded-md border px-3 py-1 ${
              status === s ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-300 bg-white"
            }`}
          >
            {s}
          </a>
        ))}
      </div>

      <ul className="space-y-3">
        {(apps ?? []).map((a) => (
          <li key={a.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold">{a.company_name}</h3>
                <p className="text-xs text-slate-500">
                  Requesting:{" "}
                  <span className="font-medium text-slate-700">
                    {/* @ts-expect-error supabase join */}
                    {a.ecom_pricing_tiers?.name ?? "—"}
                  </span>{" "}
                  · {formatDate(a.created_at)}
                </p>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-700">
                {a.status}
              </span>
            </div>
            <dl className="mt-3 grid gap-2 text-sm md:grid-cols-3">
              <div>
                <dt className="text-xs text-slate-500">Contact</dt>
                <dd>{a.contact_name}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Email</dt>
                <dd>
                  <a className="text-blue-700 hover:underline" href={`mailto:${a.email}`}>
                    {a.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Phone</dt>
                <dd>{a.phone}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Business type</dt>
                <dd>{a.business_type ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Annual volume</dt>
                <dd>{a.annual_volume ?? "—"}</dd>
              </div>
            </dl>
            {a.status === "pending" && <ApplicationActions id={a.id} />}
          </li>
        ))}
        {!apps?.length && (
          <li className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-500">
            No applications.
          </li>
        )}
      </ul>
    </div>
  );
}
