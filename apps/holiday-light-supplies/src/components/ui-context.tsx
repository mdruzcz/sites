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

const POPUP_KEY = "hls_newsletter_popup_v2";
const POPUP_SNOOZE_DAYS = 21;

/** Pages where an email popup would be hostile (checkout flow, legal, forms). */
const QUIET_PATHS = ["/checkout", "/cart", "/request-a-quote", "/municipalities", "/professional-installer", "/contact-us", "/privacy", "/terms-of-service"];

export function UIProvider({ children }: { children: ReactNode }) {
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Newsletter popup: once per 21 days, after 9s or 45% scroll or exit intent, never on quiet pages.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (QUIET_PATHS.some((p) => window.location.pathname.startsWith(p))) return;
    try {
      const raw = localStorage.getItem(POPUP_KEY);
      if (raw && Date.now() - Number(raw) < POPUP_SNOOZE_DAYS * 86400000) return;
    } catch {}

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setPopupOpen(true);
      cleanup();
    };
    const timer = setTimeout(show, 9000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.45) show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    }
    return cleanup;
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
        localStorage.setItem(POPUP_KEY, String(Date.now()));
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
