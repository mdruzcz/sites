import { deciduousTree, evergreen, houseRoofline, megaTree, pixelArch, type Prop } from "./props";
import type { PropType } from "../pricing";

export type SceneId = "mega" | "roofline" | "deciduous" | "evergreen" | "display";

export interface Camera {
  /** Downward tilt, radians. tree.js looks down by about 0.16. */
  pitch: number;
  /** Side-to-side camera sway, radians either way (0 = none). */
  sway: number;
  swayPeriod: number;
  /** Spin of props marked `spin`, radians per second (tree.js main view: 0.08). */
  spin: number;
  /** Perspective strength (0 = orthographic like tree.js). */
  persp: number;
  /** Resting yaw. */
  yaw: number;
}

export const SCENES: { id: SceneId; label: string; blurb: string }[] = [
  { id: "mega", label: "Mega tree", blurb: "A cone of pixel strands on a centre pole, wired to the controller box." },
  { id: "roofline", label: "Roofline", blurb: "Eaves and peaks of a house traced in pixels." },
  { id: "deciduous", label: "Wrapped tree", blurb: "Trunk and branches of a deciduous tree wrapped in pixels." },
  { id: "evergreen", label: "Evergreens", blurb: "Evergreens wrapped bottom to top in a spiral of pixels." },
  { id: "display", label: "Full display", blurb: "Roofline, mega tree, wrapped tree, evergreens and an arch on one controller." },
];

const cam = (c: Partial<Camera>): Camera => ({ pitch: 0.16, sway: 0, swayPeriod: 48, spin: 0, persp: 0.05, yaw: 0, ...c });

/** q scales pixel density (1 = full; lower on phones and thumbnails). */
export function buildScene(id: SceneId, q = 1): { props: Prop[]; camera: Camera } {
  const sq = Math.sqrt(q);
  switch (id) {
    case "mega":
      return {
        props: [megaTree({ key: "mega", height: 6, strands: Math.round(16 * sq), perStrand: Math.round(44 * sq), spin: true })],
        camera: cam({ pitch: 0.16, spin: 0.08, persp: 0 }),
      };
    case "roofline":
      return {
        props: [houseRoofline({ key: "house", width: 12, depth: 8, spacing: 0.13 / q })],
        camera: cam({ pitch: 0.13, sway: 0.5, swayPeriod: 44, persp: 0.1, yaw: 0.05 }),
      };
    case "deciduous":
      return {
        props: [deciduousTree({ key: "decid", height: 7, spin: true, spacing: 0.1 / q })],
        camera: cam({ pitch: 0.15, spin: 0.08, persp: 0.04 }),
      };
    case "evergreen":
      return {
        props: [
          evergreen({ key: "ev1", x: 0, z: 0, height: 4.6, spin: true, star: true, seed: 3, spacing: 0.11 / q }),
          evergreen({ key: "ev2", x: -3.5, z: -1.4, height: 3.2, spin: true, seed: 6, turns: 6, spacing: 0.11 / q }),
          evergreen({ key: "ev3", x: 3.3, z: -1, height: 2.6, spin: true, seed: 9, turns: 5, spacing: 0.11 / q }),
        ],
        camera: cam({ pitch: 0.17, spin: 0.06, persp: 0.06 }),
      };
    case "display":
    default:
      return {
        props: [
          houseRoofline({ key: "house", x: 0, z: -6, width: 12, depth: 8, spacing: 0.15 / q }),
          megaTree({ key: "mega", x: 9, z: 2, height: 6, strands: Math.round(14 * sq), perStrand: Math.round(36 * sq), spin: false }),
          deciduousTree({ key: "decid", x: -9.5, z: 1.5, height: 6.4, spacing: 0.12 / q, seed: 8 }),
          evergreen({ key: "ev1", x: -1.7, z: 1.3, height: 2.4, seed: 4, turns: 5, spacing: 0.12 / q }),
          evergreen({ key: "ev2", x: 3.1, z: 1.3, height: 2.4, seed: 7, turns: 5, spacing: 0.12 / q }),
          pixelArch({ key: "arch", x: 0.7, z: 4.6, span: 3, height: 2.4, spacing: 0.11 / q }),
        ],
        camera: cam({ pitch: 0.17, sway: 0.38, swayPeriod: 52, persp: 0.12, yaw: 0.04 }),
      };
  }
}

// ---------------------------------------------------------------------------
// Budget / package layout: a town square that fills up as props are added.
type Slot = { x: number; z: number; o?: number };
const HALF_PI = Math.PI / 2;

const SLOTS: Record<PropType, Slot[]> = {
  roof: [
    { x: 0, z: -20 },
    { x: -11, z: -20 },
    { x: 11, z: -20 },
    { x: -24, z: -8, o: HALF_PI },
    { x: 24, z: -8, o: -HALF_PI },
    { x: -24, z: 3, o: HALF_PI },
    { x: 24, z: 3, o: -HALF_PI },
    { x: -5.5, z: -33 },
    { x: 5.5, z: -33 },
    { x: 16.5, z: -33 },
  ],
  mega: [
    { x: 0, z: -6 },
    { x: -8, z: -2 },
    { x: 8, z: -2 },
    { x: 0, z: 4 },
    { x: -8, z: 6 },
    { x: 8, z: 6 },
    { x: -11, z: -9 },
    { x: 11, z: -9 },
  ],
  deciduous: [
    { x: -6, z: -13 },
    { x: 6, z: -13 },
    { x: -16, z: -7 },
    { x: 16, z: -7 },
    { x: -16, z: 0 },
    { x: 16, z: 0 },
    { x: -16, z: 7 },
    { x: 16, z: 7 },
    { x: -16, z: -13.5 },
    { x: 16, z: -13.5 },
    { x: -11, z: 14 },
    { x: 11, z: 14 },
    { x: -17, z: 14 },
    { x: 17, z: 14 },
    { x: -22, z: 13 },
    { x: 22, z: 13 },
  ],
  evergreen: [
    { x: -4.4, z: 12 },
    { x: 4.4, z: 12 },
    { x: -4.4, z: 16 },
    { x: 4.4, z: 16 },
    { x: -8, z: 11 },
    { x: 8, z: 11 },
    { x: -4.4, z: 20 },
    { x: 4.4, z: 20 },
    { x: -8, z: 19 },
    { x: 8, z: 19 },
    { x: -4.4, z: 24 },
    { x: 4.4, z: 24 },
  ],
  arch: Array.from({ length: 12 }, (_, k) => ({ x: 0, z: 11 + k * 1.4 })),
};

const NOMINAL: Record<PropType, number> = { mega: 700, roof: 330, deciduous: 520, evergreen: 190, arch: 95 };

export const BUDGET_CAMERA: Camera = cam({ pitch: 0.32, sway: 0.26, swayPeriod: 60, persp: 0.22, yaw: 0 });

/** Props for a layout (counts per type), thinned so the scene stays under `maxPixels`. */
export function layoutScene(counts: Record<PropType, number>, maxPixels = 2600): Prop[] {
  const nominal = (Object.keys(NOMINAL) as PropType[]).reduce((s, t) => s + Math.min(counts[t], SLOTS[t].length) * NOMINAL[t], 0);
  const q = Math.max(0.22, Math.min(1, maxPixels / Math.max(1, nominal)));
  const sq = Math.sqrt(q);
  const grow = 1 + (1 - q) * 0.7; // fewer pixels → slightly larger dots so the props still read
  const props: Prop[] = [];
  const add = (p: Prop) => {
    p.pixelSize *= grow;
    props.push(p);
  };
  SLOTS.roof.slice(0, counts.roof).forEach((s, i) =>
    add(houseRoofline({ key: `roof-${i}`, x: s.x, z: s.z, orient: s.o ?? 0, width: 10, depth: 7, wall: 4.2, rise: 2.2, gableW: 4, proj: 1, spacing: 0.15 / q, seed: 11 + i })),
  );
  SLOTS.mega.slice(0, counts.mega).forEach((s, i) =>
    add(megaTree({ key: `mega-${i}`, x: s.x, z: s.z, height: 6, strands: Math.max(8, Math.round(16 * sq)), perStrand: Math.max(14, Math.round(44 * sq)), spin: false, box: i === 0, seed: 7 + i })),
  );
  SLOTS.deciduous.slice(0, counts.deciduous).forEach((s, i) =>
    add(deciduousTree({ key: `decid-${i}`, x: s.x, z: s.z, height: 6.2, seed: 21 + i * 3, spacing: 0.11 / q })),
  );
  SLOTS.evergreen.slice(0, counts.evergreen).forEach((s, i) =>
    add(evergreen({ key: `ever-${i}`, x: s.x, z: s.z, height: 3.4, radius: 1.25, turns: 6, seed: 31 + i, spacing: 0.12 / q })),
  );
  SLOTS.arch.slice(0, counts.arch).forEach((s, i) => add(pixelArch({ key: `arch-${i}`, x: s.x, z: s.z, span: 4, height: 2.9, spacing: 0.1 / q, seed: 41 + i })));
  return props;
}
