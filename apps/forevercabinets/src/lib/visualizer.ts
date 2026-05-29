import { getAllCabinets, type Cabinet, type CabinetType } from "./catalog";

export type WallPiece = {
  cabinet: Cabinet;
  width_in: number;
};

export type WallPlan = {
  pieces: WallPiece[];
  totalWidth: number;
  totalPrice: number;
  filler?: { width_in: number; cabinet?: Cabinet };
  exactMatch: boolean;
  wallPieces?: WallPiece[];
  wallTotalPrice?: number;
};

export type Preferences = {
  wallLength: number;
  cabinetMix: "all-base" | "mostly-base-some-drawer" | "mostly-drawer-some-base" | "all-drawer";
  includeSink: false | 33 | 36;
  includeLazySusan: false | 33 | 36;
  includeBlindCorner: boolean;
  includeWallCabinets: boolean;
};

// Widths available per category
const BASE_WIDTHS = [12, 15, 18, 21, 24, 27, 30, 33, 36];
const DRAWER_WIDTHS = [12, 15, 18, 21, 24, 30];

function pickCabinetByTypeWidth(
  type: CabinetType,
  width: number,
  preferDrawer = false,
): Cabinet | undefined {
  const all = getAllCabinets();
  // Direct match
  let match = all.find(
    (c) =>
      c.type === type &&
      c.width_in === width &&
      !c.features.includes("sink") &&
      !c.features.includes("lazy-susan") &&
      !c.features.includes("corner") &&
      !c.features.includes("waste-basket") &&
      !c.features.includes("microwave"),
  );
  if (match) return match;
  // Fallback to a different (sub)type
  const altType: CabinetType = preferDrawer ? "drawer" : "base";
  match = all.find((c) => c.type === altType && c.width_in === width);
  return match;
}

function pickByFeature(feature: string, width?: number): Cabinet | undefined {
  return getAllCabinets().find(
    (c) => c.features.includes(feature) && (width == null || c.width_in === width),
  );
}

function pickFiller(): Cabinet | undefined {
  return getAllCabinets().find((c) => c.features.includes("filler"));
}

// DP: find combination of allowed widths summing exactly to target,
// minimizing piece count. Prefers larger cabinets when ties.
function packWidths(target: number, allowedWidths: number[]): number[] | null {
  if (target <= 0) return [];
  const widths = [...allowedWidths].sort((a, b) => b - a);
  // dp[s] = list of widths that exactly sum to s (with minimum count), or null
  const dp: (number[] | null)[] = new Array(target + 1).fill(null);
  dp[0] = [];
  for (let s = 1; s <= target; s++) {
    for (const w of widths) {
      if (w > s) continue;
      const prev = dp[s - w];
      if (prev === null) continue;
      const candidate = [...prev, w];
      if (dp[s] === null || candidate.length < dp[s]!.length) {
        dp[s] = candidate;
      }
    }
  }
  return dp[target];
}

export function planWall(prefs: Preferences): WallPlan {
  const all = getAllCabinets();
  const required: Cabinet[] = [];

  // 1. Reserved pieces
  if (prefs.includeLazySusan) {
    const ls = all.find(
      (c) =>
        c.type === "base" &&
        c.features.includes("lazy-susan") &&
        c.width_in === prefs.includeLazySusan,
    );
    if (ls) required.push(ls);
  }
  if (prefs.includeBlindCorner) {
    const bc = all.find((c) => c.sku.startsWith("BBC"));
    if (bc) required.push(bc);
  }
  if (prefs.includeSink) {
    const sink = all.find(
      (c) =>
        c.type === "base" &&
        c.features.includes("sink") &&
        c.width_in === prefs.includeSink,
    );
    if (sink) required.push(sink);
  }

  const reservedWidth = required.reduce((sum, c) => sum + (c.width_in ?? 0), 0);
  const remainder = Math.max(0, prefs.wallLength - reservedWidth);

  // 2. Determine which widths can be used for the filler bases
  let allowedWidths: number[];
  switch (prefs.cabinetMix) {
    case "all-base":
      allowedWidths = BASE_WIDTHS;
      break;
    case "all-drawer":
      allowedWidths = DRAWER_WIDTHS;
      break;
    case "mostly-drawer-some-base":
    case "mostly-base-some-drawer":
      allowedWidths = Array.from(new Set([...BASE_WIDTHS, ...DRAWER_WIDTHS])).sort(
        (a, b) => a - b,
      );
      break;
  }

  let widths = packWidths(remainder, allowedWidths);
  let filler: WallPlan["filler"];

  if (!widths && remainder >= 3) {
    // Try with -3 inch filler
    const w = packWidths(remainder - 3, allowedWidths);
    if (w) {
      widths = w;
      filler = { width_in: 3, cabinet: pickFiller() };
    }
  }
  if (!widths) {
    // Last resort: pick the closest under
    for (let target = remainder - 1; target >= remainder - 5 && target > 0; target--) {
      const w = packWidths(target, allowedWidths);
      if (w) {
        widths = w;
        filler = { width_in: remainder - target, cabinet: pickFiller() };
        break;
      }
    }
  }

  const fillerPieces: WallPiece[] = widths
    ? widths.map((w) => {
        // Decide: drawer or base?
        const useDrawer = (() => {
          if (prefs.cabinetMix === "all-drawer") return true;
          if (prefs.cabinetMix === "all-base") return false;
          if (prefs.cabinetMix === "mostly-drawer-some-base") return true;
          if (prefs.cabinetMix === "mostly-base-some-drawer") return false;
          return false;
        })();
        const cabinet = pickCabinetByTypeWidth(
          useDrawer && DRAWER_WIDTHS.includes(w) ? "drawer" : "base",
          w,
          useDrawer,
        );
        return cabinet ? { cabinet, width_in: w } : { cabinet: pickCabinetByTypeWidth("base", w)!, width_in: w };
      })
    : [];

  // 3. Mix in some of "the other type" for variety per the preference
  if (prefs.cabinetMix === "mostly-drawer-some-base" && fillerPieces.length > 1) {
    // Make the last filler a base (visual break)
    const last = fillerPieces[fillerPieces.length - 1];
    const swap = pickCabinetByTypeWidth("base", last.width_in);
    if (swap) fillerPieces[fillerPieces.length - 1] = { cabinet: swap, width_in: last.width_in };
  } else if (prefs.cabinetMix === "mostly-base-some-drawer" && fillerPieces.length >= 2) {
    // Make middle piece a drawer if width is in DRAWER_WIDTHS
    const mid = Math.floor(fillerPieces.length / 2);
    const p = fillerPieces[mid];
    if (DRAWER_WIDTHS.includes(p.width_in)) {
      const swap = pickCabinetByTypeWidth("drawer", p.width_in, true);
      if (swap) fillerPieces[mid] = { cabinet: swap, width_in: p.width_in };
    }
  }

  // 4. Build the final layout: required pieces on the ends typically (corners), sink centered if present
  const layout: WallPiece[] = [];
  const lazySusan = required.find((c) => c.features.includes("lazy-susan"));
  const blindCorner = required.find((c) => c.sku.startsWith("BBC"));
  const sink = required.find((c) => c.features.includes("sink"));

  // Left edge: corner if present
  if (lazySusan) {
    layout.push({ cabinet: lazySusan, width_in: lazySusan.width_in ?? 33 });
  } else if (blindCorner) {
    layout.push({ cabinet: blindCorner, width_in: 45 });
  }

  // Distribute filler pieces around the sink
  if (sink) {
    const half = Math.floor(fillerPieces.length / 2);
    for (let i = 0; i < half; i++) layout.push(fillerPieces[i]);
    layout.push({ cabinet: sink, width_in: sink.width_in ?? 33 });
    for (let i = half; i < fillerPieces.length; i++) layout.push(fillerPieces[i]);
  } else {
    for (const p of fillerPieces) layout.push(p);
  }

  if (filler && filler.cabinet) {
    layout.push({ cabinet: filler.cabinet, width_in: filler.width_in });
  }

  const totalWidth = layout.reduce((sum, p) => sum + p.width_in, 0);
  const totalPrice = layout.reduce(
    (sum, p) => sum + (p.cabinet?.price_cad ?? 0),
    0,
  );

  // 5. Build a wall-cabinet row that mirrors the base run.
  // Smart matching:
  // - Exact width match if it exists
  // - Else try combining 2 smaller wall widths that sum to the base width
  // - Else fall back to nearest under (with filler)
  // - Lazy susan / blind corner positions get a wall corner cabinet
  let wallPieces: WallPiece[] | undefined;
  let wallTotalPrice: number | undefined;
  if (prefs.includeWallCabinets) {
    const standardWalls = all.filter(
      (c) =>
        c.type === "wall" &&
        c.height_in === 36 &&
        c.depth_in === 12 &&
        !c.features.includes("corner") &&
        !c.features.includes("glass-door") &&
        !c.features.includes("microwave") &&
        !c.features.includes("wine-rack") &&
        !c.features.includes("stemware"),
    );
    const wallBlindCorner = all.find((c) => c.sku === "WBC2736");
    const wallDiagCorner = all.find((c) => c.sku === "WDC2436");
    const wallFiller3 = all.find((c) => c.sku === "WF336"); // 3" filler (3x36)

    const pieces: WallPiece[] = [];
    for (const basePiece of layout) {
      const w = basePiece.width_in;
      const baseSku = basePiece.cabinet.sku;

      // Special positions
      if (basePiece.cabinet.features.includes("lazy-susan")) {
        const corner = wallDiagCorner ?? wallBlindCorner;
        if (corner) {
          pieces.push({ cabinet: corner, width_in: w });
          continue;
        }
      }
      if (baseSku.startsWith("BBC")) {
        // Blind base corner — pair with wall blind corner
        if (wallBlindCorner) {
          pieces.push({ cabinet: wallBlindCorner, width_in: 27 });
          // also include a wall filler at the dead corner edge
          if (wallFiller3) pieces.push({ cabinet: wallFiller3, width_in: 3 });
          continue;
        }
      }

      // Sink base — skip (most kitchens have a window over the sink)
      if (basePiece.cabinet.features.includes("sink")) {
        // Skip — visualize empty space. The filler hint shows the gap.
        continue;
      }

      // Exact width match
      const exact = standardWalls.find((c) => c.width_in === w);
      if (exact) {
        pieces.push({ cabinet: exact, width_in: w });
        continue;
      }
      // Try combining 2 walls
      const combo = findTwoWallCombo(standardWalls, w);
      if (combo) {
        for (const c of combo) pieces.push({ cabinet: c, width_in: c.width_in! });
        continue;
      }
      // Fallback: nearest under + filler
      const sorted = standardWalls
        .filter((c) => (c.width_in ?? 0) <= w)
        .sort((a, b) => (b.width_in ?? 0) - (a.width_in ?? 0));
      const nearest = sorted[0];
      if (nearest) {
        pieces.push({ cabinet: nearest, width_in: nearest.width_in! });
        const gap = w - (nearest.width_in ?? 0);
        if (gap >= 3 && wallFiller3) {
          pieces.push({ cabinet: wallFiller3, width_in: 3 });
        }
      }
    }
    wallPieces = pieces;
    wallTotalPrice = wallPieces.reduce((s, p) => s + p.cabinet.price_cad, 0);
  }

  // 6. Blind base corner always needs a 3" filler at the reveal
  if (prefs.includeBlindCorner) {
    const cornerFiller = all.find((c) => c.sku === "WF336");
    if (cornerFiller && !layout.some((p) => p.cabinet.sku === "WF336")) {
      layout.unshift({ cabinet: cornerFiller, width_in: 3 });
    }
  }
  const finalTotalWidth = layout.reduce((sum, p) => sum + p.width_in, 0);
  const finalTotalPrice = layout.reduce((sum, p) => sum + (p.cabinet?.price_cad ?? 0), 0);

  return {
    pieces: layout,
    totalWidth: finalTotalWidth,
    totalPrice: finalTotalPrice,
    filler,
    exactMatch: finalTotalWidth === prefs.wallLength,
    wallPieces,
    wallTotalPrice,
  };
}

// Find two cabinets that sum to target, biggest+smallest preferred
function findTwoWallCombo(walls: Cabinet[], target: number): Cabinet[] | null {
  const widths = walls.map((w) => w.width_in!).filter(Boolean);
  for (const a of [...widths].sort((x, y) => y - x)) {
    const need = target - a;
    if (need > 0 && need < a && widths.includes(need)) {
      const aCab = walls.find((c) => c.width_in === a);
      const bCab = walls.find((c) => c.width_in === need);
      if (aCab && bCab) return [aCab, bCab];
    }
  }
  return null;
}
