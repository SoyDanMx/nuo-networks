"use client";

import { motion } from "framer-motion";
import { Activity, Bell, Radio, Server } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const SocDashboardPreview = (): JSX.Element => {
  const { messages } = useI18n();
  const s = messages.socDashboard;
  const barHeights = [38, 62, 45, 78, 52, 88, 41, 69];

  const linePath =
    "M 0 78 L 28 58 L 56 68 L 84 38 L 112 48 L 140 28 L 168 42 L 196 18 L 200 32";

  return (
    <section className="border-b border-border/50 py-16 md:py-22" aria-labelledby="soc-preview-heading">
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-500/80">{s.kicker}</p>
          <h2 id="soc-preview-heading" className="mt-3 font-heading text-2xl font-bold text-foreground md:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{s.subtitle}</p>
        </div>

        <motion.div
          className="card-glass-neon-cyan card-glass-neon-cyan--dark mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl shadow-[0_0_64px_rgba(6,182,212,0.14)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 md:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                <Server className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.panelLabel}</p>
                <p className="font-heading text-sm font-semibold text-foreground">{s.panelTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
              <Radio className="h-3.5 w-3.5 animate-pulse" aria-hidden />
              {s.liveBadge}
            </div>
          </div>

          <div className="grid gap-4 p-3 sm:gap-6 sm:p-5 md:grid-cols-12 md:gap-8 md:p-6">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:col-span-12">
              {s.kpis.map((k) => (
                <div
                  key={k.label}
                  className="min-w-0 flex-1 basis-[calc(50%-0.25rem)] rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 sm:min-w-[140px] sm:basis-auto sm:px-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</p>
                  <p className="mt-1 font-heading text-xl font-bold tabular-nums text-cyan-300 md:text-2xl">{k.value}</p>
                </div>
              ))}
            </div>

            <div className="md:col-span-7">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.chartBarsTitle}</p>
              <div className="flex h-40 items-end justify-between gap-1.5 rounded-xl border border-white/10 bg-black/30 px-3 pb-2 pt-4">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-full max-w-[2.5rem] rounded-t bg-gradient-to-t from-cyan-600/30 to-cyan-400/90"
                    initial={{ height: "8%" }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{s.chartLineTitle}</p>
              <div className="relative h-40 rounded-xl border border-white/10 bg-black/30 p-3">
                <svg className="h-full w-full" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <linearGradient id="socLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(217,70,239,0.25)" />
                      <stop offset="100%" stopColor="rgba(6,182,212,0.95)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="url(#socLine)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.15, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-fuchsia-500/25 bg-fuchsia-500/10 px-2 py-1 text-[10px] text-fuchsia-200">
                  <Bell className="h-3 w-3" aria-hidden />
                  {s.alertChip}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:col-span-12">
              <Activity className="h-4 w-4 text-cyan-500/60" aria-hidden />
              <p className="text-xs text-muted-foreground">{s.simDisclaimer}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocDashboardPreview;
