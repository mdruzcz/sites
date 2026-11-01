"use client";

import { useEffect, useState } from "react";
import { CameraIcon, CheckIcon } from "../icons";
import { PACKAGE_EVENT, jumpToForm, type PackageChoice } from "./landing-events";

export function JumpToFormButton({ children, className = "lp-cta" }: { children: React.ReactNode; className?: string }) {
  return <button type="button" onClick={jumpToForm} className={className}>{children}</button>;
}

export function SelectPackageButton({ choice, children, featured = false }: { choice: PackageChoice; children: React.ReactNode; featured?: boolean }) {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const onPick = (e: Event) => setSelected((e as CustomEvent<PackageChoice>).detail.label === choice.label);
    window.addEventListener(PACKAGE_EVENT, onPick);
    return () => window.removeEventListener(PACKAGE_EVENT, onPick);
  }, [choice.label]);
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => {
        window.dispatchEvent(new CustomEvent<PackageChoice>(PACKAGE_EVENT, { detail: choice }));
        jumpToForm();
      }}
      className={featured ? "lp-cta w-full" : "lp-cta-ghost w-full"}
    >
      {selected && <CheckIcon className="h-4 w-4" />}
      {children}
    </button>
  );
}

/** Mobile-only bar. Hides while the form is on screen so it never covers a field. */
export function StickyUploadBar() {
  const [formVisible, setFormVisible] = useState(true);
  useEffect(() => {
    const el = document.getElementById("quote-form");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`lp-sticky fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#06140E]/95 p-3 backdrop-blur transition-transform lg:hidden ${formVisible ? "translate-y-full" : "translate-y-0"}`}>
      <button type="button" onClick={jumpToForm} className="lp-cta w-full" tabIndex={formVisible ? -1 : 0}>
        <CameraIcon className="h-5 w-5" /> Upload Photo for Fast Quote
      </button>
    </div>
  );
}
