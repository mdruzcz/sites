import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOwnerSession, getOwnerProfile } from "@/lib/owner-auth";
import { getOwnerProperties } from "@/lib/owner-listings";
import { getPackage } from "@/lib/content";
import { headlineRate } from "@/lib/format";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { Price } from "@/components/Price";
import { OwnerSignOut } from "@/components/owners/OwnerSignOut";
import type { Property, PackageStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Listings",
  robots: { index: false, follow: false }
};

const STATUS_LABEL: Record<PackageStatus, { label: string; tone: string; help: string }> = {
  none: { label: "House listing", tone: "muted", help: "" },
  draft: {
    label: "Draft",
    tone: "muted",
    help: "Only you can see this. Finish it and choose a package to submit."
  },
  submitted: {
    label: "With us for review",
    tone: "warn",
    help: "We are reviewing it and will send your invoice shortly."
  },
  awaiting_payment: {
    label: "Invoice sent",
    tone: "warn",
    help: "It goes live as soon as the invoice is settled."
  },
  active: { label: "Live", tone: "ok", help: "" },
  expired: {
    label: "Expired",
    tone: "danger",
    help: "The twelve months are up. Renew to put it back on the site."
  },
  rejected: { label: "Needs changes", tone: "danger", help: "" }
};

function StatusPill({ status }: { status: PackageStatus }) {
  const s = STATUS_LABEL[status] ?? STATUS_LABEL.draft;
  const bg = {
    ok: "var(--ok-soft)",
    warn: "var(--warn-soft)",
    danger: "var(--danger-soft)",
    muted: "var(--surface-2)"
  }[s.tone]!;
  const fg = {
    ok: "var(--ok)",
    warn: "var(--warn)",
    danger: "var(--danger)",
    muted: "var(--muted)"
  }[s.tone]!;
  return (
    <span className="pill" style={{ background: bg, color: fg }}>
      {s.label}
    </span>
  );
}

function ListingRow({ p }: { p: Property }) {
  const pkg = p.package_tier ? getPackage(p.package_tier) : null;
  const status = STATUS_LABEL[p.package_status] ?? STATUS_LABEL.draft;
  const expires = p.package_expires_at ? new Date(p.package_expires_at) : null;

  return (
    <li className="card overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative shrink-0 bg-[var(--surface-2)] sm:w-[220px]" style={{ aspectRatio: "16 / 10" }}>
          {p.photos[0] ? (
            <Photo src={p.photos[0].url} alt={p.photos[0].alt} fill sizes="220px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">
              <Icon name="home" size={24} />
            </div>
          )}
        </div>

        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold truncate">{p.name || "Untitled listing"}</h3>
              <p className="mt-0.5 text-[14px] text-[var(--muted)]">
                {p.bedrooms} bed · {p.bathrooms} bath · Sleeps {p.sleeps} · {p.city}
              </p>
            </div>
            <StatusPill status={p.package_status} />
          </div>

          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <Price rate={headlineRate(p)} note={p.discount_note} size="sm" />
            <div className="text-right text-[13px] text-[var(--muted)]">
              {pkg ? <p className="font-semibold text-[var(--ink)]">{pkg.name} package</p> : null}
              <p>
                {p.photos.length}
                {pkg ? ` of ${pkg.photoLimit}` : ""} photos
              </p>
              {expires ? (
                <p>
                  {p.package_status === "expired" ? "Expired" : "Runs until"}{" "}
                  {expires.toLocaleDateString("en-CA", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              ) : null}
            </div>
          </div>

          {status.help ? (
            <p className="mt-3 text-[13px] text-[var(--muted)]">{status.help}</p>
          ) : null}

          {p.rejection_note ? (
            <p
              className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[13px]"
              style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
            >
              <strong>What needs changing:</strong> {p.rejection_note}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/owners/properties/${p.id}`} className="btn btn-quiet btn-sm">
              {p.package_status === "active" ? "Edit listing" : "Continue"}
            </Link>
            {p.status === "published" ? (
              <Link href={`/rentals/${p.slug}`} target="_blank" rel="noreferrer" className="btn btn-quiet btn-sm">
                View live
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export default async function OwnerDashboard() {
  const session = await getOwnerSession();
  if (!session) redirect("/owners/login?next=/owners/dashboard");

  const [profile, properties] = await Promise.all([
    getOwnerProfile(session.userId),
    getOwnerProperties(session.userId)
  ]);

  const live = properties.filter((p) => p.package_status === "active").length;

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[30px] font-extrabold tracking-tight">Your listings</h1>
          <p className="mt-1 text-[15px] text-[var(--muted)]">
            Signed in as {(profile?.name as string) || session.email}
            {properties.length ? ` · ${properties.length} listing${properties.length === 1 ? "" : "s"}, ${live} live` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/owners/properties/new" className="btn btn-primary btn-sm">
            <Icon name="plus" size={16} strokeWidth={2.2} />
            Add a property
          </Link>
          <OwnerSignOut />
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="card card-pad text-center py-16">
          <span
            className="mx-auto grid place-items-center rounded-full"
            style={{ width: 56, height: 56, background: "var(--accent-soft)", color: "var(--accent-dark)" }}
            aria-hidden="true"
          >
            <Icon name="home" size={26} />
          </span>
          <h2 className="mt-4 text-[20px] font-bold">Let us get your property up</h2>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-[var(--muted)]">
            Add the property, drag your photographs in and write the description. Nothing is public
            and nothing is charged until you choose a package and submit it.
          </p>
          <Link href="/owners/properties/new" className="btn btn-primary mt-6">
            Add your first property
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {properties.map((p) => (
            <ListingRow key={p.id} p={p} />
          ))}
        </ul>
      )}

      <div className="mt-10 card card-pad">
        <h2 className="text-[16px] font-bold">Need a hand?</h2>
        <p className="mt-1.5 text-[14px] text-[var(--muted)]">
          If you would rather we set the listing up for you — or you already have it on VRBO or
          Airbnb and want the photographs pulled across — say so and we will do it.
        </p>
        <Link href="/contact" className="btn btn-quiet btn-sm mt-4">
          Ask us to set it up
        </Link>
      </div>
    </div>
  );
}
