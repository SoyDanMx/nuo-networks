"use client";

import { useI18n } from "@/lib/i18n/provider";

const WhyNuoSection = (): JSX.Element => {
  const { messages } = useI18n();
  const w = messages.whyNuo;

  return (
    <section className="px-6 py-16 md:py-20" aria-labelledby="why-nuo-heading">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-secondary">{w.kicker}</p>
        <h2
          id="why-nuo-heading"
          className="font-heading text-2xl font-bold leading-tight text-foreground md:text-4xl"
        >
          {w.title}
        </h2>
        <div className="mt-8 space-y-4 text-left text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{w.p1}</p>
          <p>{w.p2}</p>
        </div>
        <p className="mt-8 font-mono text-sm text-primary">{w.signoff}</p>
      </div>
    </section>
  );
};

export default WhyNuoSection;
