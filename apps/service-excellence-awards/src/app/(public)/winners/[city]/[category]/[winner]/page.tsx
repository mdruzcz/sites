import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import type { WinnerWithRefs } from "@/lib/types";

export const revalidate = 60;

type Params = Promise<{ city: string; category: string; winner: string }>;

async function loadWinner(slug: string): Promise<WinnerWithRefs | null> {
  const supabase = await getServerSupabase();
  const { data } = await supabase
    .from("sea_winners")
    .select("*, city:sea_cities(*), category:sea_categories(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return (data as WinnerWithRefs | null) ?? null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { winner } = await params;
  const w = await loadWinner(winner);
  if (!w) return { title: "Winner not found" };
  const title = `${w.business_name} — ${w.year} Best ${w.category.name} in ${w.city.name}`;
  const desc = w.tagline ?? w.description ?? `${w.business_name} is the ${w.year} Service Excellence Award winner for ${w.category.name} in ${w.city.name}, ${w.city.province}.`;
  return {
    title,
    description: desc,
    alternates: { canonical: `/winners/${w.city.slug}/${w.category.slug}/${w.slug}` },
    openGraph: {
      title,
      description: desc,
      type: "profile",
      images: w.photo_url ? [{ url: w.photo_url }] : undefined,
    },
  };
}

export default async function WinnerProfilePage({ params }: { params: Params }) {
  const { city, category, winner } = await params;
  const w = await loadWinner(winner);
  if (!w || w.city.slug !== city || w.category.slug !== category) notFound();

  // Structured data for SEO + AI extraction
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: w.business_name,
    description: w.description ?? w.tagline ?? undefined,
    url: w.website ?? undefined,
    telephone: w.phone ?? undefined,
    email: w.email ?? undefined,
    address: w.address
      ? {
          "@type": "PostalAddress",
          streetAddress: w.address,
          addressLocality: w.city.name,
          addressRegion: w.city.province,
          addressCountry: "CA",
        }
      : undefined,
    areaServed: w.service_areas.length > 0 ? w.service_areas : [w.city.name],
    knowsAbout: w.services.length > 0 ? w.services : [w.category.name],
    foundingDate: w.established_year ? String(w.established_year) : undefined,
    award: `${w.year} Service Excellence Award — Best ${w.category.name} in ${w.city.name}`,
  };

  return (
    <>
      <article className="mx-auto w-full max-w-4xl px-6 pt-12 pb-16">
        <nav className="text-xs uppercase tracking-[0.22em] text-stone-500">
          <Link href="/winners" className="hover:text-[var(--gold)]">Winners</Link>
          <span className="mx-2">/</span>
          <Link href={`/winners/${w.city.slug}`} className="hover:text-[var(--gold)]">{w.city.name}</Link>
          <span className="mx-2">/</span>
          <Link href={`/winners/${w.city.slug}/${w.category.slug}`} className="hover:text-[var(--gold)]">{w.category.name}</Link>
        </nav>

        <header className="mt-6 border-b border-stone-200 pb-10">
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
            <span>★ {w.year} Winner</span>
            <span className="text-stone-400">Best {w.category.name}</span>
            <span className="text-stone-400">{w.city.name}, {w.city.province}</span>
          </div>
          <h1 className="mt-4 font-serif text-5xl tracking-tight">{w.business_name}</h1>
          {w.tagline && <p className="mt-3 max-w-2xl text-xl text-stone-700">{w.tagline}</p>}
        </header>

        {w.photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={w.photo_url}
            alt={`${w.business_name} — ${w.year} Service Excellence Award winner`}
            className="mt-10 aspect-[16/9] w-full rounded-lg object-cover"
          />
        )}

        <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            {w.description && (
              <section>
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">About</h2>
                <p className="mt-3 whitespace-pre-line text-stone-700 leading-relaxed">{w.description}</p>
              </section>
            )}

            {w.services.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Services</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {w.services.map((s) => (
                    <li key={s} className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700">{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {w.service_areas.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Service area</h2>
                <p className="mt-3 text-stone-700">{w.service_areas.join(", ")}</p>
              </section>
            )}
          </div>

          <aside className="rounded-lg border border-stone-200 bg-stone-50/60 p-6">
            <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Contact</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {w.phone && (
                <div>
                  <dt className="text-stone-500">Phone</dt>
                  <dd><a href={`tel:${w.phone}`} className="hover:text-[var(--gold)]">{w.phone}</a></dd>
                </div>
              )}
              {w.email && (
                <div>
                  <dt className="text-stone-500">Email</dt>
                  <dd><a href={`mailto:${w.email}`} className="break-all hover:text-[var(--gold)]">{w.email}</a></dd>
                </div>
              )}
              {w.website && (
                <div>
                  <dt className="text-stone-500">Website</dt>
                  <dd><a href={w.website} target="_blank" rel="noopener" className="break-all hover:text-[var(--gold)]">{w.website.replace(/^https?:\/\//, "")}</a></dd>
                </div>
              )}
              {w.address && (
                <div>
                  <dt className="text-stone-500">Address</dt>
                  <dd className="whitespace-pre-line">{w.address}</dd>
                </div>
              )}
              {w.established_year && (
                <div>
                  <dt className="text-stone-500">Established</dt>
                  <dd>{w.established_year}</dd>
                </div>
              )}
            </dl>
          </aside>
        </div>

        <div className="mt-16 rounded-lg border border-stone-900 bg-stone-900 p-8 text-stone-100">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Award statement</p>
          <p className="mt-3 font-serif text-2xl leading-snug">
            {w.business_name} is the {w.year} Service Excellence Award winner for{" "}
            <span className="italic text-[var(--gold)]">Best {w.category.name}</span> in {w.city.name}, {w.city.province}.
          </p>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
