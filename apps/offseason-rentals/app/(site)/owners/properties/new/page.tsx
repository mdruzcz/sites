import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-auth";
import { OwnerListingForm } from "@/components/owners/OwnerListingForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Add a property", robots: { index: false, follow: false } };

export default async function NewOwnerProperty() {
  const session = await getOwnerSession();
  if (!session) redirect("/owners/login?next=/owners/properties/new");

  return (
    <div className="container-page py-12">
      <nav className="mb-4 text-[13px] text-[var(--muted)]">
        <Link href="/owners/dashboard" className="hover:underline">
          Your listings
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">Add a property</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-[30px] font-extrabold tracking-tight">Add a property</h1>
        <p className="mt-2 mb-8 text-[15px] text-[var(--muted)]">
          Just the basics for now — you can add photographs and the rest of the detail on the next
          screen. Nothing is public until you choose a package and submit it.
        </p>
      </div>

      <OwnerListingForm />
    </div>
  );
}
