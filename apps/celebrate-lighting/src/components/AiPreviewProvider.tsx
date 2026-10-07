"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { AiPreviewForm } from "./AiPreviewForm";

/**
 * Site-wide "Free AI Home Preview" popup.
 *
 * Opens from any button via useAiPreview().open(), and automatically once
 * per visitor (7-day memory) when they've shown intent: ~10s on page,
 * 45% scroll, or exit-intent on desktop. Never auto-opens on the pages
 * where the offer is already the content (/ai-preview, /contact) or on
 * legal pages. Rendered through a portal so a blurred sticky header can't
 * become its containing block.
 */

const SEEN_KEY = "cl_ai_popup_seen";
const SEEN_DAYS = 7;
const QUIET_PATHS = ["/ai-preview", "/contact", "/privacy-policy", "/terms-of-service"];

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const AiPreviewContext = createContext<Ctx>({ open: () => {}, close: () => {}, isOpen: false });

export function useAiPreview() {
  return useContext(AiPreviewContext);
}

function hasSeen() {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < SEEN_DAYS * 86400000;
  } catch {
    return false;
  }
}
function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {}
}

export function AiPreviewProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const autoFired = useRef(false);
  const pathname = usePathname();

  const open = useCallback(() => {
    setIsOpen(true);
    markSeen();
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Auto-open triggers
  useEffect(() => {
    if (QUIET_PATHS.some((p) => pathname.startsWith(p))) return;
    if (hasSeen() || autoFired.current) return;

    const fire = () => {
      if (autoFired.current || hasSeen()) return;
      autoFired.current = true;
      open();
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (pct > 0.45) fire();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth >= 1024) fire();
    };
    const timer = window.setTimeout(fire, 11000);
    const minDelay = window.setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }, 3500);
    function cleanup() {
      window.clearTimeout(timer);
      window.clearTimeout(minDelay);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    }
    return cleanup;
  }, [pathname, open]);

  // Escape + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <AiPreviewContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="ai-popup-title">
            <button type="button" className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-label="Close" onClick={close} />
            <div className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl pop-in" style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}>
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-10 inline-flex w-11 h-11 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                aria-label="Close popup"
              >
                <Icon.X />
              </button>
              <div className="grid md:grid-cols-[1fr_1.15fr]">
                <div className="relative min-h-[180px] md:min-h-full">
                  <Image
                    src="/images/gallery/rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home.jpg"
                    alt="Two-storey home with permanent roofline lights in a rainbow gradient, the kind of preview we send back"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--surface)] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 md:left-6">
                    <span className="pill pill-gold">Free · No obligation</span>
                  </div>
                </div>
                <div className="p-5 sm:p-7 md:p-8">
                  <span className="pill mb-3"><Icon.Sparkle width={14} height={14} /> Free AI Home Preview</span>
                  <h2 id="ai-popup-title" className="font-display text-2xl md:text-3xl text-white leading-tight">{site.aiPreview.title}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                    {site.aiPreview.promise} Delivered to your inbox {site.aiPreview.turnaround}.
                  </p>
                  <div className="mt-5">
                    <AiPreviewForm formId="popup" compact onDone={() => {}} />
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AiPreviewContext.Provider>
  );
}

/** Any button that opens the popup. */
export function AiPreviewButton({ className = "btn btn-outline", children }: { className?: string; children?: React.ReactNode }) {
  const { open } = useAiPreview();
  return (
    <button type="button" onClick={open} className={className}>
      <Icon.Sparkle width={16} height={16} />
      {children ?? site.aiPreview.cta}
    </button>
  );
}
