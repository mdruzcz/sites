import { getActiveStore } from "@/lib/store-context";
import { getServiceSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ContactMessage = {
  id: string;
  store_id: string;
  name: string;
  email: string;
  phone: string | null;
  province: string | null;
  subject: string | null;
  message: string;
  source: string | null;
  created_at: string;
};

export default async function ContactMessagesPage() {
  const store = await getActiveStore();
  if (!store) {
    return <p className="text-sm text-slate-500">No store selected.</p>;
  }

  const sb = getServiceSupabase();
  const { data: messages } = await sb
    .from("ecom_contact_messages")
    .select("*")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Contact Messages — {store.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          Contact and shipping-quote form submissions from {store.domain}.
        </p>
      </header>

      {!messages || messages.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          No contact messages yet for this store.
        </p>
      ) : (
        <section className="space-y-4">
          {(messages as ContactMessage[]).map((m) => (
            <article key={m.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-slate-500">
                    <a className="underline" href={`mailto:${m.email}`}>{m.email}</a>
                    {m.phone && <> · <a className="underline" href={`tel:${m.phone}`}>{m.phone}</a></>}
                    {m.province && <> · {m.province}</>}
                  </p>
                </div>
                <div className="text-right">
                  {m.subject && <p className="text-sm font-medium">{m.subject}</p>}
                  {m.source && <p className="text-xs text-slate-500">{m.source}</p>}
                  <p className="text-xs text-slate-400">{new Date(m.created_at).toLocaleString()}</p>
                </div>
              </header>
              <p className="mt-3 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">{m.message}</p>
              <p className="mt-3 font-mono text-[10px] text-slate-400">ID: {m.id}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
