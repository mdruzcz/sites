"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface UIContextValue {
  miniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  toggleMiniCart: () => void;
  popupOpen: boolean;
  dismissPopup: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

const POPUP_KEY = "hld_popup_dismissed_v1";

export function UIProvider({ children }: { children: ReactNode }) {
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  // Show popup after a short delay on first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => setPopupOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll when the drawer or popup is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = miniCartOpen || popupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [miniCartOpen, popupOpen]);

  const value: UIContextValue = {
    miniCartOpen,
    openMiniCart: useCallback(() => setMiniCartOpen(true), []),
    closeMiniCart: useCallback(() => setMiniCartOpen(false), []),
    toggleMiniCart: useCallback(() => setMiniCartOpen((o) => !o), []),
    popupOpen,
    dismissPopup: useCallback(() => {
      setPopupOpen(false);
      try {
        localStorage.setItem(POPUP_KEY, "1");
      } catch {}
    }, [])
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
