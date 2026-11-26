"use client";

import { useState } from "react";

interface Tab {
  slug: string;
  label: string;
}

/**
 * Sport filter chips over a set of kit cards. The cards are rendered on the
 * server and passed in with their sport, so every kit is in the HTML for
 * search engines and only the visibility changes here.
 */
export function KitBrowser({ tabs, items, mode = "grid" }: { tabs: Tab[]; items: { sport: string; node: React.ReactNode }[]; mode?: "grid" | "rail" }) {
  const [active, setActive] = useState("all");
  const all: Tab[] = [{ slug: "all", label: "All kits" }, ...tabs];
  return (
    <div>
      <div className="rail mb-6" role="tablist" aria-label="Filter kits by sport">
        {all.map((t) => (
          <button key={t.slug} type="button" role="tab" aria-selected={active === t.slug} data-active={active === t.slug} className="chip" onClick={() => setActive(t.slug)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className={mode === "rail" ? "rail" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}>
        {items.map((it, i) => (
          <div key={i} hidden={active !== "all" && it.sport !== active} className={mode === "rail" ? "w-[17rem] sm:w-[18.5rem]" : ""}>
            {it.node}
          </div>
        ))}
      </div>
    </div>
  );
}
