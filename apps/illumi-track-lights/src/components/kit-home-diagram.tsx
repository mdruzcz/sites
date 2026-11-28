/**
 * Kit size diagrams: one example home per permanent-lighting kit, each a bigger
 * home than the last so a bigger kit visibly means more roofline.
 *
 * Every home is described in feet (x from the left, y up from the ground). The
 * lit runs are built from 3-4-5 style gables and whole-foot eaves so the run
 * lengths printed on the drawing add up to exactly the kit's footage.
 *
 * No hooks and no server-only imports, so this renders from both server pages
 * and the client-side kit builder.
 */

type Pt = [number, number];

type Vol =
  | { k: "eave"; x0: number; x1: number; wall: number; roof: number; hipL?: number; hipR?: number; lit?: [number, number, string]; t?: number; below?: boolean }
  | { k: "gable"; x0: number; x1: number; wall: number; rise: number; base?: number; name?: string; merge?: boolean; shade?: string }
  | { k: "porch"; x0: number; x1: number; y?: number; posts?: number[]; name: string; below?: boolean }
  | { k: "dormer"; x0: number; x1: number; y: number; h: number; name: string }
  | { k: "win"; x: number; y: number; w: number; h: number }
  | { k: "door"; x: number; w?: number; h?: number }
  | { k: "gar"; x: number; w: number; h?: number };

interface HomeSpec {
  footage: number;
  title: string;
  blurb: string;
  /** Overall width and height of the drawing, in feet. */
  width: number;
  height: number;
  vols: Vol[];
}

const HOMES: HomeSpec[] = [
  {
    footage: 50,
    title: "Bungalow front",
    blurb: "The front eave and one gable of a bungalow or cottage.",
    width: 48,
    height: 16,
    vols: [
      { k: "eave", x0: 0, x1: 48, wall: 9, roof: 6.5, hipL: 5, hipR: 5, lit: [0, 24, "Front eave"] },
      { k: "gable", x0: 24, x1: 48, wall: 9, rise: 5, name: "Front gable" },
      { k: "win", x: 3.5, y: 3, w: 4.5, h: 4 },
      { k: "door", x: 10.6 },
      { k: "win", x: 16.5, y: 3, w: 4.5, h: 4 },
      { k: "win", x: 31, y: 3, w: 10, h: 4.2 }
    ]
  },
  {
    footage: 75,
    title: "Bungalow with garage",
    blurb: "A bungalow front, including the attached garage.",
    width: 73,
    height: 17,
    vols: [
      { k: "eave", x0: 0, x1: 24, wall: 9, roof: 5.5, hipL: 4.5, lit: [0, 24, "Garage eave"] },
      { k: "eave", x0: 24, x1: 73, wall: 9, roof: 7.5, hipL: 3, hipR: 5, lit: [48, 73, "Front eave"] },
      { k: "gable", x0: 24, x1: 48, wall: 9, rise: 5, name: "Front gable" },
      { k: "gar", x: 4, w: 16 },
      { k: "win", x: 31, y: 3, w: 10, h: 4.2 },
      { k: "win", x: 51, y: 3, w: 4.5, h: 4 },
      { k: "door", x: 58.5 },
      { k: "win", x: 65, y: 3, w: 5, h: 4 }
    ]
  },
  {
    footage: 100,
    title: "Two-storey front",
    blurb: "Upper eave, front gable, porch roof and garage on a typical two-storey.",
    width: 72,
    height: 26,
    vols: [
      { k: "eave", x0: 0, x1: 28, wall: 9, roof: 5.5, hipL: 4.5, lit: [0, 28, "Garage eave"] },
      { k: "eave", x0: 28, x1: 72, wall: 18, roof: 8, hipL: 5, hipR: 5, lit: [28, 56, "Upper eave"] },
      { k: "gable", x0: 56, x1: 72, wall: 18, rise: 6, name: "Front gable" },
      { k: "gar", x: 5, w: 18 },
      { k: "win", x: 33, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 40, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 47, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 33, y: 3, w: 4.5, h: 4.2 },
      { k: "door", x: 40.3 },
      { k: "win", x: 47.5, y: 3, w: 4.5, h: 4.2 },
      { k: "win", x: 61, y: 12.5, w: 6, h: 4.5 },
      { k: "win", x: 61, y: 3, w: 6, h: 4.5 },
      { k: "porch", x0: 30, x1: 54, posts: [31.2, 38.6, 45.4, 52.8], name: "Porch roof" }
    ]
  },
  {
    footage: 150,
    title: "Mid-size two-storey",
    blurb: "A mid-size two-storey with a gabled garage, connecting wing and covered porch.",
    width: 102,
    height: 27,
    vols: [
      { k: "eave", x0: 22, x1: 44, wall: 9, roof: 5.5, lit: [24, 42, "Wing eave"] },
      { k: "gable", x0: 0, x1: 24, wall: 10, rise: 5, name: "Garage gable" },
      { k: "eave", x0: 42, x1: 102, wall: 18, roof: 9, hipL: 6, hipR: 6, lit: [42, 78, "Upper eave"] },
      { k: "gable", x0: 78, x1: 102, wall: 18, rise: 9, name: "Main gable" },
      { k: "gar", x: 4, w: 16, h: 7.5 },
      { k: "win", x: 30, y: 3, w: 6, h: 4.2 },
      { k: "win", x: 47, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 56, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 65, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 47.5, y: 3, w: 4.5, h: 4.2 },
      { k: "door", x: 56.3 },
      { k: "win", x: 64.5, y: 3, w: 4.5, h: 4.2 },
      { k: "win", x: 86, y: 13, w: 8, h: 5 },
      { k: "win", x: 86, y: 3, w: 8, h: 5 },
      { k: "porch", x0: 44, x1: 72, posts: [45.2, 54, 62.8, 70.8], name: "Porch roof" },
      { k: "porch", x0: 84, x1: 96, name: "Window awning" }
    ]
  },
  {
    footage: 200,
    title: "Large two-storey",
    blurb: "A large home with a double garage, garage dormer and a side wing.",
    width: 130,
    height: 27,
    vols: [
      { k: "eave", x0: 30, x1: 52, wall: 9, roof: 5.5, lit: [32, 50, "Breezeway eave"] },
      { k: "eave", x0: 0, x1: 32, wall: 10, roof: 8, hipL: 6, hipR: 3, lit: [0, 32, "Garage eave"], below: true },
      { k: "dormer", x0: 9, x1: 23, y: 11.2, h: 4.8, name: "Garage dormer" },
      { k: "gable", x0: 114, x1: 130, wall: 9, rise: 6, name: "Side wing gable" },
      { k: "eave", x0: 50, x1: 114, wall: 18, roof: 9, hipL: 6, hipR: 6, lit: [50, 90, "Upper eave"] },
      { k: "gable", x0: 90, x1: 114, wall: 18, rise: 9, name: "Main gable" },
      { k: "gar", x: 3, w: 11.5, h: 7.5 },
      { k: "gar", x: 17.5, w: 11.5, h: 7.5 },
      { k: "win", x: 38, y: 3, w: 6, h: 4.2 },
      { k: "win", x: 55, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 63.5, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 72, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 80.5, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 56, y: 3, w: 5, h: 4.2 },
      { k: "door", x: 66.3 },
      { k: "win", x: 75, y: 3, w: 5, h: 4.2 },
      { k: "win", x: 98, y: 13, w: 8, h: 5 },
      { k: "win", x: 98, y: 3, w: 8, h: 5 },
      { k: "win", x: 119, y: 3, w: 6, h: 4.2 },
      { k: "porch", x0: 52, x1: 84, posts: [53.2, 63, 73, 82.8], name: "Porch roof" },
      { k: "porch", x0: 95, x1: 109, name: "Window awning" }
    ]
  },
  {
    footage: 250,
    title: "Large multi-peak home",
    blurb: "A wide, multi-peak front with a three-car garage, dormers and two wings.",
    width: 158,
    height: 27,
    vols: [
      { k: "eave", x0: 36, x1: 60, wall: 9, roof: 5.5, lit: [38, 58, "Breezeway eave"] },
      { k: "eave", x0: 0, x1: 38, wall: 10, roof: 8, hipL: 6, hipR: 3, lit: [0, 38, "Garage eave"], below: true },
      { k: "dormer", x0: 6, x1: 18, y: 11.4, h: 4.6, name: "Garage dormers" },
      { k: "dormer", x0: 22, x1: 34, y: 11.4, h: 4.6, name: "Garage dormers" },
      { k: "gable", x0: 134, x1: 158, wall: 9, rise: 5, name: "Side wing gable" },
      { k: "eave", x0: 58, x1: 134, wall: 18, roof: 9, hipL: 6, hipR: 6, lit: [58, 104, "Upper eave"], t: 0.2 },
      { k: "gable", x0: 77, x1: 85, base: 19.4, wall: 1.6, rise: 3, name: "Roof dormer", merge: true },
      { k: "gable", x0: 104, x1: 134, wall: 18, rise: 8, name: "Main gable" },
      { k: "gar", x: 2.5, w: 10, h: 7.5 },
      { k: "gar", x: 14, w: 10, h: 7.5 },
      { k: "gar", x: 25.5, w: 10, h: 7.5 },
      { k: "win", x: 44, y: 3, w: 8, h: 4.2 },
      { k: "win", x: 63, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 72, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 85.5, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 94.5, y: 13, w: 4.5, h: 3.8 },
      { k: "win", x: 64, y: 3, w: 5, h: 4.2 },
      { k: "win", x: 71.5, y: 3, w: 5, h: 4.2 },
      { k: "door", x: 79.3 },
      { k: "win", x: 85.5, y: 3, w: 5, h: 4.2 },
      { k: "win", x: 114, y: 13, w: 10, h: 5 },
      { k: "win", x: 114, y: 3, w: 10, h: 5 },
      { k: "win", x: 141, y: 3, w: 10, h: 4.2 },
      { k: "porch", x0: 60, x1: 98, posts: [61.2, 70.2, 77.9, 84.1, 91.5, 96.8], name: "Porch roof" },
      { k: "porch", x0: 112, x1: 126, name: "Window awning" }
    ]
  }
];

export const KIT_FOOTAGES = HOMES.map((h) => h.footage);

interface Run {
  name: string;
  pts: Pt[];
  /** Where along a straight run the length label sits (0..1). */
  t: number;
  below?: boolean;
  /** One label for the whole run instead of one per segment (small gables). */
  merge?: boolean;
}

const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const runLength = (r: Run) => r.pts.slice(1).reduce((s, p, i) => s + dist(r.pts[i], p), 0);

function runsOf(spec: HomeSpec): Run[] {
  const runs: Run[] = [];
  for (const v of spec.vols) {
    if (v.k === "eave" && v.lit) {
      runs.push({ name: v.lit[2], pts: [[v.lit[0], v.wall], [v.lit[1], v.wall]], t: v.t ?? 0.5, below: v.below });
    } else if (v.k === "gable" && v.name) {
      const y = (v.base ?? 0) + v.wall;
      runs.push({ name: v.name, pts: [[v.x0, y], [(v.x0 + v.x1) / 2, y + v.rise], [v.x1, y]], t: 0.5, merge: v.merge });
    } else if (v.k === "porch") {
      const y = v.y ?? 9.6;
      runs.push({ name: v.name, pts: [[v.x0, y], [v.x1, y]], t: 0.5, below: v.below });
    } else if (v.k === "dormer") {
      runs.push({ name: v.name, pts: [[v.x0, v.y + v.h], [v.x1, v.y + v.h]], t: 0.5 });
    }
  }
  return runs;
}

function findHome(footage: number): HomeSpec | undefined {
  return HOMES.find((h) => h.footage === footage);
}

export interface KitHomeInfo {
  footage: number;
  title: string;
  blurb: string;
  /** Named lit runs with their length in feet; these sum to the kit footage. */
  runs: { name: string; feet: number }[];
}

/** Text description of the example home for a kit, or null for an unknown size. */
export function kitHomeInfo(footage: number): KitHomeInfo | null {
  const spec = findHome(footage);
  if (!spec) return null;
  const totals = new Map<string, number>();
  for (const r of runsOf(spec)) totals.set(r.name, (totals.get(r.name) ?? 0) + runLength(r));
  return {
    footage: spec.footage,
    title: spec.title,
    blurb: spec.blurb,
    runs: [...totals].map(([name, feet]) => ({ name, feet: Math.round(feet) }))
  };
}

// ---------------------------------------------------------------- drawing ---

const VB_W = 800;
const VB_H = 450;
const GROUND = 404;
const WIDEST = Math.max(...HOMES.map((h) => h.width));
const NARROWEST = Math.min(...HOMES.map((h) => h.width));
/**
 * Comparison scale for thumbnails. A strictly shared scale leaves the smallest
 * home too tiny to read, so widths are compressed: the smallest home fills
 * about 45% of the frame and the largest about 92%. Homes still get steadily
 * bigger with footage, but this is not a true like-for-like scale, so no copy
 * should claim it is.
 */
function comparisonScale(width: number) {
  const min = VB_W * 0.45;
  const max = VB_W * 0.92;
  const px = min + ((width - NARROWEST) / (WIDEST - NARROWEST)) * (max - min);
  return px / width;
}

const INK = {
  wall: "#3b4454",
  wallFront: "#465063",
  wallLow: "#353d4c",
  roof: "#1c212a",
  roofBand: "#12161d",
  porchRoof: "#232934",
  post: "#6b523c",
  window: "#f4cd7c",
  frame: "#161a22",
  door: "#2b2019",
  garage: "#4a3226",
  garageLine: "#3a261c"
};

interface Props {
  footage: number;
  /**
   * "fit" fills the frame with this one home; "shared" sizes the home relative
   * to the other kits so a row of thumbnails steps up from small to large.
   */
  scale?: "fit" | "shared";
  /** Print each run's length on the drawing. Turn off for small thumbnails. */
  labels?: boolean;
  className?: string;
}

export function KitHomeDiagram({ footage, scale = "fit", labels = true, className = "" }: Props) {
  const spec = findHome(footage);
  if (!spec) return null;
  const info = kitHomeInfo(footage)!;

  const S =
    scale === "shared"
      ? comparisonScale(spec.width)
      : Math.min((VB_W - 48) / spec.width, (GROUND - 86) / spec.height, 12.5);
  const ox = (VB_W - spec.width * S) / 2;
  const X = (ft: number) => ox + ft * S;
  const Y = (ft: number) => GROUND - ft * S;
  const P = (pts: Pt[]) => pts.map(([x, y]) => `${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ");
  const uid = `kh${footage}${scale === "shared" ? "s" : "f"}`;

  const shapes: React.ReactNode[] = [];
  spec.vols.forEach((v, i) => {
    const key = `v${i}`;
    if (v.k === "eave") {
      const hl = v.hipL ?? 0;
      const hr = v.hipR ?? 0;
      shapes.push(
        <g key={key}>
          <rect x={X(v.x0 + 1)} y={Y(v.wall)} width={(v.x1 - v.x0 - 2) * S} height={v.wall * S} fill={v.wall > 12 ? INK.wall : INK.wallLow} />
          <polygon points={P([[v.x0, v.wall], [v.x1, v.wall], [v.x1 - hr, v.wall + v.roof], [v.x0 + hl, v.wall + v.roof]])} fill={INK.roof} />
          <line x1={X(v.x0)} y1={Y(v.wall)} x2={X(v.x1)} y2={Y(v.wall)} stroke={INK.roofBand} strokeWidth={0.7 * S} />
        </g>
      );
    } else if (v.k === "gable") {
      const base = v.base ?? 0;
      const top = base + v.wall;
      const mid = (v.x0 + v.x1) / 2;
      const half = (v.x1 - v.x0) / 2;
      const inset = Math.min(1, half * 0.12);
      shapes.push(
        <g key={key}>
          <polygon
            points={P([
              [v.x0 + inset, base],
              [v.x0 + inset, top],
              [mid, top + (v.rise * (half - inset)) / half],
              [v.x1 - inset, top],
              [v.x1 - inset, base]
            ])}
            fill={INK.wallFront}
          />
          <polyline
            points={P([[v.x0, top], [mid, top + v.rise], [v.x1, top]])}
            fill="none"
            stroke={INK.roofBand}
            strokeWidth={Math.min(1.25, half * 0.2) * S}
            strokeLinejoin="miter"
          />
        </g>
      );
    } else if (v.k === "porch") {
      const y = v.y ?? 9.6;
      shapes.push(
        <g key={key}>
          {(v.posts ?? []).map((px) => (
            <rect key={px} x={X(px - 0.45)} y={Y(y)} width={0.9 * S} height={y * S} fill={INK.post} />
          ))}
          <polygon points={P([[v.x0, y], [v.x1, y], [v.x1 - 1.3, y + 2.5], [v.x0 + 1.3, y + 2.5]])} fill={INK.porchRoof} />
          <line x1={X(v.x0)} y1={Y(y)} x2={X(v.x1)} y2={Y(y)} stroke={INK.roofBand} strokeWidth={0.6 * S} />
        </g>
      );
    } else if (v.k === "dormer") {
      const w = v.x1 - v.x0;
      shapes.push(
        <g key={key}>
          <rect x={X(v.x0 + 0.7)} y={Y(v.y + v.h)} width={(w - 1.4) * S} height={v.h * S} fill={INK.wallFront} />
          <rect x={X(v.x0 + 2.2)} y={Y(v.y + v.h - 1)} width={(w - 4.4) * S} height={(v.h - 1.9) * S} fill={INK.window} opacity={0.5} stroke={INK.frame} strokeWidth={1} />
          <polygon points={P([[v.x0, v.y + v.h], [v.x1, v.y + v.h], [v.x1 - 0.6, v.y + v.h + 1.1], [v.x0 + 0.6, v.y + v.h + 1.1]])} fill={INK.roofBand} />
        </g>
      );
    } else if (v.k === "win") {
      shapes.push(
        <g key={key}>
          <rect x={X(v.x)} y={Y(v.y + v.h)} width={v.w * S} height={v.h * S} fill={INK.window} opacity={0.42} stroke={INK.frame} strokeWidth={1.2} />
          <line x1={X(v.x + v.w / 2)} y1={Y(v.y + v.h)} x2={X(v.x + v.w / 2)} y2={Y(v.y)} stroke={INK.frame} strokeWidth={1.2} />
        </g>
      );
    } else if (v.k === "door") {
      const w = v.w ?? 3.4;
      const h = v.h ?? 7;
      shapes.push(<rect key={key} x={X(v.x)} y={Y(h)} width={w * S} height={h * S} fill={INK.door} stroke={INK.frame} strokeWidth={1.2} />);
    } else if (v.k === "gar") {
      const h = v.h ?? 7.2;
      shapes.push(
        <g key={key}>
          <rect x={X(v.x)} y={Y(h)} width={v.w * S} height={h * S} fill={INK.garage} stroke={INK.frame} strokeWidth={1.2} />
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={X(v.x)} y1={Y(h * f)} x2={X(v.x + v.w)} y2={Y(h * f)} stroke={INK.garageLine} strokeWidth={1} />
          ))}
        </g>
      );
    }
  });

  const runs = runsOf(spec);
  // Lights hang just under the fascia, so nudge every run down a touch.
  const DROP = 0.55;
  const lit = (r: Run) => P(r.pts.map(([x, y]) => [x, y - DROP] as Pt));
  const bulbGap = Math.max(6.5, 1.35 * S);

  const labelNodes: React.ReactNode[] = [];
  if (labels) {
    runs.forEach((r, ri) => {
      const place = (text: string, cx: number, cy: number, key: string) => {
        const w = text.length * 9.2 + 16;
        labelNodes.push(
          <g key={key}>
            <rect x={cx - w / 2} y={cy - 12.5} width={w} height={25} rx={12.5} fill="rgba(9,12,19,0.82)" stroke="rgba(255,255,255,0.22)" strokeWidth={1} />
            <text x={cx} y={cy + 5.6} textAnchor="middle" fontSize={16} fontWeight={700} fill="#ffffff">
              {text}
            </text>
          </g>
        );
      };
      if (r.merge) {
        const apex = r.pts[1];
        place(`${Math.round(runLength(r))} ft`, X(apex[0]), Y(apex[1]) - 22, `l${ri}`);
        return;
      }
      r.pts.slice(1).forEach((b, si) => {
        const a = r.pts[si];
        const ax = X(a[0]), ay = Y(a[1]), bx = X(b[0]), by = Y(b[1]);
        const len = Math.hypot(bx - ax, by - ay) || 1;
        const t = ay === by ? r.t : 0.5;
        // Unit normal, flipped so it points up the page (or down when asked).
        let nx = -(by - ay) / len;
        let ny = (bx - ax) / len;
        if (ny > 0) { nx = -nx; ny = -ny; }
        if (r.below) { nx = -nx; ny = -ny; }
        const off = ay === by ? 19 : 24;
        place(`${Math.round(dist(a, b))} ft`, ax + (bx - ax) * t + nx * off, ay + (by - ay) * t + ny * off, `l${ri}-${si}`);
      });
    });
  }

  const summary = `Example ${spec.title.toLowerCase()} lit with a ${footage} foot permanent lighting kit: ${info.runs
    .map((r) => `${r.name.toLowerCase()} ${r.feet} feet`)
    .join(", ")}.`;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label={summary}
      className={`block h-auto w-full ${className}`}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12163a" />
          <stop offset="0.72" stopColor="#232b63" />
          <stop offset="1" stopColor="#4a4279" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation={Math.max(3, 0.55 * S)} />
        </filter>
      </defs>

      <rect width={VB_W} height={VB_H} fill={`url(#${uid}-sky)`} />
      {[[70, 60], [188, 34], [322, 78], [470, 40], [612, 70], [735, 38], [690, 120], [118, 132]].map(([sx, sy]) => (
        <circle key={`${sx}-${sy}`} cx={sx} cy={sy} r={1.5} fill="#ffffff" opacity={0.5} />
      ))}
      <rect x={0} y={GROUND} width={VB_W} height={VB_H - GROUND} fill="#10141b" />
      <rect x={0} y={GROUND} width={VB_W} height={2} fill="#2b3342" />

      {shapes}

      {/* Lights: a soft glow underneath, then the individual pucks. */}
      <g filter={`url(#${uid}-glow)`} opacity={0.75}>
        {runs.map((r, i) => (
          <polyline key={i} points={lit(r)} fill="none" stroke="#ffc94d" strokeWidth={Math.max(5, 0.9 * S)} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
      {runs.map((r, i) => (
        <polyline
          key={i}
          points={lit(r)}
          fill="none"
          stroke="#fff3cf"
          strokeWidth={Math.max(3.2, 0.42 * S)}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`0 ${bulbGap.toFixed(1)}`}
        />
      ))}

      {labelNodes.length > 0 && <g className="hidden sm:inline">{labelNodes}</g>}
    </svg>
  );
}
