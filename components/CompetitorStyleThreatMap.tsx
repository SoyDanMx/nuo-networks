"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame, Globe2, Radio } from "lucide-react";
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

const FT_BASE_COUNTER = 1_842_600;

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

function useLiveCounter(reduced: boolean, multiplier: number): number {
  const [n, setN] = useState(FT_BASE_COUNTER);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => {
      setN((v) => v + Math.floor(Math.random() * 11 * multiplier) + 3 * multiplier);
    }, 900);
    return () => window.clearInterval(t);
  }, [reduced, multiplier]);
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

/** Panel inspirado en mapas de amenazas típicos del mercado (competidores): arcos cálidos, tabla IPS y top threats. Solo demostración visual. */
const CompetitorStyleThreatMap = (): JSX.Element => {
  const gid = useId().replace(/:/g, "");
  const { messages } = useI18n();
  const f = messages.threatMapCompare.competitorStyle;
  const reduceMotion = useReducedMotion();
  const [range, setRange] = useState<"24h" | "7d">("24h");
  const [view3d, setView3d] = useState(false);

  const mult = range === "7d" ? 8 : 1;
  const feedLine = useThreatFeed(f.feed, 2800);
  const counter = useLiveCounter(Boolean(reduceMotion), mult);
  const clock = useLocalClock();

  const [routeIndex, setRouteIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRouteIndex((i) => (i + 1) % THREAT_ROUTES.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const activeRoutes = useMemo((): ThreatRoute[] => {
    const n = THREAT_ROUTES.length;
    return [THREAT_ROUTES[routeIndex % n], THREAT_ROUTES[(routeIndex + 2) % n], THREAT_ROUTES[(routeIndex + 6) % n]];
  }, [routeIndex]);

  const pathForRoute = useCallback((r: ThreatRoute): string | null => {
    const a = nodeById(r.from);
    const b = nodeById(r.to);
    if (!a || !b) return null;
    const bulge = r.from === "AU" || r.to === "AU" ? 1.35 : 1;
    return quadArcPath(a.x, a.y, b.x, b.y, bulge);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-red-600/30 bg-[#0a0c10] shadow-[0_0_80px_-20px_hsl(0_84%_50%/0.25),inset_0_1px_0_0_rgba(255,80,60,0.12)] backdrop-blur-xl"
      aria-label={f.aria}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,60,40,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(220,60,40,0.35) 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,hsl(15_90%_45%/0.18),transparent_45%),radial-gradient(ellipse_at_10%_100%,hsl(0_84%_35%/0.12),transparent_40%)]"
        aria-hidden
      />

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-red-900/50 bg-black/40 px-3 py-2 md:px-4">
        <div className="flex items-center gap-2 border-l-2 border-orange-500 pl-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/45 bg-red-950/50 text-orange-400 shadow-[0_0_16px_hsl(0_84%_55%/0.35)]">
            <Globe2 className="h-3.5 w-3.5" aria-hidden />
          </span>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400/95">{f.badge}</p>
            <p className="text-[10px] text-muted-foreground">{f.feedTitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] md:gap-3 md:text-xs">
          <div className="flex rounded-md border border-red-900/60 bg-black/50 p-0.5">
            <button
              type="button"
              onClick={() => setRange("24h")}
              className={`rounded px-2 py-0.5 transition-colors ${
                range === "24h" ? "bg-red-600/80 text-white shadow-[0_0_12px_hsl(0_84%_50%/0.4)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.time24h}
            </button>
            <button
              type="button"
              onClick={() => setRange("7d")}
              className={`rounded px-2 py-0.5 transition-colors ${
                range === "7d" ? "bg-red-600/80 text-white shadow-[0_0_12px_hsl(0_84%_50%/0.4)]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.time7d}
            </button>
          </div>
          <div className="hidden rounded-md border border-white/10 bg-black/40 p-0.5 sm:flex">
            <button
              type="button"
              onClick={() => setView3d(false)}
              className={`rounded px-2 py-0.5 ${!view3d ? "bg-white/10 text-orange-200" : "text-muted-foreground"}`}
            >
              {f.view2d}
            </button>
            <button
              type="button"
              onClick={() => setView3d(true)}
              className={`rounded px-2 py-0.5 ${view3d ? "bg-white/10 text-orange-200" : "text-muted-foreground"}`}
            >
              {f.view3d}
            </button>
          </div>
          <span className="tabular-nums text-foreground/90">{clock}</span>
          <span className="inline-flex items-center gap-1 rounded border border-red-500/40 bg-red-950/40 px-2 py-0.5 text-red-400">
            <Radio className="h-3 w-3 motion-safe:animate-pulse" aria-hidden />
            {f.live}
          </span>
        </div>
      </div>

      <div className="relative p-2 md:p-3">
        <div className="mb-2 h-8 overflow-hidden rounded-md border border-red-900/40 bg-black/55 px-2 py-1 font-mono text-[10px] leading-6 text-orange-300/95 md:text-[11px]">
          <motion.p
            key={feedLine}
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="truncate"
          >
            {feedLine}
          </motion.p>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-red-950/50 pb-2">
          <Flame className="h-3.5 w-3.5 text-red-500" aria-hidden />
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{f.legendTitle}</span>
          <ul className="flex flex-wrap gap-3">
            {f.legend.map((entry) => (
              <li key={entry.label} className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 shrink-0 rounded-sm ${
                    entry.tone === "red"
                      ? "bg-red-500 shadow-[0_0_10px_hsl(0_84%_60%/0.8)]"
                      : "bg-orange-400 shadow-[0_0_10px_hsl(25_95%_55%/0.7)]"
                  }`}
                />
                <span className="font-mono text-[9px] text-muted-foreground md:text-[10px]">{entry.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <div
            className={`relative min-h-[200px] flex-1 overflow-hidden rounded-lg border border-red-950/40 bg-black/30 md:min-h-[240px] ${view3d ? "motion-safe:perspective-[900px]" : ""}`}
          >
            <motion.div
              className="relative aspect-[1000/480] w-full max-h-[min(48vh,300px)] min-h-[200px] md:max-h-[320px]"
              animate={view3d && !reduceMotion ? { rotateX: 8, rotateY: -6, z: 0 } : { rotateX: 0, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg
                viewBox="0 0 1000 520"
                className="relative z-[1] h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <defs>
                  <linearGradient id={`${gid}-ft-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.45" />
                    <stop offset="40%" stopColor="#ef4444" stopOpacity="1" />
                    <stop offset="100%" stopColor="#f87171" stopOpacity="0.95" />
                  </linearGradient>
                  <filter id={`${gid}-ft-glow`} x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <ThreatMapGlobeLayer gid={gid} variant="warm" />

                {[200, 400, 600, 800].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1={44}
                    x2={x}
                    y2={476}
                    stroke="hsl(0 70% 40% / 0.09)"
                    strokeWidth={1}
                    strokeDasharray="4 10"
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
                        stroke="hsl(0 85% 45% / 0.35)"
                        strokeWidth={5.5}
                        strokeLinecap="round"
                      />
                      <path
                        d={d}
                        fill="none"
                        stroke={`url(#${gid}-ft-arc)`}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        opacity={0.9}
                      />
                    </g>
                  ) : (
                    <g key={`${route.from}-${route.to}-${idx}-${routeIndex}`}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="hsl(0 80% 40% / 0.3)"
                        strokeWidth={7}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.85, ease: "easeOut" }}
                      />
                      <motion.path
                        d={d}
                        fill="none"
                        stroke={`url(#${gid}-ft-arc)`}
                        strokeWidth={2.6}
                        strokeLinecap="round"
                        filter={`url(#${gid}-ft-glow)`}
                        initial={{ pathLength: 0, opacity: 0.4 }}
                        animate={{ pathLength: 1, opacity: [0.6, 1, 0.55] }}
                        transition={{
                          pathLength: { duration: 1.75, ease: "easeOut" },
                          opacity: { duration: 2.9, repeat: Infinity, ease: "easeInOut" }
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
                        stroke="hsl(0 90% 60% / 0.5)"
                        strokeWidth={1.5}
                        initial={{ r: 4, opacity: 0.5 }}
                        animate={{ r: 30, opacity: 0 }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: ni * 0.1
                        }}
                      />
                    ) : null}
                    <circle cx={n.x} cy={n.y} r={9} fill="hsl(0 84% 50% / 0.25)" />
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={3.2}
                      fill="#fecaca"
                      className="drop-shadow-[0_0_14px_rgba(248,113,113,0.95)]"
                    />
                  </g>
                ))}
              </svg>
            </motion.div>
          </div>

          <aside className="flex w-full shrink-0 flex-col rounded-lg border border-red-900/35 bg-gradient-to-b from-red-950/30 to-black/40 p-3 lg:w-44">
            <p className="mb-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-orange-400/90">{f.topThreatsTitle}</p>
            <ul className="space-y-2">
              {f.topThreats.map((t) => (
                <li key={t.name} className="border-b border-red-950/40 pb-2 last:border-0 last:pb-0">
                  <p className="line-clamp-2 font-mono text-[9px] leading-tight text-foreground/90">{t.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] font-bold tabular-nums text-red-400">{t.count}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-red-900/40 bg-black/45">
          <p className="border-b border-red-950/50 bg-red-950/20 px-2 py-1.5 font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            {f.tableTitle}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left font-mono text-[9px] md:text-[10px]">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="px-2 py-1.5 font-medium">{f.columns.threat}</th>
                  <th className="px-2 py-1.5 font-medium">{f.columns.src}</th>
                  <th className="px-2 py-1.5 font-medium">{f.columns.dst}</th>
                  <th className="px-2 py-1.5 font-medium">{f.columns.sev}</th>
                </tr>
              </thead>
              <tbody>
                {f.tableRows.map((row) => (
                  <tr key={row.threat} className="border-t border-red-950/40 text-foreground/90">
                    <td className="max-w-[140px] truncate px-2 py-1.5 text-orange-200/90">{row.threat}</td>
                    <td className="px-2 py-1.5 text-muted-foreground">{row.src}</td>
                    <td className="px-2 py-1.5 text-muted-foreground">{row.dst}</td>
                    <td className="px-2 py-1.5">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase ${
                          row.severityKey === "critical"
                            ? "bg-red-600/30 text-red-300 ring-1 ring-red-500/40"
                            : "bg-orange-600/25 text-orange-200 ring-1 ring-orange-500/35"
                        }`}
                      >
                        {row.severityLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-2 grid gap-2 border-t border-red-950/40 pt-2 sm:grid-cols-2">
          <div className="rounded-md border border-red-800/30 bg-black/50 px-3 py-2">
            <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{f.counterLabel}</p>
            <p className="font-mono text-lg font-bold tabular-nums text-red-400 md:text-xl">{counter.toLocaleString()}</p>
          </div>
          <div className="rounded-md border border-orange-900/30 bg-black/50 px-3 py-2">
            <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{f.ipsLabel}</p>
            <p className="font-mono text-lg font-bold tabular-nums text-orange-300 md:text-xl">{f.ipsValue}</p>
          </div>
        </div>

        <p className="mt-2 text-center font-mono text-[8px] leading-relaxed text-muted-foreground/90 md:text-[9px]">{f.disclaimer}</p>
      </div>
    </div>
  );
};

export default CompetitorStyleThreatMap;
