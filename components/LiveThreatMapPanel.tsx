"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Radio } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import { ThreatFeedArcLayer } from "@/components/ThreatFeedArcLayer";
import { ThreatMapGlobeLayer } from "@/components/ThreatMapGlobeLayer";
import { useThreatSummary } from "@/hooks/useThreatSummary";
import type { ThreatArcSample } from "@/lib/threat-feed-types";
import {
  nodeById,
  quadArcPath,
  THREAT_NODES,
  THREAT_ROUTES,
  type ThreatRoute
} from "@/lib/threat-map-data";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const BASE_COUNTER = 3_912_854;

export const REGION_ACCENT: Record<string, string> = {
  US: "#ef4444",
  DE: "#f97316",
  UK: "#eab308",
  IN: "#3b82f6",
  BR: "#22c55e",
  SG: "#06b6d4",
  JP: "#c084fc",
  CN: "#f87171",
  MX: "#fb923c",
  FR: "#facc15",
  RU: "#94a3b8",
  KR: "#d946ef",
  AU: "#2dd4bf"
};

const TOP_REGION_IDS = ["US", "DE", "UK", "IN", "BR", "SG", "JP"] as const;

/** Tonos cálidos bajo focos regionales (estilo mapa tipo Imperva). */
const IMPERVA_REGION_HEAT: Record<string, string> = {
  US: "#fb923c",
  DE: "#f97316",
  UK: "#fdba74",
  IN: "#ea580c",
  BR: "#f59e0b",
  SG: "#fbbf24",
  JP: "#fdba74",
  CN: "#ef4444",
  MX: "#fb923c",
  FR: "#f97316",
  RU: "#94a3b8",
  KR: "#fb7185",
  AU: "#f97316"
};

const REGION_SHARE: Record<string, number> = {
  US: 0.35,
  DE: 0.12,
  UK: 0.1,
  IN: 0.15,
  BR: 0.08,
  SG: 0.06,
  JP: 0.07
};

function useLiveCounter(reduced: boolean): number {
  const [n, setN] = useState(BASE_COUNTER);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => {
      setN((v) => v + Math.floor(Math.random() * 18) + 4);
    }, 700);
    return () => window.clearInterval(t);
  }, [reduced]);
  return n;
}

function useAggregateRps(reduced: boolean): number {
  const [r, setR] = useState(428_350);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => {
      setR(360_000 + Math.floor(Math.random() * 160_000));
    }, 850);
    return () => window.clearInterval(t);
  }, [reduced]);
  return r;
}

function useRegionRps(ids: readonly string[], reduced: boolean): Record<string, number> {
  const [m, setM] = useState<Record<string, number>>({});
  useEffect(() => {
    if (reduced) {
      setM(Object.fromEntries(ids.map((id) => [id, 80_000 + id.charCodeAt(0) * 100])));
      return;
    }
    const tick = (): void => {
      setM(
        Object.fromEntries(
          ids.map((id) => {
            const base = 40_000 + id.charCodeAt(0) * 900;
            return [id, base + Math.floor(Math.random() * 140_000)];
          })
        )
      );
    };
    tick();
    const t = window.setInterval(tick, 900);
    return () => window.clearInterval(t);
  }, [ids, reduced]);
  return m;
}

export interface LiveThreatMapPanelProps {
  /** `page`: full dashboard column sizes; `embed`: hero / comparativa NUO. */
  density?: "page" | "embed";
  /** `imperva`: océano azul, arcos naranja/rojo (página `/threat-map`). `embed` ignora y usa estilo NUO. */
  theme?: "nuo" | "imperva";
  className?: string;
}

export function LiveThreatMapPanel({
  density = "page",
  theme = "nuo",
  className
}: LiveThreatMapPanelProps): JSX.Element {
  const gid = useId().replace(/:/g, "");
  const { locale, messages } = useI18n();
  const m = messages.liveThreatMap;
  const reduceMotion = useReducedMotion();
  const embed = density === "embed";
  const isImpervaTheme = !embed && theme === "imperva";
  const arcGrad = `${gid}-arc-${isImpervaTheme ? "imperva" : "live"}`;
  const glowFilter = `${gid}-arc-glow${isImpervaTheme ? "-imperva" : ""}`;
  const { data: feed, error: feedError } = useThreatSummary();

  const regionIds = useMemo(
    () => TOP_REGION_IDS.slice(0, embed ? 5 : TOP_REGION_IDS.length),
    [embed]
  );
  const simulatedCounter = useLiveCounter(Boolean(reduceMotion));
  const simulatedAgg = useAggregateRps(Boolean(reduceMotion));
  const regionRpsSim = useRegionRps(regionIds, Boolean(reduceMotion));

  const displayCounter = feed?.totalSignals ?? simulatedCounter;
  const displayAgg = feed?.aggregateRatePerSec ?? simulatedAgg;

  const useFeedArcs = Boolean(feed?.arcs?.length);

  const [routeIndex, setRouteIndex] = useState(0);
  const cycleLen = useMemo(() => {
    if (useFeedArcs && feed?.arcs?.length) return Math.max(feed.arcs.length, 1);
    return Math.max(THREAT_ROUTES.length, 1);
  }, [useFeedArcs, feed?.arcs?.length]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRouteIndex((i) => (i + 1) % cycleLen);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion, cycleLen]);

  const activeSimRoutes = useMemo((): ThreatRoute[] => {
    const n = THREAT_ROUTES.length;
    return [0, 1, 2, 3, 4].map((k) => THREAT_ROUTES[(routeIndex + k * 2) % n]);
  }, [routeIndex]);

  const activeFeedArcs = useMemo((): ThreatArcSample[] => {
    if (!feed?.arcs?.length) return [];
    const arcs = feed.arcs;
    const n = arcs.length;
    return [0, 1, 2, 3, 4].map((k) => arcs[(routeIndex + k * 2) % n]);
  }, [feed, routeIndex]);

  const pathForRoute = useCallback((r: ThreatRoute): string | null => {
    const a = nodeById(r.from);
    const b = nodeById(r.to);
    if (!a || !b) return null;
    const bulge = r.from === "AU" || r.to === "AU" ? 1.38 : 1.05;
    return quadArcPath(a.x, a.y, b.x, b.y, bulge);
  }, []);

  const nodeLabel = useCallback(
    (id: string): string => {
      const map = m.nodeLabels as Record<string, string>;
      return map[id] ?? id;
    },
    [m.nodeLabels]
  );

  const topRows = useMemo(() => {
    return regionIds.map((id) => {
      const share = REGION_SHARE[id] ?? 0.1;
      const total = Math.floor(displayCounter * share * (0.98 + (id.charCodeAt(0) % 7) * 0.003));
      const rps = feed
        ? Math.max(0, Math.floor(displayAgg * share))
        : regionRpsSim[id] ?? 0;
      return {
        id,
        code: id,
        total,
        rps,
        swatch: REGION_ACCENT[id] ?? "#fff"
      };
    });
  }, [displayCounter, displayAgg, regionIds, regionRpsSim, feed]);

  const nf = locale === "es" ? "es-MX" : "en-US";

  const periodSecondary = feed
    ? `${new Date(feed.window.startUtc).toLocaleString(nf, { timeZone: "UTC" })} — ${new Date(feed.window.endUtc).toLocaleString(nf, { timeZone: "UTC" })} (UTC)`
    : m.periodRange;

  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col bg-black md:flex-row",
        embed ? "min-h-[280px] md:min-h-[300px]" : "lg:min-h-[calc(100dvh-3.5rem)]",
        isImpervaTheme &&
          "bg-[linear-gradient(165deg,hsl(215_45%_8%)_0%,hsl(225_55%_4%)_45%,hsl(220_40%_3%)_100%)]",
        className
      )}
    >
      <aside
        className={cn(
          "flex shrink-0 flex-col border-white/[0.08] font-mono",
          embed
            ? "w-full border-b px-3 py-4 md:w-[min(44%,240px)] md:border-b-0 md:border-r md:px-3 md:py-4 lg:w-[min(42%,280px)]"
            : "w-full border-b px-4 py-6 sm:px-6 lg:w-[min(100%,420px)] lg:border-b-0 lg:border-r lg:py-8 lg:pl-8 lg:pr-6",
          isImpervaTheme && "border-sky-900/35 bg-[#070d18]/90 backdrop-blur-sm"
        )}
      >
        <p
          className={cn(
            "uppercase tracking-[0.2em] text-zinc-500",
            embed ? "text-[8px]" : "text-[10px]",
            isImpervaTheme && "text-sky-500/90"
          )}
        >
          {m.periodLabel}
        </p>
        <p className={cn("tracking-wide text-zinc-600", embed ? "mt-0.5 text-[9px]" : "mt-1 text-[11px]")}>
          {periodSecondary}
        </p>

        <p
          className={cn("uppercase tracking-[0.28em] text-zinc-500", embed ? "mt-4 text-[8px]" : "mt-8 text-[10px]")}
        >
          {m.totalLabel}
        </p>
        <p
          className={cn(
            "break-all font-medium leading-none tracking-tight text-white",
            embed ? "mt-1 text-lg sm:text-xl" : "mt-2 text-3xl sm:text-4xl lg:text-[2.65rem]"
          )}
        >
          {displayCounter.toLocaleString(nf)}
        </p>
        <p className={cn("tabular-nums text-zinc-400", embed ? "mt-2 text-[10px]" : "mt-3 text-sm")}>
          {displayAgg.toLocaleString(nf)} <span className="text-zinc-600">/s</span>{" "}
          <span className={cn("uppercase tracking-wider text-zinc-600", embed ? "text-[8px]" : "text-[10px]")}>
            {m.aggregateRate}
          </span>
        </p>

        <p
          className={cn(
            "uppercase tracking-[0.22em] text-zinc-500",
            embed ? "mt-4 text-[8px]" : "mt-10 text-[10px]"
          )}
        >
          {m.topRegionsTitle}
        </p>
        <ul
          className={cn(
            "space-y-2 border-t border-white/[0.06] pt-2",
            embed ? "mt-2" : "mt-3 space-y-3 pt-3"
          )}
        >
          {topRows.map((row) => (
            <li
              key={row.id}
              className={cn(
                "flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 leading-snug",
                embed ? "text-[9px]" : "text-[11px] sm:text-xs"
              )}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  className={cn("shrink-0 rounded-sm", embed ? "h-2 w-2" : "h-2.5 w-2.5")}
                  style={{ backgroundColor: row.swatch, boxShadow: `0 0 8px ${row.swatch}55` }}
                  aria-hidden
                />
                <span className="font-medium text-zinc-200">{row.code}</span>
                {!embed ? <span className="truncate text-zinc-600">{nodeLabel(row.id)}</span> : null}
              </span>
              <span
                className={cn(
                  "w-full pl-6 tabular-nums text-zinc-500 sm:ml-auto sm:w-auto sm:pl-0 sm:text-right",
                  embed ? "text-[8px]" : "pl-7 text-[10px]"
                )}
              >
                {row.total.toLocaleString(nf)}{" "}
                <span className="text-zinc-600">{row.rps.toLocaleString(nf)}/s</span>
              </span>
            </li>
          ))}
        </ul>
        {!embed ? <p className="mt-6 text-[10px] text-zinc-600">{m.nodesFooter}</p> : null}
        {feedError ? (
          <p className={cn("text-amber-500/90", embed ? "mt-2 text-[8px]" : "mt-3 text-[10px]")}>{m.feedError}</p>
        ) : null}
        {!embed && feed?.sources?.length ? (
          <p className="mt-4 text-[9px] leading-relaxed text-zinc-600">
            <span className="text-zinc-500">{m.feedSourcesPrefix}:</span>{" "}
            {feed.sources.map((s) => s.name).join(" · ")}
          </p>
        ) : null}
        {!embed && feed?.disclaimer ? (
          <p className="mt-2 text-[9px] leading-relaxed text-zinc-600">{feed.disclaimer}</p>
        ) : null}
      </aside>

      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col bg-black",
          embed ? "min-h-[200px] md:min-h-0" : "min-h-[min(68vh,560px)]",
          isImpervaTheme && "bg-[linear-gradient(180deg,hsl(220_42%_7%)_0%,hsl(225_48%_4%)_55%,#020617_100%)]"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            opacity: isImpervaTheme ? 0.045 : 0.04,
            backgroundImage: isImpervaTheme
              ? "linear-gradient(rgba(56,189,248,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.16) 1px, transparent 1px)"
              : "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: embed ? "18px 18px" : "24px 24px"
          }}
        />

        <div className={cn("relative flex flex-1 flex-col justify-center", embed ? "p-2 sm:p-3" : "p-3 sm:p-5 lg:p-8")}>
          <div className="relative mx-auto w-full max-w-[1100px] flex-1">
            <div
              className={cn(
                "relative w-full overflow-hidden bg-black",
                embed
                  ? "min-h-[180px] max-h-[min(42vh,280px)] rounded-lg border border-white/[0.07]"
                  : isImpervaTheme
                    ? "min-h-[280px] rounded-xl border border-sky-500/20 bg-[#040d18] shadow-[inset_0_0_100px_rgba(14,165,233,0.07),0_0_0_1px_rgba(56,189,248,0.06)]"
                    : "min-h-[280px] rounded-lg border border-white/[0.07]"
              )}
            >
              <svg
                viewBox="0 0 1000 520"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-hidden
              >
                <defs>
                  {isImpervaTheme ? (
                    <>
                      <linearGradient id={`${gid}-arc-imperva`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff5f1f" stopOpacity={0.85} />
                        <stop offset="45%" stopColor="#ff8c42" stopOpacity={0.95} />
                        <stop offset="100%" stopColor="#ffc14d" stopOpacity={0.8} />
                      </linearGradient>
                      <filter id={`${gid}-arc-glow-imperva`} x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="5.5" result="b" />
                        <feColorMatrix
                          in="b"
                          type="matrix"
                          values="1 0 0 0 0  0 0.55 0 0 0  0 0 0.15 0 0  0 0 0 0.9 0"
                          result="tint"
                        />
                        <feMerge>
                          <feMergeNode in="tint" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </>
                  ) : (
                    <>
                      <linearGradient id={`${gid}-arc-live`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fb923c" stopOpacity={0.55} />
                        <stop offset="50%" stopColor="#f97316" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#fde047" stopOpacity={0.75} />
                      </linearGradient>
                      <filter id={`${gid}-arc-glow`} x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="b" />
                        <feMerge>
                          <feMergeNode in="b" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </>
                  )}
                  {THREAT_NODES.map((n) => {
                    const c = isImpervaTheme
                      ? (IMPERVA_REGION_HEAT[n.id] ?? "#fb923c")
                      : (REGION_ACCENT[n.id] ?? "#64748b");
                    return (
                      <radialGradient
                        key={`g-${n.id}`}
                        id={`${gid}-heat-${n.id}`}
                        cx={n.x}
                        cy={n.y}
                        r={140}
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor={c} stopOpacity={isImpervaTheme ? 0.38 : 0.42} />
                        <stop offset="55%" stopColor={c} stopOpacity={isImpervaTheme ? 0.1 : 0.12} />
                        <stop offset="100%" stopColor={c} stopOpacity={0} />
                      </radialGradient>
                    );
                  })}
                </defs>

                <ThreatMapGlobeLayer gid={gid} variant={isImpervaTheme ? "imperva" : "live"} />

                {THREAT_NODES.map((n) => (
                  <circle key={`heat-${n.id}`} cx={n.x} cy={n.y} r={140} fill={`url(#${gid}-heat-${n.id})`} />
                ))}

                {useFeedArcs
                  ? activeFeedArcs.map((arc, idx) => (
                      <ThreatFeedArcLayer
                        key={`feed-${routeIndex}-${idx}-${arc.from.label}-${arc.to.label}`}
                        arc={arc}
                        gid={gid}
                        reduceMotion={Boolean(reduceMotion)}
                        index={idx}
                        arcGradientId={arcGrad}
                        glowFilterId={glowFilter}
                      />
                    ))
                  : activeSimRoutes.map((route, idx) => {
                      const d = pathForRoute(route);
                      if (!d) return null;
                      const key = `${route.from}-${route.to}-${routeIndex}-${idx}`;
                      return reduceMotion ? (
                        <g key={key} opacity={0.85}>
                          <path
                            d={d}
                            fill="none"
                            stroke="hsl(0 0% 100% / 0.06)"
                            strokeWidth={7}
                            strokeLinecap="round"
                          />
                          <path
                            d={d}
                            fill="none"
                            stroke={`url(#${arcGrad})`}
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            opacity={0.85}
                          />
                        </g>
                      ) : (
                        <g key={key}>
                          <motion.path
                            d={d}
                            fill="none"
                            stroke="hsl(0 0% 100% / 0.05)"
                            strokeWidth={8}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.85, ease: "easeOut" }}
                          />
                          <motion.path
                            d={d}
                            fill="none"
                            stroke={`url(#${arcGrad})`}
                            strokeWidth={1.75}
                            strokeLinecap="round"
                            filter={`url(#${glowFilter})`}
                            initial={{ pathLength: 0, opacity: 0.4 }}
                            animate={{ pathLength: 1, opacity: [0.55, 0.95, 0.6] }}
                            transition={{
                              pathLength: { duration: 1.7, ease: "easeOut" },
                              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          />
                        </g>
                      );
                    })}

                {THREAT_NODES.map((n, ni) => {
                  const accent = isImpervaTheme
                    ? (IMPERVA_REGION_HEAT[n.id] ?? "#fb923c")
                    : (REGION_ACCENT[n.id] ?? "#fff");
                  return (
                    <g key={n.id}>
                      {!reduceMotion ? (
                        <motion.circle
                          cx={n.x}
                          cy={n.y}
                          fill="none"
                          stroke={isImpervaTheme ? "#fb923c" : accent}
                          strokeWidth={1}
                          strokeOpacity={isImpervaTheme ? 0.45 : 0.35}
                          initial={{ r: 4, opacity: 0.5 }}
                          animate={{ r: 28, opacity: 0 }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: ni * 0.1
                          }}
                        />
                      ) : null}
                      <polygon
                        points={`${n.x},${n.y - 6} ${n.x - 5},${n.y + 5} ${n.x + 5},${n.y + 5}`}
                        fill={isImpervaTheme ? "#fffbeb" : "#fafafa"}
                        opacity={0.94}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div
              className={cn(
                "mt-2 flex flex-wrap items-center gap-2 font-mono text-zinc-600",
                embed ? "text-[8px]" : "mt-4 gap-3 text-[10px]",
                isImpervaTheme && "text-sky-700/90"
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5",
                  isImpervaTheme
                    ? "border-orange-500/35 bg-orange-950/40 text-orange-100/90"
                    : "border-white/10 bg-white/[0.04] text-zinc-400"
                )}
              >
                <Radio
                  className={cn(
                    "h-2.5 w-2.5 motion-safe:animate-pulse",
                    isImpervaTheme ? "text-orange-400" : "text-emerald-500"
                  )}
                  aria-hidden
                />
                {m.live}
              </span>
              <span className="tracking-wide">{m.brandCloud}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
