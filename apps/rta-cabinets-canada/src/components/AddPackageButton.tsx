"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/ui-context";
import type { KitchenPackage } from "@/lib/catalog";

export default function AddPackageButton({ pkg }: { pkg: KitchenPackage }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add({
      slug: pkg.slug,
      name: pkg.name,
      price_cad: pkg.subtotal_cad,
      image: pkg.hero_image,
      kind: "package",
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAdd}
        className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-md font-medium min-h-[48px]"
        aria-live="polite"
      >
        {added ? "Package added ✓" : "Add Package to Quote"}
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
