import {
  Activity,
  Briefcase,
  Dumbbell,
  GraduationCap,
  Plane,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Volleyball,
  CheckCheck,
  type LucideIcon,
} from 'lucide-react';

export type TaskTypeMeta = {
  id: number;
  label: string;
  Icon: LucideIcon;
  // Tailwind utility colour for accents — picked from theme tokens.
  accent: string; // text colour
  bg: string; // gentle background tint
};

export const TASK_TYPES: TaskTypeMeta[] = [
  { id: 1, label: 'General', Icon: Activity, accent: 'text-violet-400', bg: 'bg-violet-500/10' },
  { id: 2, label: 'Sport', Icon: Volleyball, accent: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 3, label: 'Food', Icon: UtensilsCrossed, accent: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 4, label: 'Work', Icon: Briefcase, accent: 'text-sky-400', bg: 'bg-sky-500/10' },
  { id: 5, label: 'Social', Icon: Users, accent: 'text-pink-400', bg: 'bg-pink-500/10' },
  { id: 6, label: 'Study', Icon: GraduationCap, accent: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { id: 7, label: 'Shopping', Icon: ShoppingBag, accent: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
  { id: 8, label: 'Travel', Icon: Plane, accent: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 9, label: 'Gym', Icon: Dumbbell, accent: 'text-orange-400', bg: 'bg-orange-500/10' },
  { id: 10, label: 'Done', Icon: CheckCheck, accent: 'text-green-400', bg: 'bg-green-500/10' },
];

export const TASK_TYPE_MAP = new Map(TASK_TYPES.map((t) => [t.id, t] as const));

export function typeMeta(id: number, done = false): TaskTypeMeta {
  if (done) return TASK_TYPE_MAP.get(10)!;
  return TASK_TYPE_MAP.get(id) ?? TASK_TYPE_MAP.get(1)!;
}
