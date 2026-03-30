"use client";

import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return <TooltipProvider>{children}</TooltipProvider>;
}
