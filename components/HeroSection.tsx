"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight, Search } from "lucide-react";

import HeroNeuralField from "@/components/HeroNeuralField";
import HeroThreatMap from "@/components/HeroThreatMap";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHash } from "@/lib/i18n/paths";

const HeroSection = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const hero = messages.hero;
  const chips = [hero.chip1, hero.chip2, hero.chip3];

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col items-center overflow-hidden bg-[#020617] pt-24 pb-16 md:min-h-[calc(100dvh-4.5rem)] md:pt-28 md:pb-20"
      aria-label={hero.aria}
    >
      <HeroNeuralField>
        <div className="absolute left-1/2 top-1/2 h-[min(90vw,52rem)] w-[min(90vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
      </HeroNeuralField>

      <motion.div
        className="pointer-events-none absolute inset-x-0 z-[1] h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
        animate={{ y: ["-48vh", "48vh"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 w-full px-6 pb-8 pt-4 md:pb-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          <motion.div
            className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/35 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 }}
            >
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 md:text-sm">{hero.badge}</span>
            </motion.div>

            <h1 className="mb-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-foreground">{hero.titleLine1}</span>
              <span className="mt-1 block">
                <span className="glow-text bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {hero.titleHighlight}
                </span>
                <span className="text-foreground">{hero.titleMid}</span>
                <span className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 bg-clip-text text-transparent">
                  {hero.titleEnd}
                </span>
              </span>
            </h1>

            <motion.p
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              {(() => {
                const parts = hero.subtitle.split(hero.subtitleBold);
                return (
                  <>
                    {parts[0]}
                    <span className="font-semibold text-cyan-400">{hero.subtitleBold}</span>
                    {parts.slice(1).join(hero.subtitleBold)}
                  </>
                );
              })()}
            </motion.p>

            <motion.div
              className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
              aria-label={hero.chipsAria}
            >
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
            >
              <a href={localizedHash(locale, "#nuo-ecosystem")}>
                <Button variant="cyber-solid" size="lg" className="px-8 py-6 text-base shadow-nuo-cyan">
                  <Shield className="mr-2 h-5 w-5" />
                  {hero.ctaExplore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href={localizedHash(locale, "#journey")}>
                <Button variant="cyber" size="lg" className="px-8 py-6 text-base">
                  <Search className="mr-2 h-5 w-5" />
                  {hero.ctaAudit}
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-6 lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62 }}
            >
              {[
                { value: "99.9%", label: hero.stat1 },
                { value: "24/7", label: hero.stat2 },
                { value: "0", label: hero.stat3 }
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-mono text-2xl font-bold text-cyan-400 md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroThreatMap />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
