"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { audiences } from "@/lib/content";

const BEDROOMS = [
  { value: "", label: "Any size" },
  { value: "1", label: "1+ bed" },
  { value: "2", label: "2+ beds" },
  { value: "3", label: "3+ beds" },
  { value: "4", label: "4+ beds" }
];

const BUDGETS = [
  { value: "", label: "Any budget" },
  { value: "1800", label: "Under $1,800" },
  { value: "2200", label: "Under $2,200" },
  { value: "2600", label: "Under $2,600" },
  { value: "3200", label: "Under $3,200" }
];

const TOGGLES = [
  { param: "pets", label: "Pet friendly", icon: "paw" },
  { param: "beach", label: "Walk to beach", icon: "waves" },
  { param: "utilities", label: "Utilities included", icon: "flame" },
  { param: "workspace", label: "Workspace", icon: "desk" }
];

/**
 * Filters write to the URL rather than to component state, so every
 * combination is a real, linkable, indexable page and the back button behaves.
 */
export function Filters({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(params.toString());
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router]
  );

  const active = (key: string) => params.get(key) ?? "";
  const anyActive = ["bedrooms", "budget", "for", ...TOGGLES.map((t) => t.param)].some((k) =>
    params.get(k)
  );

  return (
    <div className="sticky top-[80px] z-30 -mx-6 md:-mx-10 lg:-mx-14 mb-8 border-b bg-[var(--surface)] px-6 md:px-10 lg:px-14 py-4" style={{ borderColor: "var(--line-soft)" }}>
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="sr-only" htmlFor="f-bedrooms">
          Bedrooms
        </label>
        <select
          id="f-bedrooms"
          className="field w-auto"
          style={{ minHeight: 44, borderRadius: "var(--r-pill)", paddingLeft: 18, fontSize: 14, fontWeight: 600 }}
          value={active("bedrooms")}
          onChange={(e) => setParam("bedrooms", e.target.value)}
        >
          {BEDROOMS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="f-budget">
          Monthly budget
        </label>
        <select
          id="f-budget"
          className="field w-auto"
          style={{ minHeight: 44, borderRadius: "var(--r-pill)", paddingLeft: 18, fontSize: 14, fontWeight: 600 }}
          value={active("budget")}
          onChange={(e) => setParam("budget", e.target.value)}
        >
          {BUDGETS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="f-for">
          Who it suits
        </label>
        <select
          id="f-for"
          className="field w-auto"
          style={{ minHeight: 44, borderRadius: "var(--r-pill)", paddingLeft: 18, fontSize: 14, fontWeight: 600 }}
          value={active("for")}
          onChange={(e) => setParam("for", e.target.value)}
        >
          <option value="">Anyone</option>
          {audiences.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.short}
            </option>
          ))}
        </select>

        {TOGGLES.map((t) => {
          const on = active(t.param) === "1";
          return (
            <button
              key={t.param}
              type="button"
              onClick={() => setParam(t.param, on ? null : "1")}
              aria-pressed={on}
              className="pill transition-colors"
              style={{
                minHeight: 44,
                paddingInline: 18,
                border: `1px solid ${on ? "var(--ink)" : "var(--line)"}`,
                background: on ? "var(--ink)" : "var(--surface)",
                color: on ? "#fff" : "var(--ink)"
              }}
            >
              <Icon name={t.icon} size={15} strokeWidth={2} />
              {t.label}
            </button>
          );
        })}

        {anyActive ? (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="pill text-[var(--muted)] underline underline-offset-4 hover:text-[var(--ink)]"
            style={{ minHeight: 44, paddingInline: 12 }}
          >
            Clear all
          </button>
        ) : null}

        <span className="ml-auto text-[14px] text-[var(--muted)] tabular-nums">
          {total} {total === 1 ? "home" : "homes"}
        </span>
      </div>
    </div>
  );
}
