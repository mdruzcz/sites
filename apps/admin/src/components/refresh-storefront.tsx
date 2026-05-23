"use client";

import { useState, useTransition } from "react";
import { revalidateStore } from "@/lib/actions/revalidate";

export function RefreshStorefront({ storeId, storeName }: { storeId: string; storeName: string }) {
  const [open, setOpen] = useState(false);
  const [pathsText, setPathsText] = useState("/\n/shop\n/sitemap.xml");
  const [result, setResult] = useState<{ ok: boolean; body: string } | null>(null);
  const [pending, startTransition] = useTransition();

  function run() {
    setResult(null);
    const paths = pathsText
      .split(/\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    startTransition(async () => {
      const r = await revalidateStore(storeId, paths);
      setResult({ ok: r.ok, body: r.body });
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:border-[var(--color-accent)] hover:bg-blue-50"
        title={`Push fresh catalog data to ${storeName}`}
      >
        <span>↻</span> Refresh
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-1 w-80 rounded-md border border-slate-200 bg-white p-3 shadow-lg">
          <h3 className="text-sm font-semibold">Revalidate {storeName}</h3>
          <p className="mt-1 text-xs text-slate-500">
            Push fresh data to these paths on the storefront. One per line.
          </p>
          <textarea
            value={pathsText}
            onChange={(e) => setPathsText(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1 font-mono text-xs"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="rounded-md border border-slate-300 px-3 py-1 text-sm">
              Close
            </button>
            <button
              onClick={run}
              disabled={pending}
              className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {pending ? "Sending…" : "Send"}
            </button>
          </div>
          {result && (
            <p
              className={`mt-2 rounded-md p-2 text-xs ${
                result.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
              }`}
            >
              {result.ok ? "✓ Storefront acknowledged the revalidation." : `Error: ${result.body}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
