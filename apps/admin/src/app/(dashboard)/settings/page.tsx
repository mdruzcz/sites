import { getServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export default async function SettingsPage() {
  const supabase = await getServerSupabase();
  const [{ data: admins }, { data: tiers }] = await Promise.all([
    supabase.from("ecom_admin_users").select("auth_user_id, role, full_name, created_at").order("created_at"),
    supabase.from("ecom_pricing_tiers").select("*").order("sort_order")
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Tools</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a href="/settings/migrate-images" className="text-blue-700 hover:underline">
              → Migrate product images to Supabase Storage
            </a>
            <span className="ml-2 text-xs text-slate-500">(one-time, idempotent)</span>
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Admin users</h2>
        <p className="text-xs text-slate-500">Anyone in this list can sign in to the admin app.</p>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-2">User ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Added</th>
            </tr>
          </thead>
          <tbody>
            {(admins ?? []).map((a) => (
              <tr key={a.auth_user_id} className="border-t border-slate-100">
                <td className="py-2 font-mono text-xs">{a.auth_user_id}</td>
                <td className="py-2">{a.full_name ?? "—"}</td>
                <td className="py-2 text-xs uppercase">{a.role}</td>
                <td className="py-2 text-xs text-slate-500">{formatDate(a.created_at)}</td>
              </tr>
            ))}
            {!admins?.length && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500">
                  No admin users yet — you must seed one via SQL to get in.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Pricing tiers</h2>
        <p className="text-xs text-slate-500">Tiers are global across all stores.</p>
        <table className="mt-3 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-2">Slug</th>
              <th className="py-2">Name</th>
              <th className="py-2">Requires approval</th>
              <th className="py-2">Tax exempt</th>
              <th className="py-2">Invoice / net-30</th>
            </tr>
          </thead>
          <tbody>
            {(tiers ?? []).map((t) => (
              <tr key={t.id} className="border-t border-slate-100">
                <td className="py-2 font-mono text-xs">{t.slug}</td>
                <td className="py-2">{t.name}</td>
                <td className="py-2 text-xs">{t.requires_approval ? "Yes" : "No"}</td>
                <td className="py-2 text-xs">{t.tax_exempt_eligible ? "Yes" : "No"}</td>
                <td className="py-2 text-xs">{t.allow_invoice ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
