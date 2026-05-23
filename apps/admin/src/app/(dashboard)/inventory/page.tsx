import { getActiveStore } from "@/lib/store-context";
import { getServerSupabase } from "@/lib/supabase/server";
import { InventoryRow } from "@/components/inventory-row";

export default async function InventoryPage() {
  const store = await getActiveStore();
  if (!store) return <p className="text-slate-600">Select a store first.</p>;

  const supabase = await getServerSupabase();
  const { data: variants } = await supabase
    .from("ecom_variants")
    .select(
      "id, sku, name, price_cad, ecom_products!inner(name, slug, store_id), ecom_inventory(on_hand, low_stock_threshold)"
    )
    .eq("ecom_products.store_id", store.id)
    .order("sku", { ascending: true });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
      <p className="text-sm text-slate-500">
        Adjust on-hand counts inline. Saves on blur.
      </p>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Product / variant</th>
              <th className="px-4 py-2 text-right">On hand</th>
              <th className="px-4 py-2 text-right">Low-stock at</th>
            </tr>
          </thead>
          <tbody>
            {(variants ?? []).map((v) => {
              const inv = Array.isArray(v.ecom_inventory) ? v.ecom_inventory[0] : v.ecom_inventory;
              // @ts-expect-error supabase nested type
              const productName = v.ecom_products?.name as string;
              return (
                <InventoryRow
                  key={v.id}
                  variantId={v.id}
                  sku={v.sku}
                  productName={productName}
                  variantName={v.name}
                  initialOnHand={inv?.on_hand ?? 0}
                  initialThreshold={inv?.low_stock_threshold ?? 5}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
