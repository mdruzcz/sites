import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-auth";
import { getOwnerProperty, photoHeadroom } from "@/lib/owner-listings";
import { OwnerListingForm } from "@/components/owners/OwnerListingForm";
import { SubmitPanel } from "@/components/owners/SubmitPanel";
import { PhotoManager } from "@/components/admin/PhotoManager";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit listing", robots: { index: false, follow: false } };

export default async function OwnerPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getOwnerSession();
  const { id } = await params;
  if (!session) redirect(`/owners/login?next=/owners/properties/${id}`);

  const property = await getOwnerProperty(session.userId, id);
  if (!property) notFound();

  const { limit } = photoHeadroom(property);

  return (
    <div className="container-page py-12">
      <nav className="mb-4 text-[13px] text-[var(--muted)]">
        <Link href="/owners/dashboard" className="hover:underline">
          Your listings
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">{property.name || "Untitled"}</span>
      </nav>

      <h1 className="text-[30px] font-extrabold tracking-tight mb-8">
        {property.name || "Untitled listing"}
      </h1>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-10 items-start">
        <div className="space-y-6 min-w-0">
          <div className="card card-pad">
            <PhotoManager
              propertyId={property.id}
              photos={property.photos}
              mode="owner"
              limit={limit}
            />
          </div>
          <OwnerListingForm property={property} />
        </div>

        <div className="lg:sticky lg:top-[104px]">
          <Suspense fallback={<div className="card card-pad h-[420px] shimmer" />}>
            <SubmitPanel property={property} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
