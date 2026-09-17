"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { WinnerIndex, WinnerIndexEntry } from "@/lib/search-match";
import { scoreWinner } from "@/lib/search-match";
import { WinnerLogo } from "@/components/winner-media";

type Props = {
  index: WinnerIndex;
  /** "hero" = large search-first box; "compact" = header-sized input. */
  variant?: "hero" | "compact";
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  /** Pre-fill the box (e.g. from ?q= on /winners). */
  initialQuery?: string;
};

type Suggestion =
  | { kind: "winner"; key: string; label: string; sub: string; href: string; entry: WinnerIndexEntry }
  | { kind: "category"; key: string; label: string; sub: string; href: string }
  | { kind: "city"; key: string; label: string; sub: string; href: string };

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/**
 * Homeowner lookup: type a trade, a town or a business name and get instant
 * matches from the winner index (business, category or city). Enter with no
 * highlighted row runs a full search on /winners.
 */
export function WinnerSearch({ index, variant = "hero", placeholder, autoFocus, className = "", initialQuery = "" }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const suggestions = useMemo<Suggestion[]>(() => {
    const query = q.trim();
    if (query.length < 2) return [];
    const nq = norm(query);
    const counts = new Map<string, number>();
    for (const w of index.winners) counts.set(w.categorySlug, (counts.get(w.categorySlug) ?? 0) + 1);
    const cityCounts = new Map<string, number>();
    for (const w of index.winners) cityCounts.set(w.citySlug, (cityCounts.get(w.citySlug) ?? 0) + 1);

    const cats: Suggestion[] = index.categories
      .filter((c) => norm(c.name).includes(nq) && (counts.get(c.slug) ?? 0) > 0)
      .slice(0, 3)
      .map((c) => ({ kind: "category", key: `cat-${c.slug}`, label: c.name, sub: `${counts.get(c.slug)} recognised ${counts.get(c.slug) === 1 ? "business" : "businesses"}`, href: `/winners?category=${c.slug}` }));
    const cities: Suggestion[] = index.cities
      .filter((c) => norm(c.name).includes(nq) && (cityCounts.get(c.slug) ?? 0) > 0)
      .slice(0, 3)
      .map((c) => ({ kind: "city", key: `city-${c.slug}`, label: `${c.name}, ${c.province}`, sub: `${cityCounts.get(c.slug)} winners`, href: `/winners/${c.slug}` }));
    const winners: Suggestion[] = index.winners
      .map((w) => ({ w, s: scoreWinner(w, query) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.w.name.localeCompare(b.w.name))
      .slice(0, 6)
      .map(({ w }) => ({ kind: "winner", key: `w-${w.slug}`, label: w.name, sub: `${w.category} · ${w.city}, ${w.province}`, href: w.href, entry: w }));
    return [...cats, ...cities, ...winners];
  }, [q, index]);

  useEffect(() => { setActive(-1); }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const submit = () => {
    const query = q.trim();
    setOpen(false);
    if (active >= 0 && suggestions[active]) { router.push(suggestions[active].href); return; }
    router.push(query ? `/winners?q=${encodeURIComponent(query)}` : "/winners");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Enter") { e.preventDefault(); submit(); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  const hero = variant === "hero";
  const showList = open && q.trim().length >= 2;

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        className={
          hero
            ? "flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1.5 pl-5 shadow-[0_10px_40px_-20px_rgba(28,25,23,0.35)] focus-within:border-[var(--gold)]"
            : "flex items-center gap-2 rounded-full border border-stone-200 bg-white pl-3 pr-1 focus-within:border-[var(--gold)]"
        }
      >
        <svg width={hero ? 20 : 16} height={hero ? 20 : 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0 text-stone-400" aria-hidden>
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Search winners by trade, town or business name"
          placeholder={placeholder ?? (hero ? "Try “deck staining London” or “retaining walls”" : "Search winners…")}
          className={`min-w-0 flex-1 bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-none ${hero ? "h-12 text-base sm:text-lg" : "h-9 text-sm"}`}
        />
        <button
          type="submit"
          className={`inline-flex shrink-0 items-center justify-center rounded-full bg-stone-900 font-medium text-white transition-colors hover:bg-stone-700 ${hero ? "h-11 px-6 text-sm" : "h-8 w-8"}`}
          aria-label="Search"
        >
          {hero ? "Search" : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </button>
      </form>

      {showList && (
        <div
          id={listId}
          role="listbox"
          className={`absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_24px_60px_-24px_rgba(28,25,23,0.45)] ${hero ? "" : "min-w-[22rem]"}`}
        >
          {suggestions.length === 0 ? (
            <div className="px-5 py-4 text-sm text-stone-600">
              No matches for “{q.trim()}”.{" "}
              <button type="button" onClick={submit} className="font-medium text-[var(--gold)] hover:underline">Search all winners →</button>
            </div>
          ) : (
            <ul className="max-h-[26rem] overflow-y-auto py-2">
              {suggestions.map((s, i) => (
                <li key={s.key} role="option" aria-selected={i === active}>
                  <Link
                    href={s.href}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === active ? "bg-[var(--gold-soft)]" : "hover:bg-stone-50"}`}
                  >
                    {s.kind === "winner" ? (
                      <WinnerLogo name={s.label} logoUrl={s.entry.logo} size="h-9 w-9" className="border border-stone-200" />
                    ) : (
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-stone-200 bg-stone-50 text-stone-500" aria-hidden>
                        {s.kind === "category" ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h10M4 17h7" strokeLinecap="round" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
                        )}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-stone-900">{s.label}</span>
                      <span className="block truncate text-xs text-stone-500">{s.sub}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-stone-400">
                      {s.kind === "winner" ? "Winner" : s.kind === "category" ? "Category" : "City"}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-stone-100 px-4 pt-2 pb-1">
                <button type="button" onClick={submit} className="text-xs font-medium text-[var(--gold)] hover:underline">
                  See all results for “{q.trim()}” →
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
