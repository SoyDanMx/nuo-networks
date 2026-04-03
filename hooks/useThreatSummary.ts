"use client";

import { useEffect, useState } from "react";

import type { ThreatSummaryResponse } from "@/lib/threat-feed-types";

const POLL_MS = 45_000;

export function useThreatSummary(): {
  data: ThreatSummaryResponse | null;
  error: boolean;
  loading: boolean;
} {
  const [data, setData] = useState<ThreatSummaryResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const r = await fetch("/api/threat-summary", { cache: "no-store" });
        if (!r.ok) throw new Error(String(r.status));
        const j = (await r.json()) as ThreatSummaryResponse;
        if (!cancelled) {
          setData(j);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    const t = window.setInterval(() => void load(), POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return { data, error, loading };
}
