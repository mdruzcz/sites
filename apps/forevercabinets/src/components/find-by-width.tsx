"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function FindByWidth() {
  const router = useRouter();
  const [w, setW] = useState("");
  const [type, setType] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(w);
    if (!num || num <= 0) {
      router.push("/cabinets");
      return;
    }
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    params.set("minw", String(Math.max(0, num - 0.5)));
    params.set("maxw", String(num + 0.5));
    router.push(`/cabinets?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]"
    >
      <input
        type="number"
        min={6}
        max={48}
        step="1"
        value={w}
        onChange={(e) => setW(e.target.value)}
        placeholder="Width in inches"
        aria-label="Width in inches"
        className="h-12 rounded-sm border border-[var(--color-line)] bg-white px-4 text-base focus:border-[var(--color-navy)] focus:outline-none"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        aria-label="Cabinet type"
        className="h-12 rounded-sm border border-[var(--color-line)] bg-white px-4 text-base focus:border-[var(--color-navy)] focus:outline-none"
      >
        <option value="">Any type</option>
        <option value="base">Base</option>
        <option value="drawer">Drawer</option>
        <option value="wall">Wall</option>
      </select>
      <button type="submit" className="btn-primary h-12">
        Find cabinets
      </button>
    </form>
  );
}
