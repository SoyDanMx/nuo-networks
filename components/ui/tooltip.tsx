"use client";

import type { ReactNode } from "react";

/**
 * Pass-through wrapper (no Radix / Floating UI). Keeps the same API for providers.tsx
 * and avoids Next vendor-chunk issues from @radix-ui/react-tooltip when tooltips are unused.
 */
interface TooltipProviderProps {
  children: ReactNode;
}

export function TooltipProvider({ children }: TooltipProviderProps): JSX.Element {
  return <>{children}</>;
}
