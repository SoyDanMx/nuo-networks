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
    offset: ["start 0.8", "end 0.25"]
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4
  });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden border-b border-border/60 bg-[#020617] px-6 py-16 md:py-24"
      aria-labelledby="journey-heading"
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid-bg opacity-[0.08]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.06),transparent_55%)]"
        aria-hidden={true}
      />

      <div className="container relative mx-auto max-w-6xl">
        <div className="mb-12 text-center md:text-left">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">{j.kicker}</p>
          <h2
            id="journey-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {j.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:mx-0">{j.subtitle}</p>
        </div>

        {/* Línea horizontal con glow según scroll (desktop) */}
        <div className="relative mb-8 hidden md:block">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-border/50" />
          <motion.div
            className="relative h-[3px] origin-left rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-fuchsia-500 shadow-[0_0_24px_hsl(187_86%_53%/0.55)]"
            style={{ scaleX: reduceMotion ? 1 : lineProgress }}
          />
        </div>

        <ol
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:thin] md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:pb-0 md:pt-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-500/30"
        >
          {j.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Compass;
            return (
              <motion.li
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="relative min-w-[min(88vw,20rem)] shrink-0 snap-center rounded-2xl border border-cyan-500/15 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_0_hsl(var(--primary)/0.08)] backdrop-blur-md transition-shadow duration-300 hover:border-cyan-500/35 hover:shadow-[0_0_32px_hsl(187_86%_53%/0.15)] md:min-w-0"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/35 bg-cyan-500/10 text-cyan-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {j.step} {index + 1}
                </p>
                <h3 className="font-heading text-base font-bold text-foreground md:text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ProjectJourneySection;
