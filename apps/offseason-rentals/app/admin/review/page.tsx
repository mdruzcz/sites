import Link from "next/link";
import { adminClient } from "@/lib/supabase";
import { getPackage } from "@/lib/content";
import { money } from "@/lib/format";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { ReviewActions } from "@/components/admin/ReviewActions";
import type { Property } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Review queue", robots: { index: false, follow: false } };

const SELECT = "*, photos:osr_property_photos(*)";

async function loadQueue() {
  const db = adminClient();
  if (!db) return { queue: [] as Property[], live: [] as Property[], expiring: [] as Property[] };

  // Sweep expiries first so nothing shows as live past its term. A missing
  // function must not take the whole queue down, so the failure is swallowed.
  try {
    await db.rpc("osr_expire_packages");
  } catch (err) {
    console.error("Expiry sweep failed:", err);
  }

  const { data } = await db
    .from("osr_properties")
    .select(SELECT)
    .not("owner_id", "is", null)
    .order("submitted_at", { ascending: true, nullsFirst: false });

  const all = ((data ?? []) as unknown as Property[]).map((p) => ({
    ...p,
    photos: (p.photos ?? []).slice().sort((a, b) => a.position - b.position)
  }));

  const soon = Date.now() + 30 * 24 * 60 * 60 * 1000;
  return {
    queue: all.filter((p) => ["submitted", "awaiting_payment", "rejected", "draft"].includes(p.package_status)),
    live: all.filter((p) => p.package_status === "active"),
    expiring: all.filter(
      (p) =>
        p.package_status === "expired" ||
        (p.package_status === "active" &&
          p.package_expires_at !== null &&
          new Date(p.package_expires_at).getTime() < soon)
    )
  };
}

function Row({ p }: { p: Property }) {
  const pkg = p.package_tier ? getPackage(p.package_tier) : null;
  const submitted = p.submitted_at ? new Date(p.submitted_at) : null;

  return (
    <li className="card overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative shrink-0 bg-[var(--surface-2)] sm:w-[200px]" style={{ aspectRatio: "16 / 10" }}>
          {p.photos[0] ? (
            <Photo src={p.photos[0].url} alt={p.photos[0].alt} fill sizes="200px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">
              <Icon name="home" size={22} />
            </div>
          )}
        </div>

        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold">{p.name || "Untitled"}</h3>
              <p className="mt-0.5 text-[14px] text-[var(--muted)]">
                {p.street_address}
                {p.unit ? ` ${p.unit}` : ""}, {p.city} · {p.bedrooms} bed · {p.bathrooms} bath ·
                Sleeps {p.sleeps} · {p.photos.length} photos
              </p>
            </div>
            <div className="text-right">
              {pkg ? (
                <>
                  <p className="text-[16px] font-extrabold">{pkg.name}</p>
                  <p className="text-[14px] text-[var(--muted)]">{pkg.priceLabel} / 12 months</p>
                </>
              ) : (
                <p className="text-[14px] text-[var(--muted)]">No package chosen</p>
              )}
            </div>
          </div>

          <p className="mt-2 text-[14px]">
            <span className="font-semibold">{money(p.discount_monthly_rate ?? p.monthly_rate) ?? "No rate"}</span>
            {p.discount_monthly_rate ? (
              <span className="text-[var(--muted)]"> (was {money(p.monthly_rate)})</span>
            ) : null}
            <span className="text-[var(--muted)]"> / month</span>
            {submitted ? (
              <span className="text-[var(--muted)]">
                {" "}
                · submitted {submitted.toLocaleDateString("en-CA", { day: "numeric", month: "short" })}
              </span>
            ) : null}
          </p>

          {p.summary ? <p className="mt-2 text-[14px] text-[var(--muted)] clamp-2">{p.summary}</p> : null}

          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={`/admin/properties/${p.id}`} className="btn btn-quiet btn-sm">
              Open in editor
            </Link>
            {p.status === "published" ? (
              <Link href={`/rentals/${p.slug}`} target="_blank" rel="noreferrer" className="btn btn-quiet btn-sm">
                View live
              </Link>
            ) : null}
          </div>

          <ReviewActions propertyId={p.id} packageStatus={p.package_status} />
        </div>
      </div>
    </li>
  );
}

function Section({ title, note, items }: { title: string; note?: string; items: Property[] }) {
  if (!items.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-[20px] font-bold">
        {title} <span className="text-[15px] font-normal text-[var(--muted)]">({items.length})</span>
      </h2>
      {note ? <p className="mt-1 mb-4 text-[14px] text-[var(--muted)]">{note}</p> : <div className="mb-4" />}
      <ul className="space-y-4">
        {items.map((p) => (
          <Row key={p.id} p={p} />
        ))}
      </ul>
    </section>
  );
}

export default async function ReviewPage() {
  const { queue, live, expiring } = await loadQueue();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight">Owner listings</h1>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            {queue.length} waiting · {live.length} live · {expiring.length} expiring or expired
          </p>
        </div>
        <Link href="/admin" className="btn btn-quiet btn-sm">
          Back to listings
        </Link>
      </div>

      {queue.length === 0 && live.length === 0 ? (
        <div className="card card-pad text-center py-14">
          <span
            className="mx-auto grid place-items-center rounded-full"
            style={{ width: 48, height: 48, background: "var(--surface-2)", color: "var(--muted)" }}
          >
            <Icon name="check" size={22} />
          </span>
          <p className="mt-3 text-[16px] font-semibold">Nothing waiting</p>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            Owner submissions land here. You will also get an email and a text.
          </p>
        </div>
      ) : null}

      <Section
        title="Waiting on you"
        note="Approving publishes the listing and starts its twelve months from today."
        items={queue}
      />
      <Section title="Expiring or expired" note="Chase these for renewal." items={expiring} />
      <Section title="Live" items={live.filter((p) => !expiring.includes(p))} />
    </div>
  );
}
