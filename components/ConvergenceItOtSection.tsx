"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Server, Shield, Smartphone, Video } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

function ConvergenceDiagram({ caption }: { caption: string }): JSX.Element {
  const { messages } = useI18n();
  const d = messages.convergenceItOt;
  const reduceMotion = useReducedMotion();

  return (
    <figure className="relative mx-auto w-full max-w-lg" aria-label={d.diagramAria}>
      <svg
        viewBox="0 0 400 320"
        className="h-auto w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <title>{d.diagramAria}</title>
        <defs>
          <linearGradient id="shield-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glow-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shield */}
        <motion.path
          d="M200 28 L328 52 L328 168 Q328 238 200 288 Q72 238 72 168 L72 52 Z"
          stroke="url(#shield-stroke)"
          strokeWidth="2.5"
          filter="url(#glow-soft)"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <path
          d="M200 28 L328 52 L328 168 Q328 238 200 288 Q72 238 72 168 L72 52 Z"
          fill="url(#shield-stroke)"
          fillOpacity="0.04"
          stroke="none"
        />

        {/* Synapse lines */}
        <motion.path
          d="M 118 175 L 200 130 L 282 175"
          stroke="url(#line-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow-strong)"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
        />
        <motion.line
          x1="200"
          y1="130"
          x2="200"
          y2="195"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeOpacity="0.65"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.75 }}
        />

        {/* Node halos */}
        <circle cx="118" cy="175" r="28" fill="#d946ef" fillOpacity="0.08" filter="url(#glow-soft)" />
        <circle cx="200" cy="130" r="32" fill="#06b6d4" fillOpacity="0.1" filter="url(#glow-soft)" />
        <circle cx="282" cy="175" r="28" fill="#06b6d4" fillOpacity="0.08" filter="url(#glow-soft)" />
      </svg>

      {/* Icon nodes — positioned to match SVG coordinates (400x320) */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[17%] top-[48%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.45 }}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-500/40 bg-fuchsia-500/15 text-fuchsia-300 shadow-[0_0_24px_hsl(292_84%_61%/0.35)]">
            <Video className="h-7 w-7" aria-hidden />
          </span>
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-[33%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.55 }}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/50 bg-cyan-500/20 text-cyan-200 shadow-[0_0_32px_hsl(187_86%_53%/0.45)]">
            <Server className="h-8 w-8" aria-hidden />
          </span>
        </motion.div>
        <motion.div
          className="absolute left-[83%] top-[48%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 380, damping: 26, delay: 0.65 }}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/35 bg-cyan-500/10 text-cyan-300 shadow-[0_0_24px_hsl(187_86%_53%/0.3)]">
            <Smartphone className="h-7 w-7" aria-hidden />
          </span>
        </motion.div>
      </div>

      <figcaption className="mt-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/95">
          <Shield className="h-3.5 w-3.5 text-cyan-400" aria-hidden />
          {caption}
        </div>
      </figcaption>
    </figure>
  );
}

const ConvergenceItOtSection = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const c = messages.convergenceItOt;

  const nodes = [
    { key: "cctv" as const, Icon: Video, tone: "magenta" as const },
    { key: "server" as const, Icon: Server, tone: "cyan" as const },
    { key: "mobile" as const, Icon: Smartphone, tone: "cyan" as const }
  ];

  return (
    <section
      id="convergencia-it-ot"
      className="relative overflow-hidden bg-[#020617] px-6 py-20 md:py-28"
      aria-labelledby="convergence-heading"
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-[0.09]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(187_86%_53%/0.1),transparent_38%),radial-gradient(circle_at_20%_80%,hsl(292_84%_61%/0.08),transparent_35%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <motion.p
              className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-cyan-400"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {c.kicker}
            </motion.p>
            <motion.h2
              id="convergence-heading"
              className="mb-6 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.04 }}
            >
              {c.title}
            </motion.h2>
            <motion.p
              className="mb-4 bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text font-heading text-xl font-bold leading-snug text-transparent md:text-2xl"
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.08 }}
            >
              {c.headline}
            </motion.p>
            <motion.p
              className="mb-4 text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
            >
              {c.lead}
            </motion.p>
            <motion.p
              className="text-sm leading-relaxed text-muted-foreground/95 md:text-base"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
            >
              {c.body}
            </motion.p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-1">
              {nodes.map(({ key, Icon, tone }, i) => (
                <motion.li
                  key={key}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 backdrop-blur-sm ${
                    tone === "magenta"
                      ? "border-fuchsia-500/25 bg-fuchsia-500/[0.06] shadow-[inset_0_0_0_1px_hsl(292_84%_61%/0.12)]"
                      : "border-cyan-500/25 bg-cyan-500/[0.06] shadow-[inset_0_0_0_1px_hsl(187_86%_53%/0.12)]"
                  }`}
                  initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28, delay: 0.08 * i }}
                >
                  <span
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                      tone === "magenta"
                        ? "border-fuchsia-500/35 bg-fuchsia-500/15 text-fuchsia-300"
                        : "border-cyan-500/35 bg-cyan-500/15 text-cyan-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/95">{c.nodes[key]}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.06 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/15 bg-white/[0.02] p-6 shadow-[0_0_60px_hsl(187_86%_53%/0.08),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md md:p-8">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/15 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-500/15 blur-3xl"
                aria-hidden
              />
              <ConvergenceDiagram caption={c.shieldCaption} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConvergenceItOtSection;
