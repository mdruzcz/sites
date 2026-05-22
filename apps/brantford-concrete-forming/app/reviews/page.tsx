import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { getTestimonials } from "@/lib/content";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Customer Reviews — Brantford Concrete Forming",
  description:
    "Read 5-star reviews from homeowners across Brantford and Brant County who chose Brantford Concrete Forming for their driveways, patios, and stamped concrete projects.",
  openGraph: {
    title: "Customer Reviews | Brantford Concrete Forming",
    description: "5-star reviews from satisfied homeowners across Brantford and Brant County.",
    images: [{ url: "/images/Concrete-Patio-Installation.jpg", alt: "Completed concrete patio project in Brantford, ON" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ReviewsPage() {
  const testimonials = getTestimonials();
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Reviews", url: `${site.url}/reviews` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Reviews</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Customer Reviews</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Don&apos;t just take our word for it. Here&apos;s what our customers say about our concrete work.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((t) => (
              <div key={t.author} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#E8751A" className="w-5 h-5" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 italic text-lg">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8751A]/10 flex items-center justify-center text-[#E8751A] font-bold text-lg">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2332]">{t.author}</p>
                    <p className="text-slate-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1a2332] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3">Had a Great Experience?</h2>
            <p className="text-slate-300 mb-6">We&apos;d love to hear from you. Leave us a review and help other homeowners in Brantford make confident decisions.</p>
            <Link href="/contact" className="btn btn-primary text-base">Contact Us</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
