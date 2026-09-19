"use client";

import { createContext, useContext, type Dispatch } from "react";
import type { Design, SurfaceId } from "@/lib/planner/types";
import type { PlannerAction, PlannerState } from "@/lib/planner/store";

export type Step = 1 | 2 | 3;
export type View = "floor" | "3d" | "wall";
export type Panel = "none" | "notes" | "save" | "autofill" | "share";

export type PlannerUI = {
  step: Step;
  view: View;
  activeSurface: SurfaceId;
  selectedId: string | null;
  hoverId: string | null;
  panel: Panel;
  snapshot: string | null; // data URL of the last 3D capture
  addons: Record<string, boolean>; // step-3 add-on selections by SKU
};

export type PlannerCtx = {
  state: PlannerState;
  design: Design;
  dispatch: Dispatch<PlannerAction>;
  ui: PlannerUI;
  setUi: (patch: Partial<PlannerUI>) => void;
  toast: (message: string) => void;
};

export const PlannerContext = createContext<PlannerCtx | null>(null);

export function usePlanner(): PlannerCtx {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside the planner");
  return ctx;
}
