"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Track = {
  id: string;
  title: string;
  artist: string;
  kind: "song" | "skit" | string;
  lastYear: boolean;
  duration: number | null;
  src: string | null;
  sizeMb: number;
};

type Library = {
  updated: string;
  showYear: number;
  fullShow: { id: string; title: string; duration: number; src: string };
  tracks: Track[];
};

type SavedPlaylist = {
  selected: string[];
  order: string[];
  notes?: string;
  editor?: string;
  updatedAt?: string;
};

const API =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3100/api/rotary/playlist"
    : "https://admin.masterdecker.com/api/rotary/playlist";

const SONG_TARGET = 15;

function fmt(seconds: number | null | undefined) {
  if (seconds == null) return "—";
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
}

function fmtWhen(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export function PlaylistBuilder({ library }: { library: Library }) {
  const byId = useMemo(() => new Map(library.tracks.map((t) => [t.id, t])), [library.tracks]);
  const lastYearIds = useMemo(() => library.tracks.filter((t) => t.lastYear).map((t) => t.id), [library.tracks]);

  // ---- selection + order -------------------------------------------------
  const [order, setOrder] = useState<string[]>(lastYearIds);
  const selected = useMemo(() => new Set(order), [order]);
  const [notes, setNotes] = useState("");
  const [editor, setEditor] = useState("");
  const [loaded, setLoaded] = useState<SavedPlaylist | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "offline">("loading");
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [step, setStep] = useState<"pick" | "order">("pick");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch(API, { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const data = (await r.json()) as { playlist: SavedPlaylist | null };
        if (cancelled) return;
        if (data.playlist) {
          const known = (data.playlist.order?.length ? data.playlist.order : data.playlist.selected).filter((id) => byId.has(id));
          setOrder(known);
          setNotes(data.playlist.notes ?? "");
          setEditor(data.playlist.editor ?? "");
          setLoaded(data.playlist);
        }
        setLoadState("ready");
      } catch {
        if (!cancelled) setLoadState("offline");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [byId]);

  useEffect(() => {
    if (!dirty) return;
    const onUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [dirty]);

  const toggle = useCallback((id: string) => {
    setOrder((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setDirty(true);
    setSaveState("idle");
  }, []);

  const move = useCallback((id: string, dir: -1 | 1) => {
    setOrder((prev) => {
      const i = prev.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setDirty(true);
    setSaveState("idle");
  }, []);

  const moveTo = useCallback((id: string, targetIndex: number) => {
    setOrder((prev) => {
      const from = prev.indexOf(id);
      if (from < 0) return prev;
      const next = prev.filter((x) => x !== id);
      next.splice(Math.max(0, Math.min(targetIndex, next.length)), 0, id);
      return next;
    });
    setDirty(true);
    setSaveState("idle");
  }, []);

  const resetToLastYear = () => {
    setOrder(lastYearIds);
    setDirty(true);
    setSaveState("idle");
  };

  const save = async () => {
    setSaveState("saving");
    try {
      const r = await fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected: order, order, notes, editor }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const data = (await r.json()) as { playlist: SavedPlaylist };
      setLoaded(data.playlist);
      setDirty(false);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  // ---- audio ----------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clipDuration, setClipDuration] = useState(0);

  const play = useCallback(
    (id: string, src: string) => {
      const a = audioRef.current;
      if (!a) return;
      if (playingId === id) {
        if (a.paused) void a.play();
        else a.pause();
        return;
      }
      a.src = src;
      a.currentTime = 0;
      setPlayingId(id);
      setProgress(0);
      void a.play();
    },
    [playingId],
  );

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setClipDuration(a.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (!a || !clipDuration) return;
    a.currentTime = ratio * clipDuration;
  };

  const nowPlaying = playingId === library.fullShow.id ? { ...library.fullShow, artist: "", kind: "show" } : playingId ? byId.get(playingId) : null;

  // ---- derived --------------------------------------------------------------
  const orderedTracks = order.map((id) => byId.get(id)!).filter(Boolean);
  const songCount = orderedTracks.filter((t) => t.kind === "song").length;
  const skitCount = orderedTracks.filter((t) => t.kind !== "song").length;
  const totalSeconds = orderedTracks.reduce((s, t) => s + (t.duration ?? 0), 0);

  const groups = [
    {
      key: "last",
      title: `Last year's show (${library.showYear})`,
      blurb: "Everything that played last year. These are pre-ticked — untick any you'd like to retire.",
      tracks: library.tracks.filter((t) => t.lastYear),
    },
    {
      key: "new",
      title: "New songs available",
      blurb: "Fully sequenced and ready to go. Preview and tick the ones you'd like to add.",
      tracks: library.tracks.filter((t) => !t.lastYear && t.src),
    },
    {
      key: "nopreview",
      title: "Also available (no preview yet)",
      blurb: "We have light sequences for these but no preview audio online yet. You can still pick them by name.",
      tracks: library.tracks.filter((t) => !t.lastYear && !t.src),
    },
  ];

  const copyList = async () => {
    const lines = orderedTracks.map((t, i) => `${i + 1}. ${t.title}${t.artist ? ` — ${t.artist}` : ""} (${fmt(t.duration)})`);
    lines.push("", `Total: ${orderedTracks.length} items · ${fmt(totalSeconds)}`);
    if (notes.trim()) lines.push("", `Notes: ${notes.trim()}`);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      alert("Playlist copied to your clipboard.");
    } catch {
      window.prompt("Copy your playlist:", lines.join("\n"));
    }
  };

  return (
    <div className="container py-8 md:py-12 pb-40">
      <audio ref={audioRef} preload="none" />

      {/* status / last saved */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6 text-sm">
        {loadState === "loading" && <span className="text-[var(--ink-mute)]">Loading your saved playlist…</span>}
        {loadState === "offline" && (
          <span className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            Couldn&apos;t reach the playlist server. You can still preview songs — saving will retry when you press Save.
          </span>
        )}
        {loadState === "ready" && loaded?.updatedAt && (
          <span className="text-[var(--ink-soft)]">
            Last saved {fmtWhen(loaded.updatedAt)}
            {loaded.editor ? ` by ${loaded.editor}` : ""}.
          </span>
        )}
        {loadState === "ready" && !loaded && (
          <span className="text-[var(--ink-soft)]">No playlist saved yet — last year&apos;s songs are ticked as a starting point.</span>
        )}
      </div>

      {/* full show player */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-4 md:p-5 mb-8 flex items-center gap-4">
        <PlayButton
          active={playingId === library.fullShow.id}
          playing={playingId === library.fullShow.id && isPlaying}
          onClick={() => play(library.fullShow.id, library.fullShow.src)}
          label="Play last year's full show"
        />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[var(--ink)]">{library.fullShow.title}</p>
          <p className="text-sm text-[var(--ink-mute)]">
            The complete {library.showYear} show as it ran, songs and skits in order · {fmt(library.fullShow.duration)}
          </p>
        </div>
      </div>

      {/* steps */}
      <div className="flex gap-2 mb-6" role="tablist" aria-label="Playlist steps">
        <StepTab active={step === "pick"} onClick={() => setStep("pick")} n={1} label="Pick your songs" />
        <StepTab active={step === "order"} onClick={() => setStep("order")} n={2} label={`Set the order (${orderedTracks.length})`} />
      </div>

      {step === "pick" && (
        <div className="space-y-10">
          <Legend />
          {groups.map(
            (g) =>
              g.tracks.length > 0 && (
                <section key={g.key}>
                  <div className="mb-3">
                    <h2 className="text-xl md:text-2xl font-extrabold text-[var(--ink)]">{g.title}</h2>
                    <p className="text-sm text-[var(--ink-mute)]">{g.blurb}</p>
                  </div>
                  <ul className="space-y-2">
                    {g.tracks.map((t) => (
                      <TrackRow
                        key={t.id}
                        track={t}
                        checked={selected.has(t.id)}
                        active={playingId === t.id}
                        playing={playingId === t.id && isPlaying}
                        onToggle={() => toggle(t.id)}
                        onPlay={() => t.src && play(t.id, t.src)}
                      />
                    ))}
                  </ul>
                </section>
              ),
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={() => setStep("order")} className="btn-primary">
              Next: set the order →
            </button>
            <button type="button" onClick={resetToLastYear} className="btn-outline">
              Reset to last year&apos;s show
            </button>
          </div>
        </div>
      )}

      {step === "order" && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <section>
            <div className="mb-3">
              <h2 className="text-xl md:text-2xl font-extrabold text-[var(--ink)]">Running order</h2>
              <p className="text-sm text-[var(--ink-mute)]">
                Drag a row to move it, or use the arrows. Skits can go anywhere between songs.
              </p>
            </div>
            {orderedTracks.length === 0 ? (
              <p className="bg-white border border-dashed border-[var(--border)] rounded-xl p-6 text-center text-[var(--ink-mute)]">
                Nothing selected yet.{" "}
                <button type="button" className="text-[var(--accent)] font-semibold underline" onClick={() => setStep("pick")}>
                  Go pick some songs
                </button>
                .
              </p>
            ) : (
              <OrderList
                tracks={orderedTracks}
                playingId={playingId}
                isPlaying={isPlaying}
                onPlay={(t) => t.src && play(t.id, t.src)}
                onMove={move}
                onMoveTo={moveTo}
                onRemove={toggle}
              />
            )}
          </section>

          <aside className="bg-white border border-[var(--border)] rounded-2xl p-5 space-y-4 lg:sticky lg:top-24">
            <h3 className="font-extrabold text-lg">Your playlist</h3>
            <dl className="text-sm grid grid-cols-2 gap-y-1">
              <dt className="text-[var(--ink-mute)]">Songs</dt>
              <dd className="font-semibold text-right">
                {songCount} <span className="text-[var(--ink-mute)] font-normal">/ ~{SONG_TARGET}</span>
              </dd>
              <dt className="text-[var(--ink-mute)]">Skits</dt>
              <dd className="font-semibold text-right">{skitCount}</dd>
              <dt className="text-[var(--ink-mute)]">Total runtime</dt>
              <dd className="font-semibold text-right">{fmt(totalSeconds)}</dd>
            </dl>
            <label className="block text-sm">
              <span className="font-semibold">Your name</span>
              <input
                value={editor}
                onChange={(e) => {
                  setEditor(e.target.value);
                  setDirty(true);
                  setSaveState("idle");
                }}
                placeholder="So we know who saved this"
                autoComplete="name"
                className="mt-1 w-full border border-[var(--border)] rounded-lg px-3 py-2.5 min-h-[44px]"
              />
            </label>
            <label className="block text-sm">
              <span className="font-semibold">Notes for Master Decker</span>
              <textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setDirty(true);
                  setSaveState("idle");
                }}
                rows={4}
                placeholder="Anything else — a song you'd love that isn't listed, timing requests, etc."
                className="mt-1 w-full border border-[var(--border)] rounded-lg px-3 py-2.5"
              />
            </label>
            <button type="button" onClick={copyList} className="btn-outline w-full">
              Copy list as text
            </button>
          </aside>
        </div>
      )}

      {/* sticky save bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[var(--border)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="container py-3 flex items-center gap-3 md:gap-6">
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-bold text-[var(--ink)] truncate">
              <span className="md:hidden">
                {songCount} song{songCount === 1 ? "" : "s"} + {skitCount} skit{skitCount === 1 ? "" : "s"} · {fmt(totalSeconds)}
              </span>
              <span className="hidden md:inline">
                {orderedTracks.length} selected · {songCount} song{songCount === 1 ? "" : "s"}, {skitCount} skit{skitCount === 1 ? "" : "s"} · {fmt(totalSeconds)}
              </span>
            </p>
            <p className="text-xs text-[var(--ink-mute)] truncate">
              {saveState === "saved" && "Saved — thanks! We can see your playlist now."}
              {saveState === "saving" && "Saving…"}
              {saveState === "error" && "Save failed. Please try again or call us at (519) 266-6796."}
              {saveState === "idle" && (dirty ? "You have unsaved changes." : "Everything is saved.")}
            </p>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saveState === "saving"}
            className="btn-primary whitespace-nowrap disabled:opacity-60"
          >
            {saveState === "saving" ? "Saving…" : "Save playlist"}
          </button>
        </div>
        {nowPlaying && (
          <div className="border-t border-[var(--border)] bg-[var(--shell)] text-white">
            <div className="container py-2 flex items-center gap-3 text-sm">
              <PlayButton
                small
                active
                playing={isPlaying}
                onClick={() => play(nowPlaying.id, nowPlaying.src!)}
                label={isPlaying ? "Pause" : "Play"}
              />
              <span className="font-semibold truncate">{nowPlaying.title}</span>
              <span className="text-white/60 tabular-nums whitespace-nowrap">
                {fmt(progress)} / {fmt(clipDuration || nowPlaying.duration)}
              </span>
              <input
                type="range"
                min={0}
                max={1000}
                value={clipDuration ? Math.round((progress / clipDuration) * 1000) : 0}
                onChange={(e) => seek(Number(e.target.value) / 1000)}
                aria-label="Seek"
                className="flex-1 accent-[var(--accent)] min-w-[80px]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--ink-soft)]">
      <span className="inline-flex items-center gap-2">
        <span className="inline-block w-3.5 h-3.5 rounded-sm bg-emerald-100 border-l-4 border-emerald-500" /> Played last year
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-block w-3.5 h-3.5 rounded-sm bg-orange-50 ring-2 ring-[var(--accent)]" /> Selected for this year
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-block w-3.5 h-3.5 rounded-sm bg-white border border-[var(--border)]" /> Not selected
      </span>
    </div>
  );
}

function StepTab({ active, onClick, n, label }: { active: boolean; onClick: () => void; n: number; label: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex-1 md:flex-none flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold min-h-[44px] transition-colors ${
        active ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-white text-[var(--ink)] border-[var(--border)] hover:border-[var(--accent)]"
      }`}
    >
      <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center ${active ? "bg-[var(--accent)] text-white" : "bg-[var(--surface-2)]"}`}>{n}</span>
      {label}
    </button>
  );
}

function PlayButton({
  active,
  playing,
  onClick,
  label,
  disabled,
  small,
}: {
  active: boolean;
  playing: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  small?: boolean;
}) {
  const size = small ? "w-9 h-9" : "w-11 h-11";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`${size} shrink-0 rounded-full flex items-center justify-center transition-colors ${
        disabled
          ? "bg-[var(--surface-2)] text-[var(--ink-mute)] cursor-not-allowed"
          : active
            ? "bg-[var(--accent)] text-white shadow-md"
            : "bg-[var(--ink)] text-white hover:bg-[var(--accent)]"
      }`}
    >
      {playing ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z" />
        </svg>
      )}
    </button>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "green" | "grey" | "blue" }) {
  const cls =
    tone === "green"
      ? "bg-emerald-100 text-emerald-800"
      : tone === "blue"
        ? "bg-sky-100 text-sky-800"
        : "bg-[var(--surface-2)] text-[var(--ink-soft)]";
  return <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cls}`}>{children}</span>;
}

function TrackRow({
  track,
  checked,
  active,
  playing,
  onToggle,
  onPlay,
}: {
  track: Track;
  checked: boolean;
  active: boolean;
  playing: boolean;
  onToggle: () => void;
  onPlay: () => void;
}) {
  const inputId = `pick-${track.id}`;
  return (
    <li
      className={`flex items-center gap-3 md:gap-4 rounded-xl border px-3 py-2.5 md:px-4 transition-all ${
        checked ? "bg-orange-50 ring-2 ring-[var(--accent)] border-transparent" : "bg-white border-[var(--border)]"
      } ${track.lastYear ? "border-l-4 border-l-emerald-500" : ""}`}
    >
      <PlayButton active={active} playing={playing} onClick={onPlay} disabled={!track.src} label={playing ? `Pause ${track.title}` : `Play ${track.title}`} />
      <label htmlFor={inputId} className="min-w-0 flex-1 cursor-pointer py-1">
        <span className={`block font-bold leading-tight ${active ? "text-[var(--accent)]" : "text-[var(--ink)]"}`}>{track.title}</span>
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--ink-mute)] mt-0.5">
          {track.artist && <span>{track.artist}</span>}
          {track.kind === "skit" && <Badge tone="blue">Skit</Badge>}
          {track.lastYear && <Badge tone="green">Last year&apos;s show</Badge>}
          {!track.src && <Badge tone="grey">No preview</Badge>}
        </span>
      </label>
      <span className="text-sm tabular-nums text-[var(--ink-soft)] w-12 text-right shrink-0">{fmt(track.duration)}</span>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={`Select ${track.title}`}
        className="w-6 h-6 shrink-0 accent-[var(--accent)] cursor-pointer"
      />
    </li>
  );
}

function OrderList({
  tracks,
  playingId,
  isPlaying,
  onPlay,
  onMove,
  onMoveTo,
  onRemove,
}: {
  tracks: Track[];
  playingId: string | null;
  isPlaying: boolean;
  onPlay: (t: Track) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onMoveTo: (id: string, index: number) => void;
  onRemove: (id: string) => void;
}) {
  const [dragId, setDragId] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  return (
    <ol className="space-y-2">
      {tracks.map((t, i) => {
        const dragging = dragId === t.id;
        const over = overIndex === i && dragId && dragId !== t.id;
        return (
          <li
            key={t.id}
            draggable
            onDragStart={(e) => {
              setDragId(t.id);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", t.id);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (overIndex !== i) setOverIndex(i);
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = dragId ?? e.dataTransfer.getData("text/plain");
              if (id) onMoveTo(id, i);
              setDragId(null);
              setOverIndex(null);
            }}
            onDragEnd={() => {
              setDragId(null);
              setOverIndex(null);
            }}
            className={`flex items-center gap-2 md:gap-3 rounded-xl border px-2 py-2 md:px-3 bg-white transition-all ${
              dragging ? "opacity-40" : ""
            } ${over ? "ring-2 ring-[var(--accent)] border-transparent" : "border-[var(--border)]"} ${
              t.lastYear ? "border-l-4 border-l-emerald-500" : ""
            }`}
          >
            <span
              className="cursor-grab active:cursor-grabbing text-[var(--ink-mute)] px-1 touch-none select-none"
              aria-hidden="true"
              title="Drag to reorder"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="6" r="1.6" />
                <circle cx="15" cy="6" r="1.6" />
                <circle cx="9" cy="12" r="1.6" />
                <circle cx="15" cy="12" r="1.6" />
                <circle cx="9" cy="18" r="1.6" />
                <circle cx="15" cy="18" r="1.6" />
              </svg>
            </span>
            <span className="w-7 text-sm font-extrabold tabular-nums text-[var(--ink-mute)] text-right shrink-0">{i + 1}.</span>
            <PlayButton
              small
              active={playingId === t.id}
              playing={playingId === t.id && isPlaying}
              onClick={() => onPlay(t)}
              disabled={!t.src}
              label={`Play ${t.title}`}
            />
            <span className="min-w-0 flex-1">
              <span className={`block font-bold leading-tight truncate ${playingId === t.id ? "text-[var(--accent)]" : ""}`}>{t.title}</span>
              <span className="flex items-center gap-2 text-xs text-[var(--ink-mute)]">
                {t.artist && <span className="truncate">{t.artist}</span>}
                {t.kind === "skit" && <Badge tone="blue">Skit</Badge>}
              </span>
            </span>
            <span className="text-sm tabular-nums text-[var(--ink-soft)] shrink-0">{fmt(t.duration)}</span>
            <span className="flex flex-col shrink-0">
              <button
                type="button"
                onClick={() => onMove(t.id, -1)}
                disabled={i === 0}
                aria-label={`Move ${t.title} up`}
                className="w-9 h-6 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--accent)] disabled:opacity-25"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 6l5 6H5z" /></svg>
              </button>
              <button
                type="button"
                onClick={() => onMove(t.id, 1)}
                disabled={i === tracks.length - 1}
                aria-label={`Move ${t.title} down`}
                className="w-9 h-6 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--accent)] disabled:opacity-25"
              >
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 14l-5-6h10z" /></svg>
              </button>
            </span>
            <button
              type="button"
              onClick={() => onRemove(t.id)}
              aria-label={`Remove ${t.title}`}
              title="Remove from playlist"
              className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[var(--ink-mute)] hover:bg-red-50 hover:text-red-600"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.3 5.3a1 1 0 0 1 1.4 0L10 7.6l2.3-2.3a1 1 0 1 1 1.4 1.4L11.4 9l2.3 2.3a1 1 0 0 1-1.4 1.4L10 10.4l-2.3 2.3a1 1 0 0 1-1.4-1.4L8.6 9 6.3 6.7a1 1 0 0 1 0-1.4z" />
              </svg>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
