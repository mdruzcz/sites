"use client";

import { useEffect, useRef } from "react";
import { audio, coloursFor, hexRgb, renderSelection, SCHEMES, syntheticPast, type Selection } from "@/lib/lightshow/core";
import { SceneRenderer } from "@/lib/lightshow/renderer";
import { STAGE_CAMERA, buildScene, layoutScene, type SceneId } from "@/lib/lightshow/scenes";
import { singFace } from "@/lib/lightshow/stageProps";
import { addTicker } from "@/lib/lightshow/ticker";
import type { PropType } from "@/lib/pricing";
import { deviceQuality, useReducedMotion } from "./useReducedMotion";

type Props = {
  /** A preset scene, or `layout` for a package / budget layout. */
  scene?: SceneId;
  layout?: Record<PropType, number>;
  selection?: Selection;
  scheme?: string;
  label: string;
  className?: string;
  mini?: boolean;
};

/**
 * The canvas is absolutely positioned: the parent must be `relative` with its own
 * size (e.g. an aspect-ratio box). An in-flow canvas would feed its pixel height
 * back into layout on high-DPI screens and grow every frame.
 *
 * Self-running render of a scene for section art and package cards. It uses the
 * Light Show app's synthetic beat, runs on the page's shared animation loop and
 * pauses whenever it is off screen.
 */
export function SceneCanvas({ scene = "stage", layout, selection = { kind: "theme", name: "Christmas" }, scheme = "Red & Green", label, className, mini = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const layoutKey = layout ? JSON.stringify(layout) : "";
  const selKey = JSON.stringify(selection);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const q = deviceQuality() * (mini ? 0.7 : 1);
    const lay = layoutKey ? (JSON.parse(layoutKey) as Record<PropType, number>) : null;
    let r: SceneRenderer;
    try {
      if (lay) {
        r = new SceneRenderer(cv, { camera: STAGE_CAMERA, mini, reduced, maxDpr: mini ? 1.5 : 2 });
        r.setProps(layoutScene(lay, q));
      } else {
        const s = buildScene(scene, q);
        r = new SceneRenderer(cv, { camera: s.camera, mini, reduced, maxDpr: mini ? 1.5 : 2 });
        r.setProps(s.props);
      }
    } catch {
      return;
    }
    const sel = JSON.parse(selKey) as Selection;
    const C = coloursFor(sel, SCHEMES.find((s) => s.name === scheme)?.colours ?? SCHEMES[3].colours).map(hexRgb);
    let t = 2 + Math.random() * 4;
    let lastSize = "";
    const faceCol: [number, number, number] = [0.6 + 0.4 * C[0][0], 0.6 + 0.4 * C[0][1], 0.6 + 0.4 * C[0][2]];
    const paint = (p: Parameters<Parameters<SceneRenderer["draw"]>[1]>[0], out: Float32Array) => {
      const au = audio(t);
      renderSelection(sel, C, t, p.g, out, au, syntheticPast(t), false);
      if (p.face) singFace(p, out, au.level, t, faceCol);
    };
    return addTicker(cv, (dt) => {
      if (reduced) {
        // one still frame, redrawn only when the canvas changes size
        const size = `${cv.clientWidth}x${cv.clientHeight}`;
        if (size === lastSize) return;
        lastSize = size;
        r.draw(0, paint);
        return;
      }
      t += dt;
      r.draw(dt, paint);
    });
  }, [scene, layoutKey, selKey, scheme, mini, reduced]);

  return (
    <canvas ref={ref} className={className ?? "absolute inset-0 block w-full h-full"} role="img" aria-label={label}>
      {label}
    </canvas>
  );
}
