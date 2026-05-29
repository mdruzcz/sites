export type RequestLine = {
  sku: string;
  qty: number;
};

export type StoredRequestList = {
  v: 1;
  lines: RequestLine[];
};

export const REQUEST_LIST_KEY = "fc_request_list_v1";

export function readList(): RequestLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(REQUEST_LIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredRequestList;
    if (parsed?.v !== 1 || !Array.isArray(parsed.lines)) return [];
    return parsed.lines.filter((l) => l.sku && l.qty > 0);
  } catch {
    return [];
  }
}

export function writeList(lines: RequestLine[]) {
  if (typeof window === "undefined") return;
  const stored: StoredRequestList = { v: 1, lines };
  window.localStorage.setItem(REQUEST_LIST_KEY, JSON.stringify(stored));
}

export function addLine(lines: RequestLine[], sku: string, qty = 1): RequestLine[] {
  const existing = lines.find((l) => l.sku === sku);
  if (existing) {
    return lines.map((l) => (l.sku === sku ? { ...l, qty: l.qty + qty } : l));
  }
  return [...lines, { sku, qty }];
}

export function setLineQty(lines: RequestLine[], sku: string, qty: number): RequestLine[] {
  if (qty <= 0) return lines.filter((l) => l.sku !== sku);
  return lines.map((l) => (l.sku === sku ? { ...l, qty } : l));
}

export function removeLine(lines: RequestLine[], sku: string): RequestLine[] {
  return lines.filter((l) => l.sku !== sku);
}

export function totalQty(lines: RequestLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
