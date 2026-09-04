import Link from 'next/link';
import { site, serviceAreas, services, phoneHref } from '@/lib/site';
import { AwardBadge } from '@/components/award-badge';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/icons';

const isRealSocial = (url?: string) => !!url && !/^https?:\/\/(www\.)?(facebook|youtube|instagram)\.com\/?$/i.test(url);

export function Footer() {
  const featuredAreas = serviceAreas.slice(0, 8);
  return (
    <footer className="bg-dark text-white">
      <div className="wrap pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="white" tagline height={64} />
            <p className="mt-6 text-white/70 text-[15px] leading-relaxed max-w-sm">
              Permanent LED roofline lighting for homes and businesses across London, Ontario and {site.region}.
              Installed once. Enjoyed every night, every holiday, forever.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-[15px]">
              <a href={phoneHref} className="inline-flex items-center gap-3 font-semibold hover:text-accent transition-colors min-h-[44px]">
                <Icon.phone size={18} className="text-accent" /> {site.phone}
              </a>
              <Link href="/contact" className="inline-flex items-center gap-3 text-white/80 hover:text-accent transition-colors min-h-[44px]">
                <Icon.mail size={18} className="text-accent" /> Send us a message
              </Link>
              <span className="inline-flex items-center gap-3 text-white/60">
                <Icon.clock size={18} className="text-accent" /> {site.hours}
              </span>
            </div>
            {(isRealSocial(site.social?.facebook) || isRealSocial(site.social?.youtube)) && (
              <div className="mt-5 flex gap-3">
                {isRealSocial(site.social?.facebook) && (
                  <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-ink flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                  </a>
                )}
                {isRealSocial(site.social?.youtube) && (
                  <a href={site.social.youtube} target="_blank" rel="noopener" aria-label="YouTube" className="w-11 h-11 rounded-full bg-white/10 hover:bg-accent hover:text-ink flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterCol title="Services" links={services.map(s => ({ href: `/services/${s.slug}`, label: s.shortTitle }))} />
            <FooterCol
              title="Plan & Learn"
              links={[
                { href: '/cost-estimator', label: 'Cost Estimator' },
                { href: '/financing', label: 'Financing' },
                { href: '/resources', label: 'Guides & Articles' },
                { href: '/faq', label: 'FAQ' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/become-a-dealer', label: 'Become a Dealer' },
              ]}
            />
            <FooterCol
              title="Owner Support"
              links={[
                { href: '/support', label: 'Support Hub' },
                { href: '/support/getting-started', label: 'Getting Started' },
                { href: '/support/installation-videos', label: 'Installation Videos' },
                { href: '/support/manuals', label: 'Manuals & Downloads' },
                { href: '/support/troubleshooting', label: 'Troubleshooting' },
                { href: '/warranty', label: 'Warranty' },
              ]}
            />
            <FooterCol
              title="Service Areas"
              links={[...featuredAreas.map(a => ({ href: `/locations/${a.slug}`, label: `${a.city}, ON` })), { href: '/locations', label: 'All areas →' }]}
            />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <AwardBadge />
          <div className="flex flex-col md:items-end gap-2 text-xs text-white/50 text-center md:text-right">
            <div className="flex gap-5">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/become-a-dealer" className="hover:text-white transition-colors">Dealers</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            </div>
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved. London, Ontario, Canada.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(l => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[15px] text-white/80 hover:text-accent transition-colors inline-flex min-h-[32px] items-center">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
