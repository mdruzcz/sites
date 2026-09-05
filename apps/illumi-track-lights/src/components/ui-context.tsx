"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface UIContextValue {
  miniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  toggleMiniCart: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = miniCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [miniCartOpen]);

  const value: UIContextValue = {
    miniCartOpen,
    openMiniCart: useCallback(() => setMiniCartOpen(true), []),
    closeMiniCart: useCallback(() => setMiniCartOpen(false), []),
    toggleMiniCart: useCallback(() => setMiniCartOpen((o) => !o), [])
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
