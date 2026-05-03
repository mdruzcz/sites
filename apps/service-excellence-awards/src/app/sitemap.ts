import type { MetadataRoute } from "next";
import { getServerSupabase } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceexcellenceawards.ca";
  const supabase = await getServerSupabase();

  const [citiesRes, categoriesRes, winnersRes] = await Promise.all([
    supabase.from("sea_cities").select("slug"),
    supabase.from("sea_categories").select("slug"),
    supabase.from("sea_winners").select("slug, updated_at, city:sea_cities(slug), category:sea_categories(slug)").eq("is_published", true),
  ]);

  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/winners`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/why-awards-matter`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/nominate`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const cityUrls = (citiesRes.data ?? []).map((c) => ({
    url: `${base}/winners/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  type WinnerRow = {
    slug: string;
    updated_at: string;
    city: { slug: string } | null;
    category: { slug: string } | null;
  };
  const winners = (winnersRes.data ?? []) as unknown as WinnerRow[];
  const winnerUrls = winners
    .filter((w) => w.city && w.category)
    .map((w) => ({
      url: `${base}/winners/${w.city!.slug}/${w.category!.slug}/${w.slug}`,
      lastModified: new Date(w.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  // Generate city × category combination URLs (16 × 10 = 160) — these are valid pages
  const categoryUrls = (categoriesRes.data ?? []).flatMap((cat) =>
    (citiesRes.data ?? []).map((city) => ({
      url: `${base}/winners/${city.slug}/${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticUrls, ...cityUrls, ...categoryUrls, ...winnerUrls];
}
