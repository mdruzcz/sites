import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { StoreSettingsForm } from "@/components/store-settings-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoreSettingsPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data: store } = await supabase
    .from("ecom_stores")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!store) notFound();

  const [
    { count: productCount },
    { count: orderCount },
    { count: categoryCount }
  ] = await Promise.all([
    supabase.from("ecom_products").select("id", { count: "exact", head: true }).eq("store_id", id),
    supabase.from("ecom_orders").select("id", { count: "exact", head: true }).eq("store_id", id),
    supabase.from("ecom_categories").select("id", { count: "exact", head: true }).eq("store_id", id)
  ]);

  return (
    <div className="space-y-6">
      <Link href="/stores" className="text-xs text-slate-500 hover:underline">
        ← All stores
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{store.name}</h1>
          <p className="text-sm text-slate-500">{store.domain}</p>
        </div>
        <div className="flex gap-3 text-xs text-slate-500">
          <Stat label="Products" value={productCount ?? 0} />
          <Stat label="Categories" value={categoryCount ?? 0} />
          <Stat label="Orders" value={orderCount ?? 0} />
        </div>
      </div>

      <StoreSettingsForm store={store} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-center">
      <div className="text-lg font-semibold text-slate-800">{value}</div>
      <div>{label}</div>
    </div>
  );
}
