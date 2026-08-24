import Link from "next/link";
import { notFound } from "next/navigation";
import { getPropertyForAdmin } from "@/lib/properties";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { PhotoManager } from "@/components/admin/PhotoManager";
import { ImportPanel } from "@/components/admin/ImportPanel";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit listing", robots: { index: false, follow: false } };

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getPropertyForAdmin(id);
  if (!property) notFound();

  return (
    <div className="space-y-6">
      <nav className="text-[13px] text-[var(--muted)]">
        <Link href="/admin" className="hover:underline">
          Listings
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">{property.name}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[26px] font-extrabold tracking-tight">{property.name}</h1>
        <span
          className="pill"
          style={{
            background: property.status === "published" ? "var(--ok-soft)" : "var(--surface-2)",
            color: property.status === "published" ? "var(--ok)" : "var(--muted)"
          }}
        >
          {property.status === "published" ? "Live on the site" : "Draft — not visible"}
        </span>
      </div>

      <div className="card card-pad">
        <PhotoManager propertyId={property.id} photos={property.photos} />
      </div>

      <ImportPanel propertyId={property.id} />

      <PropertyForm property={property} />
    </div>
  );
}
