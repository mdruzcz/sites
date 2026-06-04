"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, type CartKind } from "@/lib/ui-context";

export default function AddToQuoteButton({
  slug,
  name,
  price_cad,
  image,
  kind = "cabinet",
  className,
  label = "Add to Quote",
}: {
  slug: string;
  name: string;
  price_cad: number | null;
  image?: string;
  kind?: CartKind;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({ slug, name, price_cad, image, kind });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        className={className ?? "bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium min-h-[48px]"}
        aria-live="polite"
      >
        {added ? "Added to quote ✓" : label}
      </button>
      {added && (
        <p className="text-sm text-ink-soft mt-3">
          <Link href="/request" className="text-accent font-medium underline">
            Review your quote list →
          </Link>
        </p>
      )}
    </div>
  );
}
