"use client";

// Save designs (browser + optional cloud short-link) and share them.

import { useEffect, useState } from "react";
import { usePlanner } from "./planner-context";
import { deleteSaved, listSaved, loadSaved, saveNamed, defaultDesign } from "@/lib/planner/store";
import { encodeDesign, shareUrlFor } from "@/lib/planner/encode";
import { uid, type SavedDesignMeta } from "@/lib/planner/types";

export function SaveSharePanel({ mode, onClose }: { mode: "save" | "share"; onClose: () => void }) {
  const { design, dispatch, toast, setUi } = usePlanner();
  const [saved, setSaved] = useState<SavedDesignMeta[]>([]);
  const [name, setName] = useState(design.name);
  const [link, setLink] = useState<string | null>(null);
  const [shortLink, setShortLink] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => setSaved(listSaved()), []);
  useEffect(() => setName(design.name), [design.name]);

  const doSave = () => {
    const trimmed = name.trim() || "My kitchen";
    if (trimmed !== design.name) dispatch({ type: "rename", name: trimmed });
    saveNamed({ ...design, name: trimmed });
    setSaved(listSaved());
    toast(`Saved “${trimmed}” on this device.`);
  };

  const makeLink = async () => {
    setBusy(true);
    try {
      const payload = await encodeDesign(design);
      const url = shareUrlFor(payload);
      setLink(url);
      // Try the short cloud link; fall back silently to the long link.
      try {
        const res = await fetch("/api/designs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ design }),
        });
        if (res.ok) {
          const data = (await res.json()) as { code?: string };
          if (data.code) setShortLink(`${window.location.origin}/planner/d/${data.code}`);
        }
      } catch {
        /* no cloud — long link still works */
      }
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (mode === "share") void makeLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Link copied.");
    } catch {
      toast("Copy failed — select the link and copy it manually.");
    }
  };

  const best = shortLink ?? link;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-dark)]">{mode === "save" ? "Save" : "Share"}</p>
          <h3 className="font-display text-lg text-[var(--color-ink)]">{mode === "save" ? "Save your design" : "Share this design"}</h3>
        </div>
        <button type="button" onClick={onClose} className="h-9 w-9 text-xl leading-none" aria-label="Close">
          ×
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin p-4 space-y-6">
        {mode === "save" && (
          <section>
            <label htmlFor="design-name" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">
              Design name
            </label>
            <input id="design-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 text-sm" />
            <button type="button" onClick={doSave} className="btn-primary mt-2 w-full text-sm">
              Save on this device
            </button>
            <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">Your work also auto-saves as you go. Saved designs live in this browser — use Share to get a link you can open anywhere.</p>
          </section>
        )}

        {mode === "share" && (
          <section>
            <p className="text-[12px] text-[var(--color-ink-soft)]">The link contains the whole design — open it on any device, or send it to us with your quote request — it travels with your quote automatically when you add the design to your quote list.</p>
            {busy && !best && <p className="mt-2 text-sm">Preparing link…</p>}
            {best && (
              <>
                <textarea readOnly value={best} rows={shortLink ? 2 : 4} className="mt-2 block w-full rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] p-2 font-mono text-[11px]" onFocus={(e) => e.currentTarget.select()} />
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" onClick={() => copy(best)} className="btn-primary text-sm">
                    Copy link
                  </button>
                  <a href={`mailto:?subject=${encodeURIComponent(`Kitchen design — ${design.name}`)}&body=${encodeURIComponent(`Here's my kitchen design from RTA Cabinets Canada:\n\n${best}`)}`} className="btn-secondary text-sm">
                    Email it
                  </a>
                  {typeof navigator !== "undefined" && "share" in navigator && (
                    <button type="button" className="btn-secondary text-sm" onClick={() => navigator.share({ title: design.name, url: best }).catch(() => {})}>
                      Share…
                    </button>
                  )}
                </div>
                {!shortLink && link && <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">Long link — it works everywhere, it&rsquo;s just not pretty.</p>}
              </>
            )}
          </section>
        )}

        <section>
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">My designs on this device</h4>
          {saved.length === 0 ? (
            <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">Nothing saved yet.</p>
          ) : (
            <ul className="mt-2 divide-y divide-[var(--color-border)] border border-[var(--color-border)] bg-white">
              {saved.map((s) => (
                <li key={s.id} className="flex items-center gap-2 px-3 py-2 text-[12px]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{s.name}</p>
                    <p className="text-[11px] text-[var(--color-ink-soft)]">
                      {s.itemCount} unit{s.itemCount === 1 ? "" : "s"} · {new Date(s.updatedAt).toLocaleDateString("en-CA")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-mini"
                    onClick={() => {
                      const d = loadSaved(s.id);
                      if (d) {
                        dispatch({ type: "load", design: d });
                        setUi({ selectedId: null, step: 2 });
                        toast(`Opened “${d.name}”.`);
                        onClose();
                      }
                    }}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    className="btn-mini border-red-300 text-red-700 hover:bg-red-600 hover:text-white"
                    onClick={() => {
                      deleteSaved(s.id);
                      setSaved(listSaved());
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <button
            type="button"
            className="btn-secondary w-full text-sm"
            onClick={() => {
              if (design.items.length && !window.confirm("Start a new design? Your current design stays in “My designs” only if you saved it.")) return;
              dispatch({ type: "reset", design: { ...defaultDesign(), id: uid() } });
              setUi({ selectedId: null, step: 1, activeSurface: 0, snapshot: null });
              onClose();
            }}
          >
            Start a new design
          </button>
        </section>
      </div>
    </div>
  );
}
