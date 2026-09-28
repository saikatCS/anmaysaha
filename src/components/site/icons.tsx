import {
  Award,
  Badge,
  Building2,
  Hammer,
  HardHat,
  Leaf,
  PenTool,
  Ruler,
  Shield,
  Sofa,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ruler: Ruler,
  hardhat: HardHat,
  sofa: Sofa,
  hammer: Hammer,
  shield: Shield,
  badge: Badge,
  building: Building2,
  award: Award,
  users: Users,
  star: Star,
  leaf: Leaf,
  pen: PenTool,
};

export const iconKeys = Object.keys(iconMap);

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Building2;
  return <Icon className={className} strokeWidth={1.6} />;
}
