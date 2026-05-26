"use client";

import { useState, useTransition } from "react";
import { setActiveStore } from "@/lib/actions/store";
import type { Store } from "@/lib/types";

export function StoreSwitcher({
  active,
  stores
}: {
  active: Store | null;
  stores: Store[];
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function pick(id: string) {
    setOpen(false);
    startTransition(async () => {
      await setActiveStore(id);
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-w-[220px] items-center justify-between gap-3 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-slate-50"
        disabled={pending}
      >
        <span className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <span className="truncate">{active ? active.name : "No store selected"}</span>
        </span>
        <span className="text-slate-400">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-72 rounded-md border border-slate-200 bg-white shadow-lg">
          <div className="px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            Switch store
          </div>
          <ul className="max-h-72 overflow-auto py-1">
            {stores.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => pick(s.id)}
                  className={`flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                    active?.id === s.id ? "bg-slate-100" : ""
                  }`}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-slate-500">{s.domain}</span>
                </button>
              </li>
            ))}
            {stores.length === 0 && (
              <li className="px-3 py-3 text-sm text-slate-500">No stores yet.</li>
            )}
          </ul>
          <div className="border-t border-slate-200 px-3 py-2 text-xs">
            <a className="text-blue-600 hover:underline" href="/stores/new">
              + Add a new store
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
