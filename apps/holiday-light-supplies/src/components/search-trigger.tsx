"use client";

import { useEffect } from "react";
import { useUI } from "@/components/ui-context";
import { Icon } from "@/components/icons";

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
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 text-sm text-[var(--color-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] md:min-w-[200px] md:justify-start md:px-4"
    >
      <Icon.search size={17} />
      <span className="hidden md:inline">Search C9, displays, wreaths…</span>
      <kbd className="ml-auto hidden rounded border border-[var(--color-border)] bg-[var(--color-bg-warm)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-muted)] md:inline">
        ⌘K
      </kbd>
    </button>
  );
}
