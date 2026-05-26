import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { ProductInfoForm } from "@/components/product-info-form";
import { VariantRow } from "@/components/variant-row";
import { CategoryToggles } from "@/components/category-toggles";
import { formatCad } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await getServerSupabase();

  const { data: product } = await supabase
    .from("ecom_products")
    .select(
      "id, store_id, name, slug, short_description, long_description, status, featured, meta_title, meta_description, search_keywords, source_url, updated_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (!product) notFound();

  const [variantsRes, imagesRes, categoriesRes, joinsRes, tiersRes] = await Promise.all([
    supabase
      .from("ecom_variants")
      .select("id, sku, name, position, price_cad, compare_at_price_cad, attribute_type, attribute_value, is_active, ecom_inventory(on_hand, low_stock_threshold)")
      .eq("product_id", id)
      .order("position", { ascending: true }),
    supabase
      .from("ecom_product_images")
      .select("id, public_url, alt_text, sort_order, is_primary")
      .eq("product_id", id)
      .order("sort_order", { ascending: true }),
    supabase.from("ecom_categories").select("id, name, slug").eq("store_id", product.store_id).order("name"),
    supabase.from("ecom_product_categories").select("category_id").eq("product_id", id),
    supabase.from("ecom_pricing_tiers").select("id, slug, name").order("sort_order")
  ]);

  const variants = variantsRes.data ?? [];
  const images = imagesRes.data ?? [];
  const categories = categoriesRes.data ?? [];
  const joinedCategoryIds = new Set((joinsRes.data ?? []).map((j) => j.category_id));
  const tiers = tiersRes.data ?? [];

  // Now fetch tier prices for variants we have.
  const { data: tierPriceRows } = await supabase
    .from("ecom_variant_prices")
    .select("variant_id, tier_id, price_cad")
    .in("variant_id", variants.map((v) => v.id));
  const tierPricesByVariant = new Map<string, Map<string, number>>();
  for (const row of tierPriceRows ?? []) {
    const map = tierPricesByVariant.get(row.variant_id) ?? new Map();
    map.set(row.tier_id, Number(row.price_cad));
    tierPricesByVariant.set(row.variant_id, map);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/products" className="text-xs text-slate-500 hover:underline">
            ← All products
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-xs text-slate-500">
            Slug: <code className="font-mono">{product.slug}</code>
            {product.source_url && (
              <>
                {" · "}
                <a className="hover:underline" href={product.source_url} target="_blank" rel="noreferrer">
                  Source ↗
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Product info</h2>
            <ProductInfoForm product={product} />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Variants ({variants.length})
              </h2>
              <p className="text-xs text-slate-500">Editing in this page; new variants come in a later iteration.</p>
            </div>
            <table className="mt-3 w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-2">Variant</th>
                  <th className="py-2">SKU</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">On hand</th>
                  {tiers.filter((t) => t.slug !== "public").map((t) => (
                    <th key={t.id} className="py-2 text-right">
                      {t.name} price
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <VariantRow
                    key={v.id}
                    variant={v}
                    tiers={tiers}
                    tierPrices={tierPricesByVariant.get(v.id) ?? new Map()}
                  />
                ))}
                {variants.length === 0 && (
                  <tr>
                    <td colSpan={4 + tiers.length} className="py-4 text-center text-slate-500">
                      No variants yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Images</h2>
            <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-4">
              {images.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                  {img.public_url && (
                    <Image
                      src={img.public_url}
                      alt={img.alt_text}
                      width={300}
                      height={300}
                      className="aspect-square w-full object-cover"
                    />
                  )}
                  <div className="px-2 py-1 text-[10px] text-slate-500">
                    {img.is_primary ? "Primary" : `#${img.sort_order + 1}`}
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <p className="col-span-full text-sm text-slate-500">No images attached yet.</p>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Categories</h2>
            <CategoryToggles
              productId={product.id}
              categories={categories}
              joinedCategoryIds={Array.from(joinedCategoryIds)}
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Pricing</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Min price</dt>
                <dd className="font-medium">
                  {variants.length
                    ? formatCad(Math.min(...variants.map((v) => Number(v.price_cad))))
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Max price</dt>
                <dd className="font-medium">
                  {variants.length
                    ? formatCad(Math.max(...variants.map((v) => Number(v.price_cad))))
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
