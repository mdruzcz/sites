"use client";

// Step 1 — Define your space: room shape, dimensions, ceiling, walls, windows & doors.

import { useState } from "react";
import { usePlanner } from "./planner-context";
import { FloorView } from "./floor-view";
import { ROOM_PRESETS } from "@/lib/planner/store";
import { WALL_NAMES, formatFeet, type Opening, type WallId } from "@/lib/planner/types";

export function StepSpace() {
  const { design, dispatch, setUi } = usePlanner();
  const { room } = design;
  const [newKind, setNewKind] = useState<"window" | "door">("window");
  const [newWall, setNewWall] = useState<WallId>(0);

  const activePreset = ROOM_PRESETS.find((p) => p.openWalls.length === room.openWalls.length && p.openWalls.every((w) => room.openWalls.includes(w)));

  const addOpening = () => {
    const len = newWall === 0 || newWall === 2 ? room.width : room.depth;
    const width = newKind === "door" ? 32 : 36;
    dispatch({
      type: "add-opening",
      opening: { wall: newWall, kind: newKind, width, height: newKind === "door" ? 80 : 48, sill: newKind === "door" ? 0 : 42, t: Math.max(0, (len - width) / 2) },
    });
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:px-6">
      <div className="space-y-7">
        <header>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-accent-dark)]">Step 1 of 3</p>
          <h1 className="mt-1 font-display text-3xl text-[var(--color-ink)]">Define your space</h1>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">Measure wall to wall in inches. You can tweak everything later — the plan updates live on the right.</p>
        </header>

        {/* Shape presets */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Room shape</h2>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {ROOM_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => dispatch({ type: "apply-preset", preset: p })}
                className={`rounded-md border p-2 text-left transition-colors ${activePreset?.id === p.id ? "border-[var(--color-ink)] bg-[var(--color-cream)]" : "border-[var(--color-border)] bg-white hover:border-[var(--color-ink)]"}`}
              >
                <ShapeGlyph open={p.openWalls} />
                <p className="mt-1.5 text-[13px] font-medium leading-tight text-[var(--color-ink)]">{p.label}</p>
                <p className="text-[11px] leading-snug text-[var(--color-ink-soft)]">{p.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Dimensions */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Dimensions (inches)</h2>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <NumberField label="Back wall (width)" value={room.width} min={48} max={480} hint={formatFeet(room.width)} onChange={(v) => dispatch({ type: "set-room", patch: { width: v } })} />
            <NumberField label="Side walls (depth)" value={room.depth} min={48} max={480} hint={formatFeet(room.depth)} onChange={(v) => dispatch({ type: "set-room", patch: { depth: v } })} />
            <NumberField label="Ceiling height" value={room.ceiling} min={84} max={144} hint={formatFeet(room.ceiling)} onChange={(v) => dispatch({ type: "set-room", patch: { ceiling: v } })} />
          </div>
          <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">96″ = 8 ft · 120″ = 10 ft · 144″ = 12 ft</p>
        </section>

        {/* Walls */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Walls</h2>
          <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">Turn a wall off if that side of the kitchen is open to another room.</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {([0, 1, 2, 3] as WallId[]).map((w) => {
              const open = room.openWalls.includes(w);
              return (
                <label key={w} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-[13px] ${open ? "border-[var(--color-border)] bg-white text-[var(--color-ink-soft)]" : "border-[var(--color-ink)] bg-[var(--color-cream)]"}`}>
                  <input type="checkbox" checked={!open} onChange={() => dispatch({ type: "toggle-open-wall", wall: w })} />
                  <span>
                    {WALL_NAMES[w]} <span className="text-[11px] text-[var(--color-ink-soft)]">{open ? "· open" : ""}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Openings */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Windows &amp; doors</h2>
          <div className="mt-2 flex flex-wrap items-end gap-2">
            <label className="text-[11px] text-[var(--color-ink-soft)]">
              Type
              <select value={newKind} onChange={(e) => setNewKind(e.target.value as "window" | "door")} className="mt-1 block h-9 rounded-md border border-[var(--color-border)] bg-white px-2 text-sm">
                <option value="window">Window</option>
                <option value="door">Door</option>
              </select>
            </label>
            <label className="text-[11px] text-[var(--color-ink-soft)]">
              On
              <select value={newWall} onChange={(e) => setNewWall(Number(e.target.value) as WallId)} className="mt-1 block h-9 rounded-md border border-[var(--color-border)] bg-white px-2 text-sm">
                {([0, 1, 2, 3] as WallId[]).filter((w) => !room.openWalls.includes(w)).map((w) => (
                  <option key={w} value={w}>
                    {WALL_NAMES[w]}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={addOpening} className="btn-secondary h-9 px-3 py-0 text-xs">
              + Add
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {room.openings.length === 0 && <li className="text-[12px] text-[var(--color-ink-soft)]">No windows or doors yet.</li>}
            {room.openings.map((o) => (
              <OpeningRow key={o.id} o={o} room={room} onChange={(patch) => dispatch({ type: "update-opening", id: o.id, patch })} onRemove={() => dispatch({ type: "remove-opening", id: o.id })} />
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-[var(--color-ink-soft)]">“From left” is measured standing in the room looking at that wall.</p>
        </section>

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="button" onClick={() => setUi({ step: 2 })} className="btn-primary">
            Continue to cabinets →
          </button>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden border border-[var(--color-border)] bg-white">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2">
            <p className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">Floor plan preview</p>
            <p className="text-[11px] text-[var(--color-ink-soft)]">
              {formatFeet(room.width)} × {formatFeet(room.depth)} · {((room.width * room.depth) / 144).toFixed(1)} ft²
            </p>
          </div>
          <FloorView design={design} readonly className="aspect-[4/3] w-full" />
        </div>
      </div>
    </div>
  );
}

function ShapeGlyph({ open }: { open: WallId[] }) {
  const solid = (w: WallId) => !open.includes(w);
  const s = solid;
  const stroke = "#1c1917";
  const dash = "#d6cfc4";
  return (
    <svg viewBox="0 0 60 44" className="h-10 w-14" aria-hidden="true">
      <rect x="6" y="6" width="48" height="32" fill="#f4ecdd" />
      <line x1="6" y1="6" x2="54" y2="6" stroke={s(0) ? stroke : dash} strokeWidth={s(0) ? 3 : 1} strokeDasharray={s(0) ? undefined : "3 2"} />
      <line x1="54" y1="6" x2="54" y2="38" stroke={s(1) ? stroke : dash} strokeWidth={s(1) ? 3 : 1} strokeDasharray={s(1) ? undefined : "3 2"} />
      <line x1="54" y1="38" x2="6" y2="38" stroke={s(2) ? stroke : dash} strokeWidth={s(2) ? 3 : 1} strokeDasharray={s(2) ? undefined : "3 2"} />
      <line x1="6" y1="38" x2="6" y2="6" stroke={s(3) ? stroke : dash} strokeWidth={s(3) ? 3 : 1} strokeDasharray={s(3) ? undefined : "3 2"} />
    </svg>
  );
}

function NumberField({ label, value, min, max, hint, onChange }: { label: string; value: number; min: number; max: number; hint?: string; onChange: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    const n = Number(draft);
    if (Number.isFinite(n)) onChange(Math.min(max, Math.max(min, n)));
    setDraft(null);
  };
  return (
    <label className="block text-[11px] text-[var(--color-ink-soft)]">
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={draft ?? value}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        className="mt-1 block h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-2 text-base text-[var(--color-ink)] focus:border-[var(--color-ink)] focus:outline-none"
      />
      {hint && <span className="mt-0.5 block text-[11px]">{hint}</span>}
    </label>
  );
}

function OpeningRow({ o, room, onChange, onRemove }: { o: Opening; room: { width: number; depth: number; openWalls: WallId[] }; onChange: (patch: Partial<Opening>) => void; onRemove: () => void }) {
  const len = o.wall === 0 || o.wall === 2 ? room.width : room.depth;
  return (
    <li className="rounded-md border border-[var(--color-border)] bg-white p-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-medium capitalize text-[var(--color-ink)]">
          {o.kind} · {WALL_NAMES[o.wall]}
        </p>
        <button type="button" onClick={onRemove} className="text-[11px] text-red-700 underline underline-offset-2">
          Remove
        </button>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        <Small label="From left" value={o.t} max={len - o.width} onChange={(v) => onChange({ t: v })} />
        <Small label="Width" value={o.width} max={len} onChange={(v) => onChange({ width: v })} />
        <Small label="Height" value={o.height} max={144} onChange={(v) => onChange({ height: v })} />
        {o.kind === "window" ? <Small label="Sill height" value={o.sill} max={120} onChange={(v) => onChange({ sill: v })} /> : <span />}
      </div>
      <label className="mt-1.5 block text-[11px] text-[var(--color-ink-soft)]">
        Move to wall
        <select value={o.wall} onChange={(e) => onChange({ wall: Number(e.target.value) as WallId })} className="ml-2 h-8 rounded-md border border-[var(--color-border)] bg-white px-1 text-xs">
          {([0, 1, 2, 3] as WallId[]).filter((w) => !room.openWalls.includes(w)).map((w) => (
            <option key={w} value={w}>
              {WALL_NAMES[w]}
            </option>
          ))}
        </select>
      </label>
    </li>
  );
}

function Small({ label, value, max, onChange }: { label: string; value: number; max: number; onChange: (v: number) => void }) {
  return (
    <label className="block text-[10px] uppercase tracking-wider text-[var(--color-ink-soft)]">
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={Math.max(0, max)}
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-0.5 block h-9 w-full rounded-md border border-[var(--color-border)] bg-white px-1.5 text-sm normal-case tracking-normal text-[var(--color-ink)]"
      />
    </label>
  );
}
