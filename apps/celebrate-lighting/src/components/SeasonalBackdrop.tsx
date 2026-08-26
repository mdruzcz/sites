/**
 * Hero backdrop for the seasonal C9 pages.
 *
 * Why this is a graphic and not a photograph: every roofline photo in the
 * image library is permanent track lighting. Using one to head a C9 page
 * would repeat exactly the mislabelling this redesign set out to fix — a
 * homeowner would arrive expecting big-bulb Christmas lights and be shown
 * something else. A stylised swag of C9 bulbs reads unmistakably as
 * illustration, so it promises nothing untrue.
 *
 * Replace with a real C9 install photo the moment one exists.
 */
const BULBS = ["#f2c14e", "#e05b4b", "#4bb3e0", "#5fbf6a"];

export function SeasonalBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 70% 20%, #14213d 0%, #05080f 65%)" }}
    >
      <svg
        className="absolute inset-x-0 top-0 w-full h-auto"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[0, 1].map((row) => (
          <g key={row}>
            <path
              d={`M0 ${row === 0 ? 20 : 82} Q300 ${row === 0 ? 30 : 92} 600 ${row === 0 ? 20 : 82} T1200 ${
                row === 0 ? 20 : 82
              }`}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              fill="none"
            />
            {Array.from({ length: 26 }).map((_, i) => {
              const x = 24 + i * 46;
              const baseY = row === 0 ? 34 : 96;
              // gentle sag between fixings so it reads as a hung string
              const y = baseY + Math.sin((i / 25) * Math.PI * 6) * 5;
              const c = BULBS[(i + row) % BULBS.length];
              return (
                <g key={i}>
                  <line x1={x} y1={y - 14} x2={x} y2={y - 6} stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
                  <circle cx={x} cy={y + 2} r="14" fill={c} opacity="0.16" />
                  <ellipse cx={x} cy={y + 1} rx="5" ry="6.8" fill={c} opacity="0.85" />
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
