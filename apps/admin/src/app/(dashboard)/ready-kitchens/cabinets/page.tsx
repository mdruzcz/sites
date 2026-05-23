import { getAllCabinets, formatCad } from "@/lib/ready-kitchens/queries";
import { updateCabinetCost } from "@/lib/ready-kitchens/actions";

export const dynamic = "force-dynamic";

export default async function CabinetsPage() {
  const cabinets = await getAllCabinets();
  const totalCost = cabinets.reduce((s, c) => s + Number(c.cost_cad), 0);
  const totalRetail = cabinets.reduce((s, c) => s + Number(c.retail_cad), 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Ready Kitchens — Cabinet Catalog</h1>
        <p className="mt-1 text-sm text-slate-500">
          Cost (what we pay landed) and retail (forevercabinets.ca individual price). Editing here updates kit profit calculations instantly.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Cabinets in catalog" value={String(cabinets.length)} />
        <Stat label="Sum of unit costs" value={formatCad(totalCost)} />
        <Stat label="Sum of retail prices" value={formatCad(totalRetail)} sub="if 1 of each sold at retail" />
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Width</th>
              <th className="px-4 py-3 text-right">Our cost</th>
              <th className="px-4 py-3 text-right">FC retail</th>
              <th className="px-4 py-3 text-right">Implied markup</th>
              <th className="px-4 py-3">In stock</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {cabinets.map((c) => {
              const update = updateCabinetCost.bind(null, c.sku);
              const markup = c.cost_cad > 0 ? ((c.retail_cad - c.cost_cad) / c.cost_cad) * 100 : 0;
              return (
                <tr key={c.sku}>
                  <td className="px-4 py-2 font-mono text-xs">{c.sku}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2 text-slate-500">{c.type}</td>
                  <td className="px-4 py-2 text-right font-mono">{c.width_in ?? "—"}&quot;</td>
                  <td className="px-4 py-2 text-right">
                    <form action={update} className="inline-flex items-center gap-1">
                      <span className="text-slate-400">$</span>
                      <input name="cost_cad" type="number" step="0.01" defaultValue={Number(c.cost_cad).toFixed(2)} className="w-20 rounded border border-slate-300 px-2 py-1 text-right text-sm" />
                      <input name="retail_cad" type="hidden" defaultValue={c.retail_cad} />
                      <input name="in_stock" type="hidden" defaultValue={c.in_stock ? "on" : ""} />
                      <button type="submit" className="text-xs text-slate-500 hover:text-slate-900">save</button>
                    </form>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <form action={update} className="inline-flex items-center gap-1">
                      <span className="text-slate-400">$</span>
                      <input name="retail_cad" type="number" step="1" defaultValue={Number(c.retail_cad).toFixed(0)} className="w-20 rounded border border-slate-300 px-2 py-1 text-right text-sm" />
                      <input name="cost_cad" type="hidden" defaultValue={c.cost_cad} />
                      <input name="in_stock" type="hidden" defaultValue={c.in_stock ? "on" : ""} />
                      <button type="submit" className="text-xs text-slate-500 hover:text-slate-900">save</button>
                    </form>
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-slate-500">{markup.toFixed(0)}%</td>
                  <td className="px-4 py-2">
                    <form action={update} className="inline-flex items-center gap-1">
                      <input name="cost_cad" type="hidden" defaultValue={c.cost_cad} />
                      <input name="retail_cad" type="hidden" defaultValue={c.retail_cad} />
                      <input name="in_stock" type="checkbox" defaultChecked={c.in_stock} />
                      <button type="submit" className="text-xs text-slate-500 hover:text-slate-900">save</button>
                    </form>
                  </td>
                  <td className="px-4 py-2"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}
