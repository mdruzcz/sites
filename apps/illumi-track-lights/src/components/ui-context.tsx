"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface UIContextValue {
  miniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  toggleMiniCart: () => void;
  popupOpen: boolean;
  dismissPopup: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

const POPUP_KEY = "itl_popup_dismissed_v1";

export function UIProvider({ children }: { children: ReactNode }) {
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Show popup after a short delay on first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => setPopupOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll when drawer or popup is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const lock = miniCartOpen || popupOpen || searchOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [miniCartOpen, popupOpen, searchOpen]);

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
    }, []),
    searchOpen,
    openSearch: useCallback(() => setSearchOpen(true), []),
    closeSearch: useCallback(() => setSearchOpen(false), [])
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
