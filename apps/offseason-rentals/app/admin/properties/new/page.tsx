import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";

export const metadata = { title: "New listing", robots: { index: false, follow: false } };

export default function NewPropertyPage() {
  return (
    <div className="space-y-6">
      <nav className="text-[13px] text-[var(--muted)]">
        <Link href="/admin" className="hover:underline">
          Listings
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">New</span>
      </nav>

      <h1 className="text-[26px] font-extrabold tracking-tight">New listing</h1>
      <p className="-mt-4 text-[14px] text-[var(--muted)]">
        Save it first, then photographs can be added on the next screen.
      </p>

      <PropertyForm />
    </div>
  );
}
