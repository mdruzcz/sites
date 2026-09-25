"use client";

import dynamic from "next/dynamic";
import type { Scene3DProps } from "./scene-3d";

const Scene3D = dynamic(() => import("./scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#f7f4ee]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-ink)]" />
        <p className="mt-3 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Loading 3D view…</p>
      </div>
    </div>
  ),
});

export function Scene3DLazy(props: Scene3DProps) {
  return <Scene3D {...props} />;
}

export type { Scene3DApi, CameraPreset } from "./scene-3d";
