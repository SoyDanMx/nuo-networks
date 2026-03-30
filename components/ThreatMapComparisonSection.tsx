"use client";

import { motion, useReducedMotion } from "framer-motion";

import CompetitorStyleThreatMap from "@/components/CompetitorStyleThreatMap";
import HeroThreatMap from "@/components/HeroThreatMap";
import { useI18n } from "@/lib/i18n/provider";

const ThreatMapComparisonSection = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const c = messages.threatMapCompare;

  return (
    <section
      id="threat-map-compare"
      className="relative overflow-hidden border-y border-cyan-500/10 bg-[#020617] px-6 py-16 md:py-24"
      aria-labelledby="threat-map-compare-heading"
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,hsl(0_84%_45%/0.08),transparent_42%),radial-gradient(ellipse_at_70%_100%,hsl(187_86%_53%/0.1),transparent_45%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-400/90">{c.kicker}</p>
          <h2
            id="threat-map-compare-heading"
            className="mb-4 font-heading text-2xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {c.title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{c.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-red-400/90">{c.competitorStyle.cardLabel}</p>
            <CompetitorStyleThreatMap />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 280, damping: 26, delay: 0.06 }}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/90">{c.nuo.cardLabel}</p>
            <HeroThreatMap />
          </motion.div>
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-4xl text-center font-mono text-[10px] leading-relaxed text-muted-foreground md:text-xs"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
        >
          {c.sectionDisclaimer}
        </motion.p>
      </div>
    </section>
  );
};

export default ThreatMapComparisonSection;
