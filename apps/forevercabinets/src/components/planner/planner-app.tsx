"use client";

// Kitchen Planner shell: 3 steps (Define your space → Make it yours → Make it happen),
// undo/redo, notes, save/share, autosave and shared-link loading.

import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { PlannerContext, type PlannerUI, type Step } from "./planner-context";
import { StepSpace } from "./step-space";
import { StepDesign } from "./step-design";
import { StepReview } from "./step-review";
import { NotesPanel } from "./notes-panel";
import { SaveSharePanel } from "./save-share";
import { PrintSheet } from "./print-sheet";
import { PlannerErrorBoundary } from "./planner-error-boundary";
import { defaultDesign, initialState, loadCurrent, plannerReducer, saveCurrent } from "@/lib/planner/store";
import { decodeDesign, readHashPayload } from "@/lib/planner/encode";
import { getPlannerItem } from "@/lib/planner/catalog";
import type { Design } from "@/lib/planner/types";
import { formatCad } from "@/lib/utils";

const STEPS: Array<{ n: Step; label: string; hint: string }> = [
  { n: 1, label: "Define your space", hint: "Room size, walls, windows & doors" },
  { n: 2, label: "Make it yours", hint: "Place cabinets in 2D and 3D" },
  { n: 3, label: "Make it happen", hint: "Check, print, share & request a quote" },
];

export default function PlannerApp({ initialDesign }: { initialDesign?: Design }) {
  const [state, dispatch] = useReducer(plannerReducer, initialDesign, (d) => initialState(d));
  const [ui, setUiState] = useState<PlannerUI>({
    step: initialDesign ? 2 : 1,
    view: "floor",
    activeSurface: 0,
    selectedId: null,
    hoverId: null,
    panel: "none",
    snapshot: null,
    addons: {},
  });
  const [ready, setReady] = useState(!!initialDesign);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const [editingName, setEditingName] = useState(false);

  const setUi = useCallback((patch: Partial<PlannerUI>) => setUiState((u) => ({ ...u, ...patch })), []);
  const toast = useCallback((message: string) => {
    setToastMsg(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 3200);
  }, []);

  // Load a shared design from the URL hash, or the autosaved one.
  useEffect(() => {
    if (initialDesign) return;
    let cancelled = false;
    (async () => {
      const payload = readHashPayload();
      if (payload) {
        const d = await decodeDesign(payload);
        if (d && !cancelled) {
          dispatch({ type: "load", design: d });
          setUiState((u) => ({ ...u, step: 2 }));
          setReady(true);
          window.history.replaceState(null, "", window.location.pathname);
          toast(`Opened shared design “${d.name}”.`);
          return;
        }
      }
      const cur = loadCurrent();
      if (cur && !cancelled) {
        dispatch({ type: "load", design: cur });
        if (cur.items.length) setUiState((u) => ({ ...u, step: 2 }));
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [initialDesign, toast]);

  // Each step starts at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [ui.step]);

  // Autosave
  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(() => saveCurrent(state.design), 350);
    return () => window.clearTimeout(id);
  }, [state.design, ready]);

  // Surface uncaught errors (event handlers, promises) instead of failing silently
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (e.message) toast(`Something went wrong: ${e.message.slice(0, 160)}`);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const msg = e.reason instanceof Error ? e.reason.message : String(e.reason ?? "");
      if (msg) toast(`Something went wrong: ${msg.slice(0, 160)}`);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [toast]);

  // Reducer errors → toast
  useEffect(() => {
    if (state.lastError) toast(state.lastError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.lastError, state.tick]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) {
        if (e.key === "Escape") target.blur();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch({ type: e.shiftKey ? "redo" : "undo" });
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch({ type: "redo" });
      } else if ((e.key === "Delete" || e.key === "Backspace") && ui.selectedId && ui.step === 2) {
        e.preventDefault();
        dispatch({ type: "remove-item", id: ui.selectedId });
        setUi({ selectedId: null });
      } else if (e.key === "Escape") {
        if (ui.panel !== "none") setUi({ panel: "none" });
        else setUi({ selectedId: null });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ui.selectedId, ui.step, ui.panel, setUi]);

  const design = state.design;
  const total = useMemo(() => design.items.reduce((s, i) => s + (getPlannerItem(i.sku)?.price ?? 0), 0), [design.items]);
  const ctx = useMemo(() => ({ state, design, dispatch, ui, setUi, toast }), [state, design, ui, setUi, toast]);

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-line)] border-t-[var(--color-navy)]" />
          <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Opening your kitchen…</p>
        </div>
      </div>
    );
  }

  return (
    <PlannerContext.Provider value={ctx}>
      <div className="planner-shell no-print">
        {/* Top bar */}
        <div className="border-b border-[var(--color-line)] bg-white">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-3 py-2 lg:px-4">
            <nav aria-label="Planner steps" className="flex flex-1 items-stretch gap-1 overflow-x-auto scrollbar-thin">
              {STEPS.map((s) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setUi({ step: s.n, panel: "none" })}
                  aria-current={ui.step === s.n ? "step" : undefined}
                  className={`group flex shrink-0 items-center gap-2 border-b-2 px-2 py-1.5 text-left ${ui.step === s.n ? "border-[var(--color-brass)]" : "border-transparent hover:border-[var(--color-line)]"}`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${ui.step === s.n ? "bg-[var(--color-navy)] text-white" : ui.step > s.n ? "bg-[var(--color-brass)] text-[var(--color-navy)]" : "bg-[var(--color-sandstone-soft)] text-[var(--color-ink-soft)]"}`}>
                    {ui.step > s.n ? "✓" : s.n}
                  </span>
                  <span>
                    <span className={`block text-[13px] font-medium leading-tight ${ui.step === s.n ? "text-[var(--color-navy)]" : "text-[var(--color-ink-soft)]"}`}>{s.label}</span>
                    <span className="hidden text-[10px] text-[var(--color-ink-soft)] xl:block">{s.hint}</span>
                  </span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button type="button" className="btn-icon" onClick={() => dispatch({ type: "undo" })} disabled={!state.past.length} aria-label="Undo" title="Undo (Ctrl+Z)">
                ↶
              </button>
              <button type="button" className="btn-icon" onClick={() => dispatch({ type: "redo" })} disabled={!state.future.length} aria-label="Redo" title="Redo (Ctrl+Shift+Z)">
                ↷
              </button>
            </div>

            <div className="flex items-center gap-2 border-l border-[var(--color-line)] pl-3">
              {editingName ? (
                <input
                  autoFocus
                  defaultValue={design.name}
                  onBlur={(e) => {
                    dispatch({ type: "rename", name: e.target.value.trim() || "My kitchen" });
                    setEditingName(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    if (e.key === "Escape") setEditingName(false);
                  }}
                  className="h-9 w-40 rounded-sm border border-[var(--color-line)] px-2 text-sm"
                  aria-label="Design name"
                />
              ) : (
                <button type="button" onClick={() => setEditingName(true)} className="max-w-[160px] truncate text-left text-[13px] font-medium text-[var(--color-navy)] underline-offset-4 hover:underline" title="Rename design">
                  {design.name}
                </button>
              )}
              <span className="hidden text-[13px] text-[var(--color-ink-soft)] sm:inline">·</span>
              <span className="font-display text-lg text-[var(--color-navy)]" aria-live="polite">
                {formatCad(total)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button type="button" className={`btn-bar ${ui.panel === "notes" ? "is-active" : ""}`} onClick={() => setUi({ panel: ui.panel === "notes" ? "none" : "notes" })}>
                Notes{design.notes.length ? ` (${design.notes.length})` : ""}
              </button>
              <button type="button" className={`btn-bar ${ui.panel === "save" ? "is-active" : ""}`} onClick={() => setUi({ panel: ui.panel === "save" ? "none" : "save" })}>
                Save
              </button>
              <button type="button" className={`btn-bar ${ui.panel === "share" ? "is-active" : ""}`} onClick={() => setUi({ panel: ui.panel === "share" ? "none" : "share" })}>
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <PlannerErrorBoundary
            onReset={() => setUi({ selectedId: null, hoverId: null, panel: "none", view: "floor" })}
            onStartOver={() => {
              dispatch({ type: "reset", design: defaultDesign() });
              setUi({ step: 1, selectedId: null, hoverId: null, panel: "none", view: "floor", activeSurface: 0, snapshot: null, addons: {} });
            }}
          >
            {ui.step === 1 && <StepSpace />}
            {ui.step === 2 && <StepDesign />}
            {ui.step === 3 && <StepReview />}
          </PlannerErrorBoundary>

          {ui.panel !== "none" && (
            <>
              <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setUi({ panel: "none" })} aria-hidden="true" />
              <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[380px] border-l border-[var(--color-line)] bg-[var(--color-cream)] shadow-2xl">
                {ui.panel === "notes" && <NotesPanel onClose={() => setUi({ panel: "none" })} />}
                {(ui.panel === "save" || ui.panel === "share") && <SaveSharePanel mode={ui.panel} onClose={() => setUi({ panel: "none" })} />}
              </div>
            </>
          )}
        </div>

        {toastMsg && (
          <div role="status" className="pointer-events-none fixed bottom-36 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-sm bg-[var(--color-navy)] px-4 py-2 text-center text-sm text-white shadow-lg lg:bottom-8 lg:w-auto">
            {toastMsg}
          </div>
        )}
      </div>
      <PrintSheet />
    </PlannerContext.Provider>
  );
}
