import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import NavBar from "@/components/NavBar";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import QuoteFab from "@/components/QuoteFab";
import { blogPosts, site } from "@/lib/site";

export const revalidate = 3600;

const post = blogPosts.find((p) => p.slug === "hot-tub-pad-installation-checklist")!;
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

export default function ChecklistPostPage() {
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
            Getting a hot tub pad installed is an exciting step toward
            enjoying your backyard spa. But a little preparation before your
            contractor arrives can make the entire process faster, smoother,
            and stress-free. Use this checklist to make sure you&apos;re
            ready for installation day.
          </p>

          {/* ───── Step 1 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
              1
            </span>
            Choose the Right Hot Tub Pad Type
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            The first decision you&apos;ll need to make is whether a
            concrete or gravel pad is the best fit for your situation. Here
            is a quick comparison to help you decide:
          </p>

          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Concrete pads</strong> are ideal for permanent
                installations, heavy swim spas, and homeowners who want a
                maintenance-free, long-lasting foundation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Gravel pads</strong> are a budget-friendly
                alternative with excellent drainage, best suited for
                lighter hot tubs and properties with drainage concerns
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Not sure which is right for you? Read our detailed{" "}
                <Link
                  href="/blog/concrete-vs-gravel-hot-tub-pads"
                  className="font-semibold text-orange underline underline-offset-2"
                >
                  Concrete vs. Gravel comparison
                </Link>
              </span>
            </li>
          </ul>

          {/* ───── Step 2 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
              2
            </span>
            Pick the Best Location
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            Where you place your hot tub pad affects drainage, electrical
            access, privacy, and convenience. Consider the following when
            choosing your spot:
          </p>

          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Choose a <strong>flat, well-drained</strong> area &mdash;
                avoid the lowest point of the yard where water collects
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Ensure good <strong>natural drainage</strong> away from
                your house foundation and neighbouring properties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Consider <strong>electrical access</strong> &mdash; the
                closer to your electrical panel, the lower the wiring cost
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Think about <strong>privacy</strong> &mdash; fences,
                landscaping, or pergolas can create a more relaxing
                environment
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Keep the pad a <strong>reasonable distance from the
                house</strong> for easy access but far enough to avoid
                moisture issues against the exterior wall
              </span>
            </li>
          </ul>

          {/* ───── Step 3 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
              3
            </span>
            Prepare the Site Before Installation Day
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            A little site prep goes a long way in making the installation
            process smooth and efficient. Here&apos;s what you can do
            before the crew arrives:
          </p>

          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Clear the area</strong> of furniture, planters,
                toys, and debris so the crew has full access to the pad
                location
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Mark the pad size</strong> with stakes or spray
                paint so you can visualize the footprint before
                construction begins
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Check for underground utilities</strong> &mdash;
                call Ontario One Call at{" "}
                <strong>1-800-400-2255</strong> to have gas, water,
                electrical, and telecom lines marked before any digging
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Plan equipment access</strong> &mdash; ensure the
                crew can get a wheelbarrow (or concrete truck, if
                applicable) to the pad location through a gate or side
                yard
              </span>
            </li>
          </ul>

          {/* ───── Step 4 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
              4
            </span>
            Plan for Electrical &amp; Plumbing Needs
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            Most hot tubs require a dedicated electrical connection. Planning
            this ahead of time avoids delays and extra costs after the pad
            is already poured.
          </p>

          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Most hot tubs need a <strong>dedicated 220V GFCI
                breaker</strong> &mdash; confirm the requirements with your
                hot tub dealer
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Have your electrician run <strong>conduit to the pad
                location</strong> before the concrete is poured &mdash;
                this keeps wires hidden and protected
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                Leave at least <strong>24 inches of clearance</strong> on
                the service/pump side of the hot tub for maintenance
                access, filter changes, and repairs
              </span>
            </li>
          </ul>

          {/* ───── Step 5 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
              5
            </span>
            Understand the Installation Timeline
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            Knowing what to expect during installation helps you plan your
            schedule and coordinate with your hot tub delivery. Here&apos;s
            a typical timeline:
          </p>

          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Day 1 &mdash; Excavation &amp; base prep:</strong>{" "}
                The crew removes topsoil, excavates to the proper depth,
                and lays a compacted gravel base
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Day 2 &mdash; Concrete pour or gravel
                fill:</strong> Formwork, reinforcement, and the final pour
                (concrete) or gravel fill and compaction (gravel)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>24&ndash;48 hour cure (concrete only):</strong>{" "}
                Concrete needs time to harden before the hot tub is placed.
                Gravel pads are ready immediately after installation
              </span>
            </li>
          </ul>

          {/* ───── Step 6 ───── */}
          <hr className="my-10 border-orange/30" />

          <h2 className="mb-4 font-display text-2xl font-bold text-navy">
            <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-sm font-bold text-white">
              6
            </span>
            Get Ready for Hot Tub Delivery
          </h2>

          <p className="mb-4 leading-relaxed text-slate-muted">
            Once the pad is installed and cured, it&apos;s time to bring in
            the hot tub. A little planning ensures delivery day goes
            smoothly:
          </p>

          <ul className="mb-6 space-y-2 pl-1">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Confirm the delivery date</strong> with your hot
                tub dealer and make sure the pad has fully cured (if
                concrete)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Plan for crane access</strong> if the hot tub
                cannot be carried through a gate &mdash; many larger spas
                and swim spas require a crane lift over the fence
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-orange">&#10003;</span>
              <span className="text-slate-muted">
                <strong>Verify the pad can handle the weight</strong>{" "}
                &mdash; check the total filled weight (hot tub + water +
                occupants) against the pad&apos;s capacity to ensure
                everything is properly rated
              </span>
            </li>
          </ul>

          {/* ───── CTA ───── */}
          <hr className="my-10 border-orange/30" />

          <div className="rounded-2xl bg-light-bg p-8 text-center">
            <h2 className="mb-3 font-display text-2xl font-bold text-navy">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-muted">
              Now that you know how to prepare, let our team handle the
              rest. We&apos;ll take care of excavation, leveling, drainage,
              and the pour &mdash; typically completed in just two days.
              Contact us for a free, no-obligation quote.
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
