"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/store-context";
import { slugify } from "@/lib/utils";

interface ProductPatch {
  name?: string;
  slug?: string;
  short_description?: string | null;
  long_description?: string | null;
  status?: "draft" | "active" | "archived";
  featured?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  search_keywords?: string | null;
}

export async function updateProduct(id: string, patch: ProductPatch) {
  const supabase = await getServerSupabase();
  const { error } = await supabase.from("ecom_products").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
}

export async function createProduct(storeId: string, name: string) {
  const supabase = await getServerSupabase();
  let slug = slugify(name);
  if (!slug) slug = `product-${Date.now()}`;

  // If slug already exists for this store, append a short suffix.
  for (let attempt = 0; attempt < 5; attempt++) {
    const trySlug = attempt === 0 ? slug : `${slug}-${attempt + 1}`;
    const { data, error } = await supabase
      .from("ecom_products")
      .insert({ store_id: storeId, name, slug: trySlug, status: "draft" })
      .select("id")
      .single();
    if (!error && data) return data.id as string;
    if (error && !/duplicate key|unique constraint/i.test(error.message)) {
      throw new Error(error.message);
    }
  }
  throw new Error("Could not generate a unique product slug. Try a different name.");
}

/**
 * Form-action variant: invoked directly by the New Product form via `action={...}`.
 * Reads the active store from the cookie, creates the product, redirects to the editor.
 */
export async function createProductFromForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Product name is required");
  }
  const store = await getActiveStore();
  if (!store) {
    throw new Error("No active store. Pick a store before creating a product.");
  }
  const id = await createProduct(store.id, name);
  revalidatePath("/products");
  redirect(`/products/${id}`);
}

interface VariantPatch {
  sku?: string;
  name?: string;
  price_cad?: number;
  compare_at_price_cad?: number | null;
  cost_cad?: number | null;
  attribute_type?: string | null;
  attribute_value?: string | null;
  weight_grams?: number | null;
  is_active?: boolean;
  position?: number;
}

export async function updateVariant(id: string, patch: VariantPatch) {
  const supabase = await getServerSupabase();
  const { error } = await supabase.from("ecom_variants").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/products", "layout");
}

export async function setInventory(variantId: string, onHand: number, lowStock?: number) {
  const supabase = await getServerSupabase();
  const patch: { on_hand: number; low_stock_threshold?: number } = { on_hand: onHand };
  if (lowStock !== undefined) patch.low_stock_threshold = lowStock;
  const { error } = await supabase
    .from("ecom_inventory")
    .upsert({ variant_id: variantId, ...patch }, { onConflict: "variant_id" });
  if (error) throw new Error(error.message);
  revalidatePath("/inventory");
  revalidatePath("/products", "layout");
}

export async function setTierPrice(variantId: string, tierId: string, priceCad: number | null) {
  const supabase = await getServerSupabase();
  if (priceCad === null) {
    const { error } = await supabase
      .from("ecom_variant_prices")
      .delete()
      .eq("variant_id", variantId)
      .eq("tier_id", tierId);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("ecom_variant_prices")
      .upsert(
        { variant_id: variantId, tier_id: tierId, price_cad: priceCad },
        { onConflict: "variant_id,tier_id" }
      );
    if (error) throw new Error(error.message);
  }
  revalidatePath("/products", "layout");
}

export async function toggleCategory(productId: string, categoryId: string, attach: boolean) {
  const supabase = await getServerSupabase();
  if (attach) {
    const { error } = await supabase
      .from("ecom_product_categories")
      .upsert({ product_id: productId, category_id: categoryId });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("ecom_product_categories")
      .delete()
      .eq("product_id", productId)
      .eq("category_id", categoryId);
    if (error) throw new Error(error.message);
  }
  revalidatePath(`/products/${productId}`);
}
