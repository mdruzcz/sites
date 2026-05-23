import { getServiceSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Msg = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  attachment_urls: string[];
  status: string;
};

export default async function ContactMessagesPage() {
  const sb = getServiceSupabase();
  const { data } = await sb
    .from("readykitchens_contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  const msgs = (data as Msg[]) ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Ready Kitchens — Contact Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Form submissions from readykitchens.ca/contact (with image attachments).</p>
      </header>

      {msgs.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">No messages yet.</p>
      ) : (
        <section className="space-y-4">
          {msgs.map((m) => (
            <article key={m.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{m.subject || m.name}</p>
                  <p className="text-sm text-slate-500">
                    {m.name} · <a className="underline" href={`mailto:${m.email}`}>{m.email}</a>
                    {m.phone && <> · <a className="underline" href={`tel:${m.phone}`}>{m.phone}</a></>}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <p>{new Date(m.created_at).toLocaleString()}</p>
                  <p className="font-mono">{m.id.slice(0, 8)}</p>
                </div>
              </header>
              <p className="mt-3 whitespace-pre-wrap rounded-md bg-slate-50 p-3 text-sm text-slate-700">{m.message}</p>
              {m.attachment_urls && m.attachment_urls.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {m.attachment_urls.map((url) => (
                    <a key={url} href={url} target="_blank" rel="noopener" className="block overflow-hidden rounded border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="aspect-square w-full object-cover" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
