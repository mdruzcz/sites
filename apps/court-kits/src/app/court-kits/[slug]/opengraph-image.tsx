import { ImageResponse } from "next/og";
import { defaultColours } from "@/lib/colours";
import { getKit, kitArea, kitSize, kitTypeName, kits, money, type Kit } from "@/lib/content";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Court kit plan view from ${site.name}`;

export function generateStaticParams() {
  return kits.map((k) => ({ slug: k.slug }));
}

type Box = { x: number; y: number; w: number; h: number; fill?: string; line?: boolean };

/** A simplified plan of the court as rectangles, in feet, long side left to right. */
function plan(kit: Kit): { L: number; H: number; boxes: Box[] } {
  const c = defaultColours(kit.layout);
  const half = kit.layout === "half";
  const L = half ? kit.d : Math.max(kit.w, kit.d);
  const H = half ? kit.w : Math.min(kit.w, kit.d);
  const cy = H / 2;
  const boxes: Box[] = [];
  const key = (x: number) => boxes.push({ x, y: cy - 6, w: Math.min(19, L - 1), h: 12, fill: c.zone, line: true });
  const pickle = (fill: boolean) => {
    if (fill) boxes.push({ x: L / 2 - 7, y: cy - 10, w: 14, h: 20, fill: c.zone });
    boxes.push({ x: L / 2 - 22, y: cy - 10, w: 44, h: 20, line: true });
    boxes.push({ x: L / 2 - 7, y: cy - 10, w: 14, h: 20, line: true });
  };
  switch (kit.layout) {
    case "half":
      key(0);
      break;
    case "full":
      key(0);
      boxes.push({ x: L - 19, y: cy - 6, w: 19, h: 12, fill: c.zone, line: true });
      boxes.push({ x: L / 2 - 0.15, y: 1, w: 0.3, h: H - 2, fill: "#fff" });
      break;
    case "pickleball":
      pickle(true);
      break;
    case "multi":
      pickle(true);
      boxes.push({ x: 0, y: cy - 6, w: 19, h: 12, line: true });
      break;
    case "tennis":
      boxes.push({ x: L / 2 - 39, y: cy - 18, w: 78, h: 36, fill: c.zone, line: true });
      boxes.push({ x: L / 2 - 21, y: cy - 13.5, w: 42, h: 27, line: true });
      boxes.push({ x: L / 2 - 0.2, y: cy - 19, w: 0.4, h: 38, fill: "#fff" });
      break;
    case "shuffleboard":
      boxes.push({ x: 6.5, y: 0.6, w: 9, h: H - 1.2, fill: c.zone, line: true }, { x: L - 15.5, y: 0.6, w: 9, h: H - 1.2, fill: c.zone, line: true });
      break;
    case "shuffleboard-double":
      for (const y of [1, H - 7]) boxes.push({ x: 6.5, y, w: 9, h: 6, fill: c.zone, line: true }, { x: L - 15.5, y, w: 9, h: 6, fill: c.zone, line: true });
      break;
  }
  return { L, H, boxes };
}

/** Share card for a kit: a simple plan of the court beside the name, size and price. */
export default async function KitImage({ params }: { params: Promise<{ slug: string }> }) {
  const kit = getKit((await params).slug);
  if (!kit) return new Response("Not found", { status: 404 });
  const c = defaultColours(kit.layout);
  const { L, H, boxes } = plan(kit);
  const s = Math.min(560 / L, 440 / H);
  const px = (n: number) => Math.round(n * s);
  const border = Math.max(4, px(Math.min(1, H / 8)));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: site.theme.inkDeep, color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ width: 660, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F1ED" }}>
          <div style={{ position: "relative", display: "flex", width: px(L), height: px(H), background: c.court, border: `${border}px solid ${c.border}`, borderRadius: 6, overflow: "hidden", boxShadow: "0 18px 40px rgba(0,0,0,0.25)" }}>
            {boxes.map((b, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: px(b.x) - border,
                  top: px(b.y) - border,
                  width: Math.max(2, px(b.w)),
                  height: Math.max(2, px(b.h)),
                  background: b.fill ?? "transparent",
                  border: b.line ? "3px solid #fff" : "none",
                  display: "flex",
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 48px" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: site.theme.ctaFrom }}>{site.name}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>{kitTypeName(kit)}</div>
            <div style={{ display: "flex", fontSize: 66, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginTop: 8 }}>{kitSize(kit)}</div>
            <div style={{ display: "flex", fontSize: 26, marginTop: 14, color: "rgba(255,255,255,0.75)" }}>{`${kitArea(kit).toLocaleString("en-CA")} sq ft of modular tile`}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>{`${money(kit.price)} CAD`}</div>
            <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>Kit price, before freight and tax</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
