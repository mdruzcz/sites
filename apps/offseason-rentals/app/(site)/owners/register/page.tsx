import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-auth";
import { OwnerAuthForm } from "@/components/owners/OwnerAuthForm";
import { packages } from "@/lib/content";
import { Icon } from "@/components/Icon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create an Owner Account",
  description:
    "Set up an owner account to list your Port Stanley property for the off season. Build the listing yourself, then choose a 12-month package from $149.",
  alternates: { canonical: "/owners/register" },
  robots: { index: true, follow: true }
};

export default async function OwnerRegisterPage() {
  if (await getOwnerSession()) redirect("/owners/dashboard");

  return (
    <div className="container-page py-14">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <h1 className="text-[32px] sm:text-[40px] font-extrabold leading-[1.1] tracking-tight">
            Create your owner account
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--muted)]">
            Free to set up. You build the listing at your own pace and nothing is public — or
            payable — until you choose a package and submit it.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Build and edit your listing whenever you like",
              "Drag your own photographs straight in",
              "Set your rate, and run a discount if you want one",
              "Enquiries come directly to your inbox",
              "No commission on what you rent it for"
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[16px]">
                <Icon name="check" size={19} strokeWidth={2.3} className="mt-0.5 shrink-0" style={{ color: "var(--ok)" }} />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[var(--r-md)] border p-4" style={{ borderColor: "var(--line)" }}>
            <p className="text-[14px] font-bold">Packages, when you are ready</p>
            <ul className="mt-2 space-y-1.5">
              {packages.map((p) => (
                <li key={p.slug} className="flex items-baseline justify-between gap-4 text-[14px]">
                  <span className="text-[var(--muted)]">
                    {p.name} · {p.photoLimit} photos
                  </span>
                  <span className="font-bold">{p.priceLabel} / year</span>
                </li>
              ))}
            </ul>
            <Link href="/list-your-property#packages" className="mt-3 inline-block text-[14px] underline hover:text-[var(--accent)]">
              What is in each one
            </Link>
          </div>
        </div>

        <div>
          <Suspense fallback={<div className="card card-pad h-[460px] shimmer" />}>
            <OwnerAuthForm mode="register" />
          </Suspense>
          <p className="mt-5 text-center text-[15px] text-[var(--muted)]">
            Already have an account?{" "}
            <Link href="/owners/login" className="font-semibold text-[var(--ink)] underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
