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
import {
  addLine,
  readCart,
  removeLine,
  setLineQty,
  totalQty,
  writeCart,
  type CartLine,
} from "@/lib/cart";
import type { KitSnapshot } from "@/lib/kits-snapshot";

type UIState = {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lines: CartLine[];
  itemCount: number;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  hydrated: boolean;
  kits: KitSnapshot[];
  getKit: (slug: string) => KitSnapshot | undefined;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children, kits }: { children: ReactNode; kits: KitSnapshot[] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeCart(lines);
  }, [lines, hydrated]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback((slug: string, qty = 1) => {
    setLines((prev) => addLine(prev, slug, qty));
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) => setLineQty(prev, slug, qty));
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => removeLine(prev, slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const kitMap = useMemo(() => Object.fromEntries(kits.map((k) => [k.slug, k])), [kits]);
  const getKit = useCallback((slug: string) => kitMap[slug], [kitMap]);

  const value = useMemo<UIState>(
    () => ({
      drawerOpen,
      openDrawer,
      closeDrawer,
      lines,
      itemCount: totalQty(lines),
      addItem,
      setQty,
      remove,
      clear,
      hydrated,
      kits,
      getKit,
    }),
    [drawerOpen, openDrawer, closeDrawer, lines, addItem, setQty, remove, clear, hydrated, kits, getKit],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
