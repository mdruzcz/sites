import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/ready-kitchens/queries";

// Shared renderer for the per-store "<prefix>_quote_requests" +
// "<prefix>_quote_request_items" table pairs (RTA Cabinets, Forever Cabinets).
// Both pairs share the same column shape; `status` is optional because not
// every store's requests table has it.

type QuoteRequest = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  postal_code: string | null;
  address: string | null;
  referrer_site: string | null;
  notes: string | null;
  subtotal_cad: number;
  status?: string | null;
};

type QuoteItem = {
  request_id: string;
  sku: string;
  name: string;
  qty: number;
  unit_price_cad: number | null;
};

export async function QuoteRequestsList({
  title,
  subtitle,
  requestsTable,
  itemsTable
}: {
  title: string;
  subtitle: string;
  requestsTable: string;
  itemsTable: string;
}) {
  const sb = getServiceSupabase();
  const [{ data: requests }, { data: items }] = await Promise.all([
    sb.from(requestsTable).select("*").order("created_at", { ascending: false }).limit(100),
    sb.from(itemsTable).select("*")
  ]);
  const itemsByReq: Record<string, QuoteItem[]> = {};
  for (const it of (items as QuoteItem[]) ?? []) {
    (itemsByReq[it.request_id] ||= []).push(it);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </header>

      {!requests || requests.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No quote requests yet.
        </p>
      ) : (
        <section className="space-y-4">
          {(requests as QuoteRequest[]).map((r) => {
            const reqItems = itemsByReq[r.id] ?? [];
            const pieceCount = reqItems.reduce((s, it) => s + it.qty, 0);
            return (
              <article key={r.id} className="rounded-lg border border-slate-200 bg-white p-5">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-slate-500">
                      <a className="underline" href={`mailto:${r.email}`}>{r.email}</a>
                      {r.phone && <> · <a className="underline" href={`tel:${r.phone}`}>{r.phone}</a></>}
                      {r.postal_code && <> · {r.postal_code}</>}
                    </p>
                    {r.address && <p className="text-sm text-slate-500">{r.address}</p>}
                    {r.referrer_site && <p className="text-xs text-slate-400">Referred from {r.referrer_site}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCad(Number(r.subtotal_cad))}</p>
                    <p className="text-xs text-slate-500">
                      {pieceCount} items{r.status ? ` · ${r.status}` : ""}
                    </p>
                    <p className="text-xs text-slate-400">{new Date(r.created_at).toLocaleString()}</p>
                  </div>
                </header>
                {r.notes && (
                  <p className="mt-3 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">{r.notes}</p>
                )}
                <ul className="mt-3 space-y-1 text-sm">
                  {reqItems.map((it, i) => (
                    <li key={i} className="flex justify-between gap-4 border-b border-slate-100 py-1.5 last:border-0">
                      <span>
                        {it.name} × {it.qty}
                        <span className="ml-2 font-mono text-[10px] text-slate-400">{it.sku}</span>
                      </span>
                      <span className="shrink-0 font-mono">
                        {it.unit_price_cad != null ? formatCad(Number(it.unit_price_cad) * it.qty) : "Quote on request"}
                      </span>
                    </li>
                  ))}
                  {reqItems.length === 0 && (
                    <li className="py-1.5 text-slate-500">No line items recorded for this request.</li>
                  )}
                </ul>
                <p className="mt-3 font-mono text-[10px] text-slate-400">ID: {r.id}</p>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
