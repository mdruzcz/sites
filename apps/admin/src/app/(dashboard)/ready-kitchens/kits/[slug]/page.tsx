import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCabinets, getKitBySlugWithCalc, formatCad } from "@/lib/ready-kitchens/queries";
import {
  addKitItem,
  deleteKit,
  deleteKitItem,
  updateKit,
  updateKitItem,
} from "@/lib/ready-kitchens/actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function KitDetailPage({ params }: Props) {
  const { slug } = await params;
  const kit = await getKitBySlugWithCalc(slug);
  if (!kit) notFound();
  const cabinets = await getAllCabinets();

  const updateKitBound = updateKit.bind(null, slug);
  const addItemBound = addKitItem.bind(null, slug);
  const deleteKitBound = deleteKit.bind(null, slug);

  const markupColor = kit.markup_pct >= 100 ? "text-emerald-700" : "text-red-700";
  const profitColor = kit.total_profit > 0 ? "text-emerald-700" : "text-red-700";

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <nav className="text-sm text-slate-500">
            <Link href="/ready-kitchens/kits" className="hover:underline">Kits</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{kit.name}</span>
          </nav>
          <h1 className="mt-1 text-2xl font-semibold">{kit.name}</h1>
          <p className="text-sm text-slate-500">/{kit.slug} · <a className="underline" href={`https://readykitchens.ca/kits/${kit.slug}`} target="_blank" rel="noopener">view live →</a></p>
        </div>
        <form action={deleteKitBound}>
          <button type="submit" className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm text-red-700 hover:bg-red-50">
            Delete kit
          </button>
        </form>
      </header>

      {/* Profit dashboard */}
      <section className="grid gap-4 sm:grid-cols-5">
        <Stat label="Our cost" value={formatCad(kit.total_cost)} sub="from xlsx CAD Unit Price" />
        <Stat label="Sell price" value={formatCad(Number(kit.price_cad))} />
        <Stat label="Profit per kit" value={formatCad(kit.total_profit)} tone={kit.total_profit > 0 ? "good" : "bad"} sub={`${kit.markup_pct.toFixed(0)}% markup`} />
        <Stat label="Forever Cabinets retail sum" value={formatCad(kit.total_retail)} sub="if customer bought à la carte" />
        <Stat
          label="Customer saves"
          value={formatCad(kit.savings_vs_retail)}
          tone={kit.savings_vs_retail > 0 ? "good" : "bad"}
          sub={kit.savings_vs_retail > 0 ? "kit beats retail" : "⚠ kit costs more than retail!"}
        />
      </section>

      {kit.markup_pct < 100 && (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          ⚠ <strong>Markup is below 100%.</strong> Raise the sell price or substitute cheaper cabinets — at current cost basis you&rsquo;re thin.
        </div>
      )}
      {kit.savings_vs_retail <= 0 && (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          ⚠ <strong>Kit costs the customer MORE than buying parts at forevercabinets.ca.</strong> Lower the price or swap cabinets — bundle must offer savings.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Items */}
        <section className="rounded-lg border border-slate-200 bg-white">
          <header className="border-b border-slate-200 px-4 py-3">
            <h2 className="font-semibold">Cabinets in this kit</h2>
            <p className="text-xs text-slate-500">{kit.items.length} line items · {kit.pieces} total cabinets</p>
          </header>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2">SKU</th>
                <th className="px-4 py-2">Cabinet</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Cost ea</th>
                <th className="px-4 py-2 text-right">Retail ea</th>
                <th className="px-4 py-2 text-right">Line cost</th>
                <th className="px-4 py-2 text-right">Line retail</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {kit.items.map((it) => {
                const updateItemBound = updateKitItem.bind(null, slug, it.id);
                const deleteItemBound = deleteKitItem.bind(null, slug, it.id);
                return (
                  <tr key={it.id}>
                    <td className="px-4 py-2 font-mono text-xs">{it.sku}</td>
                    <td className="px-4 py-2">
                      <p className={it.cabinet ? "" : "text-red-700"}>{it.cabinet?.name ?? "⚠ SKU not in catalog"}</p>
                      {it.note && <p className="text-xs text-slate-500">{it.note}</p>}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <form action={updateItemBound} className="inline-flex">
                        <input name="qty" type="number" defaultValue={it.qty} min={1} className="w-14 rounded border border-slate-300 px-2 py-1 text-right text-sm" />
                        <input name="note" type="hidden" defaultValue={it.note ?? ""} />
                        <button type="submit" className="ml-1 text-xs text-slate-500 hover:text-slate-900">save</button>
                      </form>
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-slate-600">{it.cabinet ? formatCad(it.cabinet.cost_cad) : "—"}</td>
                    <td className="px-4 py-2 text-right font-mono text-slate-600">{it.cabinet ? formatCad(it.cabinet.retail_cad) : "—"}</td>
                    <td className="px-4 py-2 text-right font-mono">{formatCad(it.line_cost)}</td>
                    <td className="px-4 py-2 text-right font-mono">{formatCad(it.line_retail)}</td>
                    <td className="px-4 py-2 text-right">
                      <form action={deleteItemBound}>
                        <button type="submit" className="text-xs text-red-700 hover:underline">remove</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-50 text-sm font-semibold">
              <tr>
                <td className="px-4 py-3" colSpan={5}>Totals</td>
                <td className="px-4 py-3 text-right font-mono">{formatCad(kit.total_cost)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatCad(kit.total_retail)}</td>
                <td></td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3" colSpan={5}>Sell price</td>
                <td className="px-4 py-3 text-right font-mono" colSpan={2}>{formatCad(Number(kit.price_cad))}</td>
                <td></td>
              </tr>
              <tr className={`border-t border-slate-200 ${profitColor}`}>
                <td className="px-4 py-3" colSpan={5}>Profit ({kit.markup_pct.toFixed(0)}% markup)</td>
                <td className="px-4 py-3 text-right font-mono" colSpan={2}>{formatCad(kit.total_profit)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          {/* Add item */}
          <form action={addItemBound} className="flex flex-wrap items-end gap-2 border-t border-slate-200 p-4">
            <div>
              <label className="block text-xs font-medium text-slate-500">Add cabinet</label>
              <select name="sku" className="mt-1 rounded border border-slate-300 px-2 py-1.5 text-sm" required>
                <option value="">Pick a SKU…</option>
                {cabinets.map((c) => (
                  <option key={c.sku} value={c.sku}>
                    {c.sku} — {c.name} ({formatCad(c.cost_cad)} / {formatCad(c.retail_cad)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">Qty</label>
              <input name="qty" type="number" min={1} defaultValue={1} className="mt-1 w-20 rounded border border-slate-300 px-2 py-1.5 text-sm" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500">Note (optional)</label>
              <input name="note" className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm" placeholder="Where it goes in the layout" />
            </div>
            <button type="submit" className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700">
              Add
            </button>
          </form>
        </section>

        {/* Kit metadata */}
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Kit details</h2>
          <form action={updateKitBound} className="mt-4 space-y-3 text-sm">
            <Input label="Name" name="name" defaultValue={kit.name} required />
            <Input label="Tagline" name="tagline" defaultValue={kit.tagline ?? ""} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Shape" name="shape" defaultValue={kit.shape ?? ""} placeholder="Galley / L-Shape / U-Shape / Single Wall / Island" />
              <Input label="Pieces (auto)" name="pieces" defaultValue={String(kit.pieces)} type="number" />
            </div>
            <Input label="Sell price (CAD)" name="price_cad" defaultValue={String(kit.price_cad)} type="number" step="1" required />
            <Input label="Layout fits" name="layout_fits" defaultValue={kit.layout_fits ?? ""} />
            <div className="grid grid-cols-4 gap-2">
              <Input label="Wall A (in)" name="wall_a_inches" defaultValue={kit.wall_a_inches ?? ""} type="number" />
              <Input label="Wall B (in)" name="wall_b_inches" defaultValue={kit.wall_b_inches ?? ""} type="number" />
              <Input label="Wall C (in)" name="wall_c_inches" defaultValue={kit.wall_c_inches ?? ""} type="number" />
              <Input label="Island (in)" name="island_inches" defaultValue={kit.island_inches ?? ""} type="number" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Range gap (in)" name="range_inches" defaultValue={kit.range_inches ?? 30} type="number" />
              <Input label="Fridge bay (in)" name="fridge_inches" defaultValue={kit.fridge_inches ?? ""} type="number" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">Best for</label>
              <textarea name="best_for" rows={2} defaultValue={kit.best_for ?? ""} className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">Summary</label>
              <textarea name="summary" rows={3} defaultValue={kit.summary ?? ""} className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500">Highlights (one per line)</label>
              <textarea name="highlights" rows={4} defaultValue={(kit.highlights ?? []).join("\n")} className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm font-mono" />
            </div>
            <Input label="Hero image path" name="hero_image" defaultValue={kit.hero_image ?? ""} placeholder="/images/kits/slug.jpg" />
            <label className="flex items-center gap-2 text-sm">
              <input name="is_active" type="checkbox" defaultChecked={kit.is_active} />
              Active (visible on readykitchens.ca)
            </label>
            <button type="submit" className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700">
              Save changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "bad" }) {
  const color = tone === "bad" ? "text-red-700" : tone === "good" ? "text-emerald-700" : "text-slate-900";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${color}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

function Input({ label, name, defaultValue, type = "text", step, required, placeholder }: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  step?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
      />
    </div>
  );
}
