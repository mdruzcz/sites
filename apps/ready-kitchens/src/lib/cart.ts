export type CartLine = {
  slug: string;
  qty: number;
};

export type StoredCart = {
  v: 1;
  lines: CartLine[];
};

export const CART_KEY = "rk_cart_v1";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredCart;
    if (parsed?.v !== 1 || !Array.isArray(parsed.lines)) return [];
    return parsed.lines.filter((l) => l.slug && l.qty > 0);
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  const stored: StoredCart = { v: 1, lines };
  window.localStorage.setItem(CART_KEY, JSON.stringify(stored));
}

export function addLine(lines: CartLine[], slug: string, qty = 1): CartLine[] {
  const existing = lines.find((l) => l.slug === slug);
  if (existing) {
    return lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
  }
  return [...lines, { slug, qty }];
}

export function setLineQty(lines: CartLine[], slug: string, qty: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.slug !== slug);
  return lines.map((l) => (l.slug === slug ? { ...l, qty } : l));
}

export function removeLine(lines: CartLine[], slug: string): CartLine[] {
  return lines.filter((l) => l.slug !== slug);
}

export function totalQty(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
