"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Compass, Hammer, LineChart, Lock, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

import { useI18n } from "@/lib/i18n/provider";

const stepIcons: LucideIcon[] = [Compass, Lock, Hammer, Rocket, LineChart];

const ProjectJourneySection = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const j = messages.journey;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.2"]
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4
  });

  const progressStyle = reduceMotion ? 1 : lineProgress;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden border-b border-border/60 bg-[#020617] px-4 py-14 sm:px-6 sm:py-16 md:py-24"
      aria-labelledby="journey-heading"
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(292_84%_61%/0.08),transparent_55%)]"
        aria-hidden={true}
      />

      <div className="container relative mx-auto min-w-0 max-w-6xl">
        <div className="mb-10 text-center md:mb-12 md:text-left">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-400/85">{j.kicker}</p>
          <h2
            id="journey-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {j.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:mx-0">{j.subtitle}</p>
        </div>

        {/* Desktop: horizontal magenta progress + row */}
        <div className="relative mb-10 hidden md:block">
          <div className="h-1.5 w-full rounded-full bg-white/[0.08]" />
          <motion.div
            className="absolute left-0 top-0 h-1.5 w-full origin-left rounded-full bg-gradient-to-r from-fuchsia-600 via-fuchsia-400 to-fuchsia-500 shadow-[0_0_28px_rgba(217,70,239,0.55),0_0_48px_rgba(217,70,239,0.25)]"
            style={{ scaleX: progressStyle }}
          />
        </div>

        <ol className="relative hidden gap-4 md:grid md:grid-cols-5 md:gap-3">
          {j.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Compass;
            return (
              <motion.li
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="card-glass-neon-cyan relative rounded-2xl p-5"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {j.step} {index + 1}
                </p>
                <h3 className="font-heading text-base font-bold tracking-tight text-foreground md:text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.li>
            );
          })}
        </ol>

        {/* Mobile: vertical timeline + magenta fill */}
        <div className="relative md:hidden">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-white/12" aria-hidden />
          <motion.div
            className="absolute bottom-2 left-[15px] top-2 w-[3px] -translate-x-px origin-top rounded-full bg-gradient-to-b from-fuchsia-500 via-fuchsia-400 to-fuchsia-600 shadow-[0_0_20px_rgba(217,70,239,0.45)]"
            style={{ scaleY: progressStyle }}
          />
          <ol className="relative space-y-8 pl-10">
            {j.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? Compass;
              return (
                <motion.li
                  key={`m-${step.id}`}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="relative"
                >
                  <span
                    className="absolute left-[-1.4rem] top-3 flex h-3 w-3 -translate-x-1/2 rounded-full border-2 border-fuchsia-400/90 bg-[#020617] shadow-[0_0_12px_rgba(217,70,239,0.5)]"
                    aria-hidden
                  />
                  <div className="card-glass-neon-cyan rounded-2xl p-5">
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {j.step} {index + 1}
                    </p>
                    <h3 className="font-heading text-base font-bold tracking-tight text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProjectJourneySection;
