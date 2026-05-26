import { getServiceSupabase } from "@/lib/supabase/server";
import { formatCad } from "@/lib/ready-kitchens/queries";

export const dynamic = "force-dynamic";

type QuoteRequest = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  postal_code: string | null;
  pickup_preference: string | null;
  notes: string | null;
  subtotal_cad: number;
  total_pieces: number;
  status: string;
};

type QuoteItem = {
  request_id: string;
  kit_slug: string;
  kit_name: string;
  qty: number;
  pieces_each: number;
  unit_price_cad: number;
};

export default async function QuoteRequestsPage() {
  const sb = getServiceSupabase();
  const [{ data: requests }, { data: items }] = await Promise.all([
    sb.from("readykitchens_quote_requests").select("*").order("created_at", { ascending: false }).limit(100),
    sb.from("readykitchens_quote_request_items").select("*"),
  ]);
  const itemsByReq: Record<string, QuoteItem[]> = {};
  for (const it of (items as QuoteItem[]) ?? []) {
    (itemsByReq[it.request_id] ||= []).push(it);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Ready Kitchens — Quote Requests</h1>
        <p className="mt-1 text-sm text-slate-500">Cart submissions from readykitchens.ca/request.</p>
      </header>

      {!requests || requests.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">No quote requests yet.</p>
      ) : (
        <section className="space-y-4">
          {(requests as QuoteRequest[]).map((r) => (
            <article key={r.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-slate-500">
                    <a className="underline" href={`mailto:${r.email}`}>{r.email}</a>
                    {r.phone && <> · <a className="underline" href={`tel:${r.phone}`}>{r.phone}</a></>}
                    {r.postal_code && <> · {r.postal_code}</>}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCad(Number(r.subtotal_cad))}</p>
                  <p className="text-xs text-slate-500">{r.total_pieces} cabinets · {r.pickup_preference}</p>
                  <p className="text-xs text-slate-400">{new Date(r.created_at).toLocaleString()}</p>
                </div>
              </header>
              {r.notes && (
                <p className="mt-3 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">{r.notes}</p>
              )}
              <ul className="mt-3 space-y-1 text-sm">
                {(itemsByReq[r.id] ?? []).map((it, i) => (
                  <li key={i} className="flex justify-between border-b border-slate-100 py-1.5 last:border-0">
                    <span>{it.kit_name} <span className="text-xs text-slate-500">({it.pieces_each} pcs)</span> × {it.qty}</span>
                    <span className="font-mono">{formatCad(Number(it.unit_price_cad) * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[10px] text-slate-400">ID: {r.id}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
