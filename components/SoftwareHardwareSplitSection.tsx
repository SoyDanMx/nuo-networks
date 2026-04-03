"use client";

import { motion } from "framer-motion";
import { Box, Code2 } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const SoftwareHardwareSplitSection = (): JSX.Element => {
  const { messages } = useI18n();
  const s = messages.softwareHardware;

  return (
    <section
      id="software-hardware"
      className="scroll-mt-24 border-b border-border/50 bg-[#020617]/50 py-16 md:py-22"
      aria-labelledby="sw-hw-heading"
    >
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-secondary/90">{s.kicker}</p>
          <h2 id="sw-hw-heading" className="mt-3 text-balance font-heading text-2xl font-bold text-foreground md:text-4xl">
            {s.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{s.lead}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          <motion.div
            className="ecosystem-bento-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="ecosystem-bento-card__inner p-6 md:p-8">
              <div className="mb-4 inline-flex rounded-lg border border-white/15 bg-white/5 p-2 text-muted-foreground">
                <Box className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-balance font-heading text-lg font-semibold text-foreground">{s.hardwareTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {s.hardwareBullets.map((line) => (
                  <li key={line} className="flex gap-2 border-l-2 border-cyan-500/25 pl-3">
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="ecosystem-bento-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.06 }}
          >
            <div className="ecosystem-bento-card__inner bg-gradient-to-br from-cyan-500/[0.06] to-fuchsia-500/[0.05] p-6 md:p-8">
              <div className="mb-4 inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-300">
                <Code2 className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-balance font-heading text-lg font-semibold text-foreground">{s.softwareTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {s.softwareBullets.map((line) => (
                  <li key={line} className="flex gap-2 border-l-2 border-cyan-500/40 pl-3">
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SoftwareHardwareSplitSection;
