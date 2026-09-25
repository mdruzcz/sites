// Optional cloud storage for short share links (table: rta_designs — see supabase/rta_designs.sql).
// Everything degrades gracefully when the table doesn't exist: long hash links still work.

import { createServerSupabase } from "@/lib/supabase";
import { normalizeDesign } from "./store";
import type { Design } from "./types";

const CODE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

export function makeCode(len = 7): string {
  let s = "";
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < len; i++) s += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return s;
}

export async function storeDesign(raw: unknown): Promise<{ code: string } | { error: string }> {
  let design: Design;
  try {
    design = normalizeDesign(raw);
  } catch {
    return { error: "Invalid design" };
  }
  if (design.items.length > 400 || design.notes.length > 200) return { error: "Design too large" };
  try {
    const supabase = createServerSupabase();
    if (!supabase) return { error: "Storage unavailable" };
    for (let attempt = 0; attempt < 3; attempt++) {
      const code = makeCode();
      const { error } = await supabase.from("rta_designs").insert({
        code,
        name: design.name,
        design,
        item_count: design.items.length,
      });
      if (!error) return { code };
      if (error.code !== "23505") return { error: error.message };
    }
    return { error: "Could not allocate a code" };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Storage unavailable" };
  }
}

export async function fetchDesignByCode(code: string): Promise<Design | null> {
  if (!/^[a-z0-9]{5,12}$/i.test(code)) return null;
  try {
    const supabase = createServerSupabase();
    if (!supabase) return null;
    const { data, error } = await supabase.from("rta_designs").select("design").eq("code", code.toLowerCase()).maybeSingle();
    if (error || !data) return null;
    return normalizeDesign((data as { design: unknown }).design);
  } catch {
    return null;
  }
}
