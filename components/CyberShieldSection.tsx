"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code, Network, Server, Video, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type PillarTone = "cyan" | "magenta";

const iconById: Record<string, LucideIcon> = {
  "logical-defense": Zap,
  "patrimonial-security": Video,
  "networking-servers": Network,
  "critical-infrastructure": Server,
  "nuo-labs": Code
};

const toneById: Record<string, PillarTone> = {
  "logical-defense": "cyan",
  "patrimonial-security": "magenta",
  "networking-servers": "cyan",
  "critical-infrastructure": "cyan",
  "nuo-labs": "magenta"
};

const iconToneStyles: Record<PillarTone, string> = {
  cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
  magenta: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-400"
};

const keywordToneStyles: Record<PillarTone, string> = {
  cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
  magenta: "border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-300"
};

const providerToneStyles: Record<PillarTone, string> = {
  cyan: "text-cyan-400/95",
  magenta: "text-fuchsia-400/95"
};

/** Resalta términos entre |pipes| con font-semibold para escaneo rápido. */
function renderSummaryWithEmphasis(text: string): ReactNode {
  const parts = text.split(/(\|[^|]+\|)/g);
  return parts.map((part, i) => {
    if (part.startsWith("|") && part.endsWith("|")) {
      const inner = part.slice(1, -1);
      return (
        <span key={i} className="font-semibold text-foreground/95">
          {inner}
        </span>
      );
    }
    return part;
  });
}

const CyberShieldSection = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const eco = messages.ecosystem;
  const pillars = eco.pillars;

  return (
    <section
      id="nuo-ecosystem"
      className="relative overflow-hidden border-y border-cyan-500/10 bg-[#020617] px-4 py-16 sm:px-6 sm:py-20 md:py-28"
      aria-label={eco.aria}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.1),transparent_40%),radial-gradient(circle_at_80%_25%,hsl(var(--secondary)/0.08),transparent_32%)]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto min-w-0 max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 md:mb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-cyan-400">{eco.kicker}</p>
          <h2 className="mb-4 text-balance font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {eco.title}
          </h2>
          <p className="text-balance text-base text-muted-foreground md:text-lg">{eco.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {pillars.map((pillar, index) => {
            const Icon = iconById[pillar.id] ?? Zap;
            const tone = toneById[pillar.id] ?? "cyan";
            const isCore = Boolean((pillar as { isCore?: boolean }).isCore);

            return (
              <motion.article
                key={pillar.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="ecosystem-bento-card group hover:-translate-y-1"
              >
                <div className="ecosystem-bento-card__inner relative overflow-hidden p-6 transition-[box-shadow] duration-300 group-hover:shadow-[0_0_32px_rgba(6,182,212,0.12)] sm:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  {isCore ? (
                    <span className="absolute right-3 top-3 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300 sm:right-4 sm:top-4 sm:px-3 sm:text-[10px] sm:tracking-[0.18em]">
                      {eco.expertBadge}
                    </span>
                  ) : null}

                  <div
                    className={cn(
                      "relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border",
                      iconToneStyles[tone]
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <h3 className="relative mb-3 text-balance font-heading text-lg font-bold text-foreground md:text-xl">
                    {pillar.title}
                  </h3>

                  <p className="relative mb-4 text-sm leading-relaxed text-muted-foreground">
                    {renderSummaryWithEmphasis(pillar.summary)}
                  </p>

                  <p
                    className={`relative mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] ${providerToneStyles[tone]}`}
                  >
                    {pillar.provider}
                  </p>

                  <div className="relative mb-5 flex flex-wrap gap-2">
                    {pillar.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${keywordToneStyles[tone]}`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <p className="relative text-sm leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">{eco.highlightLabel}</span> {pillar.highlight}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CyberShieldSection;
