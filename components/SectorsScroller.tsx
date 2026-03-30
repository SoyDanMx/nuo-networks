"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const accentById: Record<string, "cyan" | "magenta"> = {
  mfg: "cyan",
  log: "cyan",
  corp: "magenta",
  ret: "magenta",
  fin: "cyan"
};

const SectorsScroller = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const sec = messages.sectors;
  const cards = messages.sectorCards;

  return (
    <section
      id="sectors"
      className="border-b border-border/60 py-14 md:py-16"
      aria-labelledby="sectors-scroller-heading"
    >
      <div className="container mx-auto mb-6 px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-secondary">
              {sec.kicker}
            </p>
            <h2
              id="sectors-scroller-heading"
              className="font-heading text-2xl font-bold text-foreground md:text-3xl"
            >
              {sec.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">{sec.subtitle}</p>
        </div>
      </div>

      <div className="relative">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 pt-1 md:px-[max(1.5rem,calc(50vw-40rem))]"
          style={{ scrollbarWidth: "thin" }}
        >
          {cards.map((item, index) => {
            const accent = accentById[item.id] ?? "cyan";
            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                className={`min-w-[240px] max-w-[260px] shrink-0 snap-start rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                  accent === "cyan"
                    ? "border-primary/35 bg-card/80 hover:border-primary/60 hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]"
                    : "border-secondary/35 bg-card/80 hover:border-secondary/60 hover:shadow-[0_0_24px_hsl(var(--secondary)/0.2)]"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {sec.sectorLabel}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectorsScroller;
