// Owner-support guides (getting started, app, troubleshooting, care).
// Same JSON shape as the resource articles so they share ArticleBody.
import type { ArticleBlock } from '@/components/ArticleBody';
import gettingStarted from '@/content/support/getting-started.json';
import usingTheApp from '@/content/support/using-the-app.json';
import troubleshooting from '@/content/support/troubleshooting.json';
import careAndMaintenance from '@/content/support/care-and-maintenance.json';

export interface SupportGuide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  icon: 'book' | 'smartphone' | 'wrench' | 'leaf' | 'shield' | 'video' | 'file';
  excerpt: string;
  readMinutes: number;
  updated: string;
  keyTakeaways: string[];
  body: ArticleBlock[];
  faq: { q: string; a: string }[];
  /** Optional PDF in /public/downloads */
  download?: { href: string; label: string };
}

export const supportGuides: SupportGuide[] = [gettingStarted, usingTheApp, troubleshooting, careAndMaintenance] as SupportGuide[];

export function getSupportGuide(slug: string): SupportGuide | null {
  return supportGuides.find(g => g.slug === slug) ?? null;
}

/** Planned installation / how-to videos. `url` is null until the video exists. */
export interface SupportVideo {
  slug: string;
  title: string;
  description: string;
  length: string;
  photoKey: string;
  url: string | null;
}

export const supportVideos: SupportVideo[] = [
  { slug: 'what-to-expect-install-day', title: 'What to expect on install day', description: 'A walkthrough of a typical one-day residential installation, from the lift arriving to the final zone test.', length: '≈ 4 min', photoKey: 'technician', url: null },
  { slug: 'how-the-track-mounts', title: 'How the track mounts to your soffit', description: 'Where the channel sits, how it is fastened to wood, aluminum and vinyl soffit, and how the wiring is hidden.', length: '≈ 3 min', photoKey: 'track-closeup', url: null },
  { slug: 'controller-and-power', title: 'The controller, transformer and power supply', description: 'What each box does, where they are mounted, and how the system connects to a GFCI outlet.', length: '≈ 3 min', photoKey: 'puck-closeup', url: null },
  { slug: 'app-setup-first-scene', title: 'App setup: your first scene in 5 minutes', description: 'Connecting to the controller, picking a colour, saving a scene and switching it from anywhere.', length: '≈ 5 min', photoKey: 'bungalow-warm', url: null },
  { slug: 'schedules-and-timers', title: 'Schedules and dusk-to-dawn timers', description: 'Setting a nightly warm-white schedule and pre-loading holiday scenes for the whole year.', length: '≈ 4 min', photoKey: 'bungalow-rainbow', url: null },
  { slug: 'holiday-presets', title: 'Holiday presets and colour themes', description: 'Christmas, Halloween, Canada Day and custom themes, plus how to build your own effects.', length: '≈ 4 min', photoKey: 'red-white-night', url: null },
  { slug: 'winter-care', title: 'Winter care and what to do after an ice storm', description: 'Why you never need to clear the track, and the only two things to check after severe weather.', length: '≈ 2 min', photoKey: 'hero-winter', url: null },
  { slug: 'wifi-troubleshooting', title: 'Reconnecting the controller after a Wi-Fi change', description: 'New router or new password? Re-pair the controller in a couple of minutes.', length: '≈ 3 min', photoKey: 'daytime-grey', url: null },
];

/** Downloads shown on /support/manuals. `href` null = coming soon. */
export interface SupportDownload {
  title: string;
  description: string;
  kind: 'guide' | 'manual' | 'spec' | 'warranty';
  href: string | null;
  size?: string;
}

export const supportDownloads: SupportDownload[] = [
  { title: "Owner's Quick Start Guide", description: 'Your system at a glance: what was installed, how to control it, schedules, seasonal care and who to call.', kind: 'guide', href: '/downloads/forever-lights-owners-quick-start-guide.pdf', size: 'PDF' },
  { title: 'Warranty Terms', description: 'Full 5-year parts / 1-year labour warranty terms, coverage, exclusions and how to make a claim.', kind: 'warranty', href: '/downloads/forever-lights-warranty-terms.pdf', size: 'PDF' },
  { title: 'Care & Maintenance Checklist', description: 'A one-page seasonal checklist for the controller, power supply, track and app.', kind: 'guide', href: '/downloads/forever-lights-care-and-maintenance-checklist.pdf', size: 'PDF' },
  { title: 'Controller & App Manual', description: 'Full manual for the Wi-Fi controller and mobile app: pairing, zones, effects, firmware updates.', kind: 'manual', href: null },
  { title: 'Track & LED Technical Spec Sheet', description: 'Channel dimensions, LED specifications, IP rating, operating temperature and electrical draw.', kind: 'spec', href: null },
  { title: 'Commercial Installation Guide', description: 'Multi-building control, brand colour presets and scheduling for plazas, offices and storefronts.', kind: 'manual', href: null },
];
