"use client";

import { useTransition } from "react";
import { decideApplication } from "@/lib/actions/application";

export function ApplicationActions({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  function decide(status: "approved" | "rejected") {
    let reason: string | undefined;
    if (status === "rejected") {
      const r = window.prompt("Reason for rejection (optional):");
      if (r === null) return;
      reason = r;
    }
    startTransition(async () => {
      await decideApplication(id, status, reason);
    });
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => decide("approved")}
        className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => decide("rejected")}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
