"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import Cpa10LeadModal from "@/components/Cpa10LeadModal";

interface Cpa10LeadContextValue {
  openCpa10Modal: () => void;
}

const Cpa10LeadContext = createContext<Cpa10LeadContextValue | null>(null);

export function useCpa10LeadModal(): Cpa10LeadContextValue {
  const ctx = useContext(Cpa10LeadContext);
  if (!ctx) {
    throw new Error("useCpa10LeadModal must be used within Cpa10LeadModalProvider");
  }
  return ctx;
}

interface Cpa10LeadModalProviderProps {
  children: ReactNode;
}

export function Cpa10LeadModalProvider({ children }: Cpa10LeadModalProviderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const openCpa10Modal = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openCpa10Modal }), [openCpa10Modal]);

  return (
    <Cpa10LeadContext.Provider value={value}>
      {children}
      <Cpa10LeadModal open={open} onOpenChange={setOpen} />
    </Cpa10LeadContext.Provider>
  );
}
