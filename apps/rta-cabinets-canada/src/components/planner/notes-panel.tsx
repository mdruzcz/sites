"use client";

import { useState } from "react";
import { usePlanner } from "./planner-context";
import { getPlannerItem } from "@/lib/planner/catalog";

export function NotesPanel({ onClose }: { onClose: () => void }) {
  const { design, dispatch, ui, setUi } = usePlanner();
  const [text, setText] = useState("");
  const [attach, setAttach] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const selected = ui.selectedId ? design.items.find((i) => i.id === ui.selectedId) : null;
  const selectedDef = selected ? getPlannerItem(selected.sku) : null;

  const add = () => {
    const t = text.trim();
    if (!t) return;
    dispatch({ type: "add-note", note: { text: t, itemId: attach && selected ? selected.id : undefined } });
    setText("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-dark)]">Design notes</p>
          <h3 className="font-display text-lg text-[var(--color-ink)]">Notes &amp; reminders</h3>
        </div>
        <button type="button" onClick={onClose} className="h-9 w-9 text-xl leading-none" aria-label="Close notes">
          ×
        </button>
      </header>
      <div className="border-b border-[var(--color-border)] p-4">
        <label htmlFor="planner-note" className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">
          New note
        </label>
        <textarea
          id="planner-note"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Keep 36″ clear in front of the dishwasher · Outlet needed behind the fridge · Sink centred on the window"
          className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-white p-2 text-sm focus:border-[var(--color-ink)] focus:outline-none"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") add();
          }}
        />
        {selected && selectedDef && (
          <label className="mt-2 flex items-center gap-2 text-[12px]">
            <input type="checkbox" checked={attach} onChange={(e) => setAttach(e.target.checked)} />
            <span>
              Pin to <strong>{selectedDef.short}</strong> ({selectedDef.name})
            </span>
          </label>
        )}
        <button type="button" onClick={add} disabled={!text.trim()} className="btn-primary mt-2 w-full text-sm disabled:opacity-40">
          Save note
        </button>
        <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">Notes are saved with the design and printed on the design sheet.</p>
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
        {design.notes.length === 0 && <li className="p-4 text-sm text-[var(--color-ink-soft)]">No notes yet.</li>}
        {design.notes
          .slice()
          .reverse()
          .map((n) => {
            const item = n.itemId ? design.items.find((i) => i.id === n.itemId) : null;
            const def = item ? getPlannerItem(item.sku) : null;
            return (
              <li key={n.id} className="border-b border-[var(--color-border)] p-4">
                {editing === n.id ? (
                  <div>
                    <textarea rows={3} value={editText} onChange={(e) => setEditText(e.target.value)} className="block w-full rounded-md border border-[var(--color-border)] bg-white p-2 text-sm" />
                    <div className="mt-2 flex gap-1.5">
                      <button
                        type="button"
                        className="btn-mini"
                        onClick={() => {
                          dispatch({ type: "update-note", id: n.id, text: editText });
                          setEditing(null);
                        }}
                      >
                        Save
                      </button>
                      <button type="button" className="btn-mini" onClick={() => setEditing(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap text-sm">{n.text}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-ink-soft)]">
                      {def && item ? (
                        <button type="button" onClick={() => setUi({ selectedId: item.id })} className="rounded-full border border-[var(--color-accent)] px-2 py-0.5 text-[var(--color-accent-dark)] hover:bg-[var(--color-accent)] hover:text-[var(--color-ink)]">
                          📍 {def.short}
                        </button>
                      ) : (
                        <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5">General</span>
                      )}
                      <span>{new Date(n.createdAt).toLocaleDateString("en-CA")}</span>
                      <span className="flex-1" />
                      <button
                        type="button"
                        className="underline underline-offset-2"
                        onClick={() => {
                          setEditing(n.id);
                          setEditText(n.text);
                        }}
                      >
                        Edit
                      </button>
                      <button type="button" className="text-red-700 underline underline-offset-2" onClick={() => dispatch({ type: "remove-note", id: n.id })}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
