"use client";

import { motion } from "framer-motion";

import { PartnerBrandLogo } from "@/components/PartnerBrandLogo";
import { useI18n } from "@/lib/i18n/provider";

const AuthorityPartnersSection = (): JSX.Element => {
  const { messages } = useI18n();
  const a = messages.authorityPartners;

  return (
    <section
      className="border-y border-white/[0.06] bg-[#020617]/80 py-14 md:py-18"
      aria-labelledby="authority-partners-heading"
    >
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-500/80">{a.kicker}</p>
          <h2 id="authority-partners-heading" className="mt-3 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {a.title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{a.subtitle}</p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {a.brands.map((b, i) => (
            <motion.div
              key={b.id}
              className="group card-glass-neon-cyan flex flex-col items-center justify-center rounded-2xl px-4 py-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.24) }}
            >
              <div className="w-full max-w-[220px] saturate-[0.28] opacity-[0.88] contrast-[0.96] transition-all duration-500 group-hover:saturate-[0.55] group-hover:opacity-100">
                <PartnerBrandLogo brandId={b.id} label={b.label} variant="grid" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorityPartnersSection;
