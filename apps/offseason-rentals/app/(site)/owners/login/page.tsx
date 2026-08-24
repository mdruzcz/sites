import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-auth";
import { OwnerAuthForm } from "@/components/owners/OwnerAuthForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner Login",
  description: "Sign in to manage your Port Stanley off-season rental listing.",
  alternates: { canonical: "/owners/login" },
  robots: { index: true, follow: true }
};

export default async function OwnerLoginPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (await getOwnerSession()) redirect("/owners/dashboard");
  const confirmed = (await searchParams).confirmed === "1";

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-[440px]">
        <h1 className="text-[30px] font-extrabold tracking-tight text-center">Owner login</h1>
        <p className="mt-2 mb-7 text-center text-[15px] text-[var(--muted)]">
          Manage your listing, update rates and photographs, or renew for another year.
        </p>

        {confirmed ? (
          <p
            className="mb-5 rounded-[var(--r-sm)] px-4 py-3 text-[14px]"
            style={{ background: "var(--ok-soft)", color: "var(--ok)" }}
            role="status"
          >
            Email confirmed — sign in below and you can start building your listing.
          </p>
        ) : null}

        <Suspense fallback={<div className="card card-pad h-[320px] shimmer" />}>
          <OwnerAuthForm mode="login" />
        </Suspense>

        <p className="mt-6 text-center text-[15px] text-[var(--muted)]">
          Do not have an account yet?{" "}
          <Link href="/owners/register" className="font-semibold text-[var(--ink)] underline">
            Create one
          </Link>
        </p>
        <p className="mt-2 text-center text-[14px] text-[var(--muted)]">
          <Link href="/list-your-property" className="underline hover:text-[var(--ink)]">
            See the listing packages
          </Link>
        </p>
      </div>
    </div>
  );
}
