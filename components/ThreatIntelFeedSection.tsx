"use client";

import { motion } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const ThreatIntelFeedSection = (): JSX.Element => {
  const { messages } = useI18n();
  const t = messages.threatIntel;

  return (
    <section className="border-b border-border/50 bg-[#020617]/40 py-14 md:py-18" aria-labelledby="threat-intel-heading">
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-500/80">{t.kicker}</p>
          <h2 id="threat-intel-heading" className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{t.subtitle}</p>
        </div>

        <ul className="mx-auto mt-10 max-w-3xl space-y-3">
          {t.items.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-glass-neon-cyan flex items-start gap-4 rounded-xl px-4 py-3"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                  <Newspaper className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-medium text-foreground group-hover:text-cyan-200">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{item.source}</span>
                </span>
                <ExternalLink
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground/90">{t.disclaimer}</p>
      </div>
    </section>
  );
};

export default ThreatIntelFeedSection;
