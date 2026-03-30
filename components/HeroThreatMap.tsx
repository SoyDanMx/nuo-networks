"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Radio } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import {
  nodeById,
  quadArcPath,
  THREAT_NODES,
  THREAT_ROUTES,
  type ThreatRoute
} from "@/lib/threat-map-data";
import { ThreatMapGlobeLayer } from "@/components/ThreatMapGlobeLayer";
import { useI18n } from "@/lib/i18n/provider";

const BASE_COUNTER = 428_917;

/** Leyenda estilo mapa SOC de referencia: verde = flujos, rojo = severidad, cian = nodos. */
const LEGEND_DOT: Record<string, string> = {
  green: "bg-lime-400 shadow-[0_0_14px_hsl(84_81%_55%/0.85)]",
  red: "bg-red-500 shadow-[0_0_12px_hsl(0_84%_60%/0.75)]",
  cyan: "bg-cyan-400 shadow-[0_0_12px_hsl(187_86%_53%/0.75)]",
  magenta: "bg-fuchsia-500 shadow-[0_0_12px_hsl(292_84%_61%/0.65)]",
  emerald: "bg-emerald-400 shadow-[0_0_12px_hsl(142_71%_45%/0.65)]"
};

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

function useRotatingIndex(length: number, intervalMs: number, reduced: boolean): number {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (length === 0 || reduced) return;
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [length, intervalMs, reduced]);
  return i;
}

function useLiveCounter(reduced: boolean): number {
  const [n, setN] = useState(BASE_COUNTER);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => {
      setN((v) => v + Math.floor(Math.random() * 7) + 2);
    }, 800);
    return () => window.clearInterval(t);
  }, [reduced]);
  return n;
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

const HeroThreatMap = (): JSX.Element => {
  const gid = useId().replace(/:/g, "");
  const { messages } = useI18n();
  const tm = messages.heroThreatMap;
  const reduceMotion = useReducedMotion();
  const feedLine = useThreatFeed(tm.feed, 3200);
  const counter = useLiveCounter(Boolean(reduceMotion));
  const clock = useLocalClock();

  const stats = tm.rotatingStats;
  const statIdx = useRotatingIndex(stats.length, 4500, Boolean(reduceMotion));
  const activeStat = stats[statIdx] ?? stats[0];

  const [routeIndex, setRouteIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRouteIndex((i) => (i + 1) % THREAT_ROUTES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const activeRoutes = useMemo((): ThreatRoute[] => {
    const n = THREAT_ROUTES.length;
    return [THREAT_ROUTES[routeIndex % n], THREAT_ROUTES[(routeIndex + 3) % n], THREAT_ROUTES[(routeIndex + 5) % n]];
  }, [routeIndex]);

  const pathForRoute = useCallback((r: ThreatRoute): string | null => {
    const a = nodeById(r.from);
    const b = nodeById(r.to);
    if (!a || !b) return null;
    const bulge = r.from === "AU" || r.to === "AU" ? 1.4 : 1;
    return quadArcPath(a.x, a.y, b.x, b.y, bulge);
  }, []);

  const topCountryMaxShare = useMemo(
    () => Math.max(...tm.topCountries.map((c) => c.share), 1),
    [tm.topCountries]
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#030712] shadow-[0_0_100px_-20px_hsl(84_81%_45%/0.12),0_0_80px_-24px_hsl(var(--primary)/0.35),inset_0_1px_0_0_hsl(var(--primary)/0.12)] backdrop-blur-xl"
      aria-label={tm.aria}
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-[0.14]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,hsl(var(--primary)/0.18),transparent_42%),radial-gradient(ellipse_at_90%_85%,hsl(var(--secondary)/0.14),transparent_40%)]"
        aria-hidden="true"
      />

      {/* HUD chrome — acento rojo tipo consolas SOC de referencia */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-red-500/20 bg-background/25 px-3 py-2 md:px-4">
        <div className="flex items-center gap-2 border-l-2 border-red-500/70 pl-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_18px_hsl(187_86%_53%/0.35)]">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">{tm.badge}</p>
            <p className="text-[10px] text-muted-foreground">{tm.feedTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs">
          <span className="hidden text-muted-foreground sm:inline">{tm.localTime}</span>
          <span className="tabular-nums text-foreground/90">{clock}</span>
          <span className="inline-flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-emerald-400 shadow-[0_0_12px_hsl(142_71%_45%/0.2)]">
            <Radio className="h-3 w-3 motion-safe:animate-pulse" aria-hidden="true" />
            {tm.live}
          </span>
        </div>
      </div>

      <div className="relative px-2 pb-2 pt-1 md:px-3 md:pb-3">
        {/* Event feed */}
        <div className="mb-2 h-8 overflow-hidden rounded-md border border-emerald-500/20 bg-black/40 px-2 py-1 font-mono text-[10px] leading-6 text-emerald-400/95 shadow-[inset_0_0_20px_hsl(142_71%_45%/0.06)] md:text-[11px]">
          <motion.p
            key={feedLine}
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="truncate"
          >
            {feedLine}
          </motion.p>
        </div>

        {/* Legend — tipología estilo mapas SOC de referencia */}
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border/30 pb-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{tm.legendTitle}</span>
          <ul className="flex flex-wrap gap-3">
            {tm.legend.map((entry) => (
              <li key={entry.label} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 shrink-0 rounded-sm ${LEGEND_DOT[entry.tone] ?? "bg-primary"}`} />
                <span className="font-mono text-[9px] text-muted-foreground md:text-[10px]">{entry.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rotating aggregate stats */}
        <div className="mb-2 overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 px-3 py-2">
          <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-primary/80">{tm.rotatingStatsTitle}</p>
          <motion.div
            key={statIdx}
            role="status"
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-baseline gap-2"
          >
            <span className="font-mono text-lg font-bold tabular-nums text-primary md:text-xl">{activeStat?.value}</span>
            <span className="text-[11px] text-muted-foreground md:text-xs">{activeStat?.label}</span>
          </motion.div>
        </div>

        <div className="relative aspect-[1000/480] w-full max-h-[min(52vh,320px)] min-h-[200px] md:max-h-[380px]">
          {/* Día / noche atmosférico (sin afirmar datos reales) */}
          {!reduceMotion ? (
            <>
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-sky-500/[0.12] via-transparent to-transparent"
                animate={{ opacity: [0.12, 0.38, 0.12] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-indigo-950/60 via-transparent to-violet-950/20 mix-blend-soft-light"
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                aria-hidden="true"
              />
            </>
          ) : null}

          {/* Esquinas HUD */}
          <div className="pointer-events-none absolute left-2 top-2 z-10 h-6 w-6 border-l-2 border-t-2 border-cyan-400/40" aria-hidden="true" />
          <div className="pointer-events-none absolute right-2 top-2 z-10 h-6 w-6 border-r-2 border-t-2 border-cyan-400/35" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-2 right-2 z-10 h-6 w-6 border-b-2 border-r-2 border-lime-400/25" aria-hidden="true" />

          {/* Panel origen (esquina inferior izquierda, patrón tipo mapas SOC de referencia) */}
          <div className="absolute bottom-2 left-2 z-20 max-w-[46%] rounded-md border border-lime-500/25 bg-black/75 p-2 shadow-[0_0_24px_rgba(0,0,0,0.5)] backdrop-blur-sm md:bottom-3 md:left-3 md:max-w-[220px]">
            <p className="mb-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-lime-400/90">
              {tm.topCountriesTitle}
            </p>
            <ul className="space-y-1">
              {tm.topCountries.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <span className="w-[4.5rem] shrink-0 truncate font-mono text-[8px] text-muted-foreground md:text-[9px]">
                    {c.label}
                  </span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-lime-500 to-green-400 shadow-[0_0_8px_hsl(84_81%_45%/0.5)]"
                      style={{ width: `${(c.share / topCountryMaxShare) * 100}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right font-mono text-[8px] text-lime-400/90">{c.share}%</span>
                </li>
              ))}
            </ul>
          </div>

          <svg
            viewBox="0 0 1000 520"
            className="relative z-[1] h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`${gid}-nuo-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
                <stop offset="38%" stopColor="#bef264" stopOpacity="1" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.95" />
              </linearGradient>
              <filter id={`${gid}-nuo-glow`} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ThreatMapGlobeLayer gid={gid} variant="nuo" />

            {[200, 400, 600, 800].map((x) => (
              <line
                key={x}
                x1={x}
                y1={44}
                x2={x}
                y2={476}
                stroke="hsl(187 86% 50% / 0.07)"
                strokeWidth={1}
                strokeDasharray="5 9"
              />
            ))}

            {activeRoutes.map((route, idx) => {
              const d = pathForRoute(route);
              if (!d) return null;
              return reduceMotion ? (
                <g key={`${route.from}-${route.to}-${idx}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke="hsl(185 70% 70% / 0.35)"
                    strokeWidth={5}
                    strokeLinecap="round"
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#${gid}-nuo-arc)`}
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    opacity={0.88}
                  />
                </g>
              ) : (
                <g key={`${route.from}-${route.to}-${idx}-${routeIndex}`}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="hsl(185 70% 72% / 0.25)"
                    strokeWidth={6}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.1, ease: "easeOut" }}
                  />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={`url(#${gid}-nuo-arc)`}
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    filter={`url(#${gid}-nuo-glow)`}
                    initial={{ pathLength: 0, opacity: 0.45 }}
                    animate={{ pathLength: 1, opacity: [0.55, 1, 0.62] }}
                    transition={{
                      pathLength: { duration: 2, ease: "easeOut" },
                      opacity: { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </g>
              );
            })}

            {THREAT_NODES.map((n, ni) => (
              <g key={n.id}>
                {!reduceMotion ? (
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    fill="none"
                    stroke="hsl(84 81% 60% / 0.55)"
                    strokeWidth={1.5}
                    initial={{ r: 4, opacity: 0.55 }}
                    animate={{ r: 28, opacity: 0 }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: ni * 0.12
                    }}
                  />
                ) : null}
                <circle cx={n.x} cy={n.y} r={9} fill="hsl(84 81% 55% / 0.22)" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={3.2}
                  fill="#ecfccb"
                  className="drop-shadow-[0_0_12px_rgba(163,230,53,0.95)]"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-2 grid gap-3 border-t border-border/40 pt-3 md:grid-cols-2 md:gap-4">
          <div className="rounded-lg border border-lime-500/20 bg-black/40 p-3 shadow-[inset_0_0_20px_rgba(74,222,128,0.04)]">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{tm.counterLabel}</p>
            <p className="font-mono text-xl font-bold tabular-nums text-lime-400 md:text-2xl">{counter.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-cyan-500/20 bg-black/40 p-3 shadow-[inset_0_0_20px_hsl(187_86%_53%/0.05)]">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-cyan-400/80">{tm.sectorTitle}</p>
            <ul className="space-y-1.5">
              {tm.sectors.map((s) => (
                <li key={s.label} className="flex items-center gap-2">
                  <span className="w-16 shrink-0 truncate font-mono text-[9px] text-muted-foreground md:w-20 md:text-[10px]">
                    {s.label}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/40 ring-1 ring-inset ring-cyan-500/15">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400 shadow-[0_0_10px_hsl(187_86%_53%/0.35)]"
                      initial={reduceMotion ? false : { width: "0%" }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-7 shrink-0 text-right font-mono text-[9px] text-primary/90">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-2 text-center font-mono text-[9px] leading-relaxed text-muted-foreground/85">{tm.disclaimer}</p>
      </div>
    </div>
  );
};

export default HeroThreatMap;
