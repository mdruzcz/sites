import { StatCard } from "@/components/ui/stat-card";
import { getTraffic, type SiteTraffic } from "@/lib/traffic";

export const dynamic = "force-dynamic";

function Spark({ data }: { data: number[] }) {
  const max = Math.max(1, ...data);
  const w = 120, h = 28;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 2) - 1}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="text-blue-600" aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth={1.5} points={pts} />
    </svg>
  );
}

function ago(iso: string | null) {
  if (!iso) return "never";
  const d = Math.floor((Date.now() - Date.parse(iso)) / 86400_000);
  return d === 0 ? "today" : d === 1 ? "yesterday" : `${d} days ago`;
}

function Row({ s }: { s: SiteTraffic }) {
  const dead = !s.lastEventAt || Date.now() - Date.parse(s.lastEventAt) > 14 * 86400_000;
  return (
    <details className="group border-b border-slate-200 last:border-0">
      <summary className="grid cursor-pointer list-none grid-cols-[1fr_repeat(4,minmax(70px,90px))_130px_110px] items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50">
        <span className="min-w-0">
          <span className="block truncate font-medium">{s.name}</span>
          <a href={`https://${s.domain}`} target="_blank" rel="noreferrer" className="block truncate text-xs text-blue-700 hover:underline">{s.domain}</a>
        </span>
        <span className="text-right tabular-nums">{s.visitors7}</span>
        <span className="text-right tabular-nums">{s.views7}</span>
        <span className="text-right tabular-nums font-semibold">{s.visitors30}</span>
        <span className="text-right tabular-nums">{s.views30}</span>
        <span className="flex justify-end"><Spark data={s.spark} /></span>
        <span className={`text-right text-xs ${dead ? "font-semibold text-rose-600" : "text-slate-500"}`}>{ago(s.lastEventAt)}</span>
      </summary>
      <div className="grid gap-4 bg-slate-50 px-4 py-3 text-xs sm:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-600">Top pages (30d)</p>
          <ul className="mt-1 space-y-0.5">{s.topPaths.length ? s.topPaths.map((p) => <li key={p.path} className="flex justify-between gap-2"><span className="truncate">{p.path}</span><span className="tabular-nums text-slate-500">{p.views}</span></li>) : <li className="text-slate-400">no pageviews</li>}</ul>
        </div>
        <div>
          <p className="font-semibold text-slate-600">Referrers (30d)</p>
          <ul className="mt-1 space-y-0.5">{s.topReferrers.length ? s.topReferrers.map((r) => <li key={r.domain} className="flex justify-between gap-2"><span className="truncate">{r.domain}</span><span className="tabular-nums text-slate-500">{r.views}</span></li>) : <li className="text-slate-400">direct / none</li>}</ul>
        </div>
        <div>
          <p className="font-semibold text-slate-600">90-day pageviews</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{s.views90}</p>
          <a href={`https://analytics.masterdecker.com/websites/${s.websiteId}`} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Open in Umami →</a>
          {!s.siteId && <p className="mt-1 text-amber-700">Not linked in the sites registry</p>}
        </div>
      </div>
    </details>
  );
}

export default async function TrafficPage() {
  const { sites, generatedAt, totalEvents } = await getTraffic();
  const active = sites.filter((s) => s.visitors30 > 0);
  const dead = sites.filter((s) => !s.lastEventAt || Date.now() - Date.parse(s.lastEventAt) > 14 * 86400_000);
  const v30 = sites.reduce((n, s) => n + s.visitors30, 0);
  const p30 = sites.reduce((n, s) => n + s.views30, 0);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Site traffic</h1>
          <p className="mt-1 text-sm text-slate-500">Every tracked site, pulled from the self-hosted Umami database. Refreshes hourly; last computed {new Date(generatedAt).toLocaleString("en-CA")}.</p>
        </div>
        <a href="https://analytics.masterdecker.com" target="_blank" rel="noreferrer" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50">Open Umami</a>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tracked sites" value={sites.length} hint={`${active.length} with visitors in the last 30 days`} />
        <StatCard label="Visitors (30d)" value={v30.toLocaleString("en-CA")} hint="unique sessions across all sites" />
        <StatCard label="Pageviews (30d)" value={p30.toLocaleString("en-CA")} hint={`${totalEvents.toLocaleString("en-CA")} in the last 90 days`} />
        <StatCard label="Quiet sites" value={dead.length} hint="no pageviews in 14+ days" tone={dead.length ? "warning" : "success"} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <div className="grid min-w-[760px] grid-cols-[1fr_repeat(4,minmax(70px,90px))_130px_110px] gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Site</span><span className="text-right">Visitors 7d</span><span className="text-right">Views 7d</span><span className="text-right">Visitors 30d</span><span className="text-right">Views 30d</span><span className="text-right">30-day trend</span><span className="text-right">Last visit</span>
        </div>
        <div className="min-w-[760px]">{sites.map((s) => <Row key={s.websiteId} s={s} />)}</div>
      </div>
      <p className="text-xs text-slate-500">A site that shows "never" was registered in Umami but has not reported a pageview yet: either it has just been deployed with the tracker, or its layout is missing the script. Expand a row for its top pages and referrers.</p>
    </div>
  );
}
