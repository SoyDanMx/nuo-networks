"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

export interface EshopCartLine {
  id: string;
  deptId: string;
  line: string;
  qty: number;
}

const STORAGE_KEY = "nuo-eshop-quote-v1";

interface EshopCartContextValue {
  lines: EshopCartLine[];
  totalUnits: number;
  addLine: (row: Pick<EshopCartLine, "id" | "deptId" | "line">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
}

const EshopCartContext = createContext<EshopCartContextValue | null>(null);

function readStorage(): EshopCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is EshopCartLine =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as EshopCartLine).id === "string" &&
        typeof (x as EshopCartLine).line === "string" &&
        typeof (x as EshopCartLine).qty === "number" &&
        (x as EshopCartLine).qty >= 1
    );
  } catch {
    return [];
  }
}

function writeStorage(lines: EshopCartLine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* quota / private mode */
  }
}

export function EshopCartProvider({ children }: { children: ReactNode }): JSX.Element {
  const [lines, setLines] = useState<EshopCartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(lines);
  }, [lines, hydrated]);

  const addLine = useCallback((row: Pick<EshopCartLine, "id" | "deptId" | "line">, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.id === row.id);
      if (i === -1) {
        return [...prev, { ...row, qty: Math.min(99, Math.max(1, qty)) }];
      }
      const next = [...prev];
      const n = next[i];
      if (!n) return prev;
      next[i] = { ...n, qty: Math.min(99, n.qty + qty) };
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const q = Math.min(99, Math.max(1, Math.round(qty)));
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: q } : l)));
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totalUnits = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({ lines, totalUnits, addLine, setQty, removeLine, clear }),
    [lines, totalUnits, addLine, setQty, removeLine, clear]
  );

  return <EshopCartContext.Provider value={value}>{children}</EshopCartContext.Provider>;
}

export function useEshopCart(): EshopCartContextValue {
  const ctx = useContext(EshopCartContext);
  if (!ctx) {
    throw new Error("useEshopCart must be used within EshopCartProvider");
  }
  return ctx;
}
