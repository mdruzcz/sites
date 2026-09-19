"use client";

import dynamic from "next/dynamic";
import type { Design } from "@/lib/planner/types";

const PlannerApp = dynamic(() => import("./planner-app"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-line)] border-t-[var(--color-navy)]" />
        <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Loading the planner…</p>
      </div>
    </div>
  ),
});

export function PlannerClient({ initialDesign }: { initialDesign?: Design }) {
  return <PlannerApp initialDesign={initialDesign} />;
}
