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
  readList,
  removeLine,
  setLineQty,
  totalQty,
  writeList,
  type RequestLine,
} from "@/lib/request-list";

type UIState = {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lines: RequestLine[];
  itemCount: number;
  addItem: (sku: string, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  hydrated: boolean;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lines, setLines] = useState<RequestLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readList());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeList(lines);
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

  const addItem = useCallback((sku: string, qty = 1) => {
    setLines((prev) => addLine(prev, sku, qty));
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setLines((prev) => setLineQty(prev, sku, qty));
  }, []);

  const remove = useCallback((sku: string) => {
    setLines((prev) => removeLine(prev, sku));
  }, []);

  const clear = useCallback(() => setLines([]), []);

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
    }),
    [drawerOpen, openDrawer, closeDrawer, lines, addItem, setQty, remove, clear, hydrated],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
