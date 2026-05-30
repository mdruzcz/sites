import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us | Free Christmas Light Installation Quote — Classic Christmas Lighting",
  description:
    "Get a free Christmas lighting quote from Classic Christmas Lighting. Serving Kitchener-Waterloo, Guelph, Cambridge, Hamilton & Southern Ontario. Call (226) 476-2038 or fill out our form.",
  openGraph: {
    title: "Get a Free Christmas Lighting Quote — Classic Christmas Lighting",
    description: "Contact us for a free, no-obligation quote. We respond within 1 business day. Serving Kitchener-Waterloo and Southern Ontario.",
    images: [{ url: "/images/Classic-Christmas-Lighting.webp", alt: "Contact Classic Christmas Lighting for a free quote" }],
  },
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
    sub: "Call or text anytime",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: site.emailHref,
    sub: "We reply within 1 business day",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Kitchener-Waterloo Region",
    href: "/service-areas",
    sub: "& Southern Ontario — no travel charges",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 9 AM – 5 PM",
    href: null,
    sub: "Sat: 10 AM – 4 PM · Sun: Closed",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Contact", url: `${site.url}/contact` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-28">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Contact Us</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Get in Touch
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-[1.1] max-w-2xl mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Get Your Free Christmas Lighting Quote
          </h1>
          <p className="text-white/60 text-lg max-w-lg">
            Fill out the form and we&apos;ll get back to you within one business day with a custom quote for your property.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2
                  className="text-2xl font-bold text-[var(--foreground)] mb-6"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Contact Information
                </h2>
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-[var(--accent)]" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors text-sm"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-[var(--foreground)] text-sm">{item.value}</p>
                        )}
                        <p className="text-xs text-[var(--muted)] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/Christmas-LIghting-For-Homes-Kitchener-Waterloo.jpg"
                  alt="Classic Christmas Lighting professional installation in Kitchener-Waterloo Ontario"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="bg-[var(--dark-bg)] rounded-xl p-6 border border-[var(--border-dark)]">
                <h3
                  className="text-white font-bold mb-3"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Book Early for Best Availability
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  November slots fill up very quickly. We recommend booking in September or October to secure your preferred installation date.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <QuoteForm heading="Request Your Free Quote" showPromise />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
