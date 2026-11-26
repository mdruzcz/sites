import type { Layout } from "@/lib/content";

export interface CourtColours {
  court: string;
  zone: string;
  border: string;
}

interface Props {
  layout: Layout;
  /** Short side in feet. */
  w: number;
  /** Long side in feet. */
  d: number;
  colours: CourtColours;
  title: string;
  className?: string;
  /** Hide the faint 1 ft tile grid on small thumbnails. */
  grid?: boolean;
  /** Fixed pixel size, for renderers that cannot size an SVG from CSS. */
  width?: number;
  height?: number;
}

const LINE = "#FFFFFF";
const LINE2 = "#FFD23F";

/**
 * A to-scale plan view of a court kit, drawn in feet. The long side always
 * runs left to right. Every dimension below is a real court measurement, so
 * the drawing shows what the lines will look like on that size of pad.
 */
export function CourtDiagram({ layout, w, d, colours, title, className, grid = true, width, height }: Props) {
  // Half courts are stored as baseline width (w) by depth (d); draw them with the
  // hoop on the left, so depth runs along x.
  const isHalf = layout === "half";
  const L = isHalf ? d : Math.max(w, d);
  const H = isHalf ? w : Math.min(w, d);
  const id = `${layout}-${w}-${d}`;
  const sw = Math.max(0.16, L / 320);
  const stroke = { fill: "none", stroke: LINE, strokeWidth: sw, strokeLinecap: "butt" as const };
  const stroke2 = { ...stroke, stroke: LINE2 };
  const borderW = Math.min(1, H / 8);

  return (
    <svg viewBox={`${-1} ${-1} ${L + 2} ${H + 2}`} role="img" aria-label={title || undefined} className={className} width={width} height={height} preserveAspectRatio="xMidYMid meet">
      {title && <title>{title}</title>}
      <defs>
        <pattern id={`g-${id}`} width="1" height="1" patternUnits="userSpaceOnUse">
          <path d="M1 0H0V1" fill="none" stroke="rgba(0,0,0,0.16)" strokeWidth="0.04" />
        </pattern>
        <clipPath id={`c-${id}`}>
          <rect x="0" y="0" width={L} height={H} />
        </clipPath>
      </defs>
      {/* soft ground shadow */}
      <rect x="-0.3" y="-0.1" width={L + 0.6} height={H + 0.6} rx="0.5" fill="rgba(0,0,0,0.14)" />
      <rect x="0" y="0" width={L} height={H} rx="0.25" fill={colours.border} />
      <rect x={borderW} y={borderW} width={L - borderW * 2} height={H - borderW * 2} fill={colours.court} />
      <g clipPath={`url(#c-${id})`}>
        {layout === "half" && <HalfCourt x={0} H={H} L={L} zone={colours.zone} stroke={stroke} />}
        {layout === "full" && (
          <>
            <HalfCourt x={0} H={H} L={L / 2} zone={colours.zone} stroke={stroke} />
            <g transform={`translate(${L} 0) scale(-1 1)`}>
              <HalfCourt x={0} H={H} L={L / 2} zone={colours.zone} stroke={stroke} />
            </g>
            <line x1={L / 2} y1={borderW} x2={L / 2} y2={H - borderW} {...stroke} />
            <circle cx={L / 2} cy={H / 2} r={Math.min(6, H / 5)} {...stroke} />
          </>
        )}
        {layout === "pickleball" && <Pickleball cx={L / 2} cy={H / 2} zone={colours.zone} stroke={stroke} />}
        {layout === "multi" && (
          <>
            <Pickleball cx={L / 2} cy={H / 2} zone={colours.zone} stroke={stroke2} />
            <HalfCourt x={0} H={H} L={L} zone="none" stroke={stroke} />
          </>
        )}
        {layout === "tennis" && <Tennis cx={L / 2} cy={H / 2} zone={colours.zone} stroke={stroke} />}
        {layout === "shuffleboard" && <Shuffle x={0} y={0} L={L} H={H} zone={colours.zone} stroke={stroke} />}
        {layout === "shuffleboard-double" && (
          <>
            <Shuffle x={0} y={1} L={L} H={6} zone={colours.zone} stroke={stroke} />
            <Shuffle x={0} y={H - 7} L={L} H={6} zone={colours.zone} stroke={stroke} />
          </>
        )}
        {grid && <rect x="0" y="0" width={L} height={H} fill={`url(#g-${id})`} />}
      </g>
    </svg>
  );
}

type Stroke = { fill: string; stroke: string; strokeWidth: number; strokeLinecap: "butt" };

/** Hoop at the left edge. Backboard 4 ft in from the baseline, key 12 ft wide, free-throw line 19 ft out. */
function HalfCourt({ x, H, L, zone, stroke }: { x: number; H: number; L: number; zone: string; stroke: Stroke }) {
  const cy = H / 2;
  const hoopX = x + 5.25;
  const ftX = x + 19;
  const keyDepth = Math.min(19, L - 1);
  const arcR = 19.75;
  // Corner three: straight part runs out to where the arc takes over.
  const cornerY = Math.min(arcR, H / 2 - 1);
  const arcStartX = hoopX + Math.sqrt(Math.max(0, arcR * arcR - cornerY * cornerY));
  const showFt = L >= 20;
  return (
    <g>
      {zone !== "none" && <rect x={x} y={cy - 6} width={keyDepth} height={12} fill={zone} />}
      <rect x={x} y={cy - 6} width={keyDepth} height={12} {...stroke} />
      {showFt && <path d={`M ${ftX} ${cy - 6} A 6 6 0 0 1 ${ftX} ${cy + 6}`} {...stroke} />}
      {/* three-point line */}
      <path
        d={`M ${x} ${cy - cornerY} L ${arcStartX} ${cy - cornerY} A ${arcR} ${arcR} 0 0 1 ${arcStartX} ${cy + cornerY} L ${x} ${cy + cornerY}`}
        {...stroke}
      />
      {/* backboard and rim */}
      <line x1={x + 4} y1={cy - 3} x2={x + 4} y2={cy + 3} {...stroke} strokeWidth={stroke.strokeWidth * 1.6} />
      <circle cx={hoopX} cy={cy} r={0.75} {...stroke} />
    </g>
  );
}

/** 44 ft x 20 ft court, net across the middle, 7 ft kitchen each side. */
function Pickleball({ cx, cy, zone, stroke }: { cx: number; cy: number; zone: string; stroke: Stroke }) {
  const x0 = cx - 22;
  const y0 = cy - 10;
  return (
    <g>
      <rect x={cx - 7} y={y0} width={14} height={20} fill={zone} />
      <rect x={x0} y={y0} width={44} height={20} {...stroke} />
      <line x1={cx - 7} y1={y0} x2={cx - 7} y2={y0 + 20} {...stroke} />
      <line x1={cx + 7} y1={y0} x2={cx + 7} y2={y0 + 20} {...stroke} />
      <line x1={x0} y1={cy} x2={cx - 7} y2={cy} {...stroke} />
      <line x1={cx + 7} y1={cy} x2={x0 + 44} y2={cy} {...stroke} />
      <line x1={cx} y1={y0 - 1} x2={cx} y2={y0 + 21} stroke="#0B0D10" strokeWidth={stroke.strokeWidth * 1.5} strokeDasharray="0.5 0.35" />
    </g>
  );
}

/** 78 ft x 36 ft doubles court with singles sidelines and service boxes. */
function Tennis({ cx, cy, zone, stroke }: { cx: number; cy: number; zone: string; stroke: Stroke }) {
  const x0 = cx - 39;
  const y0 = cy - 18;
  return (
    <g>
      <rect x={x0} y={y0} width={78} height={36} fill={zone} />
      <rect x={x0} y={y0} width={78} height={36} {...stroke} />
      <line x1={x0} y1={y0 + 4.5} x2={x0 + 78} y2={y0 + 4.5} {...stroke} />
      <line x1={x0} y1={y0 + 31.5} x2={x0 + 78} y2={y0 + 31.5} {...stroke} />
      <line x1={cx - 21} y1={y0 + 4.5} x2={cx - 21} y2={y0 + 31.5} {...stroke} />
      <line x1={cx + 21} y1={y0 + 4.5} x2={cx + 21} y2={y0 + 31.5} {...stroke} />
      <line x1={cx - 21} y1={cy} x2={cx + 21} y2={cy} {...stroke} />
      <line x1={cx} y1={y0 - 3} x2={cx} y2={y0 + 39} stroke="#0B0D10" strokeWidth={stroke.strokeWidth * 1.5} strokeDasharray="0.9 0.6" />
    </g>
  );
}

/** One lane: a scoring triangle at each end and two dead lines 12 ft apart in the middle. */
function Shuffle({ x, y, L, H, zone, stroke }: { x: number; y: number; L: number; H: number; zone: string; stroke: Stroke }) {
  const cy = y + H / 2;
  const s = { ...stroke, strokeWidth: Math.max(0.1, stroke.strokeWidth * 0.8) };
  const end = (flip: boolean) => {
    const dir = flip ? -1 : 1;
    const base = flip ? x + L - 6.5 : x + 6.5; // back of the scoring area
    const tip = base + dir * 9;
    const at = (t: number) => base + dir * t;
    const half = (t: number) => (H / 2) * (1 - t / 9);
    return (
      <g key={String(flip)}>
        <path d={`M ${base} ${y} L ${tip} ${cy} L ${base} ${y + H} Z`} fill={zone} {...{ stroke: s.stroke, strokeWidth: s.strokeWidth }} />
        <line x1={at(3)} y1={cy - half(3)} x2={at(3)} y2={cy + half(3)} {...s} />
        <line x1={at(6)} y1={cy - half(6)} x2={at(6)} y2={cy + half(6)} {...s} />
        <line x1={base} y1={cy} x2={at(6)} y2={cy} {...s} />
        <line x1={base} y1={y} x2={base} y2={y + H} {...s} />
        <line x1={at(-1.5)} y1={y} x2={at(-1.5)} y2={y + H} {...s} />
      </g>
    );
  };
  return (
    <g>
      {end(false)}
      {end(true)}
      <line x1={x + L / 2 - 6} y1={y} x2={x + L / 2 - 6} y2={y + H} {...s} />
      <line x1={x + L / 2 + 6} y1={y} x2={x + L / 2 + 6} y2={y + H} {...s} />
    </g>
  );
}
