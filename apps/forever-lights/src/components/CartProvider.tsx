'use client';
// DIY kit cart. Lives in the browser (localStorage) — the only things for sale
// online are the six kits in content/kits.json, so there is no server-side cart.
// Lines hold just slug + colour + qty; prices are always taken from kits.json on
// the server at checkout.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface CartItem {
  slug: string;
  colour: string;
  qty: number;
}

interface CartApi {
  items: CartItem[];
  count: number;
  ready: boolean;
  add: (slug: string, colour: string, qty?: number) => void;
  setQty: (slug: string, colour: string, qty: number) => void;
  remove: (slug: string, colour: string) => void;
  clear: () => void;
}

const KEY = 'fl_cart_v1';
const MAX_QTY = 20;
const CartContext = createContext<CartApi | null>(null);

function read(): CartItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(i => i && typeof i.slug === 'string' && typeof i.colour === 'string')
      .map(i => ({ slug: i.slug, colour: i.colour, qty: Math.min(MAX_QTY, Math.max(1, Math.floor(Number(i.qty) || 1))) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(read());
    setReady(true);
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) setItems(read()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const save = useCallback((next: CartItem[]) => {
    setItems(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode: cart lasts for the visit */ }
  }, []);

  const api = useMemo<CartApi>(() => ({
    items,
    ready,
    count: items.reduce((n, i) => n + i.qty, 0),
    add: (slug, colour, qty = 1) => {
      const found = items.find(i => i.slug === slug && i.colour === colour);
      save(found
        ? items.map(i => (i === found ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
        : [...items, { slug, colour, qty: Math.min(MAX_QTY, qty) }]);
    },
    setQty: (slug, colour, qty) => {
      const q = Math.min(MAX_QTY, Math.floor(qty));
      save(q <= 0
        ? items.filter(i => !(i.slug === slug && i.colour === colour))
        : items.map(i => (i.slug === slug && i.colour === colour ? { ...i, qty: q } : i)));
    },
    remove: (slug, colour) => save(items.filter(i => !(i.slug === slug && i.colour === colour))),
    clear: () => save([]),
  }), [items, ready, save]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

/** Empties the cart once an order has been placed (used on the success page). */
export function ClearCart() {
  const { clear, ready, count } = useCart();
  useEffect(() => { if (ready && count > 0) clear(); }, [ready, count, clear]);
  return null;
}
