"use client";

// Step 2 — Make it yours: catalog | floor / 3D / wall views | inspector.

import { useCallback, useRef, useState } from "react";
import { usePlanner } from "./planner-context";
import { CatalogPanel } from "./catalog-panel";
import { FloorView, type FloorMove } from "./floor-view";
import { WallView } from "./wall-view";
import { Inspector } from "./inspector";
import { Scene3DLazy, type CameraPreset, type Scene3DApi } from "./scene-3d-lazy";
import { describeSurface } from "@/lib/planner/store";
import { getPlannerItem } from "@/lib/planner/catalog";
import { WALL_NAMES, type CornerId, type SurfaceId, type WallId } from "@/lib/planner/types";

type MobileTab = "canvas" | "catalog" | "inspector";

export function StepDesign() {
  const { design, ui, setUi, dispatch, toast } = usePlanner();
  const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");
  const sceneApi = useRef<Scene3DApi | null>(null);

  const activeLabel = describeSurface(ui.activeSurface).toLowerCase();

  const addSku = useCallback(
    (sku: string) => {
      const def = getPlannerItem(sku);
      if (!def) return;
      let surface: SurfaceId = ui.activeSurface;
      if (surface === "island" && (!design.island.enabled || def.level !== "base")) surface = 0;
      if (surface !== "island" && design.room.openWalls.includes(surface)) {
        surface = ([0, 1, 2, 3] as WallId[]).find((w) => !design.room.openWalls.includes(w)) ?? 0;
      }
      dispatch({ type: "add-item", sku, surface });
      setMobileTab("canvas");
    },
    [design, dispatch, ui.activeSurface],
  );

  const onDropSku = useCallback(
    (sku: string, hit: { surface?: SurfaceId; t?: number; corner?: CornerId }) => {
      if (hit.corner !== undefined) dispatch({ type: "add-item", sku, surface: hit.corner, corner: hit.corner });
      else if (hit.surface !== undefined) dispatch({ type: "add-item", sku, surface: hit.surface, t: hit.t });
      else addSku(sku);
    },
    [dispatch, addSku],
  );

  const onMove = useCallback(
    (id: string, move: FloorMove, transient: boolean) => {
      dispatch({ type: "move-item", id, surface: move.surface, t: move.t, corner: move.corner, transient });
      if (!transient && move.surface !== undefined && move.surface !== ui.activeSurface) setUi({ activeSurface: move.surface });
    },
    [dispatch, setUi, ui.activeSurface],
  );
  const onIslandMove = useCallback((x: number, y: number, transient: boolean) => dispatch({ type: "set-island", patch: { x, y }, transient }), [dispatch]);
  const onDragStart = useCallback(() => dispatch({ type: "begin" }), [dispatch]);
  const onSelect = useCallback(
    (id: string | null) => {
      setUi({ selectedId: id });
      if (id) {
        const it = design.items.find((i) => i.id === id);
        if (it && it.corner === undefined) setUi({ selectedId: id, activeSurface: it.surface });
      }
    },
    [design.items, setUi],
  );
  const onHover = useCallback((id: string | null) => setUi({ hoverId: id }), [setUi]);
  const onSurfaceSelect = useCallback((s: SurfaceId) => setUi({ activeSurface: s }), [setUi]);
  const onSceneReady = useCallback((api: Scene3DApi) => {
    sceneApi.current = api;
  }, []);

  const viewTabs: Array<{ id: typeof ui.view; label: string }> = [
    { id: "floor", label: "Floor plan" },
    { id: "3d", label: "3D view" },
    { id: "wall", label: "Wall view" },
  ];

  return (
    <div className="planner-design lg:grid lg:h-[calc(100dvh-128px)] lg:min-h-[600px] lg:grid-cols-[300px_minmax(0,1fr)_320px]">
      {/* Catalog */}
      <aside className={`border-r border-[var(--color-border)] bg-[var(--color-cream)] lg:block ${mobileTab === "catalog" ? "block" : "hidden"} h-[calc(100dvh-230px)] lg:h-auto lg:min-h-0`}>
        <CatalogPanel onAdd={addSku} activeLabel={activeLabel} />
      </aside>

      {/* Canvas */}
      <section className={`flex min-h-0 flex-col bg-[#f7f4ee] ${mobileTab === "canvas" ? "flex" : "hidden lg:flex"}`}>
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border)] bg-white px-3 py-2">
          <div className="inline-flex border border-[var(--color-border)]" role="tablist" aria-label="View">
            {viewTabs.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={ui.view === v.id}
                onClick={() => setUi({ view: v.id })}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-widest ${ui.view === v.id ? "bg-[var(--color-ink)] text-white" : "bg-white text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"}`}
              >
                {v.label}
              </button>
            ))}
          </div>
          {ui.view === "wall" && (
            <div className="flex flex-wrap items-center gap-1">
              {([0, 1, 2, 3] as WallId[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  disabled={design.room.openWalls.includes(w)}
                  onClick={() => setUi({ activeSurface: w })}
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${ui.activeSurface === w ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white disabled:opacity-40"}`}
                >
                  {WALL_NAMES[w]}
                </button>
              ))}
              {design.island.enabled && (
                <button type="button" onClick={() => setUi({ activeSurface: "island" })} className={`rounded-full border px-2.5 py-1 text-[11px] ${ui.activeSurface === "island" ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white"}`}>
                  Island
                </button>
              )}
            </div>
          )}
          {ui.view === "3d" && (
            <div className="flex flex-wrap items-center gap-1">
              {(["iso", "top", "front", "left", "right"] as CameraPreset[]).map((p) => (
                <button key={p} type="button" onClick={() => sceneApi.current?.setPreset(p)} className="rounded-full border border-[var(--color-border)] bg-white px-2.5 py-1 text-[11px] capitalize hover:border-[var(--color-ink)]">
                  {p === "iso" ? "Reset view" : p}
                </button>
              ))}
            </div>
          )}
          <span className="ml-auto hidden text-[11px] text-[var(--color-ink-soft)] md:inline">
            {ui.view === "floor" && "Drag cabinets along a wall or onto the island · click a wall to select it"}
            {ui.view === "3d" && "Drag to orbit · scroll to zoom · drag a cabinet to move it"}
            {ui.view === "wall" && "Drag cabinets left and right · drop from the catalog"}
          </span>
        </div>

        <div className="relative min-h-[420px] flex-1 lg:min-h-0">
          {ui.view === "floor" && (
            <FloorView
              design={design}
              selectedId={ui.selectedId}
              hoverId={ui.hoverId}
              activeSurface={ui.activeSurface}
              onSelect={onSelect}
              onHover={onHover}
              onSurfaceSelect={onSurfaceSelect}
              onDragStart={onDragStart}
              onMove={onMove}
              onIslandMove={onIslandMove}
              onDropSku={onDropSku}
              className="absolute inset-0 h-full w-full"
            />
          )}
          {ui.view === "3d" && (
            <Scene3DLazy
              design={design}
              selectedId={ui.selectedId}
              hoverId={ui.hoverId}
              activeSurface={ui.activeSurface}
              onSelect={onSelect}
              onHover={onHover}
              onSurfaceSelect={onSurfaceSelect}
              onDragStart={onDragStart}
              onMove={onMove}
              onIslandMove={onIslandMove}
              onReady={onSceneReady}
              className="absolute inset-0 h-full w-full"
            />
          )}
          {ui.view === "wall" && (
            <div className="absolute inset-0 overflow-auto p-3">
              <WallView
                design={design}
                surface={ui.activeSurface}
                selectedId={ui.selectedId}
                hoverId={ui.hoverId}
                onSelect={onSelect}
                onHover={onHover}
                onDragStart={onDragStart}
                onMove={(id, t, transient) => onMove(id, { surface: ui.activeSurface, t }, transient)}
                onDropSku={(sku, t) => {
                  const def = getPlannerItem(sku);
                  if (def?.cornerSize) dispatch({ type: "add-item", sku, surface: ui.activeSurface });
                  else dispatch({ type: "add-item", sku, surface: ui.activeSurface, t });
                }}
                className="mx-auto h-full w-full max-w-5xl"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-[var(--color-border)] bg-white px-3 py-2">
          <p className="text-[12px] text-[var(--color-ink-soft)]">
            {design.items.length} unit{design.items.length === 1 ? "" : "s"} placed · working on the <strong>{activeLabel}</strong>
          </p>
          <div className="flex gap-2">
            <span className="hidden sm:block">
              <button type="button" className="btn-secondary h-9 px-3 py-0 text-xs" onClick={() => setUi({ step: 1 })}>
                ← Space
              </button>
            </span>
            <button
              type="button"
              className="btn-primary h-9 px-3 py-0 text-xs"
              onClick={() => {
                if (!design.items.length) {
                  toast("Add a few cabinets first.");
                  return;
                }
                setUi({ step: 3, selectedId: null });
              }}
            >
              Review &amp; plans →
            </button>
          </div>
        </div>
      </section>

      {/* Inspector */}
      <aside className={`border-l border-[var(--color-border)] bg-[var(--color-cream)] lg:block ${mobileTab === "inspector" ? "block" : "hidden"} h-[calc(100dvh-230px)] lg:h-auto lg:min-h-0`}>
        <Inspector />
      </aside>

      {/* Mobile tab bar */}
      <nav className="sticky bottom-0 z-30 grid grid-cols-3 border-t border-[var(--color-border)] bg-white lg:hidden" aria-label="Planner panels">
        {(
          [
            ["catalog", "Cabinets"],
            ["canvas", "Plan"],
            ["inspector", ui.selectedId ? "Selected" : "Wall & island"],
          ] as Array<[MobileTab, string]>
        ).map(([id, label]) => (
          <button key={id} type="button" onClick={() => setMobileTab(id)} className={`h-12 text-[11px] uppercase tracking-widest ${mobileTab === id ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-ink-soft)]"}`}>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
