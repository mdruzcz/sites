"use client";

import { useState, useTransition } from "react";
import { migrateProductImages, type MigrationResult } from "@/lib/actions/image-migration";

export function MigrateImagesRunner({ initialPending }: { initialPending: number }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ done: number; remaining: number }>({
    done: 0,
    remaining: initialPending
  });
  const [log, setLog] = useState<string[]>([]);
  const [, startTransition] = useTransition();

  async function runOnce() {
    startTransition(async () => {
      const res = await migrateProductImages(10);
      setProgress((p) => ({ done: p.done + res.succeeded, remaining: res.remaining }));
      const stamp = new Date().toLocaleTimeString();
      const lines = [
        `[${stamp}] batch: ${res.succeeded}/${res.attempted} ok · ${res.remaining} remaining`,
        ...res.failed.map((f) => `   ✗ ${f.id.slice(0, 8)}: ${f.reason}`)
      ];
      setLog((l) => [...lines, ...l].slice(0, 50));
    });
  }

  async function runAll() {
    setRunning(true);
    let safety = 50; // hard cap on number of batches (50 × 10 = 500 images)
    let res: MigrationResult = { attempted: 0, succeeded: 0, failed: [], remaining: progress.remaining };
    while (safety-- > 0) {
      res = await migrateProductImages(10);
      setProgress((p) => ({ done: p.done + res.succeeded, remaining: res.remaining }));
      const stamp = new Date().toLocaleTimeString();
      setLog((l) => [
        `[${stamp}] batch: ${res.succeeded}/${res.attempted} ok · ${res.remaining} remaining`,
        ...res.failed.map((f) => `   ✗ ${f.id.slice(0, 8)}: ${f.reason}`),
        ...l
      ].slice(0, 80));
      if (res.attempted === 0 || res.remaining === 0) break;
    }
    setRunning(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={runAll}
          disabled={running || progress.remaining === 0}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {running ? "Running…" : progress.remaining === 0 ? "All done ✓" : `Run migration (${progress.remaining} remaining)`}
        </button>
        <button
          type="button"
          onClick={runOnce}
          disabled={running || progress.remaining === 0}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
        >
          Run one batch (10)
        </button>
      </div>
      {progress.done > 0 && (
        <p className="text-sm text-emerald-700">
          Migrated {progress.done} new image{progress.done === 1 ? "" : "s"} this session.
        </p>
      )}
      {log.length > 0 && (
        <pre className="max-h-64 overflow-auto rounded-md border border-slate-200 bg-slate-900 p-3 text-xs leading-relaxed text-emerald-200">
{log.join("\n")}
        </pre>
      )}
    </div>
  );
}
