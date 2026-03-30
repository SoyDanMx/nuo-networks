"use client";

import { motion } from "framer-motion";
import { Building2, Factory, Truck } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const IndustryUseCasesSection = (): JSX.Element => {
  const { messages } = useI18n();
  const u = messages.industryUseCases;
  const icons = [Truck, Factory, Building2];

  return (
    <section className="border-b border-border/50 py-14 md:py-18" aria-labelledby="industry-use-heading">
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-500/80">{u.kicker}</p>
          <h2 id="industry-use-heading" className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {u.title}
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {u.cards.map((card, i) => {
            const Icon = icons[i] ?? Building2;
            return (
              <motion.article
                key={card.title}
                className="card-glass-neon-cyan rounded-2xl p-5 md:p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Icon className="h-8 w-8 text-cyan-400/90" aria-hidden />
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryUseCasesSection;
