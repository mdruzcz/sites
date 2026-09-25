"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartKind = "cabinet" | "package";

export type CartItem = {
  slug: string;
  name: string;
  price_cad: number | null;
  qty: number;
  kind: CartKind;
  image?: string;
  /** Regular price when the line is on sale (price_cad is then the sale price). */
  list_price_cad?: number | null;
  sale_label?: string | null;
};

type AddInput = Omit<CartItem, "qty"> & { qty?: number };

type CartState = {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** Subtotal at regular prices (>= subtotal when anything is on sale). */
  listSubtotal: number;
  hydrated: boolean;
  add: (item: AddInput) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "rta-quote-cart";

const CartContext = createContext<CartState | null>(null);

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [items, hydrated]);

  const add = useCallback((item: AddInput) => {
    const qty = item.qty ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        // keep the better price if the same cabinet is added again from a sale context
        const better = item.price_cad !== null && existing.price_cad !== null && item.price_cad < existing.price_cad;
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, qty: i.qty + qty, ...(better ? { price_cad: item.price_cad, list_price_cad: item.list_price_cad, sale_label: item.sale_label } : {}) } : i,
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartState>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + (i.price_cad ?? 0) * i.qty, 0);
    const listSubtotal = items.reduce((s, i) => s + (i.list_price_cad ?? i.price_cad ?? 0) * i.qty, 0);
    return { items, count, subtotal, listSubtotal, hydrated, add, remove, setQty, clear };
  }, [items, hydrated, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
