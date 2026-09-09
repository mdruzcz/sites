import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/server";
import type { WinnerWithRefs } from "@/lib/types";
import { CURRENT_YEAR } from "@/lib/types";
import { WinnerThumb, WinnerLogo, StarRating } from "@/components/winner-media";
import { AwardSeal } from "@/components/award-seal";
import { getProfile, getCategoryGuide, getGuide, mapsSearchUrl } from "@/lib/content";
import { Bullets, FaqList, FaqJsonLd, linkify } from "@/components/editorial";

export const revalidate = 300;

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
  const p = getProfile(w.slug);
  const title = p?.metaTitle ?? `${w.business_name}: Best ${w.category.name} in ${w.city.name}`;
  const desc = p?.metaDescription ?? w.tagline ?? w.description ?? `${w.business_name} is the ${w.year} Service Excellence Award winner for ${w.category.name} in ${w.city.name}, ${w.city.province}.`;
  const url = `/winners/${w.city.slug}/${w.category.slug}/${w.slug}`;
  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, type: "profile", url, images: w.photo_url ? [{ url: w.photo_url }] : undefined },
    twitter: { card: "summary_large_image", title, description: desc },
  };
}

export default async function WinnerProfilePage({ params }: { params: Params }) {
  const { city, category, winner } = await params;
  const w = await loadWinner(winner);
  if (!w || w.city.slug !== city || w.category.slug !== category) notFound();

  const profile = getProfile(w.slug);
  const catGuide = getCategoryGuide(w.category.slug);
  const relatedGuides = (catGuide?.relatedGuides ?? []).map(getGuide).filter((g): g is NonNullable<typeof g> => !!g).slice(0, 3);
  const reviews = Array.isArray(w.reviews) ? w.reviews : [];
  const gallery = Array.isArray(w.gallery) ? w.gallery : [];
  const photos = [w.photo_url, ...gallery].filter((x): x is string => !!x);
  const avgRating = reviews.length ? Math.round((reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length) * 10) / 10 : null;
  const mapsUrl = profile?.googleBusinessProfileUrl ?? mapsSearchUrl(profile?.googleMapsQuery ?? `${w.business_name} ${w.city.name} ON`);

  // Other winners in the same category, for comparison shopping.
  const supabase = await getServerSupabase();
  const { data: peersData } = await supabase
    .from("sea_winners")
    .select("business_name, slug, tagline, photo_url, logo_url, city:sea_cities(name, slug), category:sea_categories(slug)")
    .eq("category_id", w.category_id)
    .eq("year", CURRENT_YEAR)
    .eq("is_published", true)
    .neq("id", w.id)
    .limit(4);
  const peers = (peersData ?? []) as unknown as { business_name: string; slug: string; tagline: string | null; photo_url: string | null; logo_url: string | null; city: { name: string; slug: string }; category: { slug: string } }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: w.business_name,
    description: profile?.summary ?? w.description ?? w.tagline ?? undefined,
    url: w.website ?? undefined,
    image: photos.length ? photos : w.logo_url ?? undefined,
    logo: w.logo_url ?? undefined,
    telephone: w.phone ?? undefined,
    email: w.email ?? undefined,
    address: { "@type": "PostalAddress", streetAddress: w.address ?? undefined, addressLocality: w.city.name, addressRegion: w.city.province, addressCountry: "CA" },
    areaServed: w.service_areas.length ? w.service_areas : [w.city.name],
    knowsAbout: w.services.length ? w.services : [w.category.name],
    foundingDate: w.established_year ? String(w.established_year) : undefined,
    hasMap: mapsUrl,
    award: `${w.year} Service Excellence Award, Best ${w.category.name} in ${w.city.name}`,
    ...(avgRating && reviews.length
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating, reviewCount: reviews.length, bestRating: 5 },
          review: reviews.map((r) => ({ "@type": "Review", author: { "@type": "Person", name: r.author }, reviewRating: { "@type": "Rating", ratingValue: r.rating || 5, bestRating: 5 }, reviewBody: r.text })),
        }
      : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Winners", item: "/winners" },
      { "@type": "ListItem", position: 2, name: w.city.name, item: `/winners/${w.city.slug}` },
      { "@type": "ListItem", position: 3, name: w.category.name, item: `/winners/${w.city.slug}/${w.category.slug}` },
      { "@type": "ListItem", position: 4, name: w.business_name },
    ],
  };

  return (
    <>
      <article className="mx-auto w-full max-w-6xl px-6 pt-10 pb-16">
        <nav className="text-xs uppercase tracking-[0.22em] text-stone-500" aria-label="Breadcrumb">
          <Link href="/winners" className="hover:text-[var(--gold)]">Winners</Link><span className="mx-2">/</span>
          <Link href={`/winners/${w.city.slug}`} className="hover:text-[var(--gold)]">{w.city.name}</Link><span className="mx-2">/</span>
          <Link href={`/winners/${w.city.slug}/${w.category.slug}`} className="hover:text-[var(--gold)]">{w.category.name}</Link>
        </nav>

        <header className="mt-6 grid gap-8 border-b border-stone-200 pb-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <div className="flex items-center gap-4">
              <WinnerLogo name={w.business_name} logoUrl={w.logo_url} size="h-16 w-16" className="border border-stone-200 bg-white p-1.5" />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
                <span>★ {w.year} Winner</span>
                <span className="text-stone-400">Best {w.category.name}</span>
                <span className="text-stone-400">{w.city.name}, {w.city.province}</span>
              </div>
            </div>
            <h1 className="mt-4 font-serif text-5xl tracking-tight md:text-6xl">{w.business_name}</h1>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-stone-700">{profile?.summary ?? w.tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
              {avgRating && (<span className="flex items-center gap-2"><StarRating rating={Math.round(avgRating)} />{avgRating.toFixed(1)} · {reviews.length} {reviews.length === 1 ? "review" : "reviews"} on file</span>)}
              {w.established_year && <span>Established {w.established_year}</span>}
              {w.service_areas.length > 0 && <span>Serves {w.service_areas.slice(0, 3).join(", ")}{w.service_areas.length > 3 ? ` +${w.service_areas.length - 3}` : ""}</span>}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {w.website && <a href={w.website} target="_blank" rel="noopener" className="inline-flex h-11 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700">Visit website →</a>}
              {w.phone && <a href={`tel:${w.phone.replace(/[^0-9+]/g, "")}`} className="inline-flex h-11 items-center rounded-full border border-stone-300 px-5 text-sm font-medium text-stone-900 hover:border-stone-900">Call {w.phone}</a>}
              <a href={mapsUrl} target="_blank" rel="noopener nofollow" className="inline-flex h-11 items-center gap-2 rounded-full border border-stone-300 px-5 text-sm font-medium text-stone-900 hover:border-stone-900">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
                {profile?.googleBusinessProfileUrl ? "Google Business Profile" : "Find on Google Maps"}
              </a>
            </div>
          </div>
          <AwardSeal year={w.year} size={128} className="hidden shrink-0 lg:block" />
        </header>

        {/* Photo gallery */}
        {photos.length > 0 && (
          <section className="mt-10" aria-label="Photos">
            <div className={`grid gap-3 ${photos.length >= 3 ? "md:grid-cols-[2fr_1fr]" : "md:grid-cols-2"}`}>
              <WinnerThumb name={w.business_name} photoUrl={photos[0]} categorySlug={w.category.slug} aspect="aspect-[16/10] md:aspect-auto md:h-full" className="rounded-lg" />
              {photos.length > 1 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
                  {photos.slice(1, 3).map((g, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={g} src={g} alt={`${w.business_name} ${w.category.name.toLowerCase()} project ${i + 2} in ${w.city.name}, ${w.city.province}`} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
                  ))}
                </div>
              )}
            </div>
            {photos.length > 3 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {photos.slice(3, 6).map((g, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={g} src={g} alt={`${w.business_name} ${w.category.name.toLowerCase()} project ${i + 4} in ${w.city.name}, ${w.city.province}`} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
                ))}
              </div>
            )}
          </section>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            {/* Strengths / considerations */}
            {profile && (
              <section className="grid gap-6 md:grid-cols-2" aria-label="Strengths and considerations">
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-6">
                  <h2 className="text-xs uppercase tracking-[0.22em] text-emerald-800">Strengths</h2>
                  <Bullets items={profile.strengths} tone="plus" />
                </div>
                <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-6">
                  <h2 className="text-xs uppercase tracking-[0.22em] text-amber-800">Considerations</h2>
                  <Bullets items={profile.considerations} tone="minus" />
                </div>
              </section>
            )}

            {profile?.bestFor?.length ? (
              <section className="mt-8">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Best for</h2>
                <ul className="mt-3 flex flex-wrap gap-2">{profile.bestFor.map((b) => <li key={b} className="rounded-full bg-[var(--gold-soft)] px-3 py-1 text-sm text-stone-800">{b}</li>)}</ul>
              </section>
            ) : null}

            {/* Editorial */}
            <section className="mt-10">
              {(profile?.editorial ?? [{ heading: "About", text: w.description ?? "" }]).map((s) => (
                <div key={s.heading} className="mt-8 first:mt-0">
                  <h2 className="font-serif text-2xl tracking-tight text-stone-900">{s.heading}</h2>
                  <p className="mt-3 whitespace-pre-line leading-relaxed text-stone-700">{linkify(s.text)}</p>
                </div>
              ))}
            </section>

            {w.services.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Services</h2>
                <ul className="mt-3 flex flex-wrap gap-2">{w.services.map((s) => <li key={s} className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-700">{s}</li>)}</ul>
              </section>
            )}

            {reviews.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">What customers say</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {reviews.map((r, i) => (
                    <figure key={i} className="rounded-lg border border-stone-200 bg-stone-50/60 p-5">
                      <StarRating rating={r.rating || 5} />
                      <blockquote className="mt-2 text-stone-700">“{r.text}”</blockquote>
                      <figcaption className="mt-2 text-sm text-stone-500">— {r.author}{r.location ? `, ${r.location}` : ""}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {profile?.questionsToAsk?.length ? (
              <section className="mt-10 rounded-lg border border-stone-200 p-6">
                <h2 className="font-serif text-2xl tracking-tight">Questions to ask before you hire</h2>
                <p className="mt-2 text-sm text-stone-600">Tailored to what this business does. Bring them to the site visit.</p>
                <ol className="mt-4 space-y-3">{profile.questionsToAsk.map((q, i) => <li key={i} className="flex gap-3 text-stone-800"><span className="font-serif text-[var(--gold)]">{i + 1}.</span>{q}</li>)}</ol>
              </section>
            ) : null}

            {profile && <FaqList faqs={profile.faq} title="About this award and business" />}

            {w.service_areas.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Service area</h2>
                <p className="mt-3 text-stone-700">{w.service_areas.join(", ")}</p>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-stone-200 bg-stone-50/60 p-6">
              <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Contact</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {w.phone && <div><dt className="text-stone-500">Phone</dt><dd><a href={`tel:${w.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[var(--gold)]">{w.phone}</a></dd></div>}
                {w.email && <div><dt className="text-stone-500">Email</dt><dd><a href={`mailto:${w.email}`} className="break-all hover:text-[var(--gold)]">{w.email}</a></dd></div>}
                {w.website && <div><dt className="text-stone-500">Website</dt><dd><a href={w.website} target="_blank" rel="noopener" className="break-all hover:text-[var(--gold)]">{w.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a></dd></div>}
                <div><dt className="text-stone-500">Google Maps</dt><dd><a href={mapsUrl} target="_blank" rel="noopener nofollow" className="hover:text-[var(--gold)]">{profile?.googleBusinessProfileUrl ? "View Business Profile" : `Search "${w.business_name}"`}</a></dd></div>
                {w.address && <div><dt className="text-stone-500">Address</dt><dd className="whitespace-pre-line">{w.address}</dd></div>}
              </dl>
              {w.website && <a href={w.website} target="_blank" rel="noopener" className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700">Visit website →</a>}
              <p className="mt-4 text-xs leading-relaxed text-stone-500">Contact details are verified at the time of the award. Check reviews on Google before you hire; our guide on /resources/how-to-check-reviews-and-references explains what to look for.</p>
            </div>

            {catGuide && (
              <div className="rounded-lg border border-stone-200 p-6">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Hiring a {w.category.name.toLowerCase()} contractor</h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{catGuide.typicalCostNotes}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-stone-700">{catGuide.redFlags.slice(0, 3).map((r) => <li key={r} className="flex gap-2"><span className="text-amber-700">!</span>{r}</li>)}</ul>
                <Link href={`/winners/${w.city.slug}/${w.category.slug}`} className="mt-4 inline-block text-sm font-medium text-[var(--gold)] hover:underline">Full {w.category.name.toLowerCase()} buyer&apos;s guide →</Link>
              </div>
            )}

            {relatedGuides.length > 0 && (
              <div className="rounded-lg border border-stone-200 p-6">
                <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Homeowner guides</h2>
                <ul className="mt-3 space-y-3">{relatedGuides.map((g) => <li key={g.slug}><Link href={`/resources/${g.slug}`} className="font-medium text-stone-900 hover:text-[var(--gold)]">{g.h1}</Link><p className="text-xs text-stone-500">{g.readMinutes} min read</p></li>)}</ul>
              </div>
            )}
          </aside>
        </div>

        {peers.length > 0 && (
          <section className="mt-16 border-t border-stone-200 pt-10">
            <h2 className="text-xs uppercase tracking-[0.22em] text-stone-500">Other {CURRENT_YEAR} winners for {w.category.name}</h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {peers.map((p) => (
                <li key={p.slug}>
                  <Link href={`/winners/${p.city.slug}/${p.category.slug}/${p.slug}`} className="group block overflow-hidden rounded-lg border border-stone-200 hover:border-[var(--gold)]">
                    <WinnerThumb name={p.business_name} photoUrl={p.photo_url} categorySlug={w.category.slug} aspect="aspect-[4/3]" />
                    <div className="p-4"><p className="font-serif text-lg leading-tight group-hover:text-[var(--gold)]">{p.business_name}</p><p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500">{p.city.name}</p></div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16 flex flex-col items-start gap-6 rounded-lg bg-stone-900 p-8 text-stone-100 md:flex-row md:items-center">
          <AwardSeal year={w.year} size={96} className="shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Award statement</p>
            <p className="mt-3 font-serif text-2xl leading-snug">{w.business_name} is the {w.year} Service Excellence Award winner for <span className="italic text-[var(--gold)]">Best {w.category.name}</span> in {w.city.name}, {w.city.province}.</p>
            <p className="mt-3 text-sm text-stone-400">Selected by editorial review. No fee was charged to be considered or listed. <Link href="/about#methodology" className="underline hover:text-white">How winners are chosen</Link>.</p>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {profile && <FaqJsonLd faqs={profile.faq} />}
    </>
  );
}
