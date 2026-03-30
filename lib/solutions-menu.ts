import type { LucideIcon } from "lucide-react";
import { Coins, FileText, Monitor, Rocket } from "lucide-react";

/**
 * Icon keys referenced from `messages.solutionsMenu.columns[].items[].icon`.
 * Sector column pattern inspired by https://flo.net/solutions/
 */
export const SOLUTION_MENU_ICONS: Record<string, LucideIcon> = {
  Coins,
  Rocket,
  Monitor,
  FileText
};
