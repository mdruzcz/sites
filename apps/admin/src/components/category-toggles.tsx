"use client";

import { useState, useTransition } from "react";
import { toggleCategory } from "@/lib/actions/product";

export function CategoryToggles({
  productId,
  categories,
  joinedCategoryIds
}: {
  productId: string;
  categories: { id: string; name: string; slug: string }[];
  joinedCategoryIds: string[];
}) {
  const [active, setActive] = useState(new Set(joinedCategoryIds));
  const [, startTransition] = useTransition();

  function flip(id: string) {
    const attach = !active.has(id);
    const next = new Set(active);
    if (attach) next.add(id);
    else next.delete(id);
    setActive(next);
    startTransition(async () => {
      try {
        await toggleCategory(productId, id, attach);
      } catch {
        // rollback if it errors
        setActive(active);
      }
    });
  }

  return (
    <ul className="mt-3 space-y-1 text-sm">
      {categories.map((c) => (
        <li key={c.id}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={active.has(c.id)}
              onChange={() => flip(c.id)}
            />
            <span>{c.name}</span>
          </label>
        </li>
      ))}
      {categories.length === 0 && (
        <li className="text-slate-500">No categories yet for this store.</li>
      )}
    </ul>
  );
}
