"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const EngineeringPhilosophySection = (): JSX.Element => {
  const { messages } = useI18n();
  const e = messages.engineeringPhilosophy;

  return (
    <section className="border-b border-border/50 py-14 md:py-18" aria-labelledby="eng-philosophy-heading">
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-fuchsia-500/85">{e.kicker}</p>
          <h2 id="eng-philosophy-heading" className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {e.title}
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {e.quotes.map((q, i) => (
            <motion.li
              key={q.quote}
              className="card-glass-neon-cyan relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent p-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Quote className="absolute right-4 top-4 h-10 w-10 text-cyan-500/15" aria-hidden />
              <p className="text-sm leading-relaxed text-foreground/95 md:text-[0.95rem]">&ldquo;{q.quote}&rdquo;</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{q.attribution}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EngineeringPhilosophySection;
