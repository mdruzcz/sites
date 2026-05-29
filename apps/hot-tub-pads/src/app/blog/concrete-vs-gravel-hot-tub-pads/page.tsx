import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { blogPosts, site } from "@/lib/site";

export const revalidate = 3600;

const post = blogPosts.find((p) => p.slug === "concrete-vs-gravel-hot-tub-pads")!;
const postPath = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: { absolute: `${post.metaTitle} | Hot Tub Pads` },
  description: post.metaDescription,
  alternates: { canonical: postPath },
  openGraph: {
    title: post.metaTitle,
    description: post.metaDescription,
    url: `${site.url}${postPath}`,
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
  url: `${site.url}${postPath}`,
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
    "@id": `${site.url}${postPath}`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}${postPath}` },
  ],
};

/* ─── Related Posts ─── */

const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

/* ─── Page Component ─── */

export default function ConcreteVsGravelPostPage() {
  return (
    <>
      <NavBar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            When it comes to building a foundation for your hot tub, the two
            most common options are <strong>concrete</strong> and{" "}
            <strong>gravel</strong>. Both have their advantages, but the
            right choice depends on your budget, the size of your spa, your
            property&apos;s drainage, and how permanent you want the
            installation to be. This guide breaks down the pros, cons, and
            installation process for each option so you can make an informed
            decision.
          </p>

          {/* ───── Section 1: Concrete ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            Concrete Hot Tub Pads
          </h2>

          <p className="mb-6 leading-relaxed text-slate-muted">
            Concrete is the gold standard for hot tub foundations. It
            provides the strongest, most stable, and longest-lasting base
            for your spa &mdash; especially important for heavier swim spas
            and permanent installations.
          </p>

          <h3 className="mb-3 text-lg font-semibold text-navy">Pros</h3>
          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Extremely durable &mdash; lasts decades with minimal
                maintenance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Provides a perfectly level and rigid surface that
                won&apos;t shift or settle
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Handles the heaviest hot tubs and swim spas (5,000+ lbs
                when filled)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Clean, professional look with broom-finish for slip
                resistance
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Can include embedded conduit for electrical hookup
              </span>
            </li>
          </ul>

          <h3 className="mb-3 text-lg font-semibold text-navy">Cons</h3>
          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-slate-muted">&bull;</span>
              <span className="text-slate-muted">
                Higher upfront cost compared to gravel
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-slate-muted">&bull;</span>
              <span className="text-slate-muted">
                Requires 24&ndash;48 hours of curing time before the hot
                tub can be placed
              </span>
            </li>
          </ul>

          <h3 className="mb-3 text-lg font-semibold text-navy">
            Installation Process
          </h3>
          <ol className="mb-6 space-y-3 pl-1">
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                1
              </span>
              <span className="text-slate-muted">
                <strong>Excavation</strong> &mdash; Remove topsoil and
                organic material, excavate to the correct depth (typically
                10&ndash;12 inches total)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                2
              </span>
              <span className="text-slate-muted">
                <strong>Gravel base</strong> &mdash; Lay and compact 4&ndash;6
                inches of crushed gravel for drainage and stability
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                3
              </span>
              <span className="text-slate-muted">
                <strong>Formwork &amp; reinforcement</strong> &mdash; Build
                wooden forms, lay rebar or wire mesh, and run electrical
                conduit
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                4
              </span>
              <span className="text-slate-muted">
                <strong>Pour &amp; finish</strong> &mdash; Pour 4&ndash;6
                inches of 32 MPA concrete, apply a broom finish, and cure
                for 24&ndash;48 hours
              </span>
            </li>
          </ol>

          {/* ───── Section 2: Gravel ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            Gravel Hot Tub Pads
          </h2>

          <p className="mb-6 leading-relaxed text-slate-muted">
            Gravel pads are a popular budget-friendly alternative to
            concrete. They offer excellent drainage, faster installation,
            and lower upfront costs &mdash; making them a solid choice for
            lighter hot tubs and homeowners on a budget.
          </p>

          <h3 className="mb-3 text-lg font-semibold text-navy">Pros</h3>
          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Lower cost than concrete &mdash; great for
                budget-conscious homeowners
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Excellent natural drainage &mdash; water flows through
                instead of pooling
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Faster installation with no curing time required
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Can be relocated or adjusted more easily if needed
              </span>
            </li>
          </ul>

          <h3 className="mb-3 text-lg font-semibold text-navy">Cons</h3>
          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-slate-muted">&bull;</span>
              <span className="text-slate-muted">
                May require occasional re-leveling as gravel settles over
                time
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-slate-muted">&bull;</span>
              <span className="text-slate-muted">
                Not recommended for heavy swim spas or large hot tubs
                exceeding 4,000 lbs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-slate-muted">&bull;</span>
              <span className="text-slate-muted">
                Weeds can grow through without a proper weed barrier
              </span>
            </li>
          </ul>

          <h3 className="mb-3 text-lg font-semibold text-navy">
            Installation Process
          </h3>
          <ol className="mb-6 space-y-3 pl-1">
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                1
              </span>
              <span className="text-slate-muted">
                <strong>Excavation</strong> &mdash; Remove topsoil and dig
                to a depth of 6&ndash;8 inches
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                2
              </span>
              <span className="text-slate-muted">
                <strong>Weed barrier &amp; edging</strong> &mdash; Lay
                landscape fabric and install edging to contain the gravel
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
                3
              </span>
              <span className="text-slate-muted">
                <strong>Fill &amp; compact</strong> &mdash; Add
                high-quality &frac34;-inch crushed gravel in layers, compact
                each layer for a flat, stable surface
              </span>
            </li>
          </ol>

          {/* ───── Comparison Table ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-6 font-display text-2xl font-bold text-navy">
            Side-by-Side Comparison
          </h2>

          <div className="mb-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy/20">
                  <th className="px-4 py-3 font-display font-bold text-navy">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-display font-bold text-navy">
                    Concrete
                  </th>
                  <th className="px-4 py-3 font-display font-bold text-navy">
                    Gravel
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-muted">
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-navy">
                    Durability
                  </td>
                  <td className="px-4 py-3">
                    Excellent &mdash; lasts 25+ years
                  </td>
                  <td className="px-4 py-3">
                    Good &mdash; may need re-leveling
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-light-bg/50">
                  <td className="px-4 py-3 font-semibold text-navy">Cost</td>
                  <td className="px-4 py-3">Higher upfront investment</td>
                  <td className="px-4 py-3">More affordable</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-navy">
                    Installation Time
                  </td>
                  <td className="px-4 py-3">
                    2 days + 24&ndash;48 hr cure
                  </td>
                  <td className="px-4 py-3">1 day, ready immediately</td>
                </tr>
                <tr className="border-b border-gray-100 bg-light-bg/50">
                  <td className="px-4 py-3 font-semibold text-navy">
                    Drainage
                  </td>
                  <td className="px-4 py-3">
                    Requires grading for runoff
                  </td>
                  <td className="px-4 py-3">
                    Excellent natural drainage
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-navy">
                    Stability
                  </td>
                  <td className="px-4 py-3">
                    Superior &mdash; rigid and fixed
                  </td>
                  <td className="px-4 py-3">Good when properly compacted</td>
                </tr>
                <tr className="border-b border-gray-100 bg-light-bg/50">
                  <td className="px-4 py-3 font-semibold text-navy">
                    Maintenance
                  </td>
                  <td className="px-4 py-3">Virtually none</td>
                  <td className="px-4 py-3">
                    Occasional re-leveling &amp; weed control
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-navy">
                    Best For
                  </td>
                  <td className="px-4 py-3">
                    Heavy spas, swim spas, permanent installs
                  </td>
                  <td className="px-4 py-3">
                    Lighter hot tubs, budget builds, temporary setups
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ───── Decision Guide ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            Which Is Right for You?
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            <strong>Choose concrete if:</strong> you want a permanent, set-it-
            and-forget-it foundation. If you own a large or heavy hot tub, a
            swim spa, or you simply want the strongest base possible,
            concrete is the clear winner. The higher upfront cost pays for
            itself in decades of maintenance-free stability.
          </p>

          <p className="mb-4 leading-relaxed text-slate-muted">
            <strong>Choose gravel if:</strong> you&apos;re on a tighter
            budget, have a lighter hot tub, or want the flexibility to
            relocate the pad later. Gravel is also an excellent choice if
            drainage is a major concern on your property, since water flows
            right through the surface.
          </p>

          <p className="mb-8 leading-relaxed text-slate-muted">
            <strong>Not sure?</strong> Our team can assess your property,
            discuss your budget, and recommend the best option for your
            specific situation. We install both concrete and gravel pads and
            will give you an honest recommendation.
          </p>

          {/* ───── CTA ───── */}
          <hr className="my-10 border-orange/30" />

          <div className="rounded-2xl bg-light-bg p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-bold text-navy">
              Need Help Deciding?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-muted">
              Contact us for a free, no-obligation consultation. We&apos;ll
              evaluate your property, discuss your spa requirements, and
              recommend the best pad type for your needs and budget.
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
