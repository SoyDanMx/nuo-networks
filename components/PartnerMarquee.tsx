"use client";

import type { Route } from "next";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { PartnerBrandLogo } from "@/components/PartnerBrandLogo";
import { useI18n } from "@/lib/i18n/provider";
import { localizedPath } from "@/lib/i18n/paths";

const PartnerMarquee = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { locale, messages } = useI18n();
  const p = messages.partners;
  const brandsPageHref = localizedPath(locale, "/marcas") as Route;
  const brands = p.brands;
  const doubled = [...brands, ...brands];

  return (
    <section
      className="border-b border-border/60 bg-[#020617]/90 py-8"
      aria-label={p.aria}
    >
      <div className="container mx-auto min-w-0 px-4 sm:px-6">
        <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-primary/90">{p.kicker}</p>
        <p className="mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/90">
          <Link
            href={brandsPageHref}
            className="text-cyan-400/90 underline-offset-2 transition-colors hover:text-cyan-300 hover:underline"
          >
            {p.pageLink}
          </Link>
          <span className="hidden text-border sm:inline" aria-hidden>
            ·
          </span>
          <a
            href="https://www.epcom.net/principal/brands"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 transition-colors hover:text-primary hover:underline"
          >
            {p.sourceLabel}
          </a>
        </p>
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent"
            aria-hidden={true}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent"
            aria-hidden={true}
          />
          <motion.div
            className="flex w-max items-center gap-10 md:gap-14"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 48, repeat: Infinity, ease: "linear", repeatType: "loop" }
            }
          >
            {doubled.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="shrink-0 opacity-90 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              >
                <PartnerBrandLogo brandId={brand.id} label={brand.label} variant="marquee" />
              </div>
            ))}
          </motion.div>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[11px] leading-relaxed text-muted-foreground">{p.note}</p>
      </div>
    </section>
  );
};

export default PartnerMarquee;
