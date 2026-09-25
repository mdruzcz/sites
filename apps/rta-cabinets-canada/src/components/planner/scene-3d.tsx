"use client";

// Real-time 3D view of the design (three.js via react-three-fiber).
// Loaded lazily — see scene-3d-lazy.tsx.

import { useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CornerId, Design, Opening, Room, SurfaceId, WallId } from "@/lib/planner/types";
import {
  counterPieces,
  islandBox,
  islandFrame,
  localCoords,
  nearestCorner,
  nearestSurface,
  resolveAll,
  wallFrame,
  worldPoint,
  yawFor,
  type Placed,
  COUNTER_THICK,
  ISLAND_DEPTH,
} from "@/lib/planner/geometry";
import { frontLayout, getPlannerItem, BASE_H, TOE_KICK_H, type FrontPart, type PlannerItem } from "@/lib/planner/catalog";
import type { FloorMove } from "./floor-view";

export type CameraPreset = "iso" | "top" | "front" | "left" | "right";

export type Scene3DApi = {
  snapshot: () => string | null;
  setPreset: (p: CameraPreset) => void;
};

export type Scene3DProps = {
  design: Design;
  selectedId?: string | null;
  hoverId?: string | null;
  readonly?: boolean;
  activeSurface?: SurfaceId | null;
  onSelect?: (id: string | null) => void;
  onHover?: (id: string | null) => void;
  onSurfaceSelect?: (s: SurfaceId) => void;
  onDragStart?: () => void;
  onMove?: (id: string, move: FloorMove, transient: boolean) => void;
  onIslandMove?: (x: number, y: number, transient: boolean) => void;
  onReady?: (api: Scene3DApi) => void;
  className?: string;
  initialPreset?: CameraPreset;
};

// ---------------------------------------------------------------------------
// Materials (created once, client only)
// ---------------------------------------------------------------------------

type Mats = ReturnType<typeof makeMats>;
let MATS: Mats | null = null;
function makeMats() {
  return {
    body: new THREE.MeshStandardMaterial({ color: "#f3f3f0", roughness: 0.6, metalness: 0 }),
    front: new THREE.MeshStandardMaterial({ color: "#f8f8f6", roughness: 0.45, metalness: 0 }),
    panel: new THREE.MeshStandardMaterial({ color: "#f1f1ee", roughness: 0.55, metalness: 0 }),
    hover: new THREE.MeshStandardMaterial({ color: "#eef3f8", roughness: 0.45, metalness: 0 }),
    toe: new THREE.MeshStandardMaterial({ color: "#232323", roughness: 0.8 }),
    counter: new THREE.MeshStandardMaterial({ color: "#dedcd6", roughness: 0.35, metalness: 0.05 }),
    handle: new THREE.MeshStandardMaterial({ color: "#b9bcc0", roughness: 0.35, metalness: 0.85 }),
    glass: new THREE.MeshStandardMaterial({ color: "#cfe3f2", roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.55 }),
    open: new THREE.MeshStandardMaterial({ color: "#e7e5e0", roughness: 0.8 }),
    appliance: new THREE.MeshStandardMaterial({ color: "#c9cdd1", roughness: 0.35, metalness: 0.6 }),
    applianceDark: new THREE.MeshStandardMaterial({ color: "#2f3236", roughness: 0.6, metalness: 0.3 }),
    wall: new THREE.MeshStandardMaterial({ color: "#f4f0e8", roughness: 0.95, side: THREE.FrontSide }),
    wallOpen: new THREE.MeshStandardMaterial({ color: "#d9d2c5", roughness: 0.95, transparent: true, opacity: 0.18, side: THREE.DoubleSide }),
    windowGlass: new THREE.MeshStandardMaterial({ color: "#d7eaf7", roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
    trim: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.6 }),
    door: new THREE.MeshStandardMaterial({ color: "#ebe4d6", roughness: 0.7, side: THREE.DoubleSide }),
    sink: new THREE.MeshStandardMaterial({ color: "#a9afb5", roughness: 0.3, metalness: 0.8 }),
    ghost: new THREE.MeshStandardMaterial({ color: "#c2410c", roughness: 0.6, transparent: true, opacity: 0.25 }),
  };
}
function mats(): Mats {
  if (!MATS) MATS = makeMats();
  return MATS;
}

function makeFloorTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d");
  if (!g) return null;
  g.fillStyle = "#e9d9bd";
  g.fillRect(0, 0, 512, 512);
  const plankH = 64;
  for (let row = 0; row < 8; row++) {
    const offset = (row % 2) * 160;
    for (let x = -256; x < 512; x += 320) {
      const shade = 200 + Math.round(Math.random() * 30);
      g.fillStyle = `rgb(${shade + 20}, ${shade - 5}, ${shade - 45})`;
      g.fillRect(x + offset, row * plankH, 318, plankH - 2);
      g.strokeStyle = "rgba(120,90,50,0.18)";
      for (let k = 0; k < 6; k++) {
        g.beginPath();
        const y = row * plankH + 6 + k * 10 + Math.random() * 4;
        g.moveTo(x + offset, y);
        g.bezierCurveTo(x + offset + 100, y + 3, x + offset + 220, y - 3, x + offset + 318, y + 1);
        g.stroke();
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------

function isTouchDevice(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia("(pointer: coarse)").matches;
  } catch {
    return false;
  }
}

export default function Scene3D(props: Scene3DProps) {
  const { design, className } = props;
  const touch = useMemo(() => isTouchDevice(), []);
  const { width: W, depth: D } = design.room;
  const target = useMemo(() => new THREE.Vector3(W / 2, 30, D / 2), [W, D]);
  const dist = Math.max(W, D) * 1.35 + 40;
  const initial = useMemo(() => presetPosition(props.initialPreset ?? "iso", target, dist), [props.initialPreset, target, dist]);

  return (
    <div className={className} style={{ position: "relative" }}>
      <Canvas
        shadows="percentage"
        dpr={[1, touch ? 1.5 : 1.75]}
        gl={{ preserveDrawingBuffer: true, antialias: !touch, powerPreference: "default", failIfMajorPerformanceCaveat: false }}
        camera={{ fov: 42, near: 2, far: 4000, position: [initial.x, initial.y, initial.z] }}
        style={{ position: "absolute", inset: 0 }}
        fallback={
          <div className="flex h-full w-full items-center justify-center p-6 text-center">
            <div>
              <p className="font-display text-xl text-[var(--color-ink)]">3D isn&rsquo;t available on this device</p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">Your browser couldn&rsquo;t start WebGL. The floor plan and wall views still work, and the printed design sheet includes every elevation.</p>
            </div>
          </div>
        }
      >
        <color attach="background" args={["#f7f4ee"]} />
        <SceneContent {...props} target={target} dist={dist} />
      </Canvas>
    </div>
  );
}

function presetPosition(p: CameraPreset, target: THREE.Vector3, dist: number): THREE.Vector3 {
  const dir = new THREE.Vector3();
  switch (p) {
    case "top":
      dir.set(0.0001, 1, 0.0001);
      break;
    case "front":
      dir.set(0, 0.28, 1);
      break;
    case "left":
      dir.set(-1, 0.28, 0.35);
      break;
    case "right":
      dir.set(1, 0.28, 0.35);
      break;
    default:
      dir.set(0.5, 0.62, 1);
  }
  dir.normalize().multiplyScalar(p === "top" ? dist * 1.05 : dist);
  return target.clone().add(dir);
}

function SceneContent(props: Scene3DProps & { target: THREE.Vector3; dist: number }) {
  const { design, selectedId, hoverId, readonly, onSelect, onHover, onDragStart, onMove, onIslandMove, onReady, target, dist } = props;
  const touchShadow = useMemo(() => isTouchDevice(), []);
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { gl, camera } = useThree();
  const placed = useMemo(() => resolveAll(design), [design]);
  const counters = useMemo(() => counterPieces(design), [design]);
  const drag = useDrag({ design, readonly: !!readonly, controls, onDragStart, onMove, onIslandMove });

  useEffect(() => {
    onReady?.({
      snapshot: () => {
        try {
          return gl.domElement.toDataURL("image/png");
        } catch {
          return null;
        }
      },
      setPreset: (p) => {
        const pos = presetPosition(p, target, dist);
        camera.position.copy(pos);
        camera.lookAt(target);
        controls.current?.target.copy(target);
        controls.current?.update();
      },
    });
  }, [onReady, gl, camera, target, dist]);

  const { width: W, depth: D } = design.room;
  const floorTex = useMemo(() => makeFloorTexture(), []);
  useEffect(() => {
    if (floorTex) floorTex.repeat.set(W / 96, D / 96);
  }, [floorTex, W, D]);

  return (
    <>
      <hemisphereLight args={["#ffffff", "#cfc6b8", 0.55]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[W * 0.25, 220, D * 0.9]}
        intensity={1.25}
        castShadow
        shadow-mapSize={touchShadow ? [1024, 1024] : [2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-Math.max(W, D)}
        shadow-camera-right={Math.max(W, D)}
        shadow-camera-top={Math.max(W, D)}
        shadow-camera-bottom={-Math.max(W, D)}
        shadow-camera-near={10}
        shadow-camera-far={800}
      />
      <directionalLight position={[-W, 120, -D * 0.5]} intensity={0.35} />

      <OrbitControls
        ref={controls}
        target={target}
        enableDamping
        dampingFactor={0.12}
        maxPolarAngle={Math.PI / 2 - 0.04}
        minDistance={40}
        maxDistance={dist * 3}
        makeDefault
      />

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[W / 2, 0, D / 2]}
        receiveShadow
        onPointerDown={(e) => {
          if (readonly) return;
          e.stopPropagation();
          onSelect?.(null);
        }}
        onPointerMove={drag.onFloorMove}
        onPointerUp={drag.onFloorUp}
      >
        <planeGeometry args={[W + 0.2, D + 0.2]} />
        {floorTex ? <meshStandardMaterial map={floorTex} roughness={0.75} /> : <meshStandardMaterial color="#e6d6ba" roughness={0.75} />}
      </mesh>
      {/* Big invisible catch plane so drags keep tracking outside the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[W / 2, -0.05, D / 2]} visible={false} onPointerMove={drag.onFloorMove} onPointerUp={drag.onFloorUp}>
        <planeGeometry args={[W * 6, D * 6]} />
        <meshBasicMaterial />
      </mesh>

      <Walls room={design.room} activeSurface={props.activeSurface} onSurfaceSelect={props.onSurfaceSelect} readonly={!!readonly} />

      {counters.map((c, i) => (
        <mesh key={`ct${i}`} position={[(c.box.x0 + c.box.x1) / 2, BASE_H + COUNTER_THICK / 2 + i * 0.002, (c.box.y0 + c.box.y1) / 2]} castShadow receiveShadow material={mats().counter}>
          <boxGeometry args={[c.box.x1 - c.box.x0, COUNTER_THICK, c.box.y1 - c.box.y0]} />
        </mesh>
      ))}

      {placed.map((p) => (
        <Unit
          key={p.item.id}
          p={p}
          selected={p.item.id === selectedId}
          hovered={p.item.id === hoverId}
          readonly={!!readonly}
          onPointerDown={(e) => {
            if (readonly) return;
            e.stopPropagation();
            onSelect?.(p.item.id);
            drag.startItem(e, p);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            if (!readonly) onHover?.(p.item.id);
          }}
          onPointerOut={() => onHover?.(null)}
        />
      ))}

      {design.island.enabled && <IslandGhost design={design} placed={placed} readonly={!!readonly} onPointerDown={drag.startIsland} active={props.activeSurface === "island"} />}
    </>
  );
}

// ---------------------------------------------------------------------------
// Dragging
// ---------------------------------------------------------------------------

type DragState =
  | { kind: "item"; id: string; offset: number; plane: THREE.Plane; moved: boolean }
  | { kind: "island"; dx: number; dy: number; plane: THREE.Plane; moved: boolean };

function useDrag({
  design,
  readonly,
  controls,
  onDragStart,
  onMove,
  onIslandMove,
}: {
  design: Design;
  readonly: boolean;
  controls: React.RefObject<ComponentRef<typeof OrbitControls> | null>;
  onDragStart?: () => void;
  onMove?: (id: string, move: FloorMove, transient: boolean) => void;
  onIslandMove?: (x: number, y: number, transient: boolean) => void;
}) {
  const ref = useRef<DragState | null>(null);
  const { raycaster, camera, gl } = useThree();
  const hit = useRef(new THREE.Vector3());

  const pointOnPlane = (plane: THREE.Plane): THREE.Vector3 | null => {
    const p = raycaster.ray.intersectPlane(plane, hit.current);
    return p ? p.clone() : null;
  };

  useEffect(() => {
    const el = gl.domElement;
    const move = (ev: PointerEvent) => {
      const d = ref.current;
      if (!d) return;
      const rect = el.getBoundingClientRect();
      const ndc = new THREE.Vector2(((ev.clientX - rect.left) / rect.width) * 2 - 1, -((ev.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const p = pointOnPlane(d.plane);
      if (!p) return;
      const room = { x: p.x, y: p.z };
      if (!d.moved) {
        d.moved = true;
        onDragStart?.();
      }
      if (d.kind === "island") {
        onIslandMove?.(Math.round((room.x + d.dx) * 2) / 2, Math.round((room.y + d.dy) * 2) / 2, true);
        return;
      }
      const item = design.items.find((i) => i.id === d.id);
      const def = item && getPlannerItem(item.sku);
      if (!item || !def) return;
      if (def.cornerSize) {
        onMove?.(item.id, { corner: nearestCorner(design, room) }, true);
        return;
      }
      const near = nearestSurface(design, room, def);
      if (!near) return;
      if (near.surface === item.surface) {
        const fr = near.surface === "island" ? islandFrame(design) : wallFrame(design.room, near.surface);
        const local = localCoords(fr, room);
        onMove?.(item.id, { surface: near.surface, t: local.t - d.offset }, true);
      } else {
        onMove?.(item.id, { surface: near.surface, t: near.t }, true);
      }
    };
    const up = () => {
      const d = ref.current;
      if (!d) return;
      ref.current = null;
      if (controls.current) controls.current.enabled = true;
      if (!d.moved) return;
      if (d.kind === "island") onIslandMove?.(design.island.x, design.island.y, false);
      else {
        const item = design.items.find((i) => i.id === d.id);
        if (item) onMove?.(item.id, { surface: item.surface, t: item.t, corner: item.corner }, false);
      }
    };
    el.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [design, gl, camera, raycaster, onDragStart, onMove, onIslandMove]);

  return {
    startItem: (e: ThreeEvent<PointerEvent>, p: Placed) => {
      if (readonly) return;
      const planeY = p.def.zBottom + Math.min(p.def.height, 30) / 2;
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -planeY);
      const pt = e.ray.intersectPlane(plane, new THREE.Vector3());
      const local = pt ? localCoords(p.frame, { x: pt.x, y: pt.z }) : { t: p.t };
      ref.current = { kind: "item", id: p.item.id, offset: local.t - p.t, plane, moved: false };
      if (controls.current) controls.current.enabled = false;
    },
    startIsland: (e: ThreeEvent<PointerEvent>) => {
      if (readonly) return;
      e.stopPropagation();
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -BASE_H / 2);
      const pt = e.ray.intersectPlane(plane, new THREE.Vector3());
      if (!pt) return;
      ref.current = { kind: "island", dx: design.island.x - pt.x, dy: design.island.y - pt.z, plane, moved: false };
      if (controls.current) controls.current.enabled = false;
    },
    onFloorMove: () => {},
    onFloorUp: () => {},
  };
}

// ---------------------------------------------------------------------------
// Room
// ---------------------------------------------------------------------------

/** A wall plus its windows/doors; hidden as a unit whenever it sits between the camera and the room. */
function WallGroup({ fr, children }: { fr: ReturnType<typeof wallFrame>; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const mid = worldPoint(fr, fr.length / 2, 0);
  useFrame(({ camera }) => {
    if (!ref.current) return;
    const dx = camera.position.x - mid.x;
    const dz = camera.position.z - mid.y;
    ref.current.visible = dx * fr.n.x + dz * fr.n.y > -0.5;
  });
  return <group ref={ref}>{children}</group>;
}

function Walls({ room, activeSurface, onSurfaceSelect, readonly }: { room: Room; activeSurface?: SurfaceId | null; onSurfaceSelect?: (s: SurfaceId) => void; readonly: boolean }) {
  const H = room.ceiling;
  return (
    <>
      {([0, 1, 2, 3] as WallId[]).map((w) => {
        const fr = wallFrame(room, w);
        const mid = worldPoint(fr, fr.length / 2, -0.05);
        const yaw = yawFor(fr.u);
        const open = room.openWalls.includes(w);
        return (
          <WallGroup key={w} fr={fr}>
          {room.openings.filter((o) => o.wall === w).map((o) => (
            <OpeningMesh key={o.id} o={o} room={room} />
          ))}
          <group position={[mid.x, H / 2, mid.y]} rotation={[0, yaw, 0]}>
            <mesh
              receiveShadow
              material={open ? mats().wallOpen : mats().wall}
              onPointerDown={(e) => {
                if (readonly || open) return;
                e.stopPropagation();
                onSurfaceSelect?.(w);
              }}
            >
              <planeGeometry args={[fr.length, open ? 8 : H]} />
            </mesh>
            {!open && (
              <mesh position={[0, -H / 2 + 2.25, 0.15]} material={mats().trim}>
                <boxGeometry args={[fr.length, 4.5, 0.3]} />
              </mesh>
            )}
            {activeSurface === w && !open && (
              <mesh position={[0, -H / 2 + 0.05, 0.3]}>
                <boxGeometry args={[fr.length, 0.5, 0.4]} />
                <meshBasicMaterial color="#c2410c" />
              </mesh>
            )}
          </group>
          </WallGroup>
        );
      })}
    </>
  );
}

function OpeningMesh({ o, room }: { o: Opening; room: Room }) {
  const fr = wallFrame(room, o.wall);
  const mid = worldPoint(fr, o.t + o.width / 2, 0.2);
  const yaw = yawFor(fr.u);
  const y = o.sill + o.height / 2;
  const m = mats();
  if (o.kind === "window") {
    return (
      <group position={[mid.x, y, mid.y]} rotation={[0, yaw, 0]}>
        <mesh material={m.windowGlass}>
          <planeGeometry args={[o.width - 4, o.height - 4]} />
        </mesh>
        {/* frame */}
        <mesh position={[0, o.height / 2 - 1, 0.2]} material={m.trim}>
          <boxGeometry args={[o.width, 2, 1]} />
        </mesh>
        <mesh position={[0, -o.height / 2 + 1, 0.2]} material={m.trim}>
          <boxGeometry args={[o.width, 2, 1.5]} />
        </mesh>
        <mesh position={[-o.width / 2 + 1, 0, 0.2]} material={m.trim}>
          <boxGeometry args={[2, o.height, 1]} />
        </mesh>
        <mesh position={[o.width / 2 - 1, 0, 0.2]} material={m.trim}>
          <boxGeometry args={[2, o.height, 1]} />
        </mesh>
        <mesh position={[0, 0, 0.1]} material={m.trim}>
          <boxGeometry args={[1, o.height - 4, 0.6]} />
        </mesh>
      </group>
    );
  }
  return (
    <group position={[mid.x, y, mid.y]} rotation={[0, yaw, 0]}>
      <mesh material={m.door}>
        <planeGeometry args={[o.width - 3, o.height - 1.5]} />
      </mesh>
      <mesh position={[0, o.height / 2 - 1, 0.3]} material={m.trim}>
        <boxGeometry args={[o.width + 2, 2.5, 0.8]} />
      </mesh>
      <mesh position={[-o.width / 2 - 0.5, 0, 0.3]} material={m.trim}>
        <boxGeometry args={[2.5, o.height, 0.8]} />
      </mesh>
      <mesh position={[o.width / 2 + 0.5, 0, 0.3]} material={m.trim}>
        <boxGeometry args={[2.5, o.height, 0.8]} />
      </mesh>
      <mesh position={[o.width / 2 - 5, -2, 1]} material={m.handle}>
        <sphereGeometry args={[1.1, 12, 12]} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Units
// ---------------------------------------------------------------------------

type UnitProps = {
  p: Placed;
  selected: boolean;
  hovered: boolean;
  readonly: boolean;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: () => void;
};

function Unit({ p, selected, hovered, readonly, onPointerDown, onPointerOver, onPointerOut }: UnitProps) {
  const { def, frame, t } = p;
  const origin = worldPoint(frame, t, 0);
  const yaw = yawFor(frame.u);
  const m = mats();
  const w = def.cornerSize ?? def.width;
  const d = def.cornerSize ?? def.depth;
  const h = def.zTop - def.zBottom;
  const bodyMat = hovered && !selected ? m.hover : m.body;

  return (
    <group position={[origin.x, def.zBottom, origin.y]} rotation={[0, yaw, 0]} onPointerDown={onPointerDown} onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      {def.front === "lazy" ? (
        <LazySusan def={def} mat={bodyMat} selected={selected} />
      ) : def.front === "diag" || def.front === "diag-glass" ? (
        <DiagonalCorner def={def} mat={bodyMat} selected={selected} />
      ) : def.group === "appliance" ? (
        <Appliance def={def} selected={selected} hovered={hovered} />
      ) : (
        <>
          {def.level === "base" && def.front !== "panel" && (
            <mesh position={[w / 2, TOE_KICK_H / 2, (d - 3) / 2]} material={m.toe}>
              <boxGeometry args={[Math.max(0.5, w - 0.4), TOE_KICK_H, d - 3]} />
            </mesh>
          )}
          <mesh
            position={[w / 2, def.level === "base" && def.front !== "panel" ? TOE_KICK_H + (h - TOE_KICK_H) / 2 : h / 2, d / 2]}
            castShadow
            receiveShadow
            material={bodyMat}
          >
            <boxGeometry args={[w, def.level === "base" && def.front !== "panel" ? h - TOE_KICK_H : h, d]} />
            {selected && <Edges color="#c2410c" lineWidth={1.5} />}
          </mesh>
          {frontLayout(def).map((part, i) => <Front key={i} part={part} z={d} />)}
          {def.front === "sink" && <SinkBasin w={w} d={d} />}
        </>
      )}
      {/* invisible hit box so thin items (fillers) are easy to grab */}
      {!readonly && w < 4 && (
        <mesh position={[w / 2, h / 2, d / 2]} visible={false}>
          <boxGeometry args={[Math.max(w, 3), h, d]} />
          <meshBasicMaterial />
        </mesh>
      )}
    </group>
  );
}

function Front({ part, z }: { part: FrontPart; z: number }) {
  const m = mats();
  const T = 0.75; // door thickness
  const cx = part.x + part.w / 2;
  const cy = part.y + part.h / 2;
  const s = Math.min(2.25, part.w / 4, part.h / 4); // rail/stile width
  switch (part.kind) {
    case "door":
    case "drawer":
    case "glass": {
      const inner = part.w > 6 && part.h > 5;
      return (
        <group position={[cx, cy, z]}>
          {inner ? (
            <>
              <mesh position={[0, part.h / 2 - s / 2, T / 2]} material={m.front} castShadow>
                <boxGeometry args={[part.w, s, T]} />
              </mesh>
              <mesh position={[0, -part.h / 2 + s / 2, T / 2]} material={m.front} castShadow>
                <boxGeometry args={[part.w, s, T]} />
              </mesh>
              <mesh position={[-part.w / 2 + s / 2, 0, T / 2]} material={m.front} castShadow>
                <boxGeometry args={[s, part.h - 2 * s, T]} />
              </mesh>
              <mesh position={[part.w / 2 - s / 2, 0, T / 2]} material={m.front} castShadow>
                <boxGeometry args={[s, part.h - 2 * s, T]} />
              </mesh>
              <mesh position={[0, 0, (T - 0.25) / 2]} material={part.kind === "glass" ? m.glass : m.panel}>
                <boxGeometry args={[part.w - 2 * s, part.h - 2 * s, T - 0.25]} />
              </mesh>
            </>
          ) : (
            <mesh position={[0, 0, T / 2]} material={m.front} castShadow>
              <boxGeometry args={[part.w, part.h, T]} />
            </mesh>
          )}
          {part.kind === "drawer" ? (
            <mesh position={[0, 0, T + 0.6]} material={m.handle}>
              <boxGeometry args={[Math.min(6, part.w * 0.5), 0.5, 1.2]} />
            </mesh>
          ) : (
            <mesh position={[part.hinge === "right" ? -part.w / 2 + 1.6 : part.w / 2 - 1.6, 0, T + 0.6]} material={m.handle}>
              <boxGeometry args={[0.5, Math.min(6, part.h * 0.4), 1.2]} />
            </mesh>
          )}
        </group>
      );
    }
    case "panel":
      return (
        <mesh position={[cx, cy, z + T / 2]} material={m.panel} castShadow>
          <boxGeometry args={[part.w, part.h, T]} />
        </mesh>
      );
    case "open": {
      const shelves = Math.max(1, Math.round(part.h / 12));
      return (
        <group position={[cx, cy, z]}>
          <mesh position={[0, 0, -0.6]} material={m.open}>
            <boxGeometry args={[part.w - 1.5, part.h - 1.5, 1]} />
          </mesh>
          {Array.from({ length: shelves - 1 }, (_, i) => (
            <mesh key={i} position={[0, -part.h / 2 + ((i + 1) * part.h) / shelves, -0.1]} material={m.front}>
              <boxGeometry args={[part.w - 1.5, 0.75, 0.6]} />
            </mesh>
          ))}
        </group>
      );
    }
    case "wine": {
      const cols = Math.max(2, Math.floor(part.w / 4.5));
      const rows = Math.max(2, Math.floor(part.h / 4.5));
      return (
        <group position={[cx, cy, z]}>
          <mesh position={[0, 0, -0.6]} material={m.open}>
            <boxGeometry args={[part.w - 1.5, part.h - 1.5, 1]} />
          </mesh>
          {Array.from({ length: cols + 1 }, (_, i) => (
            <mesh key={`c${i}`} position={[-part.w / 2 + (i * part.w) / cols, 0, 0.3]} rotation={[0, 0, Math.PI / 4]} material={m.front}>
              <boxGeometry args={[0.6, part.h * 1.3, 0.6]} />
            </mesh>
          ))}
          {Array.from({ length: rows + 1 }, (_, i) => (
            <mesh key={`r${i}`} position={[0, -part.h / 2 + (i * part.h) / rows, 0.3]} rotation={[0, 0, -Math.PI / 4]} material={m.front}>
              <boxGeometry args={[part.w * 1.3, 0.6, 0.6]} />
            </mesh>
          ))}
        </group>
      );
    }
    case "appliance":
      return null;
  }
}

function Appliance({ def, selected, hovered }: { def: PlannerItem; selected: boolean; hovered: boolean }) {
  const m = mats();
  const w = def.width;
  const d = def.depth;
  const h = def.height;
  const steel = hovered && !selected ? m.hover : m.appliance;
  const edges = selected ? <Edges color="#c2410c" lineWidth={1.5} /> : null;
  switch (def.front) {
    case "range":
      return (
        <group>
          <mesh position={[w / 2, h / 2, d / 2]} material={m.applianceDark} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            {edges}
          </mesh>
          {/* stainless oven door with window + bar handle */}
          <mesh position={[w / 2, h * 0.42, d + 0.3]} material={steel}>
            <boxGeometry args={[w - 1, h * 0.55, 0.6]} />
          </mesh>
          <mesh position={[w / 2, h * 0.4, d + 0.7]} material={m.glass}>
            <boxGeometry args={[Math.max(6, w - 8), h * 0.26, 0.3]} />
          </mesh>
          <mesh position={[w / 2, h * 0.7, d + 1.2]} material={m.handle}>
            <boxGeometry args={[w - 6, 0.9, 1.4]} />
          </mesh>
          {/* cooktop + burners */}
          <mesh position={[w / 2, h + 0.3, d / 2]} material={m.applianceDark}>
            <boxGeometry args={[w - 0.5, 0.6, d - 2]} />
          </mesh>
          {[
            [w * 0.27, d * 0.32],
            [w * 0.73, d * 0.32],
            [w * 0.27, d * 0.7],
            [w * 0.73, d * 0.7],
          ].map(([x, zz], i) => (
            <mesh key={i} position={[x, h + 0.7, zz]} rotation={[-Math.PI / 2, 0, 0]} material={m.appliance}>
              <ringGeometry args={[Math.min(2.2, w * 0.07), Math.min(3.2, w * 0.1), 24]} />
            </mesh>
          ))}
          {/* backguard with knobs */}
          <mesh position={[w / 2, h + 4.5, 1.5]} material={steel} castShadow>
            <boxGeometry args={[w, 9, 3]} />
          </mesh>
          {[0.2, 0.35, 0.65, 0.8].map((fx, i) => (
            <mesh key={i} position={[w * fx, h + 4, 3.4]} rotation={[Math.PI / 2, 0, 0]} material={m.applianceDark}>
              <cylinderGeometry args={[0.8, 0.8, 0.8, 12]} />
            </mesh>
          ))}
        </group>
      );
    case "hood":
      return (
        <group>
          <mesh position={[w / 2, h / 2, d / 2]} material={steel} castShadow>
            <boxGeometry args={[w, h, d]} />
            {edges}
          </mesh>
          <mesh position={[w / 2, 0.6, d - 1]} material={m.applianceDark}>
            <boxGeometry args={[w - 4, 1.2, 2]} />
          </mesh>
        </group>
      );
    case "chimney":
      return (
        <group>
          <mesh position={[w / 2, 3, d / 2]} material={steel} castShadow>
            <boxGeometry args={[w, 6, d]} />
            {edges}
          </mesh>
          <mesh position={[w / 2, 0.6, d - 1]} material={m.applianceDark}>
            <boxGeometry args={[w - 4, 1.2, 2]} />
          </mesh>
          <mesh position={[w / 2, 6 + (h - 6) / 2, 6]} material={steel} castShadow>
            <boxGeometry args={[10, h - 6, 12]} />
          </mesh>
        </group>
      );
    case "microwave":
      return (
        <group>
          <mesh position={[w / 2, h / 2, d / 2]} material={steel} castShadow>
            <boxGeometry args={[w, h, d]} />
            {edges}
          </mesh>
          <mesh position={[w * 0.36, h / 2, d + 0.2]} material={m.applianceDark}>
            <boxGeometry args={[w * 0.6, h - 4, 0.4]} />
          </mesh>
          <mesh position={[w * 0.84, h / 2, d + 0.2]} material={m.applianceDark}>
            <boxGeometry args={[w * 0.22, h - 4, 0.4]} />
          </mesh>
          <mesh position={[w * 0.68, h / 2, d + 0.9]} material={m.handle}>
            <boxGeometry args={[0.6, h - 6, 1.2]} />
          </mesh>
        </group>
      );
    case "dishwasher":
      return (
        <group>
          <mesh position={[w / 2, h / 2, d / 2]} material={steel} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            {edges}
          </mesh>
          <mesh position={[w / 2, h - 1.75, d + 0.2]} material={m.applianceDark}>
            <boxGeometry args={[w - 0.5, 3.5, 0.4]} />
          </mesh>
          <mesh position={[w / 2, h - 5, d + 0.8]} material={m.handle}>
            <boxGeometry args={[w - 4, 0.9, 1.4]} />
          </mesh>
          <mesh position={[w / 2, TOE_KICK_H / 2, d - 1.5]} material={m.toe}>
            <boxGeometry args={[w - 0.4, TOE_KICK_H, 3]} />
          </mesh>
        </group>
      );
    case "fridge": {
      const fd = def.features.includes("french-door");
      const builtin = def.features.includes("built-in");
      const splitY = fd ? h * 0.4 : builtin ? 0 : h * 0.7; // height of the horizontal door seam
      return (
        <group>
          <mesh position={[w / 2, h / 2, d / 2]} material={steel} castShadow receiveShadow>
            <boxGeometry args={[w, h, d]} />
            {edges}
          </mesh>
          {(fd || builtin) && (
            <mesh position={[w / 2, builtin ? h / 2 : (h + splitY) / 2, d + 0.05]} material={m.applianceDark}>
              <boxGeometry args={[0.3, builtin ? h - 2 : h - splitY - 1, 0.1]} />
            </mesh>
          )}
          {splitY > 0 && (
            <mesh position={[w / 2, splitY, d + 0.05]} material={m.applianceDark}>
              <boxGeometry args={[w - 0.5, 0.3, 0.1]} />
            </mesh>
          )}
          {fd ? (
            <>
              <mesh position={[w / 2 - 1.6, splitY + (h - splitY) / 2, d + 1]} material={m.handle}>
                <boxGeometry args={[0.9, (h - splitY) * 0.6, 1.6]} />
              </mesh>
              <mesh position={[w / 2 + 1.6, splitY + (h - splitY) / 2, d + 1]} material={m.handle}>
                <boxGeometry args={[0.9, (h - splitY) * 0.6, 1.6]} />
              </mesh>
              <mesh position={[w / 2, splitY - 4, d + 1]} material={m.handle}>
                <boxGeometry args={[w * 0.5, 0.9, 1.6]} />
              </mesh>
            </>
          ) : builtin ? (
            <>
              <mesh position={[w / 2 - 1.8, h / 2, d + 1]} material={m.handle}>
                <boxGeometry args={[1, h * 0.55, 1.8]} />
              </mesh>
              <mesh position={[w / 2 + 1.8, h / 2, d + 1]} material={m.handle}>
                <boxGeometry args={[1, h * 0.55, 1.8]} />
              </mesh>
              <mesh position={[w / 2, h - 3, d + 0.2]} material={m.applianceDark}>
                <boxGeometry args={[w - 2, 4, 0.4]} />
              </mesh>
            </>
          ) : (
            <>
              <mesh position={[3, splitY + (h - splitY) / 2, d + 1]} material={m.handle}>
                <boxGeometry args={[0.9, (h - splitY) * 0.5, 1.6]} />
              </mesh>
              <mesh position={[3, splitY / 2 + 2, d + 1]} material={m.handle}>
                <boxGeometry args={[0.9, splitY * 0.5, 1.6]} />
              </mesh>
            </>
          )}
        </group>
      );
    }
    default:
      return (
        <mesh position={[w / 2, h / 2, d / 2]} material={steel}>
          <boxGeometry args={[w, h, d]} />
          {edges}
        </mesh>
      );
  }
}

function SinkBasin({ w, d }: { w: number; d: number }) {
  const m = mats();
  return (
    <group position={[w / 2, BASE_H + COUNTER_THICK, d / 2 + 1]}>
      <mesh position={[0, 0.15, 0]} material={m.sink}>
        <boxGeometry args={[Math.min(30, w - 4), 0.3, Math.min(18, d - 5)]} />
      </mesh>
      <mesh position={[0, -0.1, 0]} material={m.applianceDark}>
        <boxGeometry args={[Math.min(27, w - 7), 0.3, Math.min(15, d - 8)]} />
      </mesh>
      <mesh position={[0, 5, -Math.min(18, d - 5) / 2 - 1.5]} material={m.handle}>
        <cylinderGeometry args={[0.6, 0.6, 10, 12]} />
      </mesh>
      <mesh position={[0, 10, -Math.min(18, d - 5) / 2 + 1.5]} rotation={[Math.PI / 2, 0, 0]} material={m.handle}>
        <cylinderGeometry args={[0.55, 0.55, 6, 12]} />
      </mesh>
    </group>
  );
}

function LazySusan({ def, mat, selected }: { def: PlannerItem; mat: THREE.Material; selected: boolean }) {
  const m = mats();
  const s = def.cornerSize!;
  const h = def.zTop - def.zBottom;
  const bodyH = h - TOE_KICK_H;
  const legDepth = 24;
  const doorW = s - legDepth;
  const doorH = bodyH - 0.5;
  return (
    <group>
      {/* leg along this wall */}
      <mesh position={[s / 2, TOE_KICK_H + bodyH / 2, legDepth / 2]} material={mat} castShadow receiveShadow>
        <boxGeometry args={[s, bodyH, legDepth]} />
        {selected && <Edges color="#c2410c" lineWidth={1.5} />}
      </mesh>
      {/* leg along the next wall */}
      <mesh position={[s - legDepth / 2, TOE_KICK_H + bodyH / 2, s / 2]} material={mat} castShadow receiveShadow>
        <boxGeometry args={[legDepth, bodyH, s]} />
      </mesh>
      <mesh position={[s / 2, TOE_KICK_H / 2, (legDepth - 3) / 2]} material={m.toe}>
        <boxGeometry args={[s - 0.4, TOE_KICK_H, legDepth - 3]} />
      </mesh>
      <mesh position={[s - (legDepth - 3) / 2 - 3, TOE_KICK_H / 2, s / 2]} material={m.toe}>
        <boxGeometry args={[legDepth - 3, TOE_KICK_H, s - 0.4]} />
      </mesh>
      {/* bi-fold doors on the two faces of the notch */}
      <Front part={{ kind: "door", x: 0, y: TOE_KICK_H + 0.25, w: doorW, h: doorH, hinge: "left" }} z={legDepth} />
      <group position={[s - legDepth, 0, s]} rotation={[0, Math.PI / 2, 0]}>
        <Front part={{ kind: "door", x: 0, y: TOE_KICK_H + 0.25, w: doorW, h: doorH, hinge: "right" }} z={0} />
      </group>
    </group>
  );
}

function DiagonalCorner({ def, mat, selected }: { def: PlannerItem; mat: THREE.Material; selected: boolean }) {
  const m = mats();
  const s = def.cornerSize!;
  const h = def.zTop - def.zBottom;
  const leg = 12;
  const geom = useMemo(() => {
    const shape = new THREE.Shape();
    // shape (x, -z) so that after rotating -90° about X the shape's y maps to scene z
    shape.moveTo(0, 0);
    shape.lineTo(s, 0);
    shape.lineTo(s, -s);
    shape.lineTo(s - leg, -s);
    shape.lineTo(0, -leg);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, 0);
    return g;
  }, [s, h]);
  const diagLen = Math.sqrt(2) * (s - leg);
  return (
    <group>
      <mesh geometry={geom} material={mat} castShadow receiveShadow>
        {selected && <Edges color="#c2410c" lineWidth={1.5} />}
      </mesh>
      {/* diagonal door: from (0, leg) to (s-leg, s) in local x/z */}
      <group position={[0, 0, leg]} rotation={[0, -Math.PI / 4, 0]}>
        <Front part={{ kind: def.front === "diag-glass" ? "glass" : "door", x: 0, y: 0.25, w: diagLen, h: h - 0.5, hinge: "left" }} z={0} />
      </group>
      <mesh visible={false} material={m.body}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>
    </group>
  );
}

function IslandGhost({ design, placed, readonly, onPointerDown, active }: { design: Design; placed: Placed[]; readonly: boolean; onPointerDown: (e: ThreeEvent<PointerEvent>) => void; active: boolean }) {
  const hasItems = placed.some((p) => p.item.surface === "island");
  const b = islandBox(design);
  const fr = islandFrame(design);
  const yaw = yawFor(fr.u);
  const centre = worldPoint(fr, fr.length / 2, ISLAND_DEPTH / 2);
  const m = mats();
  return (
    <group position={[centre.x, 0, centre.y]} rotation={[0, yaw, 0]}>
      {!hasItems && (
        <mesh position={[0, BASE_H / 2, 0]} material={m.ghost} onPointerDown={readonly ? undefined : onPointerDown}>
          <boxGeometry args={[fr.length, BASE_H, ISLAND_DEPTH]} />
          <Edges color="#c2410c" lineWidth={1} />
        </mesh>
      )}
      {/* drag handle / footprint outline on the floor */}
      <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} onPointerDown={readonly ? undefined : onPointerDown}>
        <planeGeometry args={[fr.length + 6, ISLAND_DEPTH + 6]} />
        <meshBasicMaterial color={active ? "#c2410c" : "#1c1917"} transparent opacity={active ? 0.22 : 0.08} />
      </mesh>
      {hasItems && (
        <mesh position={[0, BASE_H / 2, 0]} visible={false} onPointerDown={readonly ? undefined : onPointerDown}>
          <boxGeometry args={[b.x1 - b.x0, 0.1, b.y1 - b.y0]} />
          <meshBasicMaterial />
        </mesh>
      )}
    </group>
  );
}

export function useCornerLabel(c: CornerId | null) {
  return c;
}
