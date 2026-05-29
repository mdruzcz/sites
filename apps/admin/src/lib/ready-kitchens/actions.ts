"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServiceSupabase } from "@/lib/supabase/server";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export async function createKit(formData: FormData) {
  const sb = getServiceSupabase();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");
  const slug = String(formData.get("slug") ?? "").trim() || slugify(name);
  const price = Number(formData.get("price_cad") ?? 0);
  if (!price || price <= 0) throw new Error("Price must be greater than 0");

  const { error } = await sb.from("readykitchens_kits").insert({
    slug,
    name,
    tagline: String(formData.get("tagline") ?? "") || null,
    shape: String(formData.get("shape") ?? "") || null,
    pieces: 0,
    price_cad: price,
    layout_fits: String(formData.get("layout_fits") ?? "") || null,
    summary: String(formData.get("summary") ?? "") || null,
    best_for: String(formData.get("best_for") ?? "") || null,
    range_inches: 30,
    highlights: [],
    gallery: [],
    is_active: false,
  });
  if (error) throw new Error(`Create failed: ${error.message}`);
  revalidatePath("/ready-kitchens/kits");
  redirect(`/ready-kitchens/kits/${slug}`);
}

export async function updateKit(slug: string, formData: FormData) {
  const sb = getServiceSupabase();
  const highlights = String(formData.get("highlights") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await sb
    .from("readykitchens_kits")
    .update({
      name: String(formData.get("name") ?? ""),
      tagline: String(formData.get("tagline") ?? "") || null,
      shape: String(formData.get("shape") ?? "") || null,
      pieces: Number(formData.get("pieces") ?? 0),
      price_cad: Number(formData.get("price_cad") ?? 0),
      layout_fits: String(formData.get("layout_fits") ?? "") || null,
      wall_a_inches: numberOrNull(formData.get("wall_a_inches")),
      wall_b_inches: numberOrNull(formData.get("wall_b_inches")),
      wall_c_inches: numberOrNull(formData.get("wall_c_inches")),
      island_inches: numberOrNull(formData.get("island_inches")),
      range_inches: numberOrNull(formData.get("range_inches")) ?? 30,
      fridge_inches: numberOrNull(formData.get("fridge_inches")),
      summary: String(formData.get("summary") ?? "") || null,
      best_for: String(formData.get("best_for") ?? "") || null,
      hero_image: String(formData.get("hero_image") ?? "") || null,
      highlights,
      is_active: formData.get("is_active") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);
  if (error) throw new Error(`Update failed: ${error.message}`);
  revalidatePath("/ready-kitchens/kits");
  revalidatePath(`/ready-kitchens/kits/${slug}`);
}

export async function addKitItem(slug: string, formData: FormData) {
  const sb = getServiceSupabase();
  const sku = String(formData.get("sku") ?? "").trim();
  const qty = Number(formData.get("qty") ?? 1);
  const note = String(formData.get("note") ?? "").trim() || null;
  if (!sku) throw new Error("SKU required");
  if (qty < 1) throw new Error("Qty must be ≥1");

  const { data: existing } = await sb
    .from("readykitchens_kit_items")
    .select("position")
    .eq("kit_slug", slug)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextPos = (existing?.position ?? -1) + 1;

  const { error } = await sb.from("readykitchens_kit_items").insert({
    kit_slug: slug,
    position: nextPos,
    sku,
    qty,
    note,
  });
  if (error) throw new Error(`Add item failed: ${error.message}`);
  await syncKitPieceCount(slug);
  revalidatePath(`/ready-kitchens/kits/${slug}`);
}

export async function updateKitItem(slug: string, itemId: number, formData: FormData) {
  const sb = getServiceSupabase();
  const qty = Number(formData.get("qty") ?? 1);
  const note = String(formData.get("note") ?? "").trim() || null;
  const { error } = await sb
    .from("readykitchens_kit_items")
    .update({ qty, note })
    .eq("id", itemId)
    .eq("kit_slug", slug);
  if (error) throw new Error(`Update item failed: ${error.message}`);
  await syncKitPieceCount(slug);
  revalidatePath(`/ready-kitchens/kits/${slug}`);
}

export async function deleteKitItem(slug: string, itemId: number) {
  const sb = getServiceSupabase();
  const { error } = await sb
    .from("readykitchens_kit_items")
    .delete()
    .eq("id", itemId)
    .eq("kit_slug", slug);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  await syncKitPieceCount(slug);
  revalidatePath(`/ready-kitchens/kits/${slug}`);
}

export async function deleteKit(slug: string) {
  const sb = getServiceSupabase();
  await sb.from("readykitchens_kit_items").delete().eq("kit_slug", slug);
  const { error } = await sb.from("readykitchens_kits").delete().eq("slug", slug);
  if (error) throw new Error(`Delete failed: ${error.message}`);
  revalidatePath("/ready-kitchens/kits");
  redirect("/ready-kitchens/kits");
}

export async function updateCabinetCost(sku: string, formData: FormData) {
  const sb = getServiceSupabase();
  const { error } = await sb
    .from("readykitchens_cabinets")
    .update({
      cost_cad: Number(formData.get("cost_cad") ?? 0),
      retail_cad: Number(formData.get("retail_cad") ?? 0),
      in_stock: formData.get("in_stock") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("sku", sku);
  if (error) throw new Error(`Update failed: ${error.message}`);
  revalidatePath("/ready-kitchens/cabinets");
  revalidatePath("/ready-kitchens/kits");
}

async function syncKitPieceCount(slug: string) {
  const sb = getServiceSupabase();
  const { data } = await sb
    .from("readykitchens_kit_items")
    .select("qty")
    .eq("kit_slug", slug);
  const total = ((data as { qty: number }[]) ?? []).reduce((s, r) => s + r.qty, 0);
  await sb.from("readykitchens_kits").update({ pieces: total }).eq("slug", slug);
}

function numberOrNull(v: FormDataEntryValue | null): number | null {
  if (v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
