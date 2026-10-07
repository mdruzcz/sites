export const dynamic = "force-dynamic";

const BUCKET = "rotary-audio";
const PUBLIC_PAGE = "https://masterdecker.com/rotaryclub";

type Item = { id: string; title: string; artist?: string; kind?: string; duration?: number | null };
type PropPick = { id: string; name: string; group?: string };
type Playlist = {
  selected: string[];
  order: string[];
  items?: Item[];
  props?: PropPick[];
  notes?: string;
  editor?: string;
  approved?: { by: string; at: string } | null;
  updatedAt?: string;
};

function storage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return { base: `${url}/storage/v1/object`, headers: { apikey: key, Authorization: `Bearer ${key}` } };
}

async function loadPlaylist(): Promise<{ playlist: Playlist | null; history: string[] }> {
  const { base, headers } = storage();
  const list = await fetch(`${base}/list/${BUCKET}`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ prefix: "history", limit: 100, sortBy: { column: "name", order: "desc" } }),
    cache: "no-store",
  });
  const history = list.ok ? ((await list.json()) as { name: string }[]).map((o) => o.name) : [];
  const path = history[0] ? `history/${history[0]}` : "playlist.json";
  const r = await fetch(`${base}/authenticated/${BUCKET}/${path}`, { headers, cache: "no-store" });
  if (!r.ok) return { playlist: null, history };
  return { playlist: (await r.json()) as Playlist, history };
}

function fmt(seconds?: number | null) {
  if (seconds == null) return "—";
  const t = Math.round(seconds);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function when(iso?: string) {
  return iso ? new Date(iso).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" }) : "";
}

export default async function RotaryPlaylistPage() {
  const { playlist, history } = await loadPlaylist();
  const items = playlist?.items?.length
    ? playlist.order.map((id) => playlist.items!.find((i) => i.id === id) ?? { id, title: id })
    : (playlist?.order ?? []).map((id) => ({ id, title: id }));
  const songs = items.filter((i) => (i as Item).kind !== "skit");
  const total = items.reduce((s, i) => s + ((i as Item).duration ?? 0), 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Blenheim Rotary Club — Light Show Playlist</h1>
          <p className="mt-1 text-sm text-slate-500">
            What the client has picked on{" "}
            <a href={PUBLIC_PAGE} target="_blank" rel="noreferrer" className="underline">
              masterdecker.com/rotaryclub
            </a>
            .
          </p>
        </div>
        {playlist?.approved ? (
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="font-semibold">✅ Approved by {playlist.approved.by || "the client"}</p>
            <p>{when(playlist.approved.at)}</p>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="font-semibold">⏳ Not approved yet</p>
            <p>{playlist ? "The client is still editing." : "Nothing saved yet."}</p>
          </div>
        )}
      </header>

      {!playlist ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
          The client hasn&apos;t saved a playlist yet. The page shows last year&apos;s show as the default until they do.
        </p>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-4">
            <Stat label="Items" value={String(items.length)} />
            <Stat label="Songs / skits" value={`${songs.length} / ${items.length - songs.length}`} />
            <Stat label="Runtime" value={fmt(total)} />
            <Stat label="Last saved" value={`${when(playlist.updatedAt)}${playlist.editor ? ` · ${playlist.editor}` : ""}`} />
          </section>

          <section className="rounded-lg border border-slate-200 bg-white">
            <h2 className="border-b border-slate-200 px-4 py-3 font-semibold">Running order</h2>
            <ol className="divide-y divide-slate-100">
              {items.map((i, n) => (
                <li key={i.id} className="flex items-center gap-4 px-4 py-2.5 text-sm">
                  <span className="w-6 text-right font-semibold tabular-nums text-slate-400">{n + 1}.</span>
                  <span className="flex-1">
                    <span className="font-medium">{i.title}</span>
                    {(i as Item).artist ? <span className="text-slate-500"> — {(i as Item).artist}</span> : null}
                    {(i as Item).kind === "skit" ? (
                      <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold uppercase text-sky-800">skit</span>
                    ) : null}
                  </span>
                  <span className="tabular-nums text-slate-500">{fmt((i as Item).duration)}</span>
                  <code className="hidden text-xs text-slate-400 md:inline">{i.id}</code>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white">
            <h2 className="border-b border-slate-200 px-4 py-3 font-semibold">
              Props they&apos;re interested in {playlist.props?.length ? `(${playlist.props.length})` : ""}
            </h2>
            {playlist.props?.length ? (
              <ul className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {playlist.props.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 rounded-md border border-slate-200 p-2 text-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://masterdecker.com/images/rotary/props/${p.id}.jpg`} alt="" className="h-14 w-14 rounded object-cover" />
                    <span>
                      <span className="block font-medium">{p.name}</span>
                      <span className="text-xs text-slate-500">{p.group}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-sm text-slate-500">None ticked yet.</p>
            )}
          </section>

          <section className="rounded-lg border border-slate-200 bg-white">
            <h2 className="border-b border-slate-200 px-4 py-3 font-semibold">Notes from the client</h2>
            <p className="whitespace-pre-wrap p-4 text-sm text-slate-700">{playlist.notes?.trim() || "—"}</p>
          </section>

          <details className="rounded-lg border border-slate-200 bg-white">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">Save history ({history.length})</summary>
            <ul className="divide-y divide-slate-100 px-4 pb-3 text-xs text-slate-500">
              {history.map((h) => (
                <li key={h} className="py-1.5">{h.replace(/\.json$/, "").replace(/-(\d\d)-(\d\d)-(\d{3})Z$/, ":$1:$2.$3Z")}</li>
              ))}
            </ul>
          </details>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
