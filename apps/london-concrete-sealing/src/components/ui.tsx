import Link from 'next/link';
import Image from 'next/image';
import type { Service, Testimonial } from '@/lib/content';
import { site } from '@/lib/content';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider">
      <span className="h-px w-6 bg-accent" />
      {children}
    </span>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.urlPath}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.name} - concrete services in London, Ontario`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 grid place-items-center w-11 h-11 rounded-xl bg-white/95 text-xl shadow">
          {service.icon}
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold text-ink mb-2">{service.name}</h3>
        <p className="text-slate-muted text-sm leading-relaxed flex-1">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-accent font-semibold text-sm">
          Learn More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col rounded-2xl bg-white border border-slate-200 p-6 shadow-sm h-full">
      <Stars count={t.rating} />
      <blockquote className="mt-4 text-slate-700 leading-relaxed flex-1">"{t.text}"</blockquote>
      <figcaption className="mt-5 pt-4 border-t border-slate-100">
        <div className="font-semibold text-ink">{t.name}</div>
        <div className="text-sm text-slate-muted">{t.location}</div>
      </figcaption>
    </figure>
  );
}

export function CtaBand({
  heading = 'Ready to Protect Your Concrete?',
  sub = 'Get in touch today for a free quote and elevate your property with our concrete sealing expertise.',
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deep dot-grid">
      <div className="container-x py-16 sm:py-20 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto">{heading}</h2>
        <p className="mt-4 text-slate-300 max-w-xl mx-auto">{sub}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact-us" className="accent-btn px-8 py-4 rounded-xl font-semibold text-lg">
            Get A Free Quote
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="px-8 py-4 rounded-xl font-semibold text-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="shrink-0 mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-accent text-white">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span className="text-slate-700 leading-relaxed">{children}</span>
    </li>
  );
}
