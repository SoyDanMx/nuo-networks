"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PartnerBrandLogo } from "@/components/PartnerBrandLogo";
import { useI18n } from "@/lib/i18n/provider";

const TrustTickerSection = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const t = messages.trustTicker;
  const brands = t.brands;
  const doubled = [...brands, ...brands];

  return (
    <section
      className="border-b border-white/[0.06] bg-[#020617]/95 py-5"
      aria-label={t.aria}
    >
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/90">
          {t.kicker}
        </p>
        <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] py-4 backdrop-blur-md">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#020617] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#020617] to-transparent"
            aria-hidden
          />
          <motion.div
            className="flex w-max items-center gap-12 md:gap-16"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 56, repeat: Infinity, ease: "linear", repeatType: "loop" }
            }
          >
            {doubled.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="shrink-0 rounded-xl px-2 py-1 opacity-[0.72] grayscale contrast-[0.92] transition-[opacity,box-shadow,filter] duration-300 hover:z-10 hover:opacity-100 hover:shadow-[0_0_28px_rgba(6,182,212,0.42),0_0_12px_rgba(6,182,212,0.2)] hover:grayscale"
              >
                <PartnerBrandLogo brandId={brand.id} label={brand.label} variant="marquee" />
              </div>
            ))}
          </motion.div>
        </div>
        <p className="mx-auto mt-2 max-w-xl text-center text-[10px] leading-relaxed text-muted-foreground/80">
          {t.note}
        </p>
      </div>
    </section>
  );
};

export default TrustTickerSection;
