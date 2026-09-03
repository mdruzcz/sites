import { Icon, type IconName } from './icons';

const map: Record<string, IconName> = {
  'permanent-christmas-lighting': 'sparkles',
  'permanent-accent-lighting': 'home',
  'holiday-colour-themes': 'palette',
  'commercial-permanent-lighting': 'building',
  'soffit-roofline-track-lighting': 'ruler',
  'repairs-maintenance': 'wrench',
};

export function ServiceIcon({ slug, size = 22, className = '' }: { slug: string; size?: number; className?: string }) {
  const name = map[slug] ?? 'sparkles';
  const Cmp = Icon[name];
  return <Cmp size={size} className={className} />;
}
