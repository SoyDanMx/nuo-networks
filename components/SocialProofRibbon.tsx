"use client";

import { Activity, Globe2, Shield } from "lucide-react";

import { useI18n } from "@/lib/i18n/provider";

const icons = [Activity, Shield, Globe2] as const;

const SocialProofRibbon = (): JSX.Element => {
  const { messages } = useI18n();
  const s = messages.socialRibbon;
  const stats = s.stats;

  return (
    <div
      className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-card/50 via-card/25 to-background/80 backdrop-blur-md"
      role="region"
      aria-label={s.aria}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,hsl(var(--primary)/0.04)_0%,transparent_35%,hsl(var(--secondary)/0.05)_100%)]"
        aria-hidden="true"
      />
      <div className="container relative mx-auto flex min-w-0 flex-col items-stretch gap-4 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:px-6 md:justify-between md:gap-8">
        <p className="order-last flex w-full min-w-0 items-center justify-center gap-2 text-center font-mono text-[10px] uppercase leading-snug tracking-[0.18em] text-primary sm:text-[11px] sm:tracking-[0.2em] md:order-first md:w-auto md:justify-start md:text-left">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50 opacity-60 motion-reduce:animate-none motion-reduce:opacity-100" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]" />
          </span>
          {s.line}
        </p>
        <ul className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center md:gap-5">
          {stats.map((stat, i) => {
            const Icon = icons[i] ?? Activity;
            return (
              <li
                key={stat.label}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-primary/20 bg-card/60 px-3 py-3 shadow-[0_0_24px_-8px_hsl(var(--primary)/0.25),inset_0_1px_0_0_hsl(var(--primary)/0.08)] sm:min-w-[10rem] sm:flex-none sm:px-4 md:min-w-0"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 text-left">
                  <span className="block font-mono text-lg font-bold leading-none text-foreground">{stat.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">{stat.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SocialProofRibbon;
