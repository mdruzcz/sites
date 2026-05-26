"use client";

import { useUI } from "./ui-context";

type Props = {
  slug: string;
  label?: string;
  className?: string;
};

export function AddToCartButton({ slug, label = "Add to Cart", className = "btn-primary" }: Props) {
  const { addItem } = useUI();
  return (
    <button
      type="button"
      onClick={() => addItem(slug, 1)}
      className={className}
    >
      {label}
    </button>
  );
}
