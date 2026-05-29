import type { CabinetType } from "@/lib/catalog";
import { formatDim } from "@/lib/utils";

type Props = {
  width: number | null;
  height: number | null;
  depth: number | null;
  type: CabinetType;
  className?: string;
};

export function DimensionDiagram({ width, height, depth, type, className }: Props) {
  const w = width ?? 24;
  const h = height ?? 30;

  // Map cabinet to a visual aspect that reflects its category
  const aspect = w / h;
  const VIEWBOX = 300;
  const PAD = 60;
  const maxBoxW = VIEWBOX - PAD * 2;
  const maxBoxH = VIEWBOX - PAD * 2;
  let boxW = maxBoxW;
  let boxH = boxW / aspect;
  if (boxH > maxBoxH) {
    boxH = maxBoxH;
    boxW = boxH * aspect;
  }
  const x = (VIEWBOX - boxW) / 2;
  const y = (VIEWBOX - boxH) / 2;

  // Door/drawer treatment based on type
  const showDrawers = type === "drawer";
  const showShelves = type === "wall";

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className={className}
      role="img"
      aria-label={`Dimension diagram: ${width ?? "?"} wide by ${height ?? "?"} high by ${depth ?? "?"} deep`}
    >
      <rect width={VIEWBOX} height={VIEWBOX} fill="#f0e7dc" />

      {/* Cabinet body */}
      <rect
        x={x}
        y={y}
        width={boxW}
        height={boxH}
        fill="#ffffff"
        stroke="#0d1b2a"
        strokeWidth={2}
      />

      {/* Door / drawer faces */}
      {showDrawers ? (
        <>
          <line x1={x} y1={y + boxH / 3} x2={x + boxW} y2={y + boxH / 3} stroke="#0d1b2a" strokeWidth={1.5} />
          <line x1={x} y1={y + (boxH * 2) / 3} x2={x + boxW} y2={y + (boxH * 2) / 3} stroke="#0d1b2a" strokeWidth={1.5} />
          <circle cx={x + boxW / 2} cy={y + boxH / 6} r={2} fill="#c5a059" />
          <circle cx={x + boxW / 2} cy={y + boxH / 2} r={2} fill="#c5a059" />
          <circle cx={x + boxW / 2} cy={y + (boxH * 5) / 6} r={2} fill="#c5a059" />
        </>
      ) : showShelves ? (
        <>
          <line x1={x + boxW / 2} y1={y} x2={x + boxW / 2} y2={y + boxH} stroke="#0d1b2a" strokeWidth={1.5} />
          {boxW > 80 && (
            <>
              <line x1={x + 8} y1={y + boxH * 0.33} x2={x + boxW / 2 - 4} y2={y + boxH * 0.33} stroke="#c8b8a6" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={x + boxW / 2 + 4} y1={y + boxH * 0.33} x2={x + boxW - 8} y2={y + boxH * 0.33} stroke="#c8b8a6" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={x + 8} y1={y + boxH * 0.66} x2={x + boxW / 2 - 4} y2={y + boxH * 0.66} stroke="#c8b8a6" strokeWidth={1} strokeDasharray="3 3" />
              <line x1={x + boxW / 2 + 4} y1={y + boxH * 0.66} x2={x + boxW - 8} y2={y + boxH * 0.66} stroke="#c8b8a6" strokeWidth={1} strokeDasharray="3 3" />
            </>
          )}
          <circle cx={x + boxW / 2 - 6} cy={y + boxH / 2} r={2} fill="#c5a059" />
          <circle cx={x + boxW / 2 + 6} cy={y + boxH / 2} r={2} fill="#c5a059" />
        </>
      ) : (
        <>
          {boxW > 60 && (
            <line x1={x + boxW / 2} y1={y} x2={x + boxW / 2} y2={y + boxH} stroke="#0d1b2a" strokeWidth={1.5} />
          )}
          <line x1={x} y1={y + boxH - 6} x2={x + boxW} y2={y + boxH - 6} stroke="#0d1b2a" strokeWidth={1} />
          {boxW > 60 ? (
            <>
              <circle cx={x + boxW / 2 - 6} cy={y + boxH * 0.45} r={2} fill="#c5a059" />
              <circle cx={x + boxW / 2 + 6} cy={y + boxH * 0.45} r={2} fill="#c5a059" />
            </>
          ) : (
            <circle cx={x + boxW / 2} cy={y + boxH * 0.45} r={2} fill="#c5a059" />
          )}
        </>
      )}

      {/* Width dim — top */}
      <line x1={x} y1={y - 24} x2={x + boxW} y2={y - 24} stroke="#0d1b2a" strokeWidth={1} />
      <line x1={x} y1={y - 28} x2={x} y2={y - 20} stroke="#0d1b2a" strokeWidth={1} />
      <line x1={x + boxW} y1={y - 28} x2={x + boxW} y2={y - 20} stroke="#0d1b2a" strokeWidth={1} />
      <text x={x + boxW / 2} y={y - 30} fontSize="13" textAnchor="middle" fill="#0d1b2a" fontFamily="Inter, sans-serif">
        {width != null ? `W ${formatDim(width)}` : "—"}
      </text>

      {/* Height dim — right */}
      <line x1={x + boxW + 24} y1={y} x2={x + boxW + 24} y2={y + boxH} stroke="#0d1b2a" strokeWidth={1} />
      <line x1={x + boxW + 20} y1={y} x2={x + boxW + 28} y2={y} stroke="#0d1b2a" strokeWidth={1} />
      <line x1={x + boxW + 20} y1={y + boxH} x2={x + boxW + 28} y2={y + boxH} stroke="#0d1b2a" strokeWidth={1} />
      <text
        x={x + boxW + 32}
        y={y + boxH / 2}
        fontSize="13"
        textAnchor="middle"
        fill="#0d1b2a"
        fontFamily="Inter, sans-serif"
        transform={`rotate(90 ${x + boxW + 32} ${y + boxH / 2})`}
      >
        {height != null ? `H ${formatDim(height)}` : "—"}
      </text>

      {/* Depth label — bottom-left */}
      <text x={x} y={y + boxH + 30} fontSize="12" fill="#3a4a5c" fontFamily="Inter, sans-serif">
        Depth {depth != null ? formatDim(depth) : "—"}
      </text>
    </svg>
  );
}
