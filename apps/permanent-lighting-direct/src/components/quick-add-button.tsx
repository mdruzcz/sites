"use client";

import { useState, useTransition } from "react";
import { addToCartAction } from "@/lib/actions/cart";

export function QuickAddButton({ variantId, label = "Add" }: { variantId: string; label?: string }) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await addToCartAction(variantId, 1);
          setDone(true);
          setTimeout(() => setDone(false), 2500);
        })
      }
      className={`${done ? "btn-secondary" : "btn-primary"} inline-flex min-h-[44px] w-full items-center justify-center text-sm disabled:opacity-60`}
    >
      {pending ? "Adding…" : done ? "✓ Added" : `+ ${label}`}
    </button>
  );
}
