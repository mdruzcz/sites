import { Sparkles, Lightbulb, Tent, Flame, Zap, Trees, Building2, Star, TreePine, type LucideIcon } from "lucide-react";

const map: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  tent: Tent,
  flame: Flame,
  zap: Zap,
  trees: Trees,
  building: Building2,
  star: Star,
  wreath: TreePine,
};

export function ServiceIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const Icon = map[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
