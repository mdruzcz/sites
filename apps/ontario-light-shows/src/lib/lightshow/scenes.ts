import { megaTree, pixelArch, type Prop } from "./props";
import { audience, candyCane, groundPlane, singingTree, snowflake, stage } from "./stageProps";
import type { PropType } from "../pricing";

export type SceneId = "stage" | "mega" | "singing" | "tunnel";

export interface Camera {
  pitch: number;
  sway: number;
  swayPeriod: number;
  spin: number;
  persp: number;
  yaw: number;
}

const cam = (c: Partial<Camera>): Camera => ({ pitch: 0.12, sway: 0, swayPeriod: 50, spin: 0, persp: 0.05, yaw: 0, ...c });

export const SCENES: { id: SceneId; label: string; blurb: string }[] = [
  { id: "stage", label: "Stage show", blurb: "A stage with pixel snowflakes, mega trees, singing trees and candy canes, facing the crowd." },
  { id: "mega", label: "Mega tree", blurb: "A cone of pixel strands with a star, wired to its controller." },
  { id: "singing", label: "Singing trees", blurb: "Pixel trees with faces that sing along." },
  { id: "tunnel", label: "Arch tunnel", blurb: "Walk-through pixel arches lined with candy canes." },
];

// Slots in front of the stage (stage porch front is z = 6; the crowd stands from z = 15).
const FLAKES = [
  { x: 0, y: 5.55, z: 6.1, r: 0.75 },
  { x: -1.75, y: 4.75, z: 6.1, r: 0.42 },
  { x: 1.75, y: 4.75, z: 6.1, r: 0.42 },
  { x: -6.2, y: 2.3, z: 3.62, r: 0.55 },
  { x: 6.2, y: 2.3, z: 3.62, r: 0.55 },
  { x: -2.85, y: 4.3, z: 6.1, r: 0.3 },
  { x: 2.85, y: 4.3, z: 6.1, r: 0.3 },
];
const MEGAS = [
  { x: -8.8, z: 6.8 }, { x: 8.8, z: 6.8 },
  { x: -12.6, z: 9 }, { x: 12.6, z: 9 },
  { x: -16.2, z: 11.2 }, { x: 16.2, z: 11.2 },
];
const SINGERS = [
  { x: -5.4, z: 9 }, { x: 5.4, z: 9 },
  { x: -10.6, z: 11.8 }, { x: 10.6, z: 11.8 },
  { x: -14.2, z: 13.4 }, { x: 14.2, z: 13.4 },
];
const CANES = [
  { x: -1.3, z: 8.2 }, { x: 1.3, z: 8.2 },
  { x: -2.4, z: 8.5 }, { x: 2.4, z: 8.5 },
  { x: -3.5, z: 8.8 }, { x: 3.5, z: 8.8 },
  { x: -1.6, z: 13.9 }, { x: 1.6, z: 13.9 },
];
const ARCHES = [9.7, 11, 12.3, 13.6].map((z) => ({ x: 0, z }));

export const STAGE_CAMERA = cam({ pitch: 0.06, sway: 0.1, swayPeriod: 56, persp: 0.5 });

/** The stage with props in front of it and the crowd watching. q thins pixels on small screens. */
export function layoutScene(c: Record<PropType, number>, q = 1): Prop[] {
  const sq = Math.sqrt(q);
  const props: Prop[] = [stage({ lit: c.stage > 0, spacing: 0.12 / q })];
  FLAKES.slice(0, c.flake).forEach((f, i) => props.push(snowflake({ ...f, key: `flake-${i}`, seed: 23 + i })));
  MEGAS.slice(0, c.mega).forEach((m, i) =>
    props.push(megaTree({ key: `mega-${i}`, x: m.x, z: m.z, height: 6, strands: Math.round(16 * sq), perStrand: Math.round(40 * sq), spin: false, box: i < 2, seed: 7 + i })),
  );
  SINGERS.slice(0, c.singing).forEach((s, i) => props.push(singingTree({ key: `sing-${i}`, x: s.x, z: s.z, seed: 41 + i })));
  CANES.slice(0, c.cane).forEach((s, i) => props.push(candyCane({ key: `cane-${i}`, x: s.x, z: s.z, mirror: s.x < 0, seed: 31 + i })));
  ARCHES.slice(0, c.arch).forEach((a, i) => props.push(pixelArch({ key: `arch-${i}`, x: a.x, z: a.z, span: 2.8, height: 2.7, spacing: 0.1 / q, seed: 51 + i })));
  props.push(audience({ z0: 14.2, z1: 18.5, halfWidth: 8.5, count: 62 }));
  return props;
}

export function buildScene(id: SceneId, q = 1): { props: Prop[]; camera: Camera } {
  const sq = Math.sqrt(q);
  switch (id) {
    case "mega":
      return {
        props: [groundPlane(), megaTree({ key: "mega", height: 6, strands: Math.round(16 * sq), perStrand: Math.round(44 * sq), spin: true })],
        camera: cam({ pitch: 0.16, spin: 0.08, persp: 0 }),
      };
    case "singing":
      return {
        props: [
          groundPlane(),
          singingTree({ key: "sing-l", x: -1.7, z: 0, seed: 41 }),
          singingTree({ key: "sing-r", x: 1.7, z: 0, seed: 42 }),
          candyCane({ key: "cane-l", x: -3.4, z: 0.4, mirror: true }),
          candyCane({ key: "cane-r", x: 3.4, z: 0.4 }),
          audience({ z0: 7.5, z1: 9.5, halfWidth: 4.2, count: 9, seed: 9 }),
        ],
        camera: cam({ pitch: 0.08, sway: 0.15, persp: 0.2 }),
      };
    case "tunnel":
      return {
        props: [
          groundPlane(),
          ...[0, 1.3, 2.6, 3.9, 5.2, 6.5].map((z, i) => pixelArch({ key: `arch-${i}`, x: 0, z: -z, span: 3, height: 2.8, spacing: 0.1 / q, seed: 51 + i })),
          ...[0, 2.6, 5.2].flatMap((z, i) => [
            candyCane({ key: `cl-${i}`, x: -2.1, z: -z + 0.6, mirror: true }),
            candyCane({ key: `cr-${i}`, x: 2.1, z: -z + 0.6 }),
          ]),
        ],
        camera: cam({ pitch: 0.16, sway: 0.22, persp: 0.35, yaw: 0.35 }),
      };
    case "stage":
    default:
      return {
        props: layoutScene({ stage: 1, flake: 7, mega: 2, singing: 2, cane: 6, arch: 0 }, q),
        camera: STAGE_CAMERA,
      };
  }
}
