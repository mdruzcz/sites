import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data: customer } = await supabase
    .from("ecom_customers")
    .select("*, ecom_pricing_tiers(name)")
    .eq("id", id)
    .maybeSingle();
  if (!customer) notFound();

  const { data: addresses } = await supabase
    .from("ecom_customer_addresses")
    .select("*")
    .eq("customer_id", id);

  return (
    <div className="space-y-6">
      <Link href="/customers" className="text-xs text-slate-500 hover:underline">
        ← All customers
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">{customer.email}</h1>
      <p className="text-sm text-slate-500">
        Created {formatDate(customer.created_at)} · Tier:{" "}
        {(customer as unknown as { ecom_pricing_tiers?: { name?: string } }).ecom_pricing_tiers?.name ?? "—"}
      </p>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Profile</h2>
        <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          <Row label="Name" value={[customer.first_name, customer.last_name].filter(Boolean).join(" ") || "—"} />
          <Row label="Phone" value={customer.phone ?? "—"} />
          <Row label="Company" value={customer.company_name ?? "—"} />
          <Row label="Status" value={customer.status} />
          <Row label="Tax exempt" value={customer.tax_exempt ? "Yes" : "No"} />
          <Row label="Stripe customer ID" value={customer.stripe_customer_id ?? "—"} />
        </dl>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Addresses</h2>
        {(addresses ?? []).length === 0 && <p className="mt-2 text-sm text-slate-500">None on file.</p>}
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {(addresses ?? []).map((a) => (
            <li key={a.id} className="rounded-md border border-slate-200 p-3 text-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">{a.type}</div>
              <div>{a.recipient}</div>
              {a.company && <div>{a.company}</div>}
              <div>{a.line1}</div>
              {a.line2 && <div>{a.line2}</div>}
              <div>
                {a.city}, {a.province} {a.postal_code}
              </div>
              <div>{a.country}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
