"use client";

import { motion } from "framer-motion";
import { Camera, Cpu, Network, ShieldCheck } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const OtCybersecuritySection = (): JSX.Element => {
  const { messages } = useI18n();
  const o = messages.otCyber;
  const icons = [Camera, Cpu, Network, ShieldCheck];

  return (
    <section
      id="ot-cyber"
      className="scroll-mt-24 border-b border-border/50 bg-gradient-to-b from-background to-[#020617]/90 py-16 md:py-22"
      aria-labelledby="ot-cyber-heading"
    >
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-400/90">{o.kicker}</p>
          <h2 id="ot-cyber-heading" className="mt-3 font-heading text-2xl font-bold text-foreground md:text-4xl">
            {o.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{o.lead}</p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {o.points.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.li
                key={p.title}
                className="card-glass-neon-cyan rounded-2xl p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="mb-3 inline-flex rounded-lg border border-cyan-500/25 bg-cyan-500/10 p-2 text-cyan-400">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </motion.li>
            );
          })}
        </ul>

        <motion.p
          className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground/90 md:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {o.disclaimer}
        </motion.p>
      </div>
    </section>
  );
};

export default OtCybersecuritySection;
