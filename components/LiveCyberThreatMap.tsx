"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { LiveThreatMapPanel } from "@/components/LiveThreatMapPanel";
import { useI18n } from "@/lib/i18n/provider";
import { localizedHome } from "@/lib/i18n/paths";

const LiveCyberThreatMap = (): JSX.Element => {
  const { locale, messages } = useI18n();
  const m = messages.liveThreatMap;
  const homeHref = localizedHome(locale) as Route;
  const contactHref = `${localizedHome(locale)}#contact` as Route;

  return (
    <div
      className="relative flex min-h-[100dvh] min-w-0 flex-col bg-[#020617] text-foreground [background:radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(215_45%_12%)_0%,hsl(225_50%_6%)_35%,#020617_70%)]"
      aria-label={m.aria}
    >
      <header className="relative z-30 flex flex-wrap items-center justify-between gap-3 border-b border-sky-950/50 bg-[#050a14]/80 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8">
        <Link href={homeHref} className="inline-flex shrink-0 items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
          <Image
            src="/logos/nuo-logo-white.png"
            alt="NUO Networks"
            width={160}
            height={40}
            className="hidden h-8 w-auto md:block"
          />
          <Image src="/logos/nuo-isotype-white.png" alt="" width={32} height={32} className="h-8 w-8 md:hidden" />
        </Link>
        <a
          href={contactHref}
          className="hidden max-w-[min(100%,12rem)] rounded border border-white/15 bg-white/[0.03] px-3 py-1.5 text-right font-mono text-[10px] font-medium uppercase leading-snug tracking-wide text-zinc-300 transition-colors hover:border-white/25 hover:text-white sm:block"
        >
          {m.ctaShort}
        </a>
      </header>

      <section
        className="relative z-20 border-b border-sky-950/40 px-4 py-5 sm:px-8 sm:py-6"
        aria-labelledby="threat-map-heading"
      >
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.35em] text-sky-500/90">{m.kicker}</p>
        <h1 id="threat-map-heading" className="mt-2 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl">
          {m.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{m.mapSubtitle}</p>
      </section>

      <LiveThreatMapPanel density="page" theme="imperva" className="min-h-0 flex-1" />

      <footer className="relative z-20 flex flex-col items-center gap-3 border-t border-sky-950/40 px-4 py-5 sm:flex-row sm:justify-between sm:px-8">
        <p className="max-w-xl text-center font-mono text-[10px] leading-relaxed text-zinc-600 sm:text-left">{m.disclaimer}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={contactHref}
            className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline sm:hidden"
          >
            {m.cta}
          </a>
          <Link
            href={contactHref}
            className="inline-flex items-center gap-1 rounded-full border border-zinc-800 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
          >
            <ChevronDown className="h-4 w-4" aria-hidden />
            {m.scrollHint}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LiveCyberThreatMap;
