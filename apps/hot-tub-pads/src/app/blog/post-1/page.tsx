import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { blogPosts, site } from "@/lib/site";

export const revalidate = 3600;

const post = blogPosts.find((p) => p.slug === "post-1")!;

export const metadata: Metadata = {
  title: post.metaTitle,
  description: post.metaDescription,
  openGraph: {
    title: post.metaTitle,
    description: post.metaDescription,
    url: `${site.url}/blog/post-1`,
    type: "article",
    images: [
      {
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.metaTitle,
    description: post.metaDescription,
    images: [post.image],
  },
};

/* ─── JSON-LD ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.metaDescription,
  image: `${site.url}${post.image}`,
  url: `${site.url}/blog/post-1`,
  datePublished: "2025-06-01",
  dateModified: "2025-06-01",
  author: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/images/hot-tub-pad-sq.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${site.url}/blog/post-1`,
  },
};

/* ─── Related Posts ─── */

const relatedPosts = blogPosts.filter(
  (p) => p.slug === "post-2" || p.slug === "post-3"
);

/* ─── Page Component ─── */

export default function Post1Page() {
  return (
    <>
      <NavBar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════ Page Hero ═══════════════ */}
      <section className="bg-navy pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange">
            Blog
          </p>
          <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* ═══════════════ Featured Image ═══════════════ */}
      <div className="mx-auto -mt-6 max-w-4xl px-4 lg:px-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </div>

      {/* ═══════════════ Article Body ═══════════════ */}
      <article className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <p className="mb-8 text-lg leading-relaxed text-slate-muted">
            Installing a hot tub is a big investment, and the foundation you
            place it on is just as important as the hot tub itself. A poorly
            installed pad can lead to shifting, cracking, drainage problems,
            and even damage to your spa. Here are the five most common
            mistakes homeowners make when installing a hot tub pad &mdash;
            and how to avoid each one.
          </p>

          {/* ───── Mistake 1 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            1. Not Excavating and Leveling the Ground Properly
          </h2>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Mistake</h3>
          <p className="mb-4 leading-relaxed text-slate-muted">
            Many homeowners skip proper excavation and assume they can pour
            concrete or lay gravel directly on top of uneven ground. This
            leads to an uneven pad that causes the hot tub to shift, rock,
            or put uneven stress on the shell &mdash; potentially voiding
            the manufacturer&apos;s warranty.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Fix</h3>
          <ul className="mb-4 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Excavate the entire area to a consistent depth, removing all
                topsoil and organic material
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Use a laser level or string level to verify the grade is
                perfectly flat across the pad area
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Compact the soil with a plate compactor before adding any
                base material
              </span>
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-navy">
            Why It Matters
          </h3>
          <p className="mb-2 leading-relaxed text-slate-muted">
            A level foundation distributes the full weight of your hot tub
            evenly &mdash; typically 2,000 to 5,000 pounds when filled with
            water and occupants. An uneven base concentrates stress on
            specific points, leading to cracking, shell damage, and
            potential safety hazards.
          </p>

          {/* ───── Mistake 2 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            2. Choosing the Wrong Type of Base
          </h2>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Mistake</h3>
          <p className="mb-4 leading-relaxed text-slate-muted">
            Not all foundations are created equal. Some homeowners place
            their hot tub on patio stones, wooden pallets, or bare dirt,
            thinking any flat surface will do. These surfaces shift, rot, or
            sink over time, creating serious stability problems.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Fix</h3>
          <ul className="mb-4 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Concrete pads</strong> are the best choice for
                permanent installations &mdash; strong, stable, and
                long-lasting
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Compacted gravel pads</strong> are a
                budget-friendly alternative with excellent drainage for
                lighter hot tubs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Reinforced decking</strong> can work if
                engineered to handle the weight &mdash; consult a
                structural professional first
              </span>
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-navy">
            Why It Matters
          </h3>
          <p className="mb-2 leading-relaxed text-slate-muted">
            The wrong base material will shift, settle unevenly, or
            deteriorate. This leads to voided warranties, cracked hot tub
            shells, and expensive repairs. Choosing the right foundation
            from the start saves thousands in the long run.
          </p>

          {/* ───── Mistake 3 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            3. Using Too Thin or Weak Concrete
          </h2>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Mistake</h3>
          <p className="mb-4 leading-relaxed text-slate-muted">
            Some contractors or DIYers pour concrete pads that are only 2-3
            inches thick or use low-strength concrete mixes. This creates a
            pad that cracks under the weight of a filled hot tub,
            especially during Ontario&apos;s freeze-thaw cycles.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Fix</h3>
          <ul className="mb-4 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Pour at least 4&ndash;6 inches of concrete for standard hot
                tubs, thicker for swim spas
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Use 3,500+ PSI (32 MPA) concrete for maximum strength and
                durability
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Reinforce with rebar or wire mesh to prevent cracking and
                improve structural integrity
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Apply a broom finish for a non-slip surface around the spa
              </span>
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-navy">
            Why It Matters
          </h3>
          <p className="mb-2 leading-relaxed text-slate-muted">
            Thin or weak concrete will crack, chip, and crumble under the
            constant weight and moisture exposure. Replacing a failed pad
            means moving your hot tub, demolishing the old slab, and
            starting over &mdash; a costly and avoidable headache.
          </p>

          {/* ───── Mistake 4 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            4. Ignoring Drainage &amp; Water Runoff
          </h2>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Mistake</h3>
          <p className="mb-4 leading-relaxed text-slate-muted">
            Water from rain, snow melt, and hot tub splashing needs
            somewhere to go. Many homeowners install their pad in a low
            spot or fail to plan for drainage, leading to standing water
            around the base &mdash; which erodes soil, creates ice hazards,
            and promotes mold growth.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Fix</h3>
          <ul className="mb-4 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Build a slight slope of &#8539; inch per foot away from the
                pad and any structures
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Install a French drain or channel drain around the pad
                perimeter if the yard has poor natural drainage
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Avoid placing the pad in the lowest area of the yard where
                water naturally collects
              </span>
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-navy">
            Why It Matters
          </h3>
          <p className="mb-2 leading-relaxed text-slate-muted">
            Standing water undermines the gravel base beneath your pad,
            causes frost heaving in winter, and creates a slippery safety
            hazard. Proper drainage keeps your foundation intact and your
            spa area safe year-round.
          </p>

          {/* ───── Mistake 5 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            5. Not Planning for Electrical &amp; Accessibility Needs
          </h2>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Mistake</h3>
          <p className="mb-4 leading-relaxed text-slate-muted">
            Homeowners often install their pad without considering where
            the electrical connection will come from or whether there is
            enough space around the hot tub for maintenance access. This
            leads to extension cords draped across the yard, undersized
            circuits, and an inability to service the spa without moving
            it.
          </p>

          <h3 className="mb-2 text-lg font-semibold text-navy">The Fix</h3>
          <ul className="mb-4 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Plan for a dedicated 220V GFCI breaker and have conduit
                run to the pad location before the pour
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Work with a licensed electrician to ensure wiring meets
                local code &mdash; never use extension cords for a hot tub
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Leave at least 24 inches of clearance on the service side
                of the hot tub for pump access, filter changes, and
                maintenance
              </span>
            </li>
          </ul>

          <h3 className="mb-2 text-lg font-semibold text-navy">
            Why It Matters
          </h3>
          <p className="mb-2 leading-relaxed text-slate-muted">
            Improper electrical setup is a serious safety risk &mdash;
            tripped breakers, electrocution hazards, and code violations.
            And a pad that&apos;s too tight to the fence or house wall
            means technicians can&apos;t access components, turning simple
            maintenance into a major project.
          </p>

          {/* ───── CTA ───── */}
          <hr className="my-10 border-orange/30" />

          <div className="rounded-2xl bg-light-bg p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-bold text-navy">
              Ready for a Professionally Installed Hot Tub Pad?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-muted">
              Skip the DIY guesswork and let our experienced team handle your
              hot tub pad installation the right way. We handle excavation,
              leveling, drainage, and the pour &mdash; typically completed in
              just two days.
            </p>
            <Link
              href="/contact-us"
              className="inline-block rounded-lg bg-orange px-8 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-orange/90"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </article>

      {/* ═══════════════ Related Posts ═══════════════ */}
      <section className="bg-light-bg py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-8 font-display text-2xl font-bold text-navy">
            Related Posts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={rp.image}
                    alt={rp.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-navy transition-colors group-hover:text-orange">
                    {rp.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <Footer />
      <QuoteFab />
    </>
  );
}
