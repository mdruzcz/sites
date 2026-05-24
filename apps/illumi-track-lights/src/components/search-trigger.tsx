"use client";

import { useEffect } from "react";
import { useUI } from "@/components/ui-context";

export function SearchTrigger() {
  const { openSearch } = useUI();

  // Cmd/Ctrl+K opens the search palette
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search the catalog (Ctrl+K)"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm text-slate-500 transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
    >
      <span aria-hidden>🔍</span>
      <span className="hidden md:inline">Search</span>
      <kbd className="hidden rounded border border-[var(--color-border)] bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 md:inline">
        ⌘K
      </kbd>
    </button>
  );
}
