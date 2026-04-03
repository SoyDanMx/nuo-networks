"use client";

import type { Route } from "next";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ExternalLink, Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LiveThreatMapPanel } from "@/components/LiveThreatMapPanel";
import { useI18n } from "@/lib/i18n/provider";
import { localizedPath } from "@/lib/i18n/paths";

function useThreatFeed(lines: string[], intervalMs: number): string {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (lines.length === 0) return;
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % lines.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [lines.length, intervalMs]);
  return lines[i] ?? "";
}

function useLocalClock(): string {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = (): void => {
      setT(
        new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

/**
 * Mapa de amenazas “live” (estilo dashboard v0) embebido en hero y en la comparativa NUO.
 */
const HeroLiveThreatMap = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const tm = messages.heroThreatMap;
  const reduceMotion = useReducedMotion();
  const feedLine = useThreatFeed(tm.feed, 3200);
  const clock = useLocalClock();
  const fullMapHref = localizedPath(locale, "/threat-map") as Route;

  return (
    <div
      className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#030712] shadow-[0_0_100px_-20px_hsl(84_81%_45%/0.12),0_0_80px_-24px_hsl(var(--primary)/0.35),inset_0_1px_0_0_hsl(var(--primary)/0.12)] backdrop-blur-xl"
      aria-label={tm.aria}
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-[0.12]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,hsl(var(--primary)/0.14),transparent_42%),radial-gradient(ellipse_at_90%_85%,hsl(var(--secondary)/0.1),transparent_40%)]"
        aria-hidden
      />

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 bg-background/30 px-3 py-2 md:px-4">
        <div className="flex min-w-0 items-center gap-2 border-l-2 border-cyan-500/70 pl-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_18px_hsl(187_86%_53%/0.35)]">
            <Activity className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">{tm.badge}</p>
            <p className="truncate text-[10px] text-muted-foreground">{tm.feedTitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href={fullMapHref}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-wide text-cyan-300/90 transition-colors hover:border-cyan-500/40 hover:text-cyan-200"
          >
            {tm.embedFullMap}
            <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
          </Link>
          <span className="hidden text-[10px] text-muted-foreground sm:inline">{tm.localTime}</span>
          <span className="font-mono text-[10px] tabular-nums text-foreground/90">{clock}</span>
          <span className="inline-flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400 shadow-[0_0_12px_hsl(142_71%_45%/0.2)]">
            <Radio className="h-3 w-3 motion-safe:animate-pulse" aria-hidden />
            {tm.live}
          </span>
        </div>
      </div>

      <div className="relative px-1 pb-1 pt-1 md:px-2 md:pb-2">
        <div className="mb-2 h-8 overflow-hidden rounded-md border border-emerald-500/20 bg-black/50 px-2 py-1 font-mono text-[10px] leading-6 text-emerald-400/95 md:text-[11px]">
          <motion.p
            key={feedLine}
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="truncate"
          >
            {feedLine}
          </motion.p>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black">
          <LiveThreatMapPanel density="embed" />
        </div>

        <p className="mt-2 text-center font-mono text-[9px] leading-relaxed text-muted-foreground/85">{tm.disclaimer}</p>
      </div>
    </div>
  );
};

export default HeroLiveThreatMap;
