import Link from "next/link";
import { getAllKitsWithCalc, formatCad } from "@/lib/ready-kitchens/queries";

export const dynamic = "force-dynamic";

export default async function ReadyKitchensKitsPage() {
  const kits = await getAllKitsWithCalc();

  const totalCost = kits.reduce((s, k) => s + k.total_cost, 0);
  const totalPrice = kits.reduce((s, k) => s + Number(k.price_cad), 0);
  const totalProfit = totalPrice - totalCost;
  const unprofitable = kits.filter((k) => !k.is_profitable || k.markup_pct < 100);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Ready Kitchens — Kit Packages</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pre-built kitchen packages sold at <a className="underline" href="https://readykitchens.ca" target="_blank" rel="noopener">readykitchens.ca</a>. Cabinet cost data is shared with Forever Cabinets.
          </p>
        </div>
        <Link href="/ready-kitchens/kits/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          + New kit
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-4">
        <Stat label="Active kits" value={String(kits.filter((k) => k.is_active).length)} sub={`of ${kits.length} total`} />
        <Stat label="Avg markup" value={`${(kits.reduce((s, k) => s + k.markup_pct, 0) / Math.max(kits.length, 1)).toFixed(0)}%`} sub="across all kits" />
        <Stat label="Profit per kit (avg)" value={formatCad(totalProfit / Math.max(kits.length, 1))} sub="kit price − cabinet cost" />
        <Stat label="Risk flags" value={String(unprofitable.length)} sub="markup below 100%" tone={unprofitable.length > 0 ? "warn" : "good"} />
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Kit</th>
              <th className="px-4 py-3">Shape</th>
              <th className="px-4 py-3 text-right">Pieces</th>
              <th className="px-4 py-3 text-right">Our cost</th>
              <th className="px-4 py-3 text-right">Sell price</th>
              <th className="px-4 py-3 text-right">Profit</th>
              <th className="px-4 py-3 text-right">Markup</th>
              <th className="px-4 py-3 text-right">vs retail</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {kits.map((k) => (
              <tr key={k.slug} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/ready-kitchens/kits/${k.slug}`} className="font-medium text-slate-900 hover:underline">
                    {k.name}
                  </Link>
                  <p className="text-xs text-slate-500">{k.slug}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{k.shape}</td>
                <td className="px-4 py-3 text-right font-mono">{k.pieces}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-600">{formatCad(k.total_cost)}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold">{formatCad(Number(k.price_cad))}</td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${k.total_profit > 0 ? "text-emerald-700" : "text-red-700"}`}>
                  {formatCad(k.total_profit)}
                </td>
                <td className={`px-4 py-3 text-right font-mono ${k.markup_pct >= 100 ? "text-emerald-700" : "text-red-700"}`}>
                  {k.markup_pct.toFixed(0)}%
                </td>
                <td className="px-4 py-3 text-right font-mono text-slate-500">
                  {k.savings_vs_retail > 0 ? `−${formatCad(k.savings_vs_retail)}` : `+${formatCad(-k.savings_vs_retail)}`}
                </td>
                <td className="px-4 py-3">
                  {k.is_active ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Live</span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">Draft</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {unprofitable.length > 0 && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>⚠ {unprofitable.length} kit{unprofitable.length === 1 ? "" : "s"} below 100% markup:</strong>{" "}
          {unprofitable.map((k) => k.name).join(", ")}. Click into each to raise price or swap cabinets.
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warn" }) {
  const color = tone === "warn" ? "text-red-700" : tone === "good" ? "text-emerald-700" : "text-slate-900";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${color}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}
