import Link from 'next/link';
import { site } from '@/lib/content';

export default function FloatingCTA() {
  return (
    <a
      href={`tel:${site.phone}`}
      className="fixed bottom-6 right-6 z-50 md:hidden accent-btn rounded-full px-5 py-3 font-semibold shadow-lg flex items-center gap-2 min-h-[44px]"
      aria-label={`Call ${site.name} now`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
      </svg>
      Call Now
    </a>
  );
}
