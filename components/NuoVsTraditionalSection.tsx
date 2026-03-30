"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { useI18n } from "@/lib/i18n/provider";

const springRow: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 28 } }
};

const springFromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 420, damping: 30 } }
};

const springFromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 420, damping: 30 } }
};

const instant: Variants = { hidden: { opacity: 1 }, show: { opacity: 1 } };

const NuoVsTraditionalSection = (): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const { messages } = useI18n();
  const c = messages.nuoVsTraditional;

  const rowBase = reduceMotion ? instant : springRow;
  const slideOld = reduceMotion ? instant : springFromLeft;
  const slideNuo = reduceMotion ? instant : springFromRight;

  return (
    <section
      id="nuo-diferencial"
      className="relative overflow-hidden border-y border-fuchsia-500/10 bg-[#020617] px-4 py-16 sm:px-6 md:py-20 lg:py-28"
      aria-label={c.aria}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-[0.1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,hsl(292_84%_61%/0.12),transparent_45%),radial-gradient(ellipse_at_100%_40%,hsl(187_86%_53%/0.14),transparent_42%)]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto min-w-0 max-w-7xl">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-fuchsia-400/90">{c.kicker}</p>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {c.title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{c.subtitle}</p>
        </motion.div>

        {/* Desktop / tablet: high-tech comparison grid */}
        <div className="hidden min-w-0 md:block">
          <div className="-mx-1 overflow-x-auto overscroll-x-contain pb-1 sm:mx-0 md:overflow-x-visible">
            <div
              className="min-w-[36rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md lg:min-w-0"
              role="table"
              aria-label={c.aria}
            >
            <div
              className="grid grid-cols-[minmax(8rem,10rem)_1fr_1fr] gap-px bg-white/5 font-mono text-[10px] uppercase tracking-[0.18em] md:grid-cols-[minmax(10rem,12rem)_1fr_1fr]"
              role="rowgroup"
            >
              <div
                className="flex items-center bg-[#020617] px-4 py-4 text-muted-foreground md:px-5"
                role="columnheader"
              >
                {c.metricColumn}
              </div>
              <div
                className="relative flex items-center justify-center bg-gradient-to-br from-fuchsia-950/50 to-[#0a0612] px-4 py-4 text-fuchsia-200 shadow-[inset_0_0_32px_hsl(292_84%_61%/0.12)] md:px-5"
                role="columnheader"
              >
                <span className="relative z-10 text-center">{c.oldColumn}</span>
                <span
                  className="pointer-events-none absolute inset-0 border-b border-fuchsia-500/35"
                  aria-hidden
                />
              </div>
              <div
                className="relative flex items-center justify-center bg-gradient-to-br from-cyan-950/40 to-[#020617] px-4 py-4 text-cyan-100 shadow-[0_0_40px_hsl(187_86%_53%/0.12),inset_0_0_28px_hsl(187_86%_53%/0.08)] md:px-5"
                role="columnheader"
              >
                <span className="relative z-10 text-center font-semibold tracking-[0.2em] text-cyan-300">
                  {c.nuoColumn}
                </span>
              </div>
            </div>

            <div className="divide-y divide-white/5" role="rowgroup">
              {c.rows.map((row, index) => (
                <motion.div
                  key={row.id}
                  className="grid grid-cols-1 md:grid-cols-[minmax(10rem,12rem)_1fr_1fr]"
                  role="row"
                  variants={rowBase}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "show"}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={reduceMotion ? undefined : { delay: index * 0.06 }}
                >
                  <div className="border-b border-white/5 bg-[#020617]/90 px-4 py-4 font-heading text-sm font-bold text-foreground md:border-b-0 md:px-5 md:py-5">
                    {row.label}
                  </div>
                  <motion.div
                    className="border-b border-fuchsia-500/15 bg-fuchsia-950/[0.15] px-4 py-4 text-sm leading-relaxed text-fuchsia-100/85 md:border-b-0 md:px-5 md:py-5 md:shadow-[inset_4px_0_0_hsl(292_84%_61%/0.5)]"
                    role="cell"
                    variants={slideOld}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView={reduceMotion ? undefined : "show"}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={reduceMotion ? undefined : { delay: 0.04 + index * 0.06 }}
                  >
                    {row.oldWay}
                  </motion.div>
                  <motion.div
                    className="bg-cyan-950/[0.12] px-4 py-4 text-sm leading-relaxed text-cyan-50/95 md:px-5 md:py-5 md:shadow-[inset_4px_0_0_hsl(187_86%_53%/0.65),0_0_24px_hsl(187_86%_53%/0.06)]"
                    role="cell"
                    variants={slideNuo}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView={reduceMotion ? undefined : "show"}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={reduceMotion ? undefined : { delay: 0.08 + index * 0.06 }}
                  >
                    {row.nuoWay}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Mobile: stacked “agile” cards */}
        <ul className="flex flex-col gap-4 md:hidden">
          {c.rows.map((row, index) => (
            <motion.li
              key={row.id}
              variants={rowBase}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "show"}
              viewport={{ once: true, margin: "-20px" }}
              transition={reduceMotion ? undefined : { delay: index * 0.07 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
            >
              <p className="border-b border-white/10 bg-[#020617] px-4 py-3 font-heading text-sm font-bold text-foreground">
                {row.label}
              </p>
              <motion.div
                className="border-b border-fuchsia-500/20 bg-fuchsia-950/25 px-4 py-3 text-sm text-fuchsia-100/90"
                variants={slideOld}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true }}
              >
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-400/90">
                  {c.oldColumn}
                </span>
                {row.oldWay}
              </motion.div>
              <motion.div
                className="bg-cyan-950/30 px-4 py-3 text-sm text-cyan-50 shadow-[inset_0_1px_0_0_hsl(187_86%_53%/0.25)]"
                variants={slideNuo}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true }}
              >
                <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                  {c.nuoColumn}
                </span>
                {row.nuoWay}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NuoVsTraditionalSection;
