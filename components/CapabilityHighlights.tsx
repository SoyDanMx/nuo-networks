"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flame } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const CapabilityHighlights = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const h = messages.highlights;

  return (
    <section
      id="highlights"
      className="relative overflow-hidden border-b border-border/60 px-6 py-16 md:py-20"
      aria-labelledby="highlights-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,hsl(var(--secondary)/0.12),transparent),radial-gradient(ellipse_60%_40%_at_10%_100%,hsl(var(--primary)/0.08),transparent)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" aria-hidden="true" />
      <div className="container relative mx-auto max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">{h.kicker}</p>
          <h2
            id="highlights-heading"
            className="font-heading text-2xl font-bold text-foreground md:text-4xl"
          >
            {h.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground md:mx-0">{h.subtitle}</p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {h.items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="flex gap-4 rounded-2xl border border-border/70 bg-gradient-to-br from-card/80 via-card/50 to-card/30 p-5 shadow-[0_0_0_1px_hsl(var(--primary)/0.06)] backdrop-blur-sm transition-all hover:border-primary/45 hover:shadow-[0_0_32px_hsl(var(--primary)/0.18),0_0_0_1px_hsl(var(--primary)/0.12)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-secondary/40 bg-secondary/10 text-secondary">
                <Flame className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {item.hotLabel}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CapabilityHighlights;
