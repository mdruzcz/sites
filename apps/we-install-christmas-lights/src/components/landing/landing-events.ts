// Package buttons sit far from the form, so they talk over a window event.
export const PACKAGE_EVENT = "wicl:package";

export type PackageChoice = { label: string; lead: string };

export function jumpToForm() {
  const el = document.getElementById("quote-form");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.querySelector<HTMLInputElement>("input:not([type=hidden]):not(.hidden):not(.sr-only)")?.focus({ preventScroll: true });
}
