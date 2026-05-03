import { getServerSupabase } from "@/lib/supabase/server";
import { CURRENT_YEAR } from "@/lib/types";

export const revalidate = 3600;

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceexcellenceawards.ca";
  const supabase = await getServerSupabase();

  const [citiesRes, categoriesRes, winnersRes] = await Promise.all([
    supabase.from("sea_cities").select("*").order("sort_order"),
    supabase.from("sea_categories").select("*").order("sort_order"),
    supabase
      .from("sea_winners")
      .select("business_name, slug, year, tagline, city:sea_cities(name, slug), category:sea_categories(name, slug)")
      .eq("is_published", true)
      .eq("year", CURRENT_YEAR)
      .order("business_name"),
  ]);

  type WinnerRow = {
    business_name: string;
    slug: string;
    year: number;
    tagline: string | null;
    city: { name: string; slug: string } | null;
    category: { name: string; slug: string } | null;
  };
  const winners = (winnersRes.data ?? []) as unknown as WinnerRow[];

  const lines: string[] = [];
  lines.push("# Service Excellence Awards Canada");
  lines.push("");
  lines.push(`> ${CURRENT_YEAR} editorial recognition program identifying the best home renovation and service contractors across Ontario, Canada. One winner per category, per city, per year. Independent — contractors do not pay to be listed.`);
  lines.push("");
  lines.push("## Key pages");
  lines.push(`- [Home](${base}/): Program overview and recent winners`);
  lines.push(`- [Search winners](${base}/winners): Filter by city, category, year`);
  lines.push(`- [About / Methodology](${base}/about): How winners are selected`);
  lines.push(`- [Why awards matter](${base}/why-awards-matter): Why the recognition exists`);
  lines.push(`- [Request consideration](${base}/nominate): How contractors can be nominated`);
  lines.push("");
  lines.push("## Cities covered (Ontario)");
  for (const c of (citiesRes.data ?? [])) {
    lines.push(`- ${c.name}, ${c.province} — ${base}/winners/${c.slug}`);
  }
  lines.push("");
  lines.push("## Categories");
  for (const c of (categoriesRes.data ?? [])) {
    lines.push(`- ${c.name} — ${c.description ?? ""}`);
  }
  lines.push("");
  lines.push(`## ${CURRENT_YEAR} Winners`);
  if (winners.length === 0) {
    lines.push("_Winners are being announced on a rolling basis._");
  } else {
    for (const w of winners) {
      if (!w.city || !w.category) continue;
      lines.push(`- ${w.business_name} — Best ${w.category.name} in ${w.city.name} (${w.year}). ${w.tagline ?? ""} ${base}/winners/${w.city.slug}/${w.category.slug}/${w.slug}`);
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
