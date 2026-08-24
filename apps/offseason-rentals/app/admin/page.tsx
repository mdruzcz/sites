import Link from "next/link";
import { getAllPropertiesForAdmin } from "@/lib/properties";
import { supabaseAdminConfigured } from "@/lib/supabase";
import { money } from "@/lib/format";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { ImportPanel } from "@/components/admin/ImportPanel";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const properties = supabaseAdminConfigured ? await getAllPropertiesForAdmin() : [];
  const published = properties.filter((p) => p.status === "published").length;

  return (
    <div className="space-y-8">
      {!supabaseAdminConfigured ? (
        <div
          className="rounded-[var(--r-md)] p-5"
          style={{ background: "var(--warn-soft)", color: "var(--warn)" }}
        >
          <p className="font-bold">Database not connected</p>
          <p className="mt-1 text-[14px]">
            Set <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> in the environment and
            run <code className="font-mono">scripts/schema.sql</code> in the Supabase SQL editor.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight">Listings</h1>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            {properties.length} total · {published} published · {properties.length - published} draft
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/properties/new" className="btn btn-dark btn-sm">
            <Icon name="plus" size={16} strokeWidth={2.2} />
            New listing
          </Link>
        </div>
      </div>

      <ImportPanel />

      {properties.length === 0 ? (
        <div className="card card-pad text-center py-14">
          <span
            className="mx-auto grid place-items-center rounded-full"
            style={{ width: 48, height: 48, background: "var(--surface-2)", color: "var(--muted)" }}
            aria-hidden="true"
          >
            <Icon name="home" size={22} />
          </span>
          <p className="mt-3 text-[16px] font-semibold">No listings yet</p>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            Paste a VRBO or Airbnb link above, or start one from scratch.
          </p>
          <Link href="/admin/properties/new" className="btn btn-outline btn-sm mt-5">
            Create the first listing
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/properties/${p.id}`} className="card block overflow-hidden hover:shadow-[var(--shadow-md)] transition-shadow">
                <div className="relative bg-[var(--surface-2)]" style={{ aspectRatio: "16 / 10" }}>
                  {p.photos[0] ? (
                    <Photo src={p.photos[0].url} alt={p.photos[0].alt} fill sizes="360px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">
                      <Icon name="home" size={26} />
                    </div>
                  )}
                  <span
                    className="absolute left-2.5 top-2.5 pill"
                    style={{
                      background: p.status === "published" ? "var(--ok)" : "var(--surface)",
                      color: p.status === "published" ? "#fff" : "var(--muted)",
                      border: p.status === "published" ? "none" : "1px solid var(--line)",
                      fontSize: 11,
                      padding: "4px 10px"
                    }}
                  >
                    {p.status === "published" ? "Live" : "Draft"}
                  </span>
                </div>

                <div className="p-4">
                  <h2 className="text-[15px] font-bold truncate">{p.name}</h2>
                  <p className="mt-0.5 text-[13px] text-[var(--muted)] truncate">
                    {p.bedrooms} bed · {p.bathrooms} bath · Sleeps {p.sleeps} · {p.city}
                  </p>
                  <p className="mt-1.5 text-[14px]">
                    <span className="font-semibold">{money(p.monthly_rate) ?? "No rate"}</span>
                    {p.monthly_rate ? <span className="text-[var(--muted)]"> / month</span> : null}
                    <span className="text-[var(--muted)]"> · {p.photos.length} photos</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
