import Link from "next/link";
import { Icon } from "@/components/icons";

export function CheckoutBar() {
  return (
    <>
      <Link href="/checkout" className="btn-accent mt-5 w-full">
        Request my quote <Icon.arrow size={16} />
      </Link>
      <p className="mt-3 text-center text-xs text-[var(--color-muted)]">No payment online. We reply with pricing, shipping and timeline within one business day.</p>
    </>
  );
}
