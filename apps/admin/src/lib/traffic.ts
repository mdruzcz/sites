import { unstable_cache } from "next/cache";
import { getServiceSupabase } from "@/lib/supabase/server";

export interface SiteTraffic {
  websiteId: string;
  name: string;
  domain: string;
  siteId: string | null;
  views7: number;
  visitors7: number;
  views30: number;
  visitors30: number;
  views90: number;
  lastEventAt: string | null;
  /** 30 daily pageview counts, oldest first. */
  spark: number[];
  topPaths: { path: string; views: number }[];
  topReferrers: { domain: string; views: number }[];
}

interface EventRow { website_id: string; session_id: string; created_at: string; url_path: string | null; referrer_domain: string | null }

async function fetchAll(): Promise<{ sites: SiteTraffic[]; generatedAt: string; totalEvents: number }> {
  const db = getServiceSupabase();
  const since = new Date(Date.now() - 90 * 86400_000).toISOString();
  const [{ data: websites }, { data: registry }] = await Promise.all([
    db.from("website").select("website_id, name, domain").is("deleted_at", null),
    db.from("sites").select("site_id, umami_website_id"),
  ]);
  const events: EventRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("website_event")
      .select("website_id, session_id, created_at, url_path, referrer_domain")
      .eq("event_type", 1)
      .gte("created_at", since)
      .order("created_at", { ascending: true })
      .range(from, from + 999);
    if (error) throw error;
    events.push(...((data ?? []) as EventRow[]));
    if (!data || data.length < 1000) break;
  }
  const d7 = Date.now() - 7 * 86400_000;
  const d30 = Date.now() - 30 * 86400_000;
  const dayKey = (t: number) => Math.floor(t / 86400_000);
  const todayKey = dayKey(Date.now());
  const siteOf = new Map((registry ?? []).map((r) => [r.umami_website_id, r.site_id]));
  const out: SiteTraffic[] = (websites ?? []).map((w) => {
    const ev = events.filter((e) => e.website_id === w.website_id);
    const s7 = new Set<string>(), s30 = new Set<string>();
    const spark = new Array(30).fill(0);
    const paths = new Map<string, number>(), refs = new Map<string, number>();
    let views7 = 0, views30 = 0, last: string | null = null;
    for (const e of ev) {
      const t = Date.parse(e.created_at);
      if (t >= d7) { views7++; s7.add(e.session_id); }
      if (t >= d30) {
        views30++; s30.add(e.session_id);
        const idx = 29 - (todayKey - dayKey(t));
        if (idx >= 0 && idx < 30) spark[idx]++;
        const p = e.url_path || "/"; paths.set(p, (paths.get(p) ?? 0) + 1);
        if (e.referrer_domain && !e.referrer_domain.includes(w.domain)) refs.set(e.referrer_domain, (refs.get(e.referrer_domain) ?? 0) + 1);
      }
      if (!last || e.created_at > last) last = e.created_at;
    }
    const top = (m: Map<string, number>, k: "path" | "domain") => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([x, views]) => ({ [k]: x, views })) as never;
    return { websiteId: w.website_id, name: w.name, domain: w.domain, siteId: siteOf.get(w.website_id) ?? null, views7, visitors7: s7.size, views30, visitors30: s30.size, views90: ev.length, lastEventAt: last, spark, topPaths: top(paths, "path"), topReferrers: top(refs, "domain") };
  });
  out.sort((a, b) => b.visitors30 - a.visitors30 || b.views90 - a.views90 || a.domain.localeCompare(b.domain));
  return { sites: out, generatedAt: new Date().toISOString(), totalEvents: events.length };
}

/** Cached for an hour; the page is a periodic gauge, not a live dashboard. */
export const getTraffic = unstable_cache(fetchAll, ["umami-traffic-v1"], { revalidate: 3600 });
